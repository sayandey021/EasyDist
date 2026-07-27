
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
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CodeBlock from '@/components/code-block';
import { Textarea } from '@/components/ui/textarea';
import { saveHistoryItem } from '@/lib/history';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, name: 'About' },
  { id: 2, name: 'Derivation Details' },
  { id: 3, name: 'Generate Derivation' },
];

const formSchema = z.object({
  pname: z.string().min(1, 'Package name is required.'),
  version: z.string().min(1, 'Version is required.'),
  srcUrl: z.string().url('Source URL must be a valid URL.'),
  srcSha256: z.string().regex(/^[a-z0-9]{52}$/, 'Must be a 52-character SHA256 hash in Nix format.'),
  description: z.string().min(1, 'Description is required.'),
  homepage: z.string().url('Homepage must be a valid URL.'),
  license: z.string().min(1, 'License is required (e.g. "licenses.mit").'),
  iconPath: z.string().optional(),
  buildInputs: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function NixWizard() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pname: '',
      version: '',
      srcUrl: '',
      srcSha256: '',
      description: '',
      homepage: '',
      license: 'lib.licenses.mit',
      iconPath: '',
      buildInputs: '',
    },
    mode: 'onChange',
  });


  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'Nix',
      packageName: data.pname,
      packageVersion: data.version,
    });
    setStep(3);
  };

  const generateDerivation = (data: FormData) => {
    return `{ lib, stdenv, fetchurl }:

stdenv.mkDerivation rec {
  pname = "${data.pname}";
  version = "${data.version}";

  src = fetchurl {
    url = "${data.srcUrl.replace(data.version, `\${version}`)}";
    sha256 = "${data.srcSha256}";
  };
${data.buildInputs ? `
  buildInputs = [ ${data.buildInputs} ];
` : ''}
  meta = with lib; {
    description = "${data.description}";
    homepage = "${data.homepage}";
    license = ${data.license};
    # maintainers = [ maintainers.your-name ];
    # platforms = platforms.all;
  };
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
  }


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">About Nix</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nix is a powerful, purely functional package manager that ensures reliable and reproducible builds. It makes package management declarative and reliable, suitable for Linux and macOS.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400 space-y-1">
                      <li>Reproducible and declarative</li>
                      <li>Atomic upgrades and rollbacks</li>
                      <li>Multi-user support without root</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Software metadata (Name, Version, etc.)</li>
                      <li>Source code or binary download URL</li>
                      <li>Basic understanding of the platform</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button onClick={() => setStep(2)}>
                Start Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Package Metadata</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="pname"
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
                    <FormField
                      control={form.control}
                      name="version"
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
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
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
                      name="homepage"
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
                            <Input placeholder="lib.licenses.mit" {...field} />
                          </FormControl>
                          <FormDescription>e.g. lib.licenses.mit, lib.licenses.gpl3</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Source & Build</h3>
                  <FormField
                    control={form.control}
                    name="srcUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/user/repo/archive/v1.0.0.tar.gz" {...field} />
                        </FormControl>
                        <FormDescription>URL for the source code archive (.tar.gz, .zip, etc.). Use {'${version}'} for the version part.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="srcSha256"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source SHA256 Hash</FormLabel>
                        <FormControl>
                          <Input placeholder="0sjjj9z1c..." {...field} />
                        </FormControl>
                        <FormDescription>The base32 SHA256 hash of the source archive. Run `nix-prefetch-url --type sha256 &lt;url&gt;`.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="buildInputs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Build Inputs (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="pkgs.go, pkgs.nodejs" rows={2} {...field} />
                        </FormControl>
                        <FormDescription>Comma-separated list of build-time dependencies from nixpkgs.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="iconPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon Path (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="share/icons/hicolor/256x256/apps/myapp.png" {...field} />
                        </FormControl>
                        <FormDescription>Path to your app icon (will be installed to $out/share/icons/).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-between gap-2">
                <Button type="button" variant="ghost" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit">
                  Generate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        );
      case 3:
        const formData = form.getValues();
        const derivationContent = generateDerivation(formData);
        const filename = `default.nix`;
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated Nix Derivation</h3>
              <p className="text-sm text-muted-foreground">
                Save this as <code>{filename}</code> in a directory named after your package.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={derivationContent} language="nix" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-10 top-2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => downloadFile(derivationContent, filename)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Create a directory for your package (e.g. `pkgs/my-app`).</li>
                <li>Save the generated content as `default.nix` inside that directory.</li>
                <li>Add your new package to your `nixpkgs` overlay.</li>
                <li>You can test the build by running `nix-build` in your package directory.</li>
                <li>Consider submitting your package to the official `nixpkgs` repository.</li>
              </ol>
            </div>
          </CardContent>
        );
    }
  };

  return (
    <div className="mx-auto w-full max-w-none">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Nix Derivation Creator</CardTitle>
              <CardDescription>
                Step {step} of {steps.length}: {steps[step - 1].name}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2" title={s.name}>
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
        <div className="w-full">
          <div key={step} className="animate-in fade-in duration-300">
            {renderStepContent()}
          </div>
        </div>
        {step === 3 && (
          <CardFooter className="justify-end">
            <Button variant="ghost" onClick={() => setStep(2)}>
              <ArrowLeft /> Back to Edit
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
