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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, FileText, Sparkles, Code2, Heart } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function ObsidianPluginsPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Obsidian Plugins" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-500">
                        Obsidian Community Plugins
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The official plugin marketplace for Obsidian, the leading privacy-first markdown knowledge base
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-purple-500/5 hover:bg-purple-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-purple-600 dark:text-purple-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Obsidian Community Plugins is the official directory powering 1-click in-app discovery and updates for Obsidian on Windows, macOS, Linux, iOS, and Android.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Plugins are built with TypeScript and HTML/CSS using the official Obsidian API. Distribution is fully decentralized: you host release bundles (<code>main.js</code>, <code>manifest.json</code>, <code>styles.css</code>) on GitHub Releases, and submit your plugin metadata via Pull Request to the <code>obsidianmd/obsidian-releases</code> repository.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">100% Free</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">TypeScript & Node</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">GitHub Releases Hosting</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">Desktop & Mobile</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">PKM Ecosystem</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-600 group/btn" asChild>
                            <a href="https://obsidian.md/plugins" target="_blank" rel="noreferrer">
                                Obsidian Plugins Directory
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-600 group/btn" asChild>
                            <a href="https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin" target="_blank" rel="noreferrer">
                                Plugin Developer Docs
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-600 group/btn" asChild>
                            <a href="https://github.com/obsidianmd/obsidian-releases" target="_blank" rel="noreferrer">
                                obsidian-releases (GitHub)
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-purple-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            Distribution Architecture & Publishing Guide
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Decentralized Release Delivery</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Obsidian does not host your binary files on proprietary servers. The Obsidian app downloads the compiled <code>main.js</code>, <code>manifest.json</code>, and optional <code>styles.css</code> directly from your GitHub Releases, giving you complete ownership of your code.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Account Policy</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Submission:</strong> 100% Free ($0).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Monetization:</strong> Community plugins are free open-source; authors frequently receive support via GitHub Sponsors, Buy Me a Coffee, or Patreon.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish an Obsidian Plugin</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Scaffold Plugin with Sample Template</p>
                                        <p className="text-sm text-muted-foreground">Use the official <code>obsidian-sample-plugin</code> repository on GitHub to set up TypeScript compilation and bundling with esbuild or Rollup.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Define manifest.json</p>
                                        <p className="text-sm text-muted-foreground">Include your unique <code>id</code>, human-readable <code>name</code>, <code>version</code>, <code>minAppVersion</code>, <code>description</code>, <code>author</code>, and <code>isDesktopOnly</code> flag.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Create a GitHub Release</p>
                                        <p className="text-sm text-muted-foreground">Draft a new GitHub Release matching your manifest version tag. Attach the build output files: <code>main.js</code>, <code>manifest.json</code>, and <code>styles.css</code> (if used).</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Submit Pull Request to obsidian-releases</p>
                                        <p className="text-sm text-muted-foreground">Fork <code>github.com/obsidianmd/obsidian-releases</code>, add your plugin entry into <code>community-plugins.json</code>, and submit a PR for community review and validation.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Plugin Capabilities</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-purple-600 dark:text-purple-400">Editor Extensions</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Custom CodeMirror 6 extensions, syntax decoration, flashcards, and autocomplete.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-purple-600 dark:text-purple-400">Workspace Custom Views</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Kanban boards, calendars, interactive mind maps, and timeline views.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
