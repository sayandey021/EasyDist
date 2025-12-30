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

# Step 3: Copy assets from existing icons
Write-Host "Copying assets..."
$AssetsSource = Join-Path $ProjectPath "build\appx"
$AssetsDest = Join-Path $AppxContentPath "assets"

if (Test-Path $AssetsSource) {
    Copy-Item (Join-Path $AssetsSource "*") $AssetsDest -Recurse -Force
}
else {
    # Create placeholder assets from icon.png
    $iconPath = Join-Path $ProjectPath "icon.png"
    if (Test-Path $iconPath) {
        Copy-Item $iconPath (Join-Path $AssetsDest "StoreLogo.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "Square44x44Logo.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "Square150x150Logo.png") -Force
        Copy-Item $iconPath (Join-Path $AssetsDest "Wide310x150Logo.png") -Force
    }
}

# Step 4: Create AppxManifest.xml
Write-Host "`n[4/6] Creating AppxManifest.xml..." -ForegroundColor Yellow
$Version = (Get-Content (Join-Path $ProjectPath "package.json") | ConvertFrom-Json).version
$AppVersion = "$Version.0"

$ManifestContent = @"
<?xml version="1.0" encoding="utf-8"?>
<Package
   xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
   xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
   xmlns:desktop="http://schemas.microsoft.com/appx/manifest/desktop/windows10"
   xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities">
  <Identity Name="Saayan.EasyDist"
    ProcessorArchitecture="x64"
    Publisher="CN=37E2AF47-D2FC-489C-BDC1-02C989A7B989"
    Version="$AppVersion" />
  <Properties>
    <DisplayName>EasyDist</DisplayName>
    <PublisherDisplayName>Saayan</PublisherDisplayName>
    <Description>EasyDist - Distribution Helper Tool</Description>
    <Logo>assets\StoreLogo.png</Logo>
  </Properties>
  <Resources>
    <Resource Language="en-US" />
  </Resources>
  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.17763.0" MaxVersionTested="10.0.22621.0" />
  </Dependencies>
  <Capabilities>
    <rescap:Capability Name="runFullTrust"/>
  </Capabilities>
  <Applications>
    <Application Id="EasyDist" Executable="app\EasyDist.exe" EntryPoint="Windows.FullTrustApplication">
      <uap:VisualElements
       BackgroundColor="#1f1f23"
       DisplayName="EasyDist"
       Square150x150Logo="assets\Square150x150Logo.png"
       Square44x44Logo="assets\Square44x44Logo.png"
       Description="EasyDist - Distribution Helper Tool">
        <uap:DefaultTile Wide310x150Logo="assets\Wide310x150Logo.png">
          <uap:ShowNameOnTiles>
            <uap:ShowOn Tile="wide310x150Logo" />
            <uap:ShowOn Tile="square150x150Logo" />
          </uap:ShowNameOnTiles>
        </uap:DefaultTile>
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

& $MakePriPath new /Overwrite /Manifest $ManifestPath /ProjectRoot $AppxContentPath /ConfigXml $PriConfigPath /OutputFile $ResourcesPriOutput /IndexName "EasyDist"

if ($LASTEXITCODE -ne 0) {
    Write-Warning "makepri.exe returned non-zero exit code, but continuing..."
}

# Step 6: Create MSIX package
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

& $MakeAppxPath pack /d $AppxContentPath /p $MsixOutput /o /nv

if ($LASTEXITCODE -ne 0) {
    Write-Error "makeappx.exe failed"
    exit 1
}

Write-Host "`n=== Build Complete! ===" -ForegroundColor Green
Write-Host "MSIX Package: $MsixOutput" -ForegroundColor Cyan
Write-Host "`nNote: The MSIX is not signed. For Microsoft Store submission," -ForegroundColor Yellow
Write-Host "the Store will sign it automatically when you upload." -ForegroundColor Yellow
