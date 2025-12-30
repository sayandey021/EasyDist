
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HistoryItem, historyKey } from '@/lib/history';
import { useEffect, useState } from 'react';
import { Trash, RefreshCw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';

const typeToPath: Record<HistoryItem['type'], string> = {
  WinGet: '/winget',
  Chocolatey: '/chocolatey',
  Scoop: '/scoop',
  'F-Droid': '/fdroid',
  Homebrew: '/homebrew',
  Flathub: '/flathub',
  Snap: '/snap',
  Nix: '/nix',
  AUR: '/aur',
};

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedHistory = localStorage.getItem(historyKey);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setHistory(
            parsedHistory.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
          );
        }
      } catch (error) {
        console.error('Failed to parse history from localStorage', error);
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem(historyKey);
    setHistory([]);
  };

  const getBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'winget':
        return 'default';
      case 'chocolatey':
        return 'secondary';
      case 'scoop':
        return 'outline';
      case 'homebrew':
        return 'default';
      case 'f-droid':
        return 'destructive';
      case 'flathub':
        return 'secondary';
      case 'snap':
        return 'default';
      case 'nix':
        return 'outline';
      case 'aur':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle>Generation History</CardTitle>
          <CardDescription>
            A log of all the packages you have generated. Click "Update" to create a new version.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name / ID</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant={getBadgeVariant(item.type)}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.packageName}
                    </TableCell>
                    <TableCell>{item.packageVersion}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`${typeToPath[item.type]}?update=${item.id}`}>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Update
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              <p>No history yet.</p>
              <p className="text-sm">
                Generated packages will appear here.
              </p>
            </div>
          )}
        </CardContent>
        {history.length > 0 && (
          <CardFooter className="justify-end border-t pt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Clear History
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your generation history. This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearHistory}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
