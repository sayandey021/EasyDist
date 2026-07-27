import fs from 'fs';
import path from 'path';

const MAIN_DIR = 'src/app/(main)';
const dirs = fs.readdirSync(MAIN_DIR);

for (const d of dirs) {
    const pagePath = path.join(MAIN_DIR, d, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    let content = fs.readFileSync(pagePath, 'utf-8');
    
    const tags = new Set();
    const tagRegex = /<([A-Z][a-zA-Z0-9]*)/g;
    let match;
    while ((match = tagRegex.exec(content)) !== null) {
        tags.add(match[1]);
    }

    const exclude = ['Card', 'CardContent', 'CardDescription', 'CardHeader', 'CardTitle', 'Button', 'Badge', 'PlatformLogo', 'ExternalLink', 'Link'];
    
    const lucideIcons = [];
    for (const tag of tags) {
        if (!exclude.includes(tag)) {
            lucideIcons.push(tag);
        }
    }

    if (lucideIcons.length > 0) {
        content = content.replace(
            /import { ExternalLink([^}]*) } from 'lucide-react';/,
            (full, inside) => {
                const existing = new Set(inside.split(',').map(s => s.trim()).filter(s => s));
                for (const icon of lucideIcons) existing.add(icon);
                return 'import { ExternalLink, ' + Array.from(existing).join(', ') + " } from 'lucide-react';";
            }
        );
        fs.writeFileSync(pagePath, content, 'utf-8');
    }
}
console.log("Fixed imports!");
