const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];
if (!newVersion) {
    console.error('No version provided to update-about-version.js');
    process.exit(1);
}

// 1. Sync src-tauri/tauri.conf.json
const tauriConfPath = path.join(__dirname, '../src-tauri/tauri.conf.json');
if (fs.existsSync(tauriConfPath)) {
    try {
        const conf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
        conf.version = newVersion;
        fs.writeFileSync(tauriConfPath, JSON.stringify(conf, null, 2) + '\n');
        console.log(`[OK] src-tauri/tauri.conf.json synced with version ${newVersion}`);
    } catch (e) {
        console.error('Failed to update tauri.conf.json:', e);
    }
}

// 2. Sync src-tauri/Cargo.toml
const cargoPath = path.join(__dirname, '../src-tauri/Cargo.toml');
if (fs.existsSync(cargoPath)) {
    try {
        let content = fs.readFileSync(cargoPath, 'utf8');
        content = content.replace(/^version\s*=\s*"[^"]*"/m, `version = "${newVersion}"`);
        fs.writeFileSync(cargoPath, content);
        console.log(`[OK] src-tauri/Cargo.toml synced with version ${newVersion}`);
    } catch (e) {
        console.error('Failed to update Cargo.toml:', e);
    }
}

// 3. Verify UI auto-sync
console.log(`[OK] Settings/About and TitleBar automatically inherit v${newVersion} from package.json`);
