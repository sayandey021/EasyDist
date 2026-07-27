const fs = require('fs');
const path = require('path');

const newVersion = process.argv[2];
if (!newVersion) {
    console.error('No version provided to update-about-version.js');
    process.exit(1);
}

const settingsPath = path.join(__dirname, '../src/app/(main)/settings/page.tsx');
if (fs.existsSync(settingsPath)) {
    let content = fs.readFileSync(settingsPath, 'utf8');

    // Replace the hardcoded version in the About section.
    // Example: <span className="text-sm text-muted-foreground">Version</span>
    //          <span className="text-sm font-medium">1.2.1</span>
    const regex = /(<span className="text-sm text-muted-foreground">Version<\/span>\s*<span className="text-sm font-medium">)[^<]+(<\/span>)/;
    
    if (regex.test(content)) {
        content = content.replace(regex, `$1${newVersion}$2`);
        fs.writeFileSync(settingsPath, content);
        console.log('Updated version in settings/page.tsx to', newVersion);
    } else {
        console.log('Could not find the version string format in settings/page.tsx');
    }
} else {
    console.error('settings/page.tsx not found!');
}
