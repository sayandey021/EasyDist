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
import { ExternalLink, Terminal, Globe, ShieldCheck, FileJson, Server, Code, Box, CheckCircle2, DollarSign } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function GOGPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="GOG.com" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
                        GOG.com
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    DRM-free game distribution platform by CD Projekt
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-purple-500/5 hover:bg-purple-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-purple-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A digital game storefront that focuses on DRM-free PC games. Originally "Good Old Games", it specializes in classic titles curated to work on modern systems alongside new releases.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A digital game storefront that focuses on DRM-free PC games. Originally "Good Old Games", it specializes in classic titles curated to work on modern systems alongside new releases.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">Curated</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">Games</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">DRM-Free</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Useful links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://partners.gog.com/login?requested-route=aHR0cHM6Ly9wYXJ0bmVycy5nb2cuY29tLw%3D%3D#" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Partner Program</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://www.gog.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">GOG.com</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-purple-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-purple-500" />
                            Features & Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Curated Platform</h3>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            GOG is a curated store. Games are reviewed before acceptance. Known for quality DRM-free titles.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Developer Fee:</strong> No upfront fee
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> GOG takes 30% (negotiable for larger titles)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Submit your game for consideration</p>
                                    <p className="text-sm text-muted-foreground">Fill out the game submission form on GOG</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Game review by GOG team</p>
                                    <p className="text-sm text-muted-foreground">GOG evaluates game quality and fit for their platform</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">If accepted, sign publishing agreement</p>
                                    <p className="text-sm text-muted-foreground">Complete legal and financial paperwork</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Prepare DRM-free build</p>
                                    <p className="text-sm text-muted-foreground">GOG requires games to be completely DRM-free</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                100% DRM-free games
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                30-day money-back guarantee for customers
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                GOG Galaxy client (optional for players)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-purple-500" />
                                Strong community of PC gamers
                            </li>
                        </ul>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
