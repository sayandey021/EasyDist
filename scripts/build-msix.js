const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getDirSize(dir) {
    let size = 0;
    if (!fs.existsSync(dir)) return 0;
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const full = path.join(dir, file);
            try {
                const stat = fs.statSync(full);
                if (stat.isDirectory()) {
                    size += getDirSize(full);
                } else {
                    size += stat.size;
                }
            } catch (e) {}
        }
    } catch (e) {}
    return size;
}

function removeDir(dir) {
    if (fs.existsSync(dir)) {
        const size = getDirSize(dir);
        try {
            fs.rmSync(dir, { recursive: true, force: true });
            return size;
        } catch (e) {
            console.warn(`[WARN] Could not fully remove ${dir}:`, e.message);
        }
    }
    return 0;
}

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version || '1.0.0';
// Convert semver 1.7.0 to 1.7.0.0 for AppxManifest
const quadVersion = version.split('.').length === 3 ? `${version}.0` : version;

console.log('===================================================');
console.log(`EasyDist Tauri MSIX Package Builder v${version}`);
console.log('===================================================');

// 1. Locate MakeAppx.exe
const sdkPaths = [
    'C:\\Program Files (x86)\\Windows Kits\\10\\bin',
    'C:\\Program Files\\Windows Kits\\10\\bin'
];

let makeAppxPath = null;
for (const basePath of sdkPaths) {
    if (fs.existsSync(basePath)) {
        const versions = fs.readdirSync(basePath).sort().reverse();
        for (const v of versions) {
            const candidate = path.join(basePath, v, 'x64', 'makeappx.exe');
            if (fs.existsSync(candidate)) {
                makeAppxPath = candidate;
                break;
            }
        }
    }
    if (makeAppxPath) break;
}

if (!makeAppxPath) {
    console.error('Error: MakeAppx.exe not found in Windows Kits.');
    process.exit(1);
}
console.log(`[OK] Using Windows SDK MakeAppx: ${makeAppxPath}`);

// 2. Build Tauri release binary
console.log('\n[1/5] Building Tauri release binary...');
execSync('npm run tauri:build', { stdio: 'inherit' });

const exePath = path.join('src-tauri', 'target', 'release', 'easydist.exe');
if (!fs.existsSync(exePath)) {
    console.error(`Error: Compiled executable not found at ${exePath}`);
    process.exit(1);
}
console.log(`[OK] Compiled binary found: ${exePath}`);

// 3. Prepare MSIX staging directory
const stagingDir = path.join('src-tauri', 'target', 'msix-staging');
if (fs.existsSync(stagingDir)) {
    fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

const assetsDir = path.join(stagingDir, 'Assets');
fs.mkdirSync(assetsDir, { recursive: true });

console.log('\n[2/5] Copying assets and application binary...');
fs.copyFileSync(exePath, path.join(stagingDir, 'EasyDist.exe'));

// Copy all appx icons from src-tauri/icons
const iconsDir = path.join('src-tauri', 'icons');
const iconFiles = fs.readdirSync(iconsDir);
for (const icon of iconFiles) {
    if (icon.endsWith('.png')) {
        fs.copyFileSync(path.join(iconsDir, icon), path.join(assetsDir, icon));
    }
}

// 4. Generate AppxManifest.xml
console.log('\n[3/5] Generating AppxManifest.xml...');
const manifestContent = `<?xml version="1.0" encoding="utf-8"?>
<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
         xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
         xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities">
  <Identity Name="Saayan.EasyDist"
            Publisher="CN=37E2AF47-D2FC-489C-BDC1-02C989A7B989"
            Version="${quadVersion}"
            ProcessorArchitecture="x64" />
  <Properties>
    <DisplayName>EasyDist</DisplayName>
    <PublisherDisplayName>Saayan</PublisherDisplayName>
    <Logo>Assets\\StoreLogo.png</Logo>
    <Description>EasyDist - Distribution Helper Tool for cross-platform app developers</Description>
  </Properties>
  <Resources>
    <Resource Language="en-us" />
  </Resources>
  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.17763.0" MaxVersionTested="10.0.26100.0" />
  </Dependencies>
  <Capabilities>
    <rescap:Capability Name="runFullTrust" />
  </Capabilities>
  <Applications>
    <Application Id="EasyDist"
                 Executable="EasyDist.exe"
                 EntryPoint="Windows.FullTrustApplication">
      <uap:VisualElements DisplayName="EasyDist"
                          Description="EasyDist - Software Distribution Helper"
                          BackgroundColor="#1f1f23"
                          Square150x150Logo="Assets\\Square150x150Logo.png"
                          Square44x44Logo="Assets\\Square44x44Logo.png">
        <uap:DefaultTile ShortName="EasyDist"
                         Square71x71Logo="Assets\\Square71x71Logo.png" />
      </uap:VisualElements>
    </Application>
  </Applications>
</Package>
`;

fs.writeFileSync(path.join(stagingDir, 'AppxManifest.xml'), manifestContent.trim());

// 5. Pack MSIX using MakeAppx.exe
const outDir = path.join('dist');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const msixOutput = path.join(outDir, `EasyDist_v${version}_x64.msix`);
console.log(`\n[4/5] Packing MSIX package to ${msixOutput}...`);
execSync(`"${makeAppxPath}" pack /d "${stagingDir}" /p "${msixOutput}" /o`, { stdio: 'inherit' });

// 6. Automatic cleanup of intermediate build files and staging
console.log('\n[5/5] Cleaning up intermediate build and staging files to free disk space...');
let freedBytes = 0;
freedBytes += removeDir(stagingDir);
freedBytes += removeDir(path.join('src-tauri', 'target', 'release', 'incremental'));
freedBytes += removeDir(path.join('src-tauri', 'target', 'debug'));
freedBytes += removeDir('.next');
freedBytes += removeDir('out');

const stats = fs.statSync(msixOutput);
console.log('\n===================================================');
console.log(`[SUCCESS] MSIX package built successfully!`);
console.log(`Package: ${msixOutput} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
console.log(`[CLEANED] Intermediate build cache freed: ${(freedBytes / 1024 / 1024).toFixed(1)} MB`);
console.log('===================================================');
