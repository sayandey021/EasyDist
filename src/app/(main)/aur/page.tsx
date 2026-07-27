import { PlatformLogo } from '@/components/platform-icons';
import { AurWizard } from './aur-wizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, ExternalLink } from 'lucide-react';
import { Suspense } from 'react';
import { Loader } from 'lucide-react';

function AurWizardFallback() {
  return (
    <div className="flex h-96 items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function AurPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <PlatformLogo platformName="AUR" className="h-10 w-10" />
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
            AUR
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Generate PKGBUILDs for the Arch User Repository.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-none bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
              <CardHeader>
                  <CardTitle className="text-blue-500">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                      The Arch User Repository (AUR) is a community-driven repository for Arch Linux users. It contains package descriptions (PKGBUILDs) that allow you to compile a package from source with makepkg and then install it via pacman.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Free</Badge>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">FOSS</Badge>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Arch Linux</Badge>
                  </div>
              </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      Resources
                  </CardTitle>
                  <CardDescription>Useful links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-500 group/btn" asChild>
                      <a href="https://aur.archlinux.org/" target="_blank" rel="noreferrer">
                          AUR Home
                          <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                      </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-500 group/btn" asChild>
                      <a href="https://wiki.archlinux.org/title/Arch_User_Repository" target="_blank" rel="noreferrer">
                          AUR Wiki
                          <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                      </a>
                  </Button>
              </CardContent>
          </Card>
      </div>

      <Suspense fallback={<AurWizardFallback />}>
        <AurWizard />
      </Suspense>
    </div>
  );
}
