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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, FileCode, GitFork, Users, Layers } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function OpenUserJSPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="OpenUserJS" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-500 to-cyan-500">
                        OpenUserJS
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    An open-source, community-driven user script repository with collaborative editing and GitHub integration
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-sky-500/5 hover:bg-sky-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-sky-600 dark:text-sky-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            OpenUserJS (OUJS) is a dedicated FOSS (Free and Open Source Software) user script repository. Built with node.js, it provides authors with robust script management tools, collaborative issue tracking, and automated sync.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            OUJS emphasizes transparency, open licensing (Creative Commons, MIT, GPL, Apache), and clean JavaScript packaging for cross-browser web enhancements.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-sky-500/10 text-sky-600 dark:text-sky-400">100% Free & Open Source</Badge>
                            <Badge variant="secondary" className="bg-sky-500/10 text-sky-600 dark:text-sky-400">GitHub & Gist Sync</Badge>
                            <Badge variant="secondary" className="bg-sky-500/10 text-sky-600 dark:text-sky-400">Collaborative Tools</Badge>
                            <Badge variant="secondary" className="bg-sky-500/10 text-sky-600 dark:text-sky-400">Tampermonkey / Violentmonkey</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-sky-500 hover:text-sky-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://openuserjs.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">OpenUserJS Home</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-sky-500 hover:text-sky-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://openuserjs.org/about/Userscript-Beginners-HOWTO" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Beginners Guide</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-sky-500 hover:text-sky-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://github.com/OpenUserJs/OpenUserJS.org" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">GitHub Repository</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-sky-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <GitFork className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Open Collaboration & Forking</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                OpenUserJS allows authors to collaborate on scripts, track bug reports with an integrated ticketing system, and accept community forks and pull contributions.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Account Options</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration fee).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Hosting:</strong> Free public hosting with automatic CDN distribution and CDNJS/external library whitelisting.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Sign in with GitHub</p>
                                        <p className="text-sm text-muted-foreground">Authenticate at openuserjs.org via your GitHub credentials to create an author account.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Prepare User Script Code</p>
                                        <p className="text-sm text-muted-foreground">Ensure standard metadata block with <code>@copyright</code>, <code>@license</code>, <code>@name</code>, and <code>@match</code> declarations.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Sync with GitHub Repo or Gist</p>
                                        <p className="text-sm text-muted-foreground">Link your script source directly to a GitHub Repository or public Gist for seamless updates on push.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Public Listing & Discussions</p>
                                        <p className="text-sm text-muted-foreground">Your script page includes real-time install stats, source diff viewer, and integrated issue reporting.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Platforms</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-sky-500" />
                                    Violentmonkey & Tampermonkey across all browsers
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-sky-500" />
                                    FireMonkey (Firefox WebExtensions)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-sky-500" />
                                    AdGuard & Userscripts (iOS / Safari / Android)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-sky-500" />
                                    Greasemonkey on desktop Firefox
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
