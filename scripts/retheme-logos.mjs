import fs from 'fs';
import path from 'path';

const MAIN_DIR = 'src/app/(main)';

const updates = [
    {
        dir: 'altstore',
        gradient: 'from-teal-600 to-cyan-500',
        oldColor: 'purple-500',
        newColor: 'teal-500'
    },
    {
        dir: 'amazon-appstore',
        gradient: 'from-teal-500 to-emerald-500',
        oldColor: 'amber-500',
        newColor: 'teal-500'
    },
    {
        dir: 'apk-mirror',
        gradient: 'from-orange-500 to-amber-500',
        oldColor: 'indigo-500',
        newColor: 'orange-500'
    },
    {
        dir: 'apkpure',
        gradient: 'from-green-500 to-emerald-500',
        oldColor: 'amber-500',
        newColor: 'green-500'
    },
    {
        dir: 'apple-store',
        gradient: 'from-blue-500 to-indigo-500',
        oldColor: 'amber-500',
        newColor: 'blue-500'
    },
    {
        dir: 'aptoide',
        gradient: 'from-orange-500 to-amber-500',
        oldColor: 'blue-500',
        newColor: 'orange-500'
    },
    {
        dir: 'galaxy-store',
        gradient: 'from-pink-500 to-purple-500',
        oldColor: 'teal-500',
        newColor: 'pink-500'
    },
    {
        dir: 'huawei-store',
        gradient: 'from-red-500 to-rose-500',
        oldColor: 'green-500',
        newColor: 'red-500'
    },
    {
        dir: 'xbox',
        gradient: 'from-green-500 to-emerald-500',
        oldColor: 'purple-500',
        newColor: 'green-500'
    },
    {
        dir: 'nintendo',
        gradient: 'from-red-500 to-rose-500',
        oldColor: 'purple-500',
        newColor: 'red-500'
    },
    {
        dir: 'gog',
        gradient: 'from-purple-500 to-indigo-500',
        oldColor: 'green-500',
        newColor: 'purple-500'
    },
    {
        dir: 'itch-io',
        gradient: 'from-red-500 to-rose-500',
        oldColor: 'amber-500',
        newColor: 'red-500'
    }
];

for (const u of updates) {
    const pagePath = path.join(MAIN_DIR, u.dir, 'page.tsx');
    if (!fs.existsSync(pagePath)) {
        console.log('Skipping ' + u.dir + ' (not found)');
        continue;
    }

    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // Replace gradient
    content = content.replace(/bg-gradient-to-r from-[a-z0-9-]+ to-[a-z0-9-]+/, 'bg-gradient-to-r ' + u.gradient);
    
    // Replace color classes
    const oldColorEsc = u.oldColor.replace('-', '\\-');
    const regex = new RegExp(oldColorEsc, 'g');
    content = content.replace(regex, u.newColor);

    if (u.dir === 'altstore') {
        content = content.replace('platformName="AltStore PAL"', 'platformName="AltStore"');
    }
    
    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log('Rethemed ' + u.dir);
}
