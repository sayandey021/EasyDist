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
  Loader,
  ExternalLink,
  FileUp,
} from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { calculateSHA256 } from '@/lib/crypto';
import CodeBlock from '@/components/code-block';
import { Textarea } from '@/components/ui/textarea';
import { saveHistoryItem } from '@/lib/history';

const steps = [
  { id: 1, name: 'About' },
  { id: 2, name: 'Upload App' },
  { id: 3, name: 'Cask Details' },
  { id: 4, name: 'Generate Cask' },
];

const formSchema = z.object({
  caskName: z
    .string()
    .min(1, 'Cask Name is required.')
    .regex(/^[a-z0-9-]+$/, 'Must be lowercase and contain only letters, numbers, and hyphens.'),
  appName: z.string().min(1, 'App Name is required.'),
  version: z.string().min(1, 'Version is required.'),
  description: z.string().min(1, 'Description is required.'),
  homepage: z.string().url('Must be a valid URL.'),
  url: z.string().url('Must be a valid URL.'),
  sha256: z.string().min(64, 'SHA256 hash is required.'),
  appcast: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

export function HomebrewWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isHashing, startHashing] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caskName: '',
      appName: '',
      version: '',
      description: '',
      homepage: '',
      url: '',
      sha256: '',
      appcast: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      const fileName = selectedFile.name.split('.').slice(0, -1).join('.');
      form.setValue('appName', `${fileName}.app`);
      form.setValue('caskName', fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a .dmg or .zip file to continue.',
      });
      return;
    }

    startHashing(async () => {
      const hash = await calculateSHA256(file);
      form.setValue('sha256', hash);
      setStep(3);
    });
  };

  const handleHashCalculation = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file available',
        description: 'Please go back and upload a file first.',
      });
      return;
    }
    startHashing(async () => {
      const hash = await calculateSHA256(file);
      form.setValue('sha256', hash, { shouldValidate: true });
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
      type: 'Homebrew',
      packageName: data.caskName,
      packageVersion: data.version,
    });
    nextStep();
  };

  const generateCask = (data: FormData) => {
    let cask = `cask "${data.caskName}" do
  version "${data.version}"
  sha256 "${data.sha256}"

  url "${data.url.replace(data.version, '#{version}')}"
  name "${data.appName.replace(/\.app$/, '')}"
  desc "${data.description}"
  homepage "${data.homepage}"
`;

    if (data.appcast) {
      cask += `
  livecheck do
    url "${data.appcast}"
    strategy :sparkle
  end
`;
    }

    cask += `
  app "${data.appName}"
end
`;
    return cask;
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
          <>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">About Homebrew</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Homebrew is the missing package manager for macOS (or Linux). It installs the stuff you need that Apple didn't. Homebrew Cask extends Homebrew to allow installation of large binary files, such as GUI applications like Google Chrome and Discord.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 p-4">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-sm text-orange-600 dark:text-orange-400 space-y-1">
                      <li>Installs apps via command line</li>
                      <li>Ruby-based DSL for Casks</li>
                      <li>Massive community repository</li>
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
              <Button onClick={nextStep}>
                Start Wizard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <>
            <CardContent className="flex flex-col items-center justify-center gap-6 p-10 text-center">
              <FileUp className="h-16 w-16 text-muted-foreground" />
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">Upload Your Application</h3>
                <p className="text-muted-foreground">
                  Select your application's installer file (.dmg, .zip) to
                  calculate its SHA256 hash.
                </p>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  id="installerFile"
                  type="file"
                  accept=".dmg,.zip"
                  onChange={handleFileChange}
                  disabled={isHashing}
                  className="flex-grow"
                />
                <Button onClick={handleFileUpload} disabled={!file || isHashing}>
                  {isHashing ? <Loader className="animate-spin" /> : 'Continue'}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="justify-start">
              <Button type="button" variant="ghost" onClick={prevStep}>
                <ArrowLeft /> Back
              </Button>
            </CardFooter>
          </>
        );
      case 3:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="caskName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cask Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., my-app" {...field} />
                        </FormControl>
                        <FormDescription>The unique identifier for the cask.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="appName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>App Name (.app)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., MyApp.app" {...field} />
                        </FormControl>
                        <FormDescription>The name of the application bundle.</FormDescription>
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
                          <Input placeholder="e.g., 1.2.3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Download URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/app-1.2.3.dmg"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The public download link for your installer. You can use {'#{version}'} as a placeholder.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="appcast"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appcast URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/appcast.xml"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        URL for Sparkle feed for automatic updates.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sha256"
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
                        The hash was auto-calculated. You can recalculate if the file changed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
      case 4:
        const formData = form.getValues();
        const caskContent = generateCask(formData);
        const filename = `${formData.caskName}.rb`;
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated Homebrew Cask</h3>
              <p className="text-sm text-muted-foreground">
                Save this as <code>{filename}</code> in your Homebrew tap repository.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={caskContent} language="ruby" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-10 top-2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => downloadFile(caskContent, filename)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Create or choose a <a href="https://docs.brew.sh/Taps" target="_blank" rel="noopener noreferrer" className="text-primary underline">Homebrew tap</a> (a GitHub repository).</li>
                <li>Place this <code>{filename}</code> file inside the <code>Casks</code> directory of your tap.</li>
                <li>Commit the file, push to your repository, and create a pull request if necessary.</li>
                <li>Users can then install your app with <code>brew install --cask {formData.caskName}</code> after tapping your repository.</li>
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
              <CardTitle>Homebrew Cask Creator</CardTitle>
              <CardDescription>
                Step {step} of {steps.length}: {steps[step - 1].name}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2" title={s.name}>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      step > s.id
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
        {step === 4 && (
          <CardFooter className='justify-end'>
            <Button variant="ghost" onClick={prevStep}>
              <ArrowLeft /> Back to Edit
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
