import { PlatformLogo } from '@/components/platform-icons';
import { FDroidWizard } from './fdroid-wizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, ExternalLink } from 'lucide-react';

export default function FDroidPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <PlatformLogo platformName="F-Droid" className="h-10 w-10" />
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
            F-Droid
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Generate metadata for F-Droid repositories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-none bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
              <CardHeader>
                  <CardTitle className="text-blue-500">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                      F-Droid is an installable catalogue of FOSS (Free and Open Source Software) applications for the Android platform. The client makes it easy to browse, install, and keep track of updates on your device.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Free</Badge>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">FOSS</Badge>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Android</Badge>
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
                  <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://f-droid.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Official Website</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                  <Button variant="outline" className="w-full justify-between hover:border-blue-500 hover:text-blue-500 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://f-droid.org/docs/Submitting_to_F-Droid_Quick_Start_Guide/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Quick Start Guide</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
              </CardContent>
          </Card>
      </div>

      <FDroidWizard />
    </div>
  );
}
