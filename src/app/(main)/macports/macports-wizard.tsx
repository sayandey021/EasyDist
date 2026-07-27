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
  ExternalLink,
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
  { id: 2, name: 'Upload Source' },
  { id: 3, name: 'Portfile Details' },
  { id: 4, name: 'Generate Portfile' },
];

const formSchema = z.object({
  portName: z
    .string()
    .min(1, 'Port Name is required.')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Must contain only letters, numbers, hyphens, and underscores.'),
  version: z.string().min(1, 'Version is required.'),
  description: z.string().min(1, 'Description is required.'),
  category: z.string().min(1, 'Category is required (e.g., sysutils).'),
  homepage: z.string().url('Must be a valid URL.'),
  urlDirectory: z.string().url('Must be a valid URL pointing to the directory of the tarball.'),
  distname: z.string().min(1, 'Distribution file name is required.'),
  sha256: z.string().min(64, 'SHA256 hash is required.'),
  fileSize: z.number().min(1, 'File size is required.'),
});

type FormData = z.infer<typeof formSchema>;

export function MacPortsWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isHashing, startHashing] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portName: '',
      version: '',
      description: '',
      category: 'sysutils',
      homepage: '',
      urlDirectory: '',
      distname: '',
      sha256: '',
      fileSize: 0,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      const fileName = selectedFile.name;
      
      const match = fileName.match(/^(.+?)-([\d.]+)\.(tar\.gz|zip|tar\.bz2|tgz)$/);
      if (match) {
        form.setValue('portName', match[1]);
        form.setValue('version', match[2]);
      } else {
        const simpleName = fileName.split('.').slice(0, -1).join('.');
        form.setValue('portName', simpleName.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      }
      form.setValue('distname', fileName);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a source tarball or zip file to continue.',
      });
      return;
    }

    startHashing(async () => {
      const hash = await calculateSHA256(file);
      form.setValue('sha256', hash);
      form.setValue('fileSize', file.size);
      setStep(2);
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
      form.setValue('fileSize', file.size, { shouldValidate: true });
      toast({
        title: 'Hash Calculated',
        description: 'SHA256 hash has been updated.',
      });
      setStep(3);
    });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'MacPorts',
      packageName: data.portName,
      packageVersion: data.version,
    });
    setStep(4);
  };

  const generatePortfile = (data: FormData) => {
    return `# -*- coding: utf-8; mode: tcl; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- vim:fenc=utf-8:ft=tcl:et:sw=4:ts=4:sts=4
PortSystem          1.0

name                ${data.portName}
version             ${data.version}
categories          ${data.category}
platforms           darwin
license             Restrictive
maintainers         nomaintainer

description         ${data.description}
long_description    ${data.description}

homepage            ${data.homepage}
master_sites        ${data.urlDirectory}

distname            ${data.distname}

checksums           rmd160  TODO_GENERATE_RMD160_IF_NEEDED \\
                    sha256  ${data.sha256} \\
                    size    ${data.fileSize}

# Uncomment if this is a pre-compiled binary app
# PortGroup           app 1.0
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
          <>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">About MacPorts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The MacPorts Project is an open-source community initiative to design an easy-to-use system for compiling, installing, and upgrading either command-line, X11 or Aqua based open-source software on the Mac operating system.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400 space-y-1">
                      <li>Compiles from source code</li>
                      <li>Tcl-based Portfiles</li>
                      <li>Manages dependencies automatically</li>
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
                <h3 className="text-xl font-semibold">Upload Source Tarball</h3>
                <p className="text-muted-foreground">
                  Select your source archive (e.g., .tar.gz, .zip) to
                  calculate its SHA256 hash and file size.
                </p>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  id="sourceFile"
                  type="file"
                  accept=".tar.gz,.zip,.tgz,.tar.bz2"
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
                    name="portName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., myapp" {...field} />
                        </FormControl>
                        <FormDescription>The unique name of the port.</FormDescription>
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., sysutils, devel, net" {...field} />
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="urlDirectory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Master Sites (URL Directory)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/downloads/"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The directory containing the distribution file.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="distname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distribution Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="myapp-1.2.3.tar.gz"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The exact filename of the archive.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="sha256"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel>Checksum & Size</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              placeholder="SHA256 hash"
                              {...field}
                              readOnly={isHashing}
                              className="flex-grow font-mono text-xs"
                            />
                          </FormControl>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Size (bytes)"
                              value={form.watch('fileSize')}
                              readOnly
                              className="w-32"
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
                          Calculated automatically from your upload.
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
      case 4:
        const formData = form.getValues();
        const portfileContent = generatePortfile(formData);
        const filename = 'Portfile';
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated Portfile</h3>
              <p className="text-sm text-muted-foreground">
                Save this as <code>{filename}</code> in your local MacPorts repository or submit a PR.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={portfileContent} language="tcl" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-10 top-2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={() => downloadFile(portfileContent, filename)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Note: MacPorts strongly recommends providing an <code>rmd160</code> checksum as well, which you may need to compute manually in your terminal.</li>
                <li>Place this <code>Portfile</code> inside the appropriate category directory of your local Portfile repository.</li>
                <li>Run <code>portlint</code> to verify the syntax.</li>
                <li>Submit a pull request to the MacPorts <a href="https://github.com/macports/macports-ports" target="_blank" rel="noopener noreferrer" className="text-primary underline">GitHub repository</a> to publish your package.</li>
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
              <CardTitle>MacPorts Portfile Creator</CardTitle>
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
