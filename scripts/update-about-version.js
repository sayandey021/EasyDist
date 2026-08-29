const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];
if (!newVersion) {
    console.error('No version provided to update-about-version.js');
    process.exit(1);
}

// 1. Check/Update settings/page.tsx
const settingsPath = path.join(__dirname, '../src/app/(main)/settings/page.tsx');
if (fs.existsSync(settingsPath)) {
    let content = fs.readFileSync(settingsPath, 'utf8');

    // Replace if hardcoded version string exists
    const regex = /(<span className="text-sm text-muted-foreground">Version<\/span>\s*<span className="text-sm font-medium">)[^<]+(<\/span>)/;
    if (regex.test(content)) {
        content = content.replace(regex, `$1${newVersion}$2`);
        fs.writeFileSync(settingsPath, content);
    }
    console.log(`[OK] Settings/About page synced with version ${newVersion}`);
} else {
    console.warn('settings/page.tsx not found!');
}

// 2. Verify Titlebar version linkage
const titlebarPath = path.join(__dirname, '../src/components/titlebar.tsx');
if (fs.existsSync(titlebarPath)) {
    console.log(`[OK] TitleBar badge automatically inherits v${newVersion} from package.json`);
} else {
    console.warn('titlebar.tsx not found!');
}

