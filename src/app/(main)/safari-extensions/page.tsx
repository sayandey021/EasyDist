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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Puzzle, ShieldCheck, Layers } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function SafariExtensionsPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Safari Web Extensions" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600">
                        Safari Web Extensions
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Distribute WebExtensions to Apple Safari users across macOS, iOS, iPadOS, and visionOS
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-blue-600 dark:text-blue-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Safari Web Extensions allow developers to bring cross-browser WebExtensions to Apple devices using standard JavaScript, HTML, and CSS.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Using Apple's <code>safari-web-extension-converter</code> command-line tool, existing extensions from Chrome and Firefox can be automatically packaged inside an Xcode project wrapper and distributed through the Mac App Store and iOS App Store.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">$99/year Apple Developer</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">macOS, iOS & iPadOS</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">WebKit Standard</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400">App Store Connect</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://developer.apple.com/safari/extensions/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Apple Safari Portal</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://developer.apple.com/documentation/safariservices/safari_web_extensions" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Safari Extension Docs</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://appstoreconnect.apple.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">App Store Connect</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-blue-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            Features & Distribution Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Puzzle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                <h3 className="font-semibold text-blue-700 dark:text-blue-300">Universal Web Extension Support</h3>
                            </div>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                                With a single codebase, your extension can run seamlessly across Safari on Mac (macOS), iPhone (iOS), iPad (iPadOS), and Apple Vision Pro (visionOS).
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Requirements</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Apple Developer Program:</strong> $99 USD/year (includes distribution for iOS, macOS, watchOS, tvOS, visionOS, and Safari extensions).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Revenue Share:</strong> 85/15 under the App Store Small Business Program (or 70/30 standard) for paid extensions or in-app purchases.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Package & Publish</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Convert with Safari Converter Tool</p>
                                        <p className="text-sm text-muted-foreground">Run <code>xcrun safari-web-extension-converter /path/to/extension</code> in terminal to generate an Xcode app container.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Test in Safari</p>
                                        <p className="text-sm text-muted-foreground">Enable the Develop menu in Safari and toggle &quot;Allow Unsigned Extensions&quot; to test your extension live in Xcode.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Archive & Sign in Xcode</p>
                                        <p className="text-sm text-muted-foreground">Sign the companion container app with your Apple Developer provisioning profile and archive for App Store distribution.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Submit via App Store Connect</p>
                                        <p className="text-sm text-muted-foreground">Upload the build to App Store Connect, configure screenshots, privacy nutrition labels, and submit for Apple Review.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Platforms</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    Safari for macOS (MacBook, iMac, Mac Studio)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    Safari for iOS (iPhone)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    Safari for iPadOS (iPad)
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    Safari for visionOS (Apple Vision Pro)
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
