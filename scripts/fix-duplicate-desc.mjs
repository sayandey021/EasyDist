import fs from 'fs';
import path from 'path';

const MAIN_DIR = 'src/app/(main)';
const dirs = fs.readdirSync(MAIN_DIR);
let count = 0;

for (const d of dirs) {
    const pagePath = path.join(MAIN_DIR, d, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // We want to remove the <p className="text-sm"> inside the Overview CardContent
    // Specifically, this block:
    /*
                    <CardContent className="space-y-4">
                        <p className="text-sm">
                            ...
                        </p>
                        <div className="flex flex-wrap gap-2">
    */
    
    const regex = /(<CardContent className="space-y-4">\s*)<p className="text-sm">[\s\S]*?<\/p>(\s*<div className="flex flex-wrap gap-2">)/;
    
    if (regex.test(content)) {
        content = content.replace(regex, '$1$2');
        
        // Also rename Overview to Tags since the description is gone
        content = content.replace(/<CardTitle className="text-([^"]+)">Overview<\/CardTitle>/, '<CardTitle className="text-$1">Tags</CardTitle>');
        
        fs.writeFileSync(pagePath, content, 'utf-8');
        count++;
    }
}
console.log('Fixed duplicate desc in ' + count + ' pages.');
