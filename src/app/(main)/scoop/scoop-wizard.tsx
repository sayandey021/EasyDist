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
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { calculateSHA256 } from '@/lib/crypto';
import CodeBlock from '@/components/code-block';
import { Textarea } from '@/components/ui/textarea';
import { saveHistoryItem } from '@/lib/history';

const steps = [
  { id: 1, name: 'Upload Installer' },
  { id: 2, name: 'Manifest Details' },
  { id: 3, name: 'Generate Manifest' },
];

const formSchema = z.object({
  version: z.string().min(1, 'Version is required.'),
  description: z.string().min(1, 'Description is required.'),
  homepage: z.string().url('Must be a valid URL.'),
  license: z.string().min(1, 'License is required.'),
  url: z.string().url('Must be a valid URL.'),
  hash: z.string().min(64, 'SHA256 hash is required.'),
  architecture: z.enum(['64bit', '32bit', 'arm64']).default('64bit'),
});

type FormData = z.infer<typeof formSchema>;

export function ScoopWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isHashing, startHashing] = useTransition();
  const { toast } = useToast();
  const [appName, setAppName] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      version: '',
      description: '',
      homepage: '',
      license: 'Unknown',
      url: '',
      hash: '',
      architecture: '64bit',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      // Infer app name from filename, removing extension
      setAppName(selectedFile.name.split('.').slice(0, -1).join('.'));
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
      form.setValue('hash', hash);
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
        form.setValue('hash', hash, { shouldValidate: true });
        toast({
            title: 'Hash Calculated',
            description: 'SHA256 hash has been updated.'
        })
    });
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  
  const onSubmit = (data: FormData) => {
      saveHistoryItem({
        type: 'Scoop',
        packageName: appName,
        packageVersion: data.version,
      });
      nextStep();
  }

  const generateJson = (data: FormData) => {
    const manifest = {
        version: data.version,
        description: data.description,
        homepage: data.homepage,
        license: data.license,
        architecture: {
            [data.architecture]: {
                url: data.url,
                hash: data.hash
            }
        },
        autoupdate: {
            architecture: {
                [data.architecture]: {
                    url: `${data.url.replace(data.version, '$version')}`
                }
            }
        }
    };
    return JSON.stringify(manifest, null, 4);
  };

  const downloadJson = () => {
    const data = form.getValues();
    const jsonContent = generateJson(data);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${appName.toLowerCase()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CardContent className="flex flex-col items-center justify-center gap-6 p-10 text-center">
            <FileUp className="h-16 w-16 text-muted-foreground" />
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Upload Your Installer</h3>
              <p className="text-muted-foreground">
                Select your application's installer file (.exe, .msi, .zip) to
                calculate its SHA256 hash and infer the app name.
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
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormItem>
                        <FormLabel>App Name (Inferred)</FormLabel>
                        <Input value={appName} readOnly disabled />
                        <FormDescription>The name of your app manifest file.</FormDescription>
                    </FormItem>
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
                </div>
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A brief summary of your application." {...field} />
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
                            <Input placeholder="e.g., MIT" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                 <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Installer URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://example.com/installer.exe" {...field} />
                        </FormControl>
                        <FormDescription>The public download link for your installer.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="hash"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Installer SHA256 Hash</FormLabel>
                        <div className="flex items-center gap-2">
                            <FormControl>
                                <Input placeholder="SHA256 hash of the installer" {...field} readOnly={isHashing} />
                            </FormControl>
                            <Button type="button" variant="outline" onClick={handleHashCalculation} disabled={isHashing || !file}>
                                {isHashing ? <Loader className="animate-spin" /> : 'Recalculate'}
                            </Button>
                        </div>
                        <FormDescription>The hash was auto-calculated. You can recalculate if the file changed.</FormDescription>
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
      case 3:
        const formData = form.getValues();
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated Manifest</h3>
              <p className="text-sm text-muted-foreground">
                Save this as <code>{appName.toLowerCase()}.json</code> in your Scoop bucket repository.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={generateJson(formData)} language="json" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={downloadJson}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Commit this file to your Scoop bucket repository and create a pull request.
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
              <CardTitle>Scoop Manifest Creator</CardTitle>
              <CardDescription>
                Step {step} of {steps.length}: {steps[step - 1].name}
              </CardDescription>
            </div>
             <div className="flex items-center gap-2">
                {steps.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
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
                         {i < steps.length - 1 && <div className="h-0.5 w-8 bg-border" />}
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
