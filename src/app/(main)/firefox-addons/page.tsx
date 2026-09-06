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

export default function FirefoxAddonsPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Firefox Add-ons" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-purple-600">
                        Firefox Add-ons (AMO)
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Distribute extensions, themes, and dictionaries to Mozilla Firefox desktop and Android users
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-orange-500/5 hover:bg-orange-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-orange-600 dark:text-orange-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            addons.mozilla.org (AMO) is Mozilla's official repository for Firefox add-ons. It provides users with a secure, curated directory of extensions built on the open WebExtensions standard.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Mozilla supports both Listed (distributed on AMO) and Unlisted (self-distributed .xpi packages signed cryptographically by Mozilla). Firefox also features robust support for extensions on Android mobile devices.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 dark:text-orange-400">Free to Publish</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 dark:text-orange-400">WebExtensions API</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 dark:text-orange-400">Firefox Android Support</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 dark:text-orange-400">Self-Hosting / Unlisted</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://addons.mozilla.org/developers/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">AMO Developer Hub</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">MDN WebExtensions Docs</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://extensionworkshop.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Firefox Extension Workshop</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-orange-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Free to Publish & Automatic Signing!</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Mozilla developer accounts and add-on submissions are completely free. Mozilla provides automated signature tools via web UI and the <code>web-ext</code> CLI.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Distribution Channels</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration or hosting fee)
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Distribution Types:</strong> Listed (Hosted on AMO directory) or Unlisted (Signed by Mozilla for your own website or GitHub releases).
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Create a Firefox Account (FxA)</p>
                                        <p className="text-sm text-muted-foreground">Sign in to addons.mozilla.org/developers and accept the Mozilla Add-on Developer Agreement.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Build using WebExtensions Standard</p>
                                        <p className="text-sm text-muted-foreground">Firefox supports standard WebExtensions APIs, Manifest V2, and Manifest V3 with Event Pages and Background Scripts.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Submit ZIP / XPI Package</p>
                                        <p className="text-sm text-muted-foreground">Upload your package through the Developer Hub or automate submissions using <code>web-ext sign</code>.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Automated Verification & Review</p>
                                        <p className="text-sm text-muted-foreground">Automated linter runs instantly. Unlisted extensions are signed within minutes; listed extensions are reviewed and published to AMO.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Platforms</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                    Mozilla Firefox Desktop (Windows, macOS, Linux)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                    Firefox for Android (Open Mobile Extension Ecosystem)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                    Firefox Developer Edition & Firefox Nightly
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                    Tor Browser, Waterfox & LibreWolf
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
