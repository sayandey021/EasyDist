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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Smartphone, ShieldCheck } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function OppoMarketPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="OPPO App Market" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">
                        OPPO App Market
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Reach hundreds of millions of active users across OPPO, OnePlus, and Realme devices
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-emerald-600 dark:text-emerald-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            OPPO App Market is the official application store and distribution channel for OPPO, OnePlus, and Realme devices powered by ColorOS, OxygenOS, and Realme UI.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Through the unified OPPO Open Platform (HeyTap Developer Services), developers can distribute apps and games across over 500 million devices globally, accessing premium user demographics across Southeast Asia, India, China, Europe, and Latin America.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Free to Publish</Badge>
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Software</Badge>
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Games</Badge>
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">ColorOS & OxygenOS</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-emerald-500 hover:text-emerald-600 group/btn" asChild>
                            <a href="https://open.oppomobile.com/" target="_blank" rel="noreferrer">
                                OPPO Open Platform
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-emerald-500 hover:text-emerald-600 group/btn" asChild>
                            <a href="https://developers.oppomobile.com/" target="_blank" rel="noreferrer">
                                Global Developer Portal
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-emerald-500 hover:text-emerald-600 group/btn" asChild>
                            <a href="https://open.oppomobile.com/new/developmentGuide/guide" target="_blank" rel="noreferrer">
                                Documentation & Guidelines
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-emerald-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Free to Publish!</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Developer account registration and app submission on OPPO App Market are completely free.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Revenue Share</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration or recurring fees)
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Revenue Share:</strong> 70/30 standard split (70% to developer / 30% platform) for in-app purchases and premium downloads.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Register an OPPO Developer Account</p>
                                        <p className="text-sm text-muted-foreground">Sign up at open.oppomobile.com with your business or developer email.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Developer Qualification Verification</p>
                                        <p className="text-sm text-muted-foreground">Complete enterprise or individual identity authentication.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Upload APK & Store Assets</p>
                                        <p className="text-sm text-muted-foreground">Upload standard signed Android APK/AAB, app icon, promo banners, screenshots, and copyright declarations.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Review & Go Live</p>
                                        <p className="text-sm text-muted-foreground">The review process takes 1 to 2 business days. Once approved, the app is automatically distributed across supported devices.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Ecosystem</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    OPPO Smartphones & Tablets (Find Series, Reno Series, A Series)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    OnePlus Smartphones & Tablets (OnePlus Flagship, Nord, Pad)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Realme Smartphones & Tablets (GT Series, Number Series)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    ColorOS, OxygenOS, and Realme UI platforms
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
