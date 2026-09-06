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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Palette, Code, Layers, Sparkles } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function FigmaCommunityPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Figma Community" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-emerald-500">
                        Figma Community
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The premier marketplace for Figma &amp; FigJam plugins, interactive widgets, UI kits, and design systems
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-rose-500/5 hover:bg-rose-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-rose-600 dark:text-rose-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Figma Community is the global ecosystem where millions of designers, product managers, and software engineers discover plugins, FigJam widgets, templates, and UI component libraries.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Plugins execute in a secure sandbox using the Figma Plugin API and standard Web technologies (HTML, CSS, TypeScript). Creators can publish free resources or monetize their creations with paid subscriptions and one-time purchases backed by Figma&apos;s integrated Stripe billing.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 dark:text-rose-400">Free or Paid</Badge>
                            <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 dark:text-rose-400">Figma & FigJam</Badge>
                            <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 dark:text-rose-400">HTML & TypeScript</Badge>
                            <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 dark:text-rose-400">Stripe Creator Payouts</Badge>
                            <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 dark:text-rose-400">In-App Distribution</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official Figma links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-rose-500 hover:text-rose-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://www.figma.com/community" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Figma Community Home</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-rose-500 hover:text-rose-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://www.figma.com/plugin-docs/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Plugin &amp; Widget API Docs</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-rose-500 hover:text-rose-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://help.figma.com/hc/en-us/articles/360040035974-Publish-plugins-to-the-Figma-Community" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Publishing Guidelines</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-rose-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                            Publishing & Monetization Models
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Integrated Monetization with Stripe</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Creators can sell paid plugins and widgets directly on Figma Community. Figma handles the checkout flow, user licensing, and automatic monthly payouts to your connected Stripe account.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Account Policy</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Free Publishing:</strong> $0 registration or listing fee.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Paid Creations:</strong> Supported in eligible countries via Stripe Express payouts (15% platform transaction fee).
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish to Figma Community</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Define manifest.json</p>
                                        <p className="text-sm text-muted-foreground">Specify your <code>name</code>, <code>id</code>, <code>api</code> version, <code>main</code> (background script), and <code>ui</code> (HTML iframe) entry points.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Develop and Test in Figma Desktop App</p>
                                        <p className="text-sm text-muted-foreground">Open Figma desktop client, go to <strong>Plugins &gt; Development &gt; Import plugin from manifest</strong> to test with live hot reloading.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Prepare Store Assets</p>
                                        <p className="text-sm text-muted-foreground">Design your 128x128 icon, 1920x1080 cover art, informative screenshots, tags, support links, and detailed release notes.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Submit for Review</p>
                                        <p className="text-sm text-muted-foreground">Click <strong>Publish</strong> directly in the Figma client. Figma&apos;s Trust and Safety team reviews submissions (typically 2–5 business days) before public listing.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Community Ecosystem Categories</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-rose-600 dark:text-rose-400">Figma Plugins</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Automated layer naming, design token sync, asset export, and AI copy generation.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-rose-600 dark:text-rose-400">FigJam Widgets</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Multiplayer whiteboarding tools, timers, polls, sticky note organizers, and games.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-rose-600 dark:text-rose-400">Design Systems</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Production-ready UI kits, typography scales, icon sets, and wireframe kits.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
