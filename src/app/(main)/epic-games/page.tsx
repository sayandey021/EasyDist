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
import { ExternalLink, Terminal, Globe, ShieldCheck, FileJson, Server, Code, Box, DollarSign, CheckCircle2 } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function EpicGamesPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Epic Games Store" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Epic Games Store
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Publish games on the Epic Games Store with lower fees
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-red-500/5 hover:bg-red-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-red-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A digital storefront and game launcher developed by Epic Games. It offers an extensive library of exclusive titles, Unreal Engine assets, and provides developers with favorable revenue sharing.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A digital storefront and game launcher developed by Epic Games. It offers an extensive library of exclusive titles, Unreal Engine assets, and provides developers with favorable revenue sharing.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-red-500/10 text-red-500">$100 per game</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-500">Games</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Useful links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-red-500 hover:text-red-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://dev.epicgames.com/portal" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Epic Dev Portal</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-red-500 hover:text-red-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://dev.epicgames.com/docs" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Documentation</span>
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
                            <Box className="h-5 w-5 text-red-500" />
                            Features & Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Submission Fee:</strong> $100 USD per game (one-time)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Epic takes only 12% (vs. 30% on other stores)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Starting June 2025:</strong> Keep 100% of first $1M earned per app per year
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 text-green-600">
                            <strong>Epic First Run:</strong> 100% revenue for first 6 months (exclusive launch)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Apply to the Epic Games Store</p>
                                    <p className="text-sm text-muted-foreground">Submit your game through the Epic Games Dev Portal</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Complete onboarding</p>
                                    <p className="text-sm text-muted-foreground">Set up your organization and complete legal agreements</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Create your store page</p>
                                    <p className="text-sm text-muted-foreground">Add game details, media assets, and pricing</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Upload your build</p>
                                    <p className="text-sm text-muted-foreground">Use BuildPatch Tool to upload and manage builds</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Game must meet Epic's content guidelines
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Store page assets (key art, screenshots, logos)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Age rating (IARC or equivalent)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Support for Epic Online Services recommended
                            </li>
                        </ul>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
