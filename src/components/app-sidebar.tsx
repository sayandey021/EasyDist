
'use client';

import { memo, useCallback, useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import {
  Home,
  Package,
  Smartphone,
  Wind,
  Settings,
  Moon,
  Sun,
  History,
  Bot,
  Box,
  Star,
  Code,
  ChevronDown,
  Store,
  Apple,
  Gamepad2,
  ShoppingBag,
  Monitor,
  Github,
  Gitlab,
} from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { PlatformLogos } from '@/components/platform-icons';

// Storage key for persisting category states
const STORAGE_KEY = 'sidebar-categories-state';

// Hook to persist category open states - defers localStorage read to avoid hydration mismatch
function useCategoryState(categoryId: string, defaultOpen: boolean) {
  // Always start with defaultOpen to match server render
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [hasMounted, setHasMounted] = useState(false);

  // Sync with localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const states = JSON.parse(stored);
        if (typeof states[categoryId] === 'boolean') {
          setIsOpen(states[categoryId]);
        }
      }
    } catch {
      // Ignore storage errors
    }
    setHasMounted(true);
  }, [categoryId]);

  // Save state to localStorage when it changes (only after mount)
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const states = stored ? JSON.parse(stored) : {};
        states[categoryId] = newState;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
      } catch {
        // Ignore storage errors  
      }
      return newState;
    });
  }, [categoryId]);

  return { isOpen, toggleOpen, hasMounted };
}

// Memoized menu item - supports both icon components and logo paths
const MenuItem = memo(function MenuItem({
  href,
  icon: Icon,
  logoPath,
  label,
  isActive,
}: {
  href: string;
  icon?: React.ElementType;
  logoPath?: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={{ children: label }}
        className="transition-colors duration-150"
      >
        <Link href={href} prefetch={true}>
          {logoPath ? (
            <Image
              src={logoPath}
              alt={`${label} logo`}
              width={16}
              height={16}
              className="h-4 w-4 object-contain rounded-sm"
            />
          ) : Icon ? (
            <Icon className="h-4 w-4" />
          ) : null}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

// Collapsible section - simple show/hide without animations to prevent flickering
const CollapsibleSection = memo(function CollapsibleSection({
  id,
  title,
  items,
  pathname,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  items: Array<{ href: string; icon?: React.ElementType; logoPath?: string; label: string }>;
  pathname: string;
  defaultOpen?: boolean;
}) {
  const hasActiveItem = items.some(item => pathname.startsWith(item.href));

  const { isOpen, toggleOpen } = useCategoryState(
    id,
    defaultOpen || hasActiveItem
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <button
          onClick={toggleOpen}
          className={cn(
            "flex w-full items-center justify-between p-2 text-sm font-medium rounded-md",
            "transition-colors duration-150",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            {title}
            {hasActiveItem && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground",
              isOpen ? "rotate-0" : "-rotate-90"
            )}
          />
        </button>
      </SidebarGroupLabel>

      {/* Simple show/hide - no animation to prevent flickering */}
      {isOpen && (
        <SidebarGroupContent className="ml-2 pl-2 border-l border-border/40">
          {items.map((item) => (
            <MenuItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              logoPath={item.logoPath}
              label={item.label}
              isActive={pathname.startsWith(item.href)}
            />
          ))}
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
});

// Navigation data - sorted alphabetically by label, with logo paths
const windowsItems = [
  { href: '/chocolatey', logoPath: PlatformLogos['Chocolatey'], label: 'Chocolatey' },
  { href: '/scoop', logoPath: PlatformLogos['Scoop'], label: 'Scoop' },
  { href: '/winget', logoPath: PlatformLogos['WinGet'], label: 'WinGet' },
];

const macOSItems = [
  { href: '/homebrew', logoPath: PlatformLogos['Homebrew'], label: 'Homebrew' },
  { href: '/macports', logoPath: PlatformLogos['MacPorts'], label: 'MacPorts' },
];

const linuxItems = [
  { href: '/aur', logoPath: PlatformLogos['AUR'], label: 'AUR' },
  { href: '/copr', logoPath: PlatformLogos['Copr'], label: 'Copr' },
  { href: '/flathub', logoPath: PlatformLogos['Flathub'], label: 'Flathub' },
  { href: '/nix', logoPath: PlatformLogos['Nix'], label: 'Nix' },
  { href: '/obs', logoPath: PlatformLogos['OBS'], label: 'Open Build Service' },
  { href: '/snap', logoPath: PlatformLogos['Snap'], label: 'Snap' },
];

const androidItems = [
  { href: '/belberi', logoPath: PlatformLogos['Belberi'], label: 'Belberi' },
  { href: '/fdroid', logoPath: PlatformLogos['F-Droid'], label: 'F-Droid' },
  { href: '/izzyondroid', logoPath: PlatformLogos['IzzyOnDroid'], label: 'IzzyOnDroid' },
  { href: '/obtainium', logoPath: PlatformLogos['Obtainium'], label: 'Obtainium' },
  { href: '/openapk', logoPath: PlatformLogos['OpenAPK'], label: 'OpenAPK' },
];

const commercialItems = [
  { href: '/altstore', logoPath: PlatformLogos['AltStore'], label: 'AltStore' },
  { href: '/amazon-appstore', logoPath: PlatformLogos['Amazon Appstore'], label: 'Amazon Appstore' },
  { href: '/apk-mirror', logoPath: PlatformLogos['APKMirror'], label: 'APKMirror' },
  { href: '/apkpure', logoPath: PlatformLogos['APKPure'], label: 'APKPure' },
  { href: '/apple-store', logoPath: PlatformLogos['Apple App Store'], label: 'Apple App Store' },
  { href: '/aptoide', logoPath: PlatformLogos['Aptoide'], label: 'Aptoide' },
  { href: '/galaxy-store', logoPath: PlatformLogos['Samsung Galaxy Store'], label: 'Galaxy Store' },
  { href: '/play-store', logoPath: PlatformLogos['Google Play Store'], label: 'Google Play Store' },
  { href: '/huawei-store', logoPath: PlatformLogos['Huawei AppGallery'], label: 'Huawei AppGallery' },
  { href: '/malavida', logoPath: PlatformLogos['Malavida'], label: 'Malavida' },
  { href: '/microsoft-store', logoPath: PlatformLogos['Microsoft Store'], label: 'Microsoft Store' },
  { href: '/softonic', logoPath: PlatformLogos['Softonic'], label: 'Softonic' },
  { href: '/uptodown', logoPath: PlatformLogos['Uptodown'], label: 'Uptodown' },
];

const gamingItems = [
  { href: '/epic-games', logoPath: PlatformLogos['Epic Games Store'], label: 'Epic Games' },
  { href: '/gamejolt', logoPath: PlatformLogos['Game Jolt'], label: 'Game Jolt' },
  { href: '/gog', logoPath: PlatformLogos['GOG.com'], label: 'GOG.com' },
  { href: '/itch-io', logoPath: PlatformLogos['Itch.io'], label: 'Itch.io' },
  { href: '/newgrounds', logoPath: PlatformLogos['Newgrounds'], label: 'Newgrounds' },
  { href: '/nintendo', logoPath: PlatformLogos['Nintendo'], label: 'Nintendo' },
  { href: '/playstation', logoPath: PlatformLogos['PlayStation'], label: 'PlayStation' },
  { href: '/poki', logoPath: PlatformLogos['Poki'], label: 'Poki' },
  { href: '/steam', logoPath: PlatformLogos['Steam'], label: 'Steam' },
  { href: '/xbox', logoPath: PlatformLogos['Xbox'], label: 'Xbox' },
];

const gitItems = [
  { href: '/github', logoPath: PlatformLogos['GitHub'], icon: Github, label: 'GitHub' },
  { href: '/gitlab', logoPath: PlatformLogos['GitLab'], icon: Gitlab, label: 'GitLab' },
  { href: '/bitbucket', logoPath: PlatformLogos['Bitbucket'], icon: Code, label: 'Bitbucket' },
  { href: '/gitea', logoPath: PlatformLogos['Gitea'], icon: Code, label: 'Gitea' },
  { href: '/codeberg', logoPath: PlatformLogos['Codeberg'], icon: Code, label: 'Codeberg' },
  { href: '/sourceforge', logoPath: PlatformLogos['SourceForge'], icon: Code, label: 'SourceForge' },
  { href: '/launchpad', logoPath: PlatformLogos['Launchpad'], icon: Code, label: 'Launchpad' },
  { href: '/huggingface', logoPath: PlatformLogos['Hugging Face'], icon: Code, label: 'Hugging Face' },
];

const languageManagers = [
  { href: '/pip', logoPath: PlatformLogos['Pip'], icon: Code, label: 'Pip' },
  { href: '/cargo', logoPath: PlatformLogos['Cargo'], icon: Code, label: 'Cargo' },
  { href: '/vcpkg', logoPath: PlatformLogos['vcpkg'], icon: Code, label: 'vcpkg' },
  { href: '/bun', logoPath: PlatformLogos['Bun'], icon: Code, label: 'Bun' },
  { href: '/npm', logoPath: PlatformLogos['npm'], icon: Code, label: 'npm' },
  { href: '/dockerhub', logoPath: PlatformLogos['Docker Hub'], icon: Code, label: 'Docker Hub' },
  { href: '/nuget', logoPath: PlatformLogos['NuGet'], icon: Code, label: 'NuGet' },
  { href: '/packagist', logoPath: PlatformLogos['Packagist'], icon: Code, label: 'Packagist' },
  { href: '/go', logoPath: PlatformLogos['Go'], icon: Code, label: 'Go' },
];

// Theme toggle component
const ThemeToggle = memo(function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string, e: React.MouseEvent) => {
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const isDark = newTheme === 'dark';

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          fill: 'forwards',
          pseudoElement: isDark
            ? '::view-transition-new(root)'
            : '::view-transition-old(root)',
        }
      );
    });
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-around p-2">
        <div className="h-9 w-9" />
        <div className="h-9 w-9" />
      </div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className="p-2">
      <Button
        variant="ghost"
        onClick={(e) => handleThemeChange(isDark ? 'light' : 'dark', e)}
        className="w-full justify-start transition-colors duration-150"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <>
            <Moon className="mr-2 h-5 w-5" />
            Dark Mode
          </>
        ) : (
          <>
            <Sun className="mr-2 h-5 w-5" />
            Light Mode
          </>
        )}
      </Button>
    </div>
  );
});

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Link href="/" prefetch={true} className="flex items-center gap-2">
            <Image
              src="/icon.png"
              alt="EasyDist Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <h2 className="text-base font-semibold">EasyDist</h2>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <MenuItem
            href="/"
            icon={Home}
            label="Dashboard"
            isActive={pathname === '/'}
          />
          <MenuItem
            href="/history"
            icon={History}
            label="History"
            isActive={pathname === '/history'}
          />

          <CollapsibleSection
            id="windows"
            title="Windows"
            items={windowsItems}
            pathname={pathname}
            defaultOpen={true}
          />

          <CollapsibleSection
            id="macos"
            title="macOS"
            items={macOSItems}
            pathname={pathname}
          />

          <CollapsibleSection
            id="linux"
            title="Linux"
            items={linuxItems}
            pathname={pathname}
            defaultOpen={true}
          />

          <CollapsibleSection
            id="android"
            title="Android"
            items={androidItems}
            pathname={pathname}
          />

          <CollapsibleSection
            id="commercial"
            title="Commercial"
            items={commercialItems}
            pathname={pathname}
          />

          <CollapsibleSection
            id="gaming"
            title="Gaming"
            items={gamingItems}
            pathname={pathname}
          />

          <CollapsibleSection
            id="source-control"
            title="Source Control"
            items={gitItems}
            pathname={pathname}
          />

          <CollapsibleSection
            id="language-managers"
            title="Language Managers"
            items={languageManagers}
            pathname={pathname}
          />
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <ThemeToggle />
          <MenuItem
            href="/settings"
            icon={Settings}
            label="Settings"
            isActive={pathname.startsWith('/settings')}
          />
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export default memo(AppSidebar);
