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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, Cpu, Wrench, ShieldCheck, Layers } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function JetBrainsMarketplacePage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="JetBrains Marketplace" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500">
                        JetBrains Marketplace
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The official plugin repository for IntelliJ IDEA, PyCharm, WebStorm, Android Studio, and the entire JetBrains IDE ecosystem
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-purple-500/5 hover:bg-purple-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-purple-600 dark:text-purple-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            JetBrains Marketplace is the central marketplace for extensions, themes, and developer tools across all JetBrains IDEs, including IntelliJ IDEA, PyCharm, WebStorm, CLion, GoLand, Rider, PhpStorm, RustRover, Fleet, and Google&apos;s Android Studio.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Developers can distribute plugins for free or monetize their tools with paid subscription licenses. JetBrains provides full automated billing, licensing servers, VAT compliance, and analytics through Marketplace Billing.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">Free or Paid</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">Gradle Plugin</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">Kotlin & Java</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">Marketplace Billing</Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600 dark:text-purple-400">All JetBrains IDEs</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official developer links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-600 group/btn" asChild>
                            <a href="https://plugins.jetbrains.com/" target="_blank" rel="noreferrer">
                                JetBrains Marketplace Home
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-600 group/btn" asChild>
                            <a href="https://plugins.jetbrains.com/docs/intellij/welcome.html" target="_blank" rel="noreferrer">
                                IntelliJ Platform SDK Docs
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-purple-500 hover:text-purple-600 group/btn" asChild>
                            <a href="https://plugins.jetbrains.com/author/me" target="_blank" rel="noreferrer">
                                Vendor & Author Portal
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-purple-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            Publishing, Monetization & Build Automation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Free Publishing & Built-in Commercialization</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Publishing open-source or free plugins is completely free. Developers wishing to sell commercial plugins can use JetBrains Marketplace Billing (JetBrains takes a 15% commission fee, handling payment processing, billing, tax handling, and customer license generation).
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Account Models</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Free Plugins:</strong> $0 registration and hosting fee.
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Paid Plugins:</strong> 85% developer revenue share (15% marketplace commission, covering payment fees and license infrastructure).
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Publish to JetBrains Marketplace</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Configure Gradle IntelliJ Platform Plugin</p>
                                        <p className="text-sm text-muted-foreground">Add the modern IntelliJ Platform plugin to your <code>build.gradle.kts</code>:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">plugins &#123;&#10;  id(&quot;org.jetbrains.intellij.platform&quot;) version &quot;2.0.0&quot;&#10;&#125;</pre>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Define plugin.xml Descriptor</p>
                                        <p className="text-sm text-muted-foreground">Specify your plugin ID, name, version, vendor, description, change notes, and supported product compatibility ranges (e.g. <code>since-build</code> and <code>until-build</code>).</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Build and Verify the Plugin</p>
                                        <p className="text-sm text-muted-foreground">Run the verification task to ensure your code is compatible with target IDE versions and has no API violations:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">./gradlew verifyPlugin&#10;./gradlew buildPlugin</pre>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Publish via Token or Web Portal</p>
                                        <p className="text-sm text-muted-foreground">Generate a Permanent Token at <code>plugins.jetbrains.com</code> and publish directly from Gradle or upload the generated ZIP artifact in the vendor dashboard:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">./gradlew publishPlugin --token=&quot;your_marketplace_token&quot;</pre>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported JetBrains Ecosystem Products</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                <div className="p-3 border rounded-lg bg-card">
                                    <div className="font-medium text-sm text-purple-600 dark:text-purple-400">IntelliJ IDEA</div>
                                    <p className="text-xs text-muted-foreground mt-0.5">Java, Kotlin, Scala, Groovy & Enterprise Development.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <div className="font-medium text-sm text-purple-600 dark:text-purple-400">PyCharm & WebStorm</div>
                                    <p className="text-xs text-muted-foreground mt-0.5">Python, Data Science, JavaScript, TypeScript, React & Vue.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <div className="font-medium text-sm text-purple-600 dark:text-purple-400">Android Studio</div>
                                    <p className="text-xs text-muted-foreground mt-0.5">Official Google IDE for Android and Jetpack Compose.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <div className="font-medium text-sm text-purple-600 dark:text-purple-400">Rider & CLion</div>
                                    <p className="text-xs text-muted-foreground mt-0.5">.NET, C#, Unity, Unreal Engine, C and modern C++.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <div className="font-medium text-sm text-purple-600 dark:text-purple-400">GoLand & PhpStorm</div>
                                    <p className="text-xs text-muted-foreground mt-0.5">Go (Golang), PHP, Laravel, WordPress, and database tools.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <div className="font-medium text-sm text-purple-600 dark:text-purple-400">RustRover & Fleet</div>
                                    <p className="text-xs text-muted-foreground mt-0.5">Dedicated Rust IDE and next-generation distributed editor.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
