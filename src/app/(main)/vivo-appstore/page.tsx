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

export default function VivoAppStorePage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Vivo V-Appstore" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                        Vivo V-Appstore
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Distribute applications to vivo and iQOO smartphone users worldwide
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-blue-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Vivo V-Appstore (vivo App Store) is the official application store preloaded on all vivo and iQOO devices running Funtouch OS and OriginOS.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Serving over 300 million active users globally across Southeast Asia, India, and China, the vivo Developer Open Platform provides developers with comprehensive SDKs, deep system-level integration, in-app billing, Push notifications, and promotional traffic support.
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Free to Publish</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Software</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Games</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Funtouch OS & OriginOS</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-500 group/btn" asChild>
                            <a href="https://developer.vivo.com/" target="_blank" rel="noreferrer">
                                vivo Developer Platform
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-500 group/btn" asChild>
                            <a href="https://developer.vivo.com/doc" target="_blank" rel="noreferrer">
                                Developer Documentation
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-500 group/btn" asChild>
                            <a href="https://developer.vivo.com/contact/customer-service" target="_blank" rel="noreferrer">
                                Developer Support
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
                            <Box className="h-5 w-5 text-blue-500" />
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
                                There are no registration fees or annual subscription charges to publish on the vivo V-Appstore.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Revenue Share</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration fee)
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Revenue Share:</strong> 70/30 standard split (70% developer / 30% platform) on digital transactions and in-app purchases.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Register a vivo Developer Account</p>
                                        <p className="text-sm text-muted-foreground">Sign up at developer.vivo.com using your business credentials.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Verify Real-Name / Business Authentication</p>
                                        <p className="text-sm text-muted-foreground">Submit developer qualification documents for swift identity verification.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Upload Android Package & Metadata</p>
                                        <p className="text-sm text-muted-foreground">Upload your standard signed APK/AAB, icons, localized store descriptions, and screenshots.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">App Review & Release</p>
                                        <p className="text-sm text-muted-foreground">vivo performs automated vulnerability screening and manual review, with approvals generally completed within 1-3 business days.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Ecosystem</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    vivo Smartphones & Tablets (X Fold, X Series, V Series, Y Series)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    iQOO Performance Gaming Devices (iQOO Flagships, Neo Series, Z Series)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    vivo Funtouch OS (Global) and OriginOS platforms
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    vivo Smart Ecosystem & Wearables
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
