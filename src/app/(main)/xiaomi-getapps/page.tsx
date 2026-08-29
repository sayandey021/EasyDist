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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Smartphone, ShieldCheck, Sparkles, Layers } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function XiaomiGetAppsPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Xiaomi GetApps" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                        Xiaomi GetApps
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Distribute Android apps and games on Xiaomi, Redmi, and POCO devices worldwide
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-orange-500/5 hover:bg-orange-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-orange-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Xiaomi GetApps (formerly Mi App Store) is the official application store preloaded on all Xiaomi, Redmi, and POCO smartphones and tablets running Xiaomi HyperOS and MIUI.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            With over 280 million monthly active users across India, Southeast Asia, Europe, and Latin America, GetApps provides developers with massive distribution scale, built-in security scanning, monetization through Xiaomi Ad & Payment services, and dedicated promotional campaigns.
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Free to Publish</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Software</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Games</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">HyperOS / MIUI</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-500 group/btn" asChild>
                            <a href="https://global.developer.mi.com/" target="_blank" rel="noreferrer">
                                Xiaomi Developer Console
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-500 group/btn" asChild>
                            <a href="https://global.developer.mi.com/doc" target="_blank" rel="noreferrer">
                                Submission Guide
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-500 group/btn" asChild>
                            <a href="https://global.developer.mi.com/support" target="_blank" rel="noreferrer">
                                Developer Support
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-orange-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-orange-500" />
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Free Developer Registration!</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                There is zero registration fee to create an account and publish apps on Xiaomi GetApps.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Revenue Share</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration or annual fees)
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Revenue Share:</strong> 70/30 standard split (70% developer / 30% platform) for in-app purchases and paid downloads.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Create a Xiaomi Developer Account</p>
                                        <p className="text-sm text-muted-foreground">Register as an Individual or Enterprise developer on the Xiaomi Global Developer Platform.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Identity Verification</p>
                                        <p className="text-sm text-muted-foreground">Complete quick identity/business verification with required documentation.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Create App Listing & Upload APK</p>
                                        <p className="text-sm text-muted-foreground">Provide screenshots, localized description, privacy policy, and upload your standard Android APK/AAB package.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Security Scan & Publication</p>
                                        <p className="text-sm text-muted-foreground">Xiaomi conducts automated malware and content checks. Applications are typically approved within 1 to 3 business days.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Ecosystem</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                    Xiaomi Smartphones & Tablets (Xiaomi 14, 13, Pad Series)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                    Redmi Smartphones & Tablets (Note series, K series, Number series)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                    POCO Performance Devices (F, X, M series)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-orange-500" />
                                    Xiaomi HyperOS and MIUI operating systems
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
