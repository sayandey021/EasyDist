import fs from 'fs';
import path from 'path';

const MAIN_DIR = 'src/app/(main)';

const GRADIENTS = [
    'from-blue-500 to-cyan-500',
    'from-red-500 to-orange-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-amber-500 to-yellow-500',
    'from-indigo-500 to-purple-500',
    'from-rose-500 to-red-500',
    'from-teal-500 to-cyan-500',
];

function getGradient(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Skip if it doesn't have the old wrapper
    if (!content.includes('className="mx-auto w-full max-w-4xl space-y-6"')) {
        return false;
    }

    // Extract basic fields
    const componentNameMatch = content.match(/export default function ([A-Za-z0-9_]+)\(\)/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Page';

    const titleMatch = content.match(/<CardTitle.*?>([\s\S]*?)<\/CardTitle>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Platform';

    const descMatch = content.match(/<CardDescription>([\s\S]*?)<\/CardDescription>/);
    let desc = descMatch ? descMatch[1].trim() : '';
    // clean up desc
    desc = desc.replace(/\{\s*'\s*([^']+?)\s*'\s*\}/g, "'$1'"); // sometimes it's {'some'}

    const tags = [];
    const badgeRegex = /<Badge.*?>(.*?)<\/Badge>/g;
    let badgeMatch;
    while ((badgeMatch = badgeRegex.exec(content)) !== null) {
        tags.push(badgeMatch[1].trim());
    }

    // Extract links
    const links = [];
    const linkRegex = /<(?:Link|a)\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/(?:Link|a)>/g;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(content)) !== null) {
        const url = linkMatch[1];
        let linkText = linkMatch[2].replace(/<[^>]*>/g, '').trim(); // strip inner tags like icons
        if (linkText) {
            links.push({ url, text: linkText });
        }
    }

    // Extract old content to preserve it. It's usually inside <CardContent> but we want to strip the links div if it's there.
    let oldContent = '';
    const contentMatch = content.match(/<CardContent[^>]*>([\s\S]*?)<\/CardContent>/);
    if (contentMatch) {
        oldContent = contentMatch[1];
        // Remove the Links section from old content
        oldContent = oldContent.replace(/<div[^>]*>\s*<Button.*?>[\s\S]*?<\/div>/g, '');
        oldContent = oldContent.replace(/<div className="flex gap-4">[\s\S]*?<\/div>/, '');
    }

    const gradient = getGradient(title);
    
    // Base color for borders/bg tints. Just use blue as default fallback for generic tints.
    const colorTheme = gradient.includes('blue') || gradient.includes('cyan') || gradient.includes('indigo') ? 'blue-500' :
                       gradient.includes('red') || gradient.includes('rose') ? 'red-500' :
                       gradient.includes('green') || gradient.includes('emerald') || gradient.includes('teal') ? 'green-500' :
                       gradient.includes('purple') || gradient.includes('pink') ? 'purple-500' : 'amber-500';

    const newContent = `'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Terminal, Globe, ShieldCheck, FileJson, Server, Code, Box } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function ${componentName}() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="${title}" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${gradient}">
                        ${title}
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    ${desc}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-${colorTheme}/5 hover:bg-${colorTheme}/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-${colorTheme}">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm">
                            ${desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            ${tags.map(t => `<Badge variant="secondary" className="bg-${colorTheme}/10 text-${colorTheme}">${t}</Badge>`).join('\n                            ')}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-${colorTheme} group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Useful links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        ${links.map(l => `<Button variant="outline" className="w-full justify-between hover:border-${colorTheme} hover:text-${colorTheme} group/btn" asChild>
                            <a href="${l.url}" target="_blank" rel="noreferrer">
                                ${l.text}
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>`).join('\n                        ')}
                        ${links.length === 0 ? `<p className="text-sm text-muted-foreground">No links provided.</p>` : ''}
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-${colorTheme}/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-${colorTheme}" />
                            Features & Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        ${oldContent.trim() ? oldContent.trim() : '<p className="text-muted-foreground">Information about ' + title + '.</p>'}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
`;

    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
}

const dirs = fs.readdirSync(MAIN_DIR);
let count = 0;

for (const d of dirs) {
    const pagePath = path.join(MAIN_DIR, d, 'page.tsx');
    if (fs.existsSync(pagePath)) {
        const success = processFile(pagePath);
        if (success) {
            console.log('Migrated ' + d);
            count++;
        }
    }
}

console.log('Successfully migrated ' + count + ' pages.');
