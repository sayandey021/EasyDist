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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Zap, Terminal, Sparkles, Code } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function RaycastStorePage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Raycast Store" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-amber-500">
                        Raycast Store
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The extension store for Raycast, the lightning-fast, keyboard-first developer and productivity launcher
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-red-500/5 hover:bg-red-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-red-600 dark:text-red-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The Raycast Store hosts thousands of extensions designed to control your tools, automate workflows, and boost productivity from a single hotkey. Raycast is built for power users across macOS and Windows.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Extensions are built with modern <strong>React and TypeScript</strong> using the official <code>@raycast/api</code> and <code>@raycast/utils</code> libraries. All community extensions are maintained in an open-source monorepo on GitHub, providing automated linting, security audits, and continuous delivery.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">100% Free</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">React & TypeScript</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">GitHub Monorepo PR</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">macOS & Windows</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">Keyboard-First UI</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-red-500 hover:text-red-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://www.raycast.com/store" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Raycast Store Catalog</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-red-500 hover:text-red-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://developers.raycast.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Raycast Developer Docs</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-red-500 hover:text-red-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://github.com/raycast/extensions" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">raycast/extensions (GitHub)</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-red-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-red-600 dark:text-red-400" />
                            Developer Workflow & Monorepo Publishing
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Pre-Built Native UI Components</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                You write declarative React code using Raycast&apos;s UI system: <code>&lt;List&gt;</code>, <code>&lt;Detail&gt;</code>, <code>&lt;Form&gt;</code>, and <code>&lt;ActionPanel&gt;</code>. Raycast renders them as blazing-fast native UI components with zero CSS setup required.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Requirements</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> 100% Free ($0).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Requirements:</strong> GitHub account to submit pull requests to the <code>raycast/extensions</code> repository.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Build and Publish a Raycast Extension</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Scaffold New Extension with CLI</p>
                                        <p className="text-sm text-muted-foreground">Create a fresh extension boilerplate in seconds using npm:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">npm create raycast-extension@latest</pre>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Develop and Test with Hot Reloading</p>
                                        <p className="text-sm text-muted-foreground">Start the development server. The command appears instantly inside your local Raycast app with live hot reloading:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">npm run dev</pre>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Fork raycast/extensions and Copy Files</p>
                                        <p className="text-sm text-muted-foreground">Fork the monorepo <code>github.com/raycast/extensions</code> and place your extension directory under <code>extensions/&lt;your-extension-name&gt;</code>.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Open Pull Request & Automated Release</p>
                                        <p className="text-sm text-muted-foreground">Submit a PR. Raycast&apos;s GitHub Actions verify your bundle, build screenshots, and run security scans. Once merged, it goes live in the Raycast Store within minutes.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Command Modes</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-red-600 dark:text-red-400">View Commands</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Interactive lists, markdown documentation viewers, search bars, and forms.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-red-600 dark:text-red-400">No-View Commands</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Instant actions such as copying data, toggling system settings, and API calls.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-red-600 dark:text-red-400">Menu Bar Commands</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Persistent menu bar indicators, real-time status trackers, and quick toggles.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
