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

export default function ChromeWebStorePage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Chrome Web Store" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-amber-500 to-green-600">
                        Chrome Web Store
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Publish extensions and themes for Google Chrome and Chromium browsers to billions of users
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-blue-600 dark:text-blue-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The Chrome Web Store is Google's official online store for extensions, themes, and web applications. It serves as the primary distribution channel for the world's most popular web browser.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Extensions published to the Chrome Web Store are built using Manifest V3 (MV3) and can also be installed by users across various Chromium-based browsers including Google Chrome, Brave, Arc, Vivaldi, Opera, and Microsoft Edge.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">$5 One-Time</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">Manifest V3</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">WebExtensions</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">Chromium Ecosystem</Badge>
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
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn" asChild>
                            <a href="https://chrome.google.com/webstore/devconsole" target="_blank" rel="noreferrer">
                                Developer Dashboard
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn" asChild>
                            <a href="https://developer.chrome.com/docs/extensions/" target="_blank" rel="noreferrer">
                                Extension Documentation
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn" asChild>
                            <a href="https://developer.chrome.com/docs/webstore/program-policies/" target="_blank" rel="noreferrer">
                                Program Policies
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
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
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Puzzle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Manifest V3 Standard</h3>
                            </div>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                                Chrome Web Store requires all new extensions to adhere to Manifest V3, utilizing Service Workers, declarativeNetRequest APIs, and enhanced user privacy protections.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Registration</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> $5 USD one-time registration fee to verify developer identity and combat spam.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Publishing Fee:</strong> Free ($0 per extension or update).
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Register as a Chrome Developer</p>
                                        <p className="text-sm text-muted-foreground">Sign in to the Chrome Web Store Developer Dashboard and pay the one-time $5 fee.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Package Your Extension ZIP</p>
                                        <p className="text-sm text-muted-foreground">Bundle your <code>manifest.json</code>, background service workers, content scripts, and icons into a single ZIP archive.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Complete Store Listing & Privacy Practices</p>
                                        <p className="text-sm text-muted-foreground">Provide screenshots (1280x800 or 640x400), promo tiles, detailed description, and declare all requested permissions and data usage.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Automated & Manual Review</p>
                                        <p className="text-sm text-muted-foreground">Google reviews extensions for security, policy compliance, and single-purpose requirements. Review takes 24 hours to a few days.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Browsers & Environments</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    Google Chrome (Windows, macOS, Linux, ChromeOS)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    Brave Browser & Vivaldi
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    Arc Browser by The Browser Company
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    Opera & Microsoft Edge (via Web Store compatibility)
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
