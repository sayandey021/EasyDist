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
import { ExternalLink, Terminal, Globe, ShieldCheck, FileJson, Server, Code, Box, Heart, CheckCircle2 } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function ItchIoPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Itch.io" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">
                        Itch.io
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Indie-friendly platform for games, tools, and digital content
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-red-500/5 hover:bg-red-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-red-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            An open marketplace for independent digital creators with a focus on indie video games. It gives creators complete control over pricing, distribution, and the design of their store pages.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            An open marketplace for independent digital creators with a focus on indie video games. It gives creators complete control over pricing, distribution, and the design of their store pages.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-red-500/10 text-red-500">Free</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-500">Pay what you want</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-500">Games</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-500">Software</Badge>
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
                            <a href="https://itch.io/dashboard" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Itch.io Dashboard</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-red-500 hover:text-red-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://itch.io/docs/butler/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Butler CLI Docs</span>
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
                            <Heart className="h-5 w-5 text-pink-500" />
                            <h3 className="font-semibold">Indie-Friendly Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Publishing Fee:</strong> Completely free to publish
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> You choose! Itch.io suggests 10%, but you can set 0-100%
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Pricing Model:</strong> Free, paid, pay-what-you-want, or donations
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Create an itch.io account</p>
                                    <p className="text-sm text-muted-foreground">Sign up for free at itch.io</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Create a new project</p>
                                    <p className="text-sm text-muted-foreground">Click "Dashboard" → "Create new project"</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Upload your files</p>
                                    <p className="text-sm text-muted-foreground">Upload ZIP/builds directly or use butler CLI for updates</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Customize your page</p>
                                    <p className="text-sm text-muted-foreground">Add cover image, screenshots, description, and theme</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
                                <div>
                                    <p className="font-medium">Publish!</p>
                                    <p className="text-sm text-muted-foreground">No review process - publish instantly</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Why Itch.io?</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                No approval process - publish immediately
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                You set your own revenue share (even 0%)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Great for game jams and early access
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Supports web games (HTML5), downloadables, and more
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Butler CLI for easy updates and delta patching
                            </li>
                        </ul>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
