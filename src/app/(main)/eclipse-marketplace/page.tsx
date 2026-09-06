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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Layers, Server, Code, ShieldCheck } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function EclipseMarketplacePage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Eclipse Marketplace" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-orange-500">
                        Eclipse Marketplace
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The central discovery portal for Eclipse IDE plugins, solutions, and Rich Client Platform (RCP) applications
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-indigo-600 dark:text-indigo-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The Eclipse Marketplace is the official catalog for discovering and installing plugins, developer tools, and extensions for the Eclipse IDE and the Eclipse Rich Client Platform (RCP) ecosystem.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Entries in the Eclipse Marketplace are directly accessible within millions of Eclipse installations worldwide via the built-in <strong>Eclipse Marketplace Client (MPC)</strong>, enabling users to install and update features via drag-and-drop or 1-click wizard.
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">Free to List</Badge>
                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">Eclipse MPC Integration</Badge>
                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">p2 Update Sites</Badge>
                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">Java & OSGi</Badge>
                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">Enterprise Reach</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official portal links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-indigo-500 hover:text-indigo-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://marketplace.eclipse.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Eclipse Marketplace Home</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-indigo-500 hover:text-indigo-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://marketplace.eclipse.org/content/add-content" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Submitting Content Guide</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-indigo-500 hover:text-indigo-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://help.eclipse.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Eclipse Documentation</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-indigo-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            Listing Requirements & p2 Repositories
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Drag-and-Drop Installation</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Eclipse Marketplace provides an &quot;Install&quot; button on your web listing that users can drag directly from their browser into an active Eclipse IDE window to trigger instant background installation.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Ecosystem</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Listing Cost:</strong> FREE ($0). Hosted by the Eclipse Foundation.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Hosting Requirement:</strong> You must host your own Eclipse p2 repository (e.g., via GitHub Pages, S3, or your web server) containing compiled OSGi bundles and features.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to List an Eclipse Solution</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Build an Eclipse Feature & p2 Repository</p>
                                        <p className="text-sm text-muted-foreground">Package your OSGi plugins into an Eclipse Feature and build a p2 update site (using Tycho, Maven, or PDE build).</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Host the p2 Update Site Publicly</p>
                                        <p className="text-sm text-muted-foreground">Host your repository at an HTTPS URL (e.g. <code>https://username.github.io/my-eclipse-plugin/updates/</code>) containing <code>content.jar</code> and <code>artifacts.jar</code>.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Create an Eclipse Marketplace Account</p>
                                        <p className="text-sm text-muted-foreground">Sign up at <code>marketplace.eclipse.org</code> and select &quot;Add Content&quot; &gt; &quot;Add Solution&quot;.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Configure Metadata & Install Features</p>
                                        <p className="text-sm text-muted-foreground">Enter your update site URL, specify the root feature IDs to install, select supported Eclipse release versions, and submit for verification.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Key Eclipse Ecosystem Strengths</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-indigo-600 dark:text-indigo-400">Enterprise Java</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Heavy adoption across Fortune 500 financial, healthcare, and enterprise Java teams.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-indigo-600 dark:text-indigo-400">Embedded & Automotive</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Automotive and embedded hardware toolchains powered by Eclipse CDT.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-indigo-600 dark:text-indigo-400">Eclipse RCP Products</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Modular desktop applications utilizing the OSGi runtime and SWT UI layer.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
