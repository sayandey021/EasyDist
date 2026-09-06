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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Terminal, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function VSCodeMarketplacePage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="VS Code Marketplace" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                        VS Code Marketplace
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The official extension marketplace for Visual Studio Code, reaching tens of millions of developers worldwide
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-blue-600 dark:text-blue-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The Visual Studio Code Marketplace is the primary hub for discovering, installing, and managing extensions for Visual Studio Code. It allows developers to publish themes, linters, language servers (LSP), debug adapters, snippets, and GitHub Copilot extensions.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Publishing is handled using Microsoft Azure DevOps Personal Access Tokens (PAT) and the official <code>@vscode/vsce</code> command-line packaging tool, ensuring reliable packaging and instant automated deployment.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">100% Free</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">vsce CLI</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">TypeScript & JS</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">Copilot Extensions</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">Cross-Platform</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://marketplace.visualstudio.com/manage" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Publisher Management</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://code.visualstudio.com/api" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">VS Code Extension API</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://code.visualstudio.com/api/working-with-extensions/publishing-extension" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Publishing Guide</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-blue-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            Publishing Workflow & Tooling
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Zero Publisher Fees & Direct Installation</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Creating a verified publisher profile on the VS Code Marketplace is completely free. Once published, your extension is searchable and installable with 1-click directly within every installation of VS Code.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Account Prerequisites</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Publisher Account:</strong> FREE ($0 registration or hosting fee).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Authentication:</strong> Microsoft Account linked to Azure DevOps with a Personal Access Token (PAT) granted <em>Marketplace (Manage)</em> scope.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish to VS Code Marketplace</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Create Publisher & Azure DevOps Token</p>
                                        <p className="text-sm text-muted-foreground">Go to <code>marketplace.visualstudio.com/manage</code> and create a Publisher ID. In Azure DevOps (<code>dev.azure.com</code>), generate a Personal Access Token with &quot;Marketplace &gt; Manage&quot; scope.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Install the VSCE CLI Tool</p>
                                        <p className="text-sm text-muted-foreground">Install the official packaging tool globally using npm:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">npm install -g @vscode/vsce</pre>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Authenticate and Package</p>
                                        <p className="text-sm text-muted-foreground">Log in with your publisher ID and compile your extension into a <code>.vsix</code> bundle:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">vsce login your-publisher-id&#10;vsce package</pre>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Publish to the Marketplace</p>
                                        <p className="text-sm text-muted-foreground">Publish directly via the command line or upload the <code>.vsix</code> file manually to the publisher portal:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">vsce publish</pre>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Extension Types</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="p-3 border rounded-lg bg-card flex items-start gap-3">
                                    <Code2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">Languages & Tooling</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">Language Server Protocol (LSP), Debug Adapter Protocol (DAP), formatters, and linters.</p>
                                    </div>
                                </div>
                                <div className="p-3 border rounded-lg bg-card flex items-start gap-3">
                                    <Sparkles className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">Copilot & AI Participants</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">GitHub Copilot Chat participants, custom slash commands, and inline suggestions.</p>
                                    </div>
                                </div>
                                <div className="p-3 border rounded-lg bg-card flex items-start gap-3">
                                    <Terminal className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">Custom UI & Webviews</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">Webview panels, custom editors, sidebar views, status bar items, and tree views.</p>
                                    </div>
                                </div>
                                <div className="p-3 border rounded-lg bg-card flex items-start gap-3">
                                    <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">Themes & Snippets</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">Workbench color themes, syntax highlighting grammars, and code snippet packs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
