
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CodeBlock from '@/components/code-block';
import { Textarea } from '@/components/ui/textarea';
import { saveHistoryItem, getHistoryItem } from '@/lib/history';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const steps = [
  { id: 1, name: 'Package Details' },
  { id: 2, name: 'Generate PKGBUILD' },
];

const formSchema = z.object({
  pkgname: z.string().min(1, 'Package name is required.'),
  pkgver: z.string().min(1, 'Package version is required.'),
  pkgrel: z.coerce.number().int().min(1, 'Package release is required.').default(1),
  pkgdesc: z.string().min(1, 'Description is required.'),
  url: z.string().url('Homepage URL is required.'),
  license: z.string().min(1, 'License is required (e.g., "MIT").'),
  arch: z.string().min(1, 'Architecture is required.').default("('x86_64')"),
  depends: z.string().optional(),
  makedepends: z.string().optional(),
  source: z.string().url('Source URL is required.'),
  sha256sums: z.string().min(64, 'SHA256 hash is required.'),
  buildCommands: z.string().optional(),
  packageCommands: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AurWizard() {
  const [step, setStep] = useState(1);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pkgname: '',
      pkgver: '',
      pkgrel: 1,
      pkgdesc: '',
      url: '',
      license: 'MIT',
      arch: "('x86_64')",
      depends: '',
      makedepends: '',
      source: '',
      sha256sums: '',
      buildCommands: '# No build commands needed if it is a binary release',
      packageCommands: 'install -Dm755 "${pkgname}" "$pkgdir/usr/bin/${pkgname}"',
    },
    mode: 'onChange',
  });

  // Load history data if update parameter is present
  useEffect(() => {
    const updateId = searchParams.get('update');
    if (updateId) {
      const historyItem = getHistoryItem(updateId);
      if (historyItem && historyItem.formData) {
        setIsUpdateMode(true);
        const data = historyItem.formData as FormData;
        // Pre-fill form with previous data
        form.reset({
          ...data,
          pkgrel: (data.pkgrel || 1) + 1, // Increment pkgrel for update
          sha256sums: '', // Clear hash so user needs to recalculate
        });
      }
    }
  }, [searchParams, form]);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'AUR',
      packageName: data.pkgname,
      packageVersion: `${data.pkgver}-${data.pkgrel}`,
      formData: data, // Save complete form data for future updates
    });
    nextStep();
  };

  const generatePkgbuild = (data: FormData) => {
    return `# Maintainer: 
pkgname=${data.pkgname}
pkgver=${data.pkgver}
pkgrel=${data.pkgrel}
pkgdesc="${data.pkgdesc}"
arch=${data.arch}
url="${data.url}"
license=('${data.license}')
depends=(${data.depends})
makedepends=(${data.makedepends})
source=("${data.source.replace(data.pkgver, '$pkgver')}")
sha256sums=('${data.sha256sums}')

build() {
  cd "$srcdir/"
  ${data.buildCommands?.split('\n').join('\n  ') || ''}
}

package() {
  cd "$srcdir/"
  ${data.packageCommands?.split('\n').join('\n  ') || ''}
}
`;
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Core Metadata</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="pkgname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Name</FormLabel>
                          <FormControl>
                            <Input placeholder="my-awesome-app" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pkgver"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Version</FormLabel>
                            <FormControl>
                              <Input placeholder="1.0.0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pkgrel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Release</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="pkgdesc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="A short description of the package" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Homepage</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="license"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License</FormLabel>
                          <FormControl>
                            <Input placeholder="MIT" {...field} />
                          </FormControl>
                          <FormDescription>SPDX identifier.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Source & Dependencies</h3>
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/user/repo/archive/v1.0.0.tar.gz" {...field} />
                        </FormControl>
                        <FormDescription>URL for the source code archive. Use $pkgver for the version part.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sha256sums"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source SHA256 Hash</FormLabel>
                        <FormControl>
                          <Input placeholder="The SHA256 hash of the source archive" {...field} />
                        </FormControl>
                        <FormDescription>Run `updpkgsums` or `sha256sum &lt;file&gt;` to get this.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="depends"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dependencies (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 'gtk3' 'libsoup'" {...field} />
                          </FormControl>
                          <FormDescription>Space-separated list of runtime dependencies.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="makedepends"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Build Dependencies (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 'go' 'meson'" {...field} />
                          </FormControl>
                          <FormDescription>Space-separated list of build-time dependencies.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="buildCommands"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Build Commands</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="meson setup --prefix=/usr build..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>The commands needed to build your application inside the build() function.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="packageCommands"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Package Commands</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="install -Dm755 'my-app' '$pkgdir/usr/bin/my-app'"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>The commands needed to install files into the package() function.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button type="submit">
                  Generate <ArrowRight />
                </Button>
              </CardFooter>
            </form>
          </Form>
        );
      case 2: {
        const formData = form.getValues();
        const pkgbuildContent = generatePkgbuild(formData);
        const filename = `PKGBUILD`;
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated PKGBUILD</h3>
              <p className="text-sm text-muted-foreground">
                Save this as <code>{filename}</code> in a new directory.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={pkgbuildContent} language="bash" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => downloadFile(pkgbuildContent, filename)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Create a new Git repository for your package.</li>
                <li>Save the generated content as `PKGBUILD` inside that repository.</li>
                <li>You may need to add a `.SRCINFO` file by running `makepkg --printsrcinfo &gt; .SRCINFO`.</li>
                <li>Add, commit, and push the files to your Git repository (e.g., on GitHub).</li>
                <li><a href="https://aur.archlinux.org/submit" target="_blank" rel="noopener noreferrer" className="text-primary underline">Submit your package</a> to the AUR.</li>
              </ol>
            </div>
          </CardContent>
        );
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>AUR PKGBUILD Creator</CardTitle>
                {isUpdateMode && (
                  <Badge variant="secondary" className="text-xs">
                    Update Mode
                  </Badge>
                )}
              </div>
              <CardDescription>
                Step {step} of {steps.length}: {steps[step - 1].name}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step > s.id
                      ? 'bg-primary text-primary-foreground'
                      : step === s.id
                        ? 'border-2 border-primary text-primary'
                        : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="h-0.5 w-8 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <div className="min-h-[500px]">
          <div key={step} className="animate-in fade-in duration-300">
            {renderStepContent()}
          </div>
        </div>
        {step === 2 && (
          <CardFooter className="justify-end">
            <Button variant="ghost" onClick={prevStep}>
              <ArrowLeft /> Back to Edit
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
