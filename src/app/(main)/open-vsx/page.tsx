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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, ShieldCheck, Terminal, HeartHandshake } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function OpenVSXPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Open VSX Registry" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
                        Open VSX Registry
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The vendor-neutral, open-source alternative to the VS Code Marketplace, operated by the Eclipse Foundation
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-violet-500/5 hover:bg-violet-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-violet-600 dark:text-violet-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Open VSX is an open-source, vendor-neutral marketplace for Visual Studio Code compatible extensions. Governed by the Eclipse Foundation, it serves as the official registry for open-source IDE distributions that cannot legally use Microsoft&apos;s proprietary marketplace.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            It is the default extension source for <strong>VSCodium</strong>, <strong>Gitpod</strong>, <strong>Eclipse Theia</strong>, and privacy-focused developer tools. You can use standard <code>.vsix</code> extension files and publish automatically via GitHub Actions or the <code>ovsx</code> CLI.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-violet-500/10 text-violet-600 dark:text-violet-400">Eclipse Foundation</Badge>
                            <Badge variant="secondary" className="bg-violet-500/10 text-violet-600 dark:text-violet-400">100% Free & Open Source</Badge>
                            <Badge variant="secondary" className="bg-violet-500/10 text-violet-600 dark:text-violet-400">ovsx CLI</Badge>
                            <Badge variant="secondary" className="bg-violet-500/10 text-violet-600 dark:text-violet-400">VSCodium & Gitpod</Badge>
                            <Badge variant="secondary" className="bg-violet-500/10 text-violet-600 dark:text-violet-400">VSIX Compatible</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official registry links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-violet-500 hover:text-violet-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://open-vsx.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Open VSX Registry</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-violet-500 hover:text-violet-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://github.com/eclipse/openvsx/wiki/Publishing-Extensions" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Publishing Guide (Wiki)</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-violet-500 hover:text-violet-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://github.com/open-vsx/publish-extensions" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Open VSX Community Sync</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-violet-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                            Publishing with ovsx CLI
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Dual-Publishing Best Practice</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Most major VS Code extensions publish simultaneously to both Microsoft&apos;s VS Code Marketplace and Open VSX Registry. Publishing to Open VSX ensures your extension is accessible to users of open-source builds like VSCodium and cloud workspaces like Gitpod.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Account & Governance</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Publisher Registration:</strong> 100% Free ($0). Hosted by Eclipse Foundation as an open public utility.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Sign-in Providers:</strong> Authenticate with GitHub, Eclipse Foundation, or GitLab accounts.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish to Open VSX</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Sign in and Create a Namespace</p>
                                        <p className="text-sm text-muted-foreground">Log into <code>open-vsx.org</code> via GitHub or Eclipse. Claim your namespace (matches the <code>publisher</code> field in your <code>package.json</code>).</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Generate an Access Token</p>
                                        <p className="text-sm text-muted-foreground">In your Open VSX user profile settings, generate an Access Token with publication rights.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Install ovsx CLI Tool</p>
                                        <p className="text-sm text-muted-foreground">Install the Eclipse Open VSX CLI packaging tool via npm:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">npm install -g ovsx</pre>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Publish VSIX Package</p>
                                        <p className="text-sm text-muted-foreground">Publish your compiled extension bundle with one command:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">npx ovsx publish my-extension-1.0.0.vsix -p &quot;your_openvsx_access_token&quot;</pre>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Platforms Relying on Open VSX</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-violet-600 dark:text-violet-400">VSCodium</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Community-driven, 100% open-source binary release of VS Code with telemetry removed.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-violet-600 dark:text-violet-400">Gitpod & Cloud IDEs</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Automated cloud developer environments running browser-based IDEs.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-violet-600 dark:text-violet-400">Eclipse Theia</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Extensible open platform to develop custom cloud and desktop IDE products.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
