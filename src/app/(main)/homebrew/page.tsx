import { PlatformLogo } from '@/components/platform-icons';
import { HomebrewWizard } from './homebrew-wizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, ExternalLink } from 'lucide-react';

export default function HomebrewPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <PlatformLogo platformName="Homebrew" className="h-10 w-10" />
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
            Homebrew
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Generate Casks for Homebrew on macOS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-none bg-orange-500/5 hover:bg-orange-500/10 transition-colors duration-300">
              <CardHeader>
                  <CardTitle className="text-orange-500">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                      Homebrew is a free and open-source software package management system that simplifies the installation of software on Apple's macOS operating system and Linux. Homebrew Cask extends Homebrew to allow the installation of large binary files, such as GUI macOS applications like Google Chrome or Discord.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Free</Badge>
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">FOSS</Badge>
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">macOS</Badge>
                  </div>
              </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                      Resources
                  </CardTitle>
                  <CardDescription>Useful links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-500 group/btn" asChild>
                      <a href="https://brew.sh/" target="_blank" rel="noreferrer">
                          Official Website
                          <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                      </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-500 group/btn" asChild>
                      <a href="https://docs.brew.sh/Adding-Software-to-Homebrew" target="_blank" rel="noreferrer">
                          Publishing Guide
                          <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                      </a>
                  </Button>
              </CardContent>
          </Card>
      </div>

      <HomebrewWizard />
    </div>
  );
}
