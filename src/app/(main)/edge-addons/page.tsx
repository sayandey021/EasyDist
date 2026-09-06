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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Puzzle, ShieldCheck, Layers } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function EdgeAddonsPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Edge Add-ons" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                        Edge Add-ons
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Distribute extensions to hundreds of millions of Microsoft Edge users across Windows and macOS
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-teal-500/5 hover:bg-teal-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-teal-600 dark:text-teal-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Edge Add-ons is Microsoft's official store for Chromium-based extensions designed for Microsoft Edge. Managed via Microsoft Partner Center, it delivers seamless enterprise and consumer reach.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Because Microsoft Edge is built on Chromium, standard Manifest V3 extensions require zero code changes. Microsoft even provides a 1-click import feature to copy existing store listings directly from the Chrome Web Store.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400">Free to Publish</Badge>
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400">1-Click Chrome Import</Badge>
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400">Manifest V3</Badge>
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400">Windows & macOS</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-teal-500 hover:text-teal-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://partner.microsoft.com/dashboard/microsoftedge" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Partner Center Dashboard</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-teal-500 hover:text-teal-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://learn.microsoft.com/microsoft-edge/extensions-chromium/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Edge Developer Docs</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-teal-500 hover:text-teal-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://microsoftedge.microsoft.com/addons/category/Edge-Extensions" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Edge Add-ons Catalog</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-teal-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">100% Free Developer Registration!</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                There is zero registration fee to create a Microsoft Edge Developer account and publish unlimited extensions on the Edge Add-ons store.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Account Options</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration fee for Edge Add-ons).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Account Types:</strong> Individual or Company account with Microsoft Partner Center verification.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Register at Microsoft Partner Center</p>
                                        <p className="text-sm text-muted-foreground">Sign in with your Microsoft account at partner.microsoft.com/dashboard/microsoftedge.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Import from Chrome Web Store (Optional)</p>
                                        <p className="text-sm text-muted-foreground">You can provide your Chrome Web Store URL to automatically import screenshots, descriptions, and metadata.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Upload Extension Package (.ZIP)</p>
                                        <p className="text-sm text-muted-foreground">Upload standard Manifest V3 Chromium package. Add store assets and privacy policy URLs.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Certification & Publication</p>
                                        <p className="text-sm text-muted-foreground">Microsoft performs automated and manual certification checks, typically approving extensions within 1 to 3 business days.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Target Audience & Reach</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                    Pre-installed default browser on Windows 10 and Windows 11
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                    Deep integration with Enterprise and Education IT environments
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                    Microsoft Edge for macOS and Linux
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                    Edge Sidebar Extension support
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
