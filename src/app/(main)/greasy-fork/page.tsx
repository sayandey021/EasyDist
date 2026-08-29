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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, FileCode, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function GreasyForkPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Greasy Fork" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-amber-500">
                        Greasy Fork
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The world&apos;s largest repository for User Scripts running on Tampermonkey, Violentmonkey, and Greasemonkey
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-emerald-600 dark:text-emerald-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Greasy Fork is the most popular, community-trusted user script directory in the world. User scripts are lightweight JavaScript programs that run directly in users&apos; browsers to customize website appearance, remove annoyances, and automate tasks.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Scripts are distributed as standard <code>.user.js</code> files, executed via extension managers like Tampermonkey, Violentmonkey, and Greasemonkey across Chrome, Firefox, Safari, Edge, and mobile browsers.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Free to Publish</Badge>
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">GitHub Webhook Sync</Badge>
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Tampermonkey & Violentmonkey</Badge>
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Cross-Browser JS</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-emerald-500 hover:text-emerald-600 group/btn" asChild>
                            <a href="https://greasyfork.org/" target="_blank" rel="noreferrer">
                                Greasy Fork Home
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-emerald-500 hover:text-emerald-600 group/btn" asChild>
                            <a href="https://greasyfork.org/help/writing-user-scripts" target="_blank" rel="noreferrer">
                                Writing User Scripts Guide
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-emerald-500 hover:text-emerald-600 group/btn" asChild>
                            <a href="https://greasyfork.org/help/code-rules" target="_blank" rel="noreferrer">
                                Script Rules & Policies
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-emerald-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <RefreshCw className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Automated GitHub Sync & Instant Publishing</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                You can link your Greasy Fork script directly to a GitHub repository. Whenever you push new commits to GitHub, Greasy Fork automatically updates your script without manual intervention!
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Ecosystem</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Developer Account:</strong> FREE ($0 registration or hosting fee).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Supported Formats:</strong> JavaScript (<code>.user.js</code>) and UserCSS styles (<code>.user.css</code>).
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish a User Script</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Define Userscript Metadata Header</p>
                                        <p className="text-sm text-muted-foreground">Include standard headers: <code>// ==UserScript==</code>, <code>@name</code>, <code>@namespace</code>, <code>@version</code>, <code>@match</code> (target URLs), and <code>@grant</code> permissions.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Create a Greasy Fork Account</p>
                                        <p className="text-sm text-muted-foreground">Sign up using your email or authenticate instantly via GitHub / GitLab.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Submit Code or Connect GitHub URL</p>
                                        <p className="text-sm text-muted-foreground">Paste your script code directly or provide the raw URL to your GitHub script file with automatic webhook synchronization.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Instant Distribution & Feedback</p>
                                        <p className="text-sm text-muted-foreground">Your script is live immediately for users to install with one click into Tampermonkey or Violentmonkey.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported User Script Managers</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Tampermonkey (Chrome, Firefox, Safari, Edge, Opera)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Violentmonkey (Open-source, lightweight script runner)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Greasemonkey for Mozilla Firefox
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    Userscripts on Safari (iOS / macOS) & Kiwi Browser (Android)
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
