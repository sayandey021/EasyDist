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

export default function GiteaPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Gitea" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                        Gitea
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    A painless self-hosted Git service
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-green-500/5 hover:bg-green-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-green-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A lightweight, painless, self-hosted Git service. Written in Go, it is designed to be highly efficient, simple to install, and easily configurable across various operating systems.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A lightweight, painless, self-hosted Git service. Written in Go, it is designed to be highly efficient, simple to install, and easily configurable across various operating systems.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-green-500/10 text-green-500">Open Source</Badge>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-500">Self-Hosted</Badge>
                            <Badge variant="secondary" className="bg-green-500/10 text-green-500">Source Control</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Useful links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-green-500 hover:text-green-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://about.gitea.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Gitea Website</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-green-500 hover:text-green-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://docs.gitea.com/usage/actions/overview" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Gitea Actions Docs</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-green-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-green-500" />
                            Features & Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Lightweight!</h3>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">
                            Gitea is highly resource-efficient and can run on a Raspberry Pi.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Self-hosted:</strong> 100% Free and Open Source.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Install Gitea</p>
                                    <p className="text-sm text-muted-foreground">Set up your own Gitea instance via Docker or binary.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Gitea Actions</p>
                                    <p className="text-sm text-muted-foreground">Use Gitea Actions (compatible with GitHub Actions) to automate builds.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Releases & Packages</p>
                                    <p className="text-sm text-muted-foreground">Publish artifacts as Gitea Releases or to the Package Registry.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
