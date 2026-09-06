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

export default function OperaAddonsPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Opera Add-ons" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">
                        Opera Add-ons
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Publish extensions and sidebar apps to Opera One and Opera GX gaming browser users
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-red-500/5 hover:bg-red-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-red-600 dark:text-red-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Opera Add-ons is the official extension catalog for the Opera browser family, including Opera One and the dedicated gaming browser, Opera GX.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Based on the Chromium engine, Opera supports standard Manifest V3 extensions along with unique Opera-exclusive capabilities, such as Sidebar Action APIs that allow extensions to run persistently alongside web browsing.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">Free to Publish</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">Opera GX Gamers</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">Sidebar Action API</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-600 dark:text-red-400">Chromium Compatible</Badge>
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
                            <a href="https://addons.opera.com/developer/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Developer Panel</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-red-500 hover:text-red-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://dev.opera.com/extensions/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Opera Extension Docs</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-red-500 hover:text-red-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://addons.opera.com/extensions/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Opera Add-ons Catalog</span>
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
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Free to Publish!</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Registering as an Opera developer and submitting extensions or wall papers is 100% free of charge.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Ecosystem</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration or submission fee).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Supported Formats:</strong> Chromium standard extension packages (.crx / .zip) and animated wallpapers.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Create an Opera Account</p>
                                        <p className="text-sm text-muted-foreground">Sign up at auth.opera.com and navigate to the Opera Add-ons Developer Panel.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Prepare Your ZIP Archive</p>
                                        <p className="text-sm text-muted-foreground">Compress your extension manifest, background service worker, and assets into a ZIP file.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Add Listing Details & Icons</p>
                                        <p className="text-sm text-muted-foreground">Provide screenshots, detailed description, icons, and categories (Productivity, Gaming, Utilities, etc.).</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Moderation & Approval</p>
                                        <p className="text-sm text-muted-foreground">Opera's moderation team inspects code security and compliance before making the extension live on the store.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Platforms</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-red-500" />
                                    Opera One Desktop Browser (Windows, macOS, Linux)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-red-500" />
                                    Opera GX (World&apos;s leading gaming browser with 25M+ active gamers)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-red-500" />
                                    Opera Crypto Browser & Developer editions
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-red-500" />
                                    Opera Sidebar Applications & Modding system
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
