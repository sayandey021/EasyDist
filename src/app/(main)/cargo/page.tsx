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

export default function CargoPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Cargo" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Cargo (Crates.io)
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The Rust package manager and the official Rust package registry.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-red-500/5 hover:bg-red-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-red-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The official package manager and build system for the Rust programming language. It manages project dependencies, compiles packages (crates), and easily publishes them.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The official package manager and build system for the Rust programming language. It manages project dependencies, compiles packages (crates), and easily publishes them.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-red-500/10 text-red-500">Rust</Badge>
                            <Badge variant="secondary" className="bg-red-500/10 text-red-500">Package Manager</Badge>
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
                            <a href="https://crates.io/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Crates.io Website</span>
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
                        <div className="rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-orange-600" />
                            <h3 className="font-semibold text-orange-700 dark:text-orange-300">Blazingly Fast!</h3>
                        </div>
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                            Cargo handles downloading dependencies, compiling packages, making distributable packages, and uploading them to crates.io.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Free:</strong> Crates.io is completely free to use and publish open source crates to.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Create an Account</p>
                                    <p className="text-sm text-muted-foreground">Login to crates.io using GitHub and generate an API token.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Cargo Publish</p>
                                    <p className="text-sm text-muted-foreground">Login via CLI and run `cargo publish` from your project root.</p>
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
