'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Terminal, Globe, ShieldCheck, FileJson, Server, Code, Box, CheckCircle2, DollarSign } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function BunPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Bun" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                        Bun
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    A fast all-in-one JavaScript runtime, bundler, test runner, and package manager.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-purple-500/5 hover:bg-purple-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-purple-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A fast all-in-one JavaScript runtime, bundler, transpiler, and package manager built in Zig. It aims to be a drop-in replacement for Node.js, delivering significantly higher performance.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A fast all-in-one JavaScript runtime, bundler, transpiler, and package manager built in Zig. It aims to be a drop-in replacement for Node.js, delivering significantly higher performance.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">JavaScript</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">Runtime</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">Package Manager</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Useful links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://bun.sh/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Bun Website</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-purple-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-purple-500" />
                            Features & Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-pink-600" />
                            <h3 className="font-semibold text-pink-700 dark:text-pink-300">Incredibly Fast!</h3>
                        </div>
                        <p className="text-sm text-pink-600 dark:text-pink-400">
                            Bun's package manager is significantly faster than npm and yarn. It reads from the npm registry, allowing you to use existing packages out of the box.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Free:</strong> Uses the npm registry for packages, which is free for open source.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Setup project</p>
                                    <p className="text-sm text-muted-foreground">Create your project using `bun init` and ensure your `package.json` is ready.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">npm publish</p>
                                    <p className="text-sm text-muted-foreground">Currently, you still publish to the npm registry. You can use standard `npm publish` workflows or GitHub Actions.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
