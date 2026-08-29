# Build MSIX Package Script for EasyDist
# This script builds the MSIX package using Windows SDK tools
# to avoid compatibility issues with electron-builder's bundled tools

param(
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"

# Configuration
$WinSDKPath = "C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64"
$ProjectPath = $PSScriptRoot
$DistPath = Join-Path $ProjectPath "dist"
$AppxPath = Join-Path $DistPath "__appx-x64"
$AppxContentPath = Join-Path $AppxPath "appx"
$WinUnpackedPath = Join-Path $DistPath "win-unpacked"

Write-Host "=== EasyDist MSIX Builder ===" -ForegroundColor Cyan

# Step 1: Build Next.js and electron app
if (-not $SkipBuild) {
    Write-Host "`n[1/6] Building Next.js...`n" -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Next.js build failed"
        exit 1
    }
    
    Write-Host "`n[2/6] Packaging Electron app (NSIS only)...`n" -ForegroundColor Yellow
    # Build NSIS only - this creates win-unpacked folder without APPX issues
    npx electron-builder --win nsis
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Electron packaging failed"
        exit 1
    }
}

# Step 2: Create APPX directory structure
Write-Host "`n[3/6] Creating APPX structure..." -ForegroundColor Yellow

# Clean and recreate appx directories
if (Test-Path $AppxPath) {
    Remove-Item $AppxPath -Recurse -Force
}
New-Item -ItemType Directory -Path $AppxPath -Force | Out-Null
New-Item -ItemType Directory -Path $AppxContentPath -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $AppxContentPath "app") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $AppxContentPath "assets") -Force | Out-Null

# Copy app files
Write-Host "Copying application files..."
Copy-Item (Join-Path $WinUnpackedPath "*") (Join-Path $AppxContentPath "app") -Recurse -Force

# Step 3: Copy assets and generate complete Store asset set
Write-Host "Copying and generating assets..."
$AssetsSource = Join-Path $ProjectPath "build\appx"
$AssetsDest = Join-Path $AppxContentPath "assets"

if (Test-Path $AssetsSource) {
    Copy-Item (Join-Path $AssetsSource "*") $AssetsDest -Recurse -Force
}

# Ensure all standard Store & Windows required asset sizes exist
$iconPath = Join-Path $ProjectPath "icon.png"
if (Test-Path $iconPath) {
    $BaseAssets = @("StoreLogo.png", "Square44x44Logo.png", "Square150x150Logo.png", "Wide310x150Logo.png", "SplashScreen.png")
    foreach ($asset in $BaseAssets) {
        $destFile = Join-Path $AssetsDest $asset
        if (-not (Test-Path $destFile)) {
            Copy-Item $iconPath $destFile -Force
        }
    }
    
    # Scale variants
    $Scales = @("100", "200", "400")
    foreach ($scale in $Scales) {
        Copy-Item $iconPath (Join-Path $AssetsDest "StoreLogo.scale-$scale.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "Square44x44Logo.scale-$scale.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "Square150x150Logo.scale-$scale.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "Wide310x150Logo.scale-$scale.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "SplashScreen.scale-$scale.png") -Force
    }

    # Targetsize & unplated variants for taskbar, start menu, and app list
    $TargetSizes = @("16", "24", "32", "48", "256")
    foreach ($size in $TargetSizes) {
        Copy-Item $iconPath (Join-Path $AssetsDest "Square44x44Logo.targetsize-$size.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "Square44x44Logo.targetsize-$size`_altform-unplated.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "Square44x44Logo.altform-unplated_targetsize-$size.png") -Force
    }
}

# Step 4: Create AppxManifest.xml with full schema compliance
Write-Host "`n[4/6] Creating AppxManifest.xml..." -ForegroundColor Yellow
$PkgJson = Get-Content (Join-Path $ProjectPath "package.json") | ConvertFrom-Json
$Version = $PkgJson.version
$AppVersion = "$Version.0"

# Read identity settings from package.json or use defaults
$IdentityName = if ($PkgJson.build.appx.identityName) { $PkgJson.build.appx.identityName } else { "Saayan.EasyDist" }
$Publisher = if ($PkgJson.build.appx.publisher) { $PkgJson.build.appx.publisher } else { "CN=37E2AF47-D2FC-489C-BDC1-02C989A7B989" }
$PublisherDisplayName = if ($PkgJson.build.appx.publisherDisplayName) { $PkgJson.build.appx.publisherDisplayName } else { "Saayan" }
$DisplayName = if ($PkgJson.build.appx.displayName) { $PkgJson.build.appx.displayName } else { "EasyDist" }
$AppId = if ($PkgJson.build.appx.applicationId) { $PkgJson.build.appx.applicationId } else { "EasyDist" }

$ManifestContent = @"
<?xml version="1.0" encoding="utf-8"?>
<Package
   xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
   xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
   xmlns:desktop="http://schemas.microsoft.com/appx/manifest/desktop/windows10"
   xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities"
   IgnorableNamespaces="uap desktop rescap">
  <Identity Name="$IdentityName"
    ProcessorArchitecture="x64"
    Publisher="$Publisher"
    Version="$AppVersion" />
  <Properties>
    <DisplayName>$DisplayName</DisplayName>
    <PublisherDisplayName>$PublisherDisplayName</PublisherDisplayName>
    <Description>EasyDist - Distribution Helper Tool</Description>
    <Logo>assets\StoreLogo.png</Logo>
  </Properties>
  <Resources>
    <Resource Language="en-US" />
  </Resources>
  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.17763.0" MaxVersionTested="10.0.26100.0" />
  </Dependencies>
  <Capabilities>
    <rescap:Capability Name="runFullTrust"/>
  </Capabilities>
  <Applications>
    <Application Id="$AppId" Executable="app\EasyDist.exe" EntryPoint="Windows.FullTrustApplication">
      <uap:VisualElements
       BackgroundColor="#1f1f23"
       DisplayName="$DisplayName"
       Square150x150Logo="assets\Square150x150Logo.png"
       Square44x44Logo="assets\Square44x44Logo.png"
       Description="EasyDist - Distribution Helper Tool">
        <uap:DefaultTile Wide310x150Logo="assets\Wide310x150Logo.png">
          <uap:ShowNameOnTiles>
            <uap:ShowOn Tile="wide310x150Logo" />
            <uap:ShowOn Tile="square150x150Logo" />
          </uap:ShowNameOnTiles>
        </uap:DefaultTile>
        <uap:SplashScreen Image="assets\SplashScreen.png" />
      </uap:VisualElements>
    </Application>
  </Applications>
</Package>
"@

$ManifestPath = Join-Path $AppxContentPath "AppxManifest.xml"
$ManifestContent | Out-File -FilePath $ManifestPath -Encoding utf8

# Step 5: Generate resources.pri using Windows SDK makepri.exe
Write-Host "`n[5/6] Generating resources.pri with Windows SDK..." -ForegroundColor Yellow
$MakePriPath = Join-Path $WinSDKPath "makepri.exe"

if (-not (Test-Path $MakePriPath)) {
    Write-Error "makepri.exe not found at $MakePriPath. Please install Windows SDK or update the path."
    exit 1
}

# Create priconfig.xml
$PriConfigPath = Join-Path $AppxPath "priconfig.xml"
$PriConfigContent = @"
<?xml version="1.0" encoding="UTF-8"?>
<resources targetOsVersion="10.0.0" majorVersion="1">
  <packaging>
    <autoResourcePackage qualifier="Language"/>
    <autoResourcePackage qualifier="Scale"/>
    <autoResourcePackage qualifier="DXFeatureLevel"/>
  </packaging>
  <index root="\" startIndexAt="\">
    <default>
      <qualifier name="Language" value="en-US"/>
      <qualifier name="Contrast" value="standard"/>
      <qualifier name="Scale" value="100"/>
      <qualifier name="HomeRegion" value="001"/>
      <qualifier name="TargetSize" value="256"/>
      <qualifier name="LayoutDirection" value="LTR"/>
      <qualifier name="Theme" value="dark"/>
      <qualifier name="AlternateForm" value=""/>
      <qualifier name="DXFeatureLevel" value="DX9"/>
      <qualifier name="Configuration" value=""/>
      <qualifier name="DeviceFamily" value="Desktop"/>
      <qualifier name="Custom" value=""/>
    </default>
    <indexer-config type="folder" foldernameAsQualifier="true" filenameAsQualifier="true" qualifierDelimiter="."/>
    <indexer-config type="resw" convertDotsToSlashes="true" initialPath=""/>
    <indexer-config type="resjson" initialPath=""/>
    <indexer-config type="PRI"/>
  </index>
</resources>
"@
$PriConfigContent | Out-File -FilePath $PriConfigPath -Encoding utf8

$ResourcesPriOutput = Join-Path $AppxContentPath "resources.pri"

& $MakePriPath new /Overwrite /Manifest $ManifestPath /ProjectRoot $AppxContentPath /ConfigXml $PriConfigPath /OutputFile $ResourcesPriOutput /IndexName $IdentityName

if ($LASTEXITCODE -ne 0) {
    Write-Warning "makepri.exe returned non-zero exit code, but continuing..."
}

# Step 6: Create MSIX package with validation enabled
Write-Host "`n[6/6] Creating MSIX package..." -ForegroundColor Yellow
$MakeAppxPath = Join-Path $WinSDKPath "makeappx.exe"
$MsixOutput = Join-Path $DistPath "EasyDist $Version.msix"

if (-not (Test-Path $MakeAppxPath)) {
    Write-Error "makeappx.exe not found at $MakeAppxPath. Please install Windows SDK or update the path."
    exit 1
}

# Remove old msix if exists
if (Test-Path $MsixOutput) {
    Remove-Item $MsixOutput -Force
}

& $MakeAppxPath pack /d $AppxContentPath /p $MsixOutput /o

if ($LASTEXITCODE -ne 0) {
    Write-Error "makeappx.exe failed"
    exit 1
}

# Step 7: Clean up temporary files
Write-Host "`n[7/7] Cleaning up temporary files..." -ForegroundColor Yellow
Get-ChildItem -Path $DistPath | Where-Object { 
    $_.PSIsContainer -or ($_.Extension -ne ".exe" -and $_.Extension -ne ".msix")
} | Remove-Item -Recurse -Force

Write-Host "`n=== Build Complete! ===" -ForegroundColor Green
Write-Host "MSIX Package: $MsixOutput" -ForegroundColor Cyan
Write-Host "`nNote: The MSIX is ready for Microsoft Store submission." -ForegroundColor Yellow
Write-Host "The Store will automatically sign and distribute the package upon submission approval." -ForegroundColor Yellow

