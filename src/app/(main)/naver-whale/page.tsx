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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Puzzle, ShieldCheck, Columns2, Layers } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function NaverWhalePage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Naver Whale" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600">
                        Naver Whale Store
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Publish extensions and sidebar applications for Naver Whale Browser across desktop and mobile
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-teal-500/5 hover:bg-teal-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-teal-600 dark:text-teal-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Naver Whale Store is the official extension marketplace for Naver Whale, the prominent Chromium-based browser developed by South Korea&apos;s leading internet company, Naver.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Built on the Chromium open-source engine, Whale features unique capabilities including an interactive Sidebar Action Panel, Dual Tab viewing, and deep integration with Naver services, while maintaining 100% compatibility with standard Manifest V3 WebExtensions.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400">Free to Publish</Badge>
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400">Sidebar Widget API</Badge>
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400">Manifest V3</Badge>
                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-600 dark:text-teal-400">Chromium Compatible</Badge>
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
                            <a href="https://store.whale.naver.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Whale Store Home</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-teal-500 hover:text-teal-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://developers.whale.naver.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Whale Developers Center</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-teal-500 hover:text-teal-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://whale.naver.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Naver Whale Browser</span>
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
                        <div className="rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Columns2 className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                <h3 className="font-semibold text-teal-700 dark:text-teal-300">Sidebar & Dual Tab Features</h3>
                            </div>
                            <p className="text-sm text-teal-600 dark:text-teal-400">
                                In addition to standard browser extensions, developers can create persistent Sidebar widgets that users keep pinned beside their browsing workspace for calculators, translators, quick notes, and messaging.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Requirements</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration or submission fee).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Account Type:</strong> Requires a Naver Developer account login.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Sign in to Whale Developers Center</p>
                                        <p className="text-sm text-muted-foreground">Log in with your Naver account at developers.whale.naver.com and agree to developer terms.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Package Extension ZIP</p>
                                        <p className="text-sm text-muted-foreground">Compress your standard Manifest V3 files, background scripts, and Whale sidebar declarations into a ZIP archive.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Store Listing & Localization</p>
                                        <p className="text-sm text-muted-foreground">Add screenshots (1280x800), icons, description, and Korean / English localized metadata.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Review & Distribution</p>
                                        <p className="text-sm text-muted-foreground">The Whale Store moderation team reviews the submission for security and performance before public listing.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Platforms</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                    Naver Whale for Windows (10 / 11)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                    Naver Whale for macOS & Linux
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                    Naver Whale for Android & iOS
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                                    Whale OS (South Korea educational laptop ecosystem)
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
