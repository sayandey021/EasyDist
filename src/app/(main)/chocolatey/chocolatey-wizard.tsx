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
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FileUp,
  Loader,
} from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { calculateSHA256 } from '@/lib/crypto';
import CodeBlock from '@/components/code-block';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import type { SettingsData } from '@/lib/settings';
import { settingsKey } from '@/lib/settings';
import { saveHistoryItem } from '@/lib/history';

const steps = [
  { id: 1, name: 'Upload Installer' },
  { id: 2, name: 'Package Details' },
  { id: 3, name: 'Generate Files' },
];

const formSchema = z.object({
  packageId: z.string().min(1, 'Package ID is required.'),
  packageVersion: z.string().min(1, 'Package Version is required.'),
  authors: z.string().min(1, 'Authors are required.'),
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  projectUrl: z.string().url('Must be a valid URL.'),
  licenseUrl: z.string().url('Must be a valid URL.'),
  installerUrl: z.string().url('Must be a valid URL.'),
  installerSha256: z.string().min(64, 'SHA256 hash is required.'),
  silentArgs: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ChocolateyWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isHashing, startHashing] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageId: '',
      packageVersion: '',
      authors: '',
      title: '',
      description: '',
      projectUrl: '',
      licenseUrl: '',
      installerUrl: '',
      installerSha256: '',
      silentArgs: '/VERYSILENT /NORESTART',
    },
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem(settingsKey);
    if (savedSettings) {
      try {
        const parsedSettings: SettingsData = JSON.parse(savedSettings);
        if (parsedSettings.publisher) {
          form.setValue('authors', parsedSettings.publisher);
        } else if (parsedSettings.authorName) {
          form.setValue('authors', parsedSettings.authorName);
        }
      } catch (error) {
        console.error('Failed to parse settings for Chocolatey wizard', error);
      }
    }
  }, [form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select an installer file to continue.',
      });
      return;
    }

    startHashing(async () => {
      const hash = await calculateSHA256(file);
      form.setValue('installerSha256', hash);
      setStep(2);
    });
  };

  const handleHashCalculation = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file available',
        description: 'Please go back and upload an installer file first.',
      });
      return;
    }
    startHashing(async () => {
      const hash = await calculateSHA256(file);
      form.setValue('installerSha256', hash, { shouldValidate: true });
      toast({
        title: 'Hash Calculated',
        description: 'SHA256 hash has been updated.',
      });
    });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'Chocolatey',
      packageName: data.packageId,
      packageVersion: data.packageVersion,
    });
    nextStep();
  };

  const generateNuspec = (data: FormData) => {
    return `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>${data.packageId}</id>
    <version>${data.packageVersion}</version>
    <title>${data.title}</title>
    <authors>${data.authors}</authors>
    <projectUrl>${data.projectUrl}</projectUrl>
    <licenseUrl>${data.licenseUrl}</licenseUrl>
    <description>${data.description}</description>
    <tags>admin</tags>
  </metadata>
  <files>
    <file src="tools\\**" target="tools" />
  </files>
</package>
`;
  };

  const generateChocolateyInstall = (data: FormData) => {
    return `$ErrorActionPreference = 'Stop';
$packageName = '${data.packageId}'
$toolsDir   = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
$url        = '${data.installerUrl}'
$checksum   = '${data.installerSha256}'

$packageArgs = @{
  packageName    = $packageName
  fileType       = 'exe'
  url            = $url
  checksum       = $checksum
  checksumType   = 'sha256'
  silentArgs     = '${data.silentArgs}'
  validExitCodes = @(0)
}

Install-ChocolateyPackage @packageArgs
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
          <CardContent className="flex flex-col items-center justify-center gap-6 p-10 text-center">
            <FileUp className="h-16 w-16 text-muted-foreground" />
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Upload Your Installer</h3>
              <p className="text-muted-foreground">
                Select your application's installer file (.exe, .msi) to
                calculate its SHA256 hash.
              </p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                id="installerFile"
                type="file"
                onChange={handleFileChange}
                disabled={isHashing}
                className="flex-grow"
              />
              <Button onClick={handleFileUpload} disabled={!file || isHashing}>
                {isHashing ? <Loader className="animate-spin" /> : 'Continue'}
              </Button>
            </div>
          </CardContent>
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
                      name="packageId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package ID</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., myapp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="packageVersion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Version</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1.2.3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., My Awesome App"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="authors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Authors</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Your Name or Company"
                              {...field}
                            />
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
                          <Textarea
                            placeholder="A brief summary of your application."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="projectUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://your-app-homepage.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="licenseUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://your-app-homepage.com/license"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Installer Details</h3>
                  <FormField
                    control={form.control}
                    name="installerUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Installer URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/installer.exe"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The public download link for your installer.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="installerSha256"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Installer SHA256 Hash</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              placeholder="SHA256 hash of the installer"
                              {...field}
                              readOnly={isHashing}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleHashCalculation}
                            disabled={isHashing || !file}
                          >
                            {isHashing ? (
                              <Loader className="animate-spin" />
                            ) : (
                              'Recalculate'
                            )}
                          </Button>
                        </div>
                        <FormDescription>
                          The hash was auto-calculated. You can recalculate if
                          the file changed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="silentArgs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Silent Install Arguments</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="/VERYSILENT /NORESTART"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Arguments to pass to the installer for a silent install.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button type="button" variant="ghost" onClick={prevStep}>
                  <ArrowLeft /> Back
                </Button>
                <Button type="submit">
                  Generate <ArrowRight />
                </Button>
              </CardFooter>
            </form>
          </Form>
        );
      case 3:
        const formData = form.getValues();
        const nuspecContent = generateNuspec(formData);
        const installScriptContent = generateChocolateyInstall(formData);
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated .nuspec File</h3>
              <p className="text-sm text-muted-foreground">
                This file contains the package metadata. Save it as{' '}
                <code>{formData.packageId}.nuspec</code>.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={nuspecContent} language="xml" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => downloadFile(nuspecContent, `${formData.packageId}.nuspec`)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Generated chocolateyInstall.ps1</h3>
              <p className="text-sm text-muted-foreground">
                Place this file in a <code>tools</code> folder next to your .nuspec file.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={installScriptContent} language="powershell" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => downloadFile(installScriptContent, 'chocolateyInstall.ps1')}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                1. Create a new folder for your package.
              </p>
              <p className="text-sm text-muted-foreground">
                2. Save the <code>.nuspec</code> file in this folder.
              </p>
              <p className="text-sm text-muted-foreground">
                3. Create a sub-folder named <code>tools</code>.
              </p>
              <p className="text-sm text-muted-foreground">
                4. Save the <code>chocolateyInstall.ps1</code> file inside the <code>tools</code> folder.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Finally, run <code>choco pack</code> in the root of your package folder to create the <code>.nupkg</code> file.
              </p>
            </div>
          </CardContent>
        );
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Chocolatey Package Creator</CardTitle>
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
        <div className="min-h-[400px]">
          <div key={step} className="animate-in fade-in duration-300">
            {renderStepContent()}
          </div>
        </div>
        {step === 3 && (
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
