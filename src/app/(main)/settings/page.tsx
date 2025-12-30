'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Save, Palette, Moon, Sun, Info, Coffee, Heart, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { settingsKey, settingsSchema, SettingsData } from '@/lib/settings';

const themes = [
  { name: 'zinc', color: 'hsl(240 5.9% 10%)' },
  { name: 'slate', color: 'hsl(215.4 16.3% 46.9%)' },
  { name: 'stone', color: 'hsl(25 5.3% 44.7%)' },
  { name: 'gray', color: 'hsl(220 8.9% 46.1%)' },
  { name: 'neutral', color: 'hsl(0 0% 45.1%)' },
  { name: 'red', color: 'hsl(0 72.2% 50.6%)' },
  { name: 'rose', color: 'hsl(346.8 77.2% 49.8%)' },
  { name: 'orange', color: 'hsl(24.6 95% 53.1%)' },
  { name: 'green', color: 'hsl(142.1 76.2% 36.3%)' },
  { name: 'blue', color: 'hsl(207 100% 42%)' },
  { name: 'yellow', color: 'hsl(47.9 95.8% 53.1%)' },
  { name: 'violet', color: 'hsl(262.1 83.3% 57.8%)' },
];

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme, accentTheme, setAccentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Load the exit confirmation setting from Electron store
    if (typeof window !== 'undefined' && (window as any).require) {
      try {
        const { ipcRenderer } = (window as any).require('electron');
        ipcRenderer.invoke('get-skip-close-confirmation').then((skipConfirmation: boolean) => {
          setShowExitConfirmation(!skipConfirmation);
        });
      } catch (error) {
        console.error('Failed to load exit confirmation setting:', error);
      }
    }
  }, []);


  const form = useForm<SettingsData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      authorName: '',
      authorEmail: '',
      publisher: '',
    },
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem(settingsKey);
    if (savedSettings) {
      try {
        const parsedSettings = settingsSchema.parse(JSON.parse(savedSettings));
        form.reset(parsedSettings);
      } catch (error) {
        console.error('Failed to parse settings from localStorage', error);
      }
    }
  }, [form]);


  const onSubmit = (data: SettingsData) => {
    try {
      localStorage.setItem(settingsKey, JSON.stringify(data));
      toast({
        title: 'Settings Saved',
        description: 'Your preferences have been updated.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save settings.',
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your application preferences. These values will be used to
            pre-fill fields in the package wizards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your full name or the name of the package author.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="authorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Email</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., you@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your email address (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publisher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publisher / Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., My Awesome Inc." {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of your company or organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Save Preferences
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mode</label>
              {mounted && (
                <div className="flex items-center gap-2">
                  <Button
                    variant={theme === 'light' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="w-full"
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="w-full"
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <label className="text-sm font-medium">Accent Color</label>
              </div>
              {mounted && (
                <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-12">
                  <TooltipProvider>
                    {themes.map((themeOption) => (
                      <Tooltip key={themeOption.name}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setAccentTheme(themeOption.name)}
                            className={cn(
                              'flex h-8 w-8 items-center justify-center rounded-full border-2 text-white',
                              accentTheme === themeOption.name
                                ? 'border-foreground'
                                : 'border-transparent'
                            )}
                            style={{ backgroundColor: themeOption.color }}
                          >
                            {accentTheme === themeOption.name && (
                              <Check className="h-5 w-5" />
                            )}
                            <span className="sr-only">{themeOption.name}</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="capitalize">{themeOption.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Behavior Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Behavior</CardTitle>
          <CardDescription>
            Configure application behavior and confirmations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Show exit confirmation</label>
                <p className="text-xs text-muted-foreground">
                  Ask for confirmation before closing the application
                </p>
              </div>
              {mounted && (
                <Switch
                  checked={showExitConfirmation}
                  onCheckedChange={async (checked) => {
                    // Check if we're in Electron environment
                    if (typeof window !== 'undefined' && (window as any).require) {
                      try {
                        const { ipcRenderer } = (window as any).require('electron');
                        // skipCloseConfirmation is the opposite of showExitConfirmation
                        await ipcRenderer.invoke('set-skip-close-confirmation', !checked);
                        setShowExitConfirmation(checked);
                        toast({
                          title: 'Setting Updated',
                          description: checked
                            ? 'Exit confirmation dialog is now enabled.'
                            : 'Exit confirmation dialog is now disabled.',
                        });
                      } catch (error) {
                        console.error('Failed to update setting:', error);
                        toast({
                          variant: 'destructive',
                          title: 'Error',
                          description: 'Failed to update setting. This feature only works in the desktop app.',
                        });
                      }
                    } else {
                      toast({
                        variant: 'destructive',
                        title: 'Not Available',
                        description: 'This setting is only available in the desktop application.',
                      });
                    }
                  }}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About
          </CardTitle>
          <CardDescription>
            Information about this application and its developer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">App Name</span>
              <span className="text-sm font-medium">EasyDist</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">1.0.5</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Developer</span>
              <span className="text-sm font-medium">Saayan</span>
            </div>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-pink-500/10 via-red-500/10 to-orange-500/10 p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-5 w-5 text-red-500" />
              <h4 className="font-semibold">Support Development</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              If you find EasyDist helpful, consider supporting the development with a coffee! Your support helps keep this project alive and growing.
            </p>
            <Button
              asChild
              className="w-full bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white"
            >
              <a
                href="https://ko-fi.com/sayandey"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="mr-2 h-4 w-4" />
                Buy me a Ko-fi
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>Made with ❤️ by Saayan</p>
            <p className="mt-1">© 2024 Saayan. All rights reserved.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
