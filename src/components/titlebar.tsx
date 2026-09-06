'use client';

import React, { memo, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';
import {
  Minus,
  Square,
  Copy,
  X,
  Sun,
  Moon,
  Home,
  History,
  Settings as SettingsIcon,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlatformLogos } from '@/components/platform-icons';
import packageInfo from '../../package.json';

// Platform definitions for breadcrumbs
export interface PlatformItem {
  id: string;
  name: string;
  category: string;
  href: string;
  logo?: string;
}

export const ALL_PLATFORMS: PlatformItem[] = [
  // Core
  { id: 'dashboard', name: 'Dashboard', category: 'Core', href: '/' },
  { id: 'history', name: 'History', category: 'Core', href: '/history' },
  { id: 'settings', name: 'Settings', category: 'Core', href: '/settings' },

  // Windows
  { id: 'chocolatey', name: 'Chocolatey', category: 'Windows', href: '/chocolatey', logo: PlatformLogos['Chocolatey'] },
  { id: 'scoop', name: 'Scoop', category: 'Windows', href: '/scoop', logo: PlatformLogos['Scoop'] },
  { id: 'winget', name: 'WinGet', category: 'Windows', href: '/winget', logo: PlatformLogos['WinGet'] },

  // macOS
  { id: 'homebrew', name: 'Homebrew', category: 'macOS', href: '/homebrew', logo: PlatformLogos['Homebrew'] },
  { id: 'macports', name: 'MacPorts', category: 'macOS', href: '/macports', logo: PlatformLogos['MacPorts'] },

  // Linux
  { id: 'aur', name: 'AUR', category: 'Linux', href: '/aur', logo: PlatformLogos['AUR'] },
  { id: 'copr', name: 'Copr', category: 'Linux', href: '/copr', logo: PlatformLogos['Copr'] },
  { id: 'flathub', name: 'Flathub', category: 'Linux', href: '/flathub', logo: PlatformLogos['Flathub'] },
  { id: 'nix', name: 'Nix', category: 'Linux', href: '/nix', logo: PlatformLogos['Nix'] },
  { id: 'obs', name: 'Open Build Service', category: 'Linux', href: '/obs', logo: PlatformLogos['OBS'] },
  { id: 'snap', name: 'Snap', category: 'Linux', href: '/snap', logo: PlatformLogos['Snap'] },

  // Android
  { id: 'belberi', name: 'Belberi', category: 'Android', href: '/belberi', logo: PlatformLogos['Belberi'] },
  { id: 'fdroid', name: 'F-Droid', category: 'Android', href: '/fdroid', logo: PlatformLogos['F-Droid'] },
  { id: 'izzyondroid', name: 'IzzyOnDroid', category: 'Android', href: '/izzyondroid', logo: PlatformLogos['IzzyOnDroid'] },
  { id: 'obtainium', name: 'Obtainium', category: 'Android', href: '/obtainium', logo: PlatformLogos['Obtainium'] },
  { id: 'openapk', name: 'OpenAPK', category: 'Android', href: '/openapk', logo: PlatformLogos['OpenAPK'] },

  // Commercial App Stores
  { id: 'altstore', name: 'AltStore PAL', category: 'Commercial', href: '/altstore', logo: PlatformLogos['AltStore'] },
  { id: 'amazon-appstore', name: 'Amazon Appstore', category: 'Commercial', href: '/amazon-appstore', logo: PlatformLogos['Amazon Appstore'] },
  { id: 'apk-mirror', name: 'APKMirror', category: 'Commercial', href: '/apk-mirror', logo: PlatformLogos['APKMirror'] },
  { id: 'apkpure', name: 'APKPure', category: 'Commercial', href: '/apkpure', logo: PlatformLogos['APKPure'] },
  { id: 'apple-store', name: 'Apple App Store', category: 'Commercial', href: '/apple-store', logo: PlatformLogos['Apple App Store'] },
  { id: 'aptoide', name: 'Aptoide', category: 'Commercial', href: '/aptoide', logo: PlatformLogos['Aptoide'] },
  { id: 'galaxy-store', name: 'Galaxy Store', category: 'Commercial', href: '/galaxy-store', logo: PlatformLogos['Samsung Galaxy Store'] },
  { id: 'huawei-store', name: 'Huawei AppGallery', category: 'Commercial', href: '/huawei-store', logo: PlatformLogos['Huawei AppGallery'] },
  { id: 'malavida', name: 'Malavida', category: 'Commercial', href: '/malavida', logo: PlatformLogos['Malavida'] },
  { id: 'microsoft-store', name: 'Microsoft Store', category: 'Commercial', href: '/microsoft-store', logo: PlatformLogos['Microsoft Store'] },
  { id: 'oppo-market', name: 'OPPO App Market', category: 'Commercial', href: '/oppo-market', logo: PlatformLogos['OPPO App Market'] },
  { id: 'play-store', name: 'Google Play Store', category: 'Commercial', href: '/play-store', logo: PlatformLogos['Google Play Store'] },
  { id: 'softonic', name: 'Softonic', category: 'Commercial', href: '/softonic', logo: PlatformLogos['Softonic'] },
  { id: 'uptodown', name: 'Uptodown', category: 'Commercial', href: '/uptodown', logo: PlatformLogos['Uptodown'] },
  { id: 'vivo-appstore', name: 'Vivo V-Appstore', category: 'Commercial', href: '/vivo-appstore', logo: PlatformLogos['Vivo V-Appstore'] },
  { id: 'xiaomi-getapps', name: 'Xiaomi GetApps', category: 'Commercial', href: '/xiaomi-getapps', logo: PlatformLogos['Xiaomi GetApps'] },

  // Gaming
  { id: 'epic-games', name: 'Epic Games Store', category: 'Gaming', href: '/epic-games', logo: PlatformLogos['Epic Games Store'] },
  { id: 'gamejolt', name: 'Game Jolt', category: 'Gaming', href: '/gamejolt', logo: PlatformLogos['Game Jolt'] },
  { id: 'gog', name: 'GOG.com', category: 'Gaming', href: '/gog', logo: PlatformLogos['GOG.com'] },
  { id: 'itch-io', name: 'Itch.io', category: 'Gaming', href: '/itch-io', logo: PlatformLogos['Itch.io'] },
  { id: 'newgrounds', name: 'Newgrounds', category: 'Gaming', href: '/newgrounds', logo: PlatformLogos['Newgrounds'] },
  { id: 'nintendo', name: 'Nintendo', category: 'Gaming', href: '/nintendo', logo: PlatformLogos['Nintendo'] },
  { id: 'playstation', name: 'PlayStation', category: 'Gaming', href: '/playstation', logo: PlatformLogos['PlayStation'] },
  { id: 'poki', name: 'Poki', category: 'Gaming', href: '/poki', logo: PlatformLogos['Poki'] },
  { id: 'steam', name: 'Steam', category: 'Gaming', href: '/steam', logo: PlatformLogos['Steam'] },
  { id: 'xbox', name: 'Xbox', category: 'Gaming', href: '/xbox', logo: PlatformLogos['Xbox'] },

  // Source Control
  { id: 'bitbucket', name: 'Bitbucket', category: 'Source Control', href: '/bitbucket', logo: PlatformLogos['Bitbucket'] },
  { id: 'codeberg', name: 'Codeberg', category: 'Source Control', href: '/codeberg', logo: PlatformLogos['Codeberg'] },
  { id: 'gitea', name: 'Gitea', category: 'Source Control', href: '/gitea', logo: PlatformLogos['Gitea'] },
  { id: 'github', name: 'GitHub', category: 'Source Control', href: '/github', logo: PlatformLogos['GitHub'] },
  { id: 'gitlab', name: 'GitLab', category: 'Source Control', href: '/gitlab', logo: PlatformLogos['GitLab'] },
  { id: 'huggingface', name: 'Hugging Face', category: 'Source Control', href: '/huggingface', logo: PlatformLogos['Hugging Face'] },
  { id: 'launchpad', name: 'Launchpad', category: 'Source Control', href: '/launchpad', logo: PlatformLogos['Launchpad'] },
  { id: 'sourceforge', name: 'SourceForge', category: 'Source Control', href: '/sourceforge', logo: PlatformLogos['SourceForge'] },

  // Language Managers
  { id: 'bun', name: 'Bun', category: 'Language Managers', href: '/bun', logo: PlatformLogos['Bun'] },
  { id: 'cargo', name: 'Cargo', category: 'Language Managers', href: '/cargo', logo: PlatformLogos['Cargo'] },
  { id: 'dockerhub', name: 'Docker Hub', category: 'Language Managers', href: '/dockerhub', logo: PlatformLogos['Docker Hub'] },
  { id: 'go', name: 'Go', category: 'Language Managers', href: '/go', logo: PlatformLogos['Go'] },
  { id: 'npm', name: 'npm', category: 'Language Managers', href: '/npm', logo: PlatformLogos['npm'] },
  { id: 'nuget', name: 'NuGet', category: 'Language Managers', href: '/nuget', logo: PlatformLogos['NuGet'] },
  { id: 'packagist', name: 'Packagist', category: 'Language Managers', href: '/packagist', logo: PlatformLogos['Packagist'] },
  { id: 'pip', name: 'Pip', category: 'Language Managers', href: '/pip', logo: PlatformLogos['Pip'] },
  { id: 'vcpkg', name: 'vcpkg', category: 'Language Managers', href: '/vcpkg', logo: PlatformLogos['vcpkg'] },

  // Browser Extensions
  { id: 'chrome-web-store', name: 'Chrome Web Store', category: 'Browser Extensions', href: '/chrome-web-store', logo: PlatformLogos['Chrome Web Store'] },
  { id: 'firefox-addons', name: 'Firefox Add-ons', category: 'Browser Extensions', href: '/firefox-addons', logo: PlatformLogos['Firefox Add-ons'] },
  { id: 'edge-addons', name: 'Edge Add-ons', category: 'Browser Extensions', href: '/edge-addons', logo: PlatformLogos['Edge Add-ons'] },
  { id: 'opera-addons', name: 'Opera Add-ons', category: 'Browser Extensions', href: '/opera-addons', logo: PlatformLogos['Opera Add-ons'] },
  { id: 'safari-extensions', name: 'Safari Web Extensions', category: 'Browser Extensions', href: '/safari-extensions', logo: PlatformLogos['Safari Web Extensions'] },
  { id: 'greasy-fork', name: 'Greasy Fork', category: 'Browser Extensions', href: '/greasy-fork', logo: PlatformLogos['Greasy Fork'] },
  { id: 'openuserjs', name: 'OpenUserJS', category: 'Browser Extensions', href: '/openuserjs', logo: PlatformLogos['OpenUserJS'] },
  { id: 'naver-whale', name: 'Naver Whale', category: 'Browser Extensions', href: '/naver-whale', logo: PlatformLogos['Naver Whale'] },

  // Other (IDE & Developer Ecosystems)
  { id: 'vscode-marketplace', name: 'VS Code Marketplace', category: 'Other', href: '/vscode-marketplace', logo: PlatformLogos['VS Code Marketplace'] },
  { id: 'jetbrains-marketplace', name: 'JetBrains Marketplace', category: 'Other', href: '/jetbrains-marketplace', logo: PlatformLogos['JetBrains Marketplace'] },
  { id: 'open-vsx', name: 'Open VSX Registry', category: 'Other', href: '/open-vsx', logo: PlatformLogos['Open VSX Registry'] },
  { id: 'package-control', name: 'Package Control', category: 'Other', href: '/package-control', logo: PlatformLogos['Package Control'] },
  { id: 'eclipse-marketplace', name: 'Eclipse Marketplace', category: 'Other', href: '/eclipse-marketplace', logo: PlatformLogos['Eclipse Marketplace'] },
  { id: 'obsidian-plugins', name: 'Obsidian Plugins', category: 'Other', href: '/obsidian-plugins', logo: PlatformLogos['Obsidian Plugins'] },
  { id: 'raycast-store', name: 'Raycast Store', category: 'Other', href: '/raycast-store', logo: PlatformLogos['Raycast Store'] },
  { id: 'figma-community', name: 'Figma Community', category: 'Other', href: '/figma-community', logo: PlatformLogos['Figma Community'] },
];

// Helper to look up active route details
function getActiveRouteInfo(pathname: string): { title: string; category?: string; logo?: string } {
  if (!pathname || pathname === '/') {
    return { title: 'Dashboard', category: 'Core' };
  }

  const cleanPath = pathname.replace(/^\//, '').split('/')[0];
  const matched = ALL_PLATFORMS.find(p => p.href === `/${cleanPath}` || p.id === cleanPath);

  if (matched) {
    return {
      title: matched.name,
      category: matched.category,
      logo: matched.logo,
    };
  }

  const formatted = cleanPath
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return { title: formatted };
}

import {
  isDesktopApp,
  minimizeWindow,
  toggleMaximizeWindow,
  isWindowMaximized,
  onWindowMaximizedChange,
  requestWindowClose,
} from '@/lib/desktop';

export function TitleBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const routeInfo = useMemo(() => getActiveRouteInfo(pathname), [pathname]);

  // Handle client mount
  useEffect(() => {
    setMounted(true);
    setIsDesktop(isDesktopApp());

    const unsubscribe = onWindowMaximizedChange((maximized: boolean) => {
      setIsMaximized(maximized);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Window control actions
  const handleMinimize = () => {
    minimizeWindow();
  };

  const handleMaximize = () => {
    toggleMaximizeWindow();
  };

  const handleClose = () => {
    requestWindowClose();
  };

  // Double click drag area to toggle maximize
  const handleTitleBarDoubleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.app-no-drag')) return;
    handleMaximize();
  };

  // Smooth view transition theme toggle
  const handleThemeToggle = (e: React.MouseEvent) => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 450,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <header
      data-tauri-drag-region
      onDoubleClick={handleTitleBarDoubleClick}
      className={cn(
        'h-10 w-full flex items-center justify-between px-2.5 select-none text-xs font-medium',
        'border-b border-border/40 bg-background/90 dark:bg-card/85 backdrop-blur-2xl text-foreground z-50 shrink-0 app-drag-region relative',
        'transition-colors duration-200'
      )}
    >
      {/* Subtle dynamic accent top glow line */}
      <div
        className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/35 to-transparent pointer-events-none opacity-80"
        aria-hidden="true"
      />

      {/* Left: App Brand & Dynamic Breadcrumbs */}
      <div className="flex items-center gap-2 min-w-0 pr-2">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          prefetch={true}
          className={cn(
            'flex items-center gap-2 px-2 py-1 rounded-md',
            'hover:bg-accent/80 hover:text-accent-foreground text-foreground',
            'transition-all duration-150 app-no-drag group shrink-0'
          )}
          title="EasyDist Dashboard"
        >
          <div className="relative flex items-center justify-center">
            <Image
              src="/icon.png"
              alt="EasyDist"
              width={18}
              height={18}
              className="rounded-sm object-contain group-hover:scale-110 transition-transform duration-200 drop-shadow-sm"
            />
          </div>
          <span className="font-semibold tracking-tight text-xs text-foreground group-hover:text-primary transition-colors">
            EasyDist
          </span>
        </Link>

        {/* Version Badge */}
        <span className="hidden sm:inline-flex items-center text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
          v{packageInfo.version}
        </span>

        {/* Breadcrumb Separator & Active Page */}
        <div className="flex items-center gap-1.5 min-w-0 text-muted-foreground/70 pl-0.5">
          <ChevronRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />
          <div className="flex items-center gap-1.5 min-w-0">
            {routeInfo.logo ? (
              <Image
                src={routeInfo.logo}
                alt=""
                width={14}
                height={14}
                className="rounded-sm object-contain shrink-0"
              />
            ) : routeInfo.title === 'History' ? (
              <History className="h-3.5 w-3.5 text-primary shrink-0" />
            ) : routeInfo.title === 'Settings' ? (
              <SettingsIcon className="h-3.5 w-3.5 text-primary shrink-0" />
            ) : (
              <Home className="h-3.5 w-3.5 text-primary shrink-0" />
            )}
            <span className="text-[11px] font-semibold text-foreground/90 truncate">
              {routeInfo.title}
            </span>
            {routeInfo.category && routeInfo.category !== 'Core' && (
              <span className="hidden lg:inline-flex text-[9px] font-medium px-1.5 py-0.2 rounded bg-muted/60 text-muted-foreground/80 border border-border/30">
                {routeInfo.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Center: Draggable App Space */}
      <div className="flex-1 h-full min-w-0" aria-hidden="true" />

      {/* Right: Theme Switcher & Windows 11 Window Controls */}
      <div className="flex items-center gap-1 app-no-drag shrink-0">
        {/* Theme Switcher */}
        <button
          onClick={handleThemeToggle}
          className="h-7 w-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors mr-1"
          title={mounted ? `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode` : 'Toggle Theme'}
          aria-label="Toggle Theme"
        >
          {mounted ? (
            theme === 'dark' ? (
              <Moon className="h-3.5 w-3.5 text-blue-400 hover:rotate-12 transition-transform" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-amber-500 hover:rotate-45 transition-transform" />
            )
          ) : (
            <div className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Windows 11 Fluent Window Control Buttons */}
        <div className="flex items-center -mr-2.5 h-10">
          <button
            onClick={handleMinimize}
            className={cn(
              'h-10 w-11 inline-flex items-center justify-center',
              'text-muted-foreground hover:bg-muted/80 dark:hover:bg-white/10 active:bg-muted/90 dark:active:bg-white/15 hover:text-foreground',
              'transition-colors duration-100'
            )}
            title="Minimize"
            aria-label="Minimize Window"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleMaximize}
            className={cn(
              'h-10 w-11 inline-flex items-center justify-center',
              'text-muted-foreground hover:bg-muted/80 dark:hover:bg-white/10 active:bg-muted/90 dark:active:bg-white/15 hover:text-foreground',
              'transition-colors duration-100'
            )}
            title={isMaximized ? 'Restore Down' : 'Maximize'}
            aria-label="Maximize Window"
          >
            {isMaximized ? (
              <Copy className="h-3 w-3 rotate-180" />
            ) : (
              <Square className="h-3 w-3" />
            )}
          </button>

          <button
            onClick={handleClose}
            className={cn(
              'h-10 w-11 inline-flex items-center justify-center',
              'text-muted-foreground hover:bg-[#c42b1c] hover:text-white active:bg-[#a82315] active:text-white',
              'transition-colors duration-100'
            )}
            title="Close"
            aria-label="Close Window"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default memo(TitleBar);

