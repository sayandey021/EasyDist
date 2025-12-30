'use client';

import { memo, useMemo, Suspense, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, ShoppingBag, LayoutGrid, List, Grid3X3, Search, X, Filter, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPlatformIcon } from '@/components/platform-icons';
import { Input } from '@/components/ui/input';

const openSourceTools = [
  {
    name: 'Flathub',
    description: 'Generate manifests for the Flathub app store.',
    href: '/flathub',
    icon: getPlatformIcon('Flathub'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-flathub'),
    tags: ['Free', 'FOSS', 'Software', 'Games', 'Linux'],
  },
  {
    name: 'Snap',
    description: 'Create `snapcraft.yaml` for the Snap Store.',
    href: '/snap',
    icon: getPlatformIcon('Snap'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-snap'),
    tags: ['Free', 'FOSS', 'Software', 'Games', 'Linux'],
  },
  {
    name: 'Nix',
    description: 'Create derivations for the Nix package manager.',
    href: '/nix',
    icon: getPlatformIcon('Nix'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-nix'),
    tags: ['Free', 'FOSS', 'Software', 'Linux', 'macOS'],
  },
  {
    name: 'AUR',
    description: 'Create PKGBUILDs for the Arch User Repository.',
    href: '/aur',
    icon: getPlatformIcon('AUR'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-aur'),
    tags: ['Free', 'FOSS', 'Software', 'Games', 'Linux'],
  },
  {
    name: 'F-Droid',
    description: 'Generate metadata for the F-Droid repository.',
    href: '/fdroid',
    icon: getPlatformIcon('F-Droid'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-fdroid'),
    tags: ['Free', 'FOSS', 'Software', 'Android'],
  },
  {
    name: 'Copr',
    description: 'Build RPM packages for Fedora and EPEL.',
    href: '/copr',
    icon: getPlatformIcon('Copr'),
    tags: ['Free', 'FOSS', 'Software', 'Linux'],
  },
  {
    name: 'Open Build Service',
    description: 'Build packages for 20+ Linux distributions.',
    href: '/obs',
    icon: getPlatformIcon('OBS'),
    tags: ['Free', 'FOSS', 'Software', 'Linux'],
  },
  {
    name: 'IzzyOnDroid',
    description: 'F-Droid compatible repository with faster updates.',
    href: '/izzyondroid',
    icon: getPlatformIcon('IzzyOnDroid'),
    tags: ['Free', 'FOSS', 'Software', 'Android'],
  },
  {
    name: 'OpenAPK',
    description: 'Curated platform for FOSS Android apps.',
    href: '/openapk',
    icon: getPlatformIcon('OpenAPK'),
    tags: ['Free', 'FOSS', 'Software', 'Android'],
  },
  {
    name: 'Obtainium',
    description: 'Get app updates directly from release pages.',
    href: '/obtainium',
    icon: getPlatformIcon('Obtainium'),
    tags: ['Free', 'FOSS', 'Software', 'Android'],
  },
  {
    name: 'Belberi',
    description: 'Alternative FOSS Android app distribution.',
    href: '/belberi',
    icon: getPlatformIcon('Belberi'),
    tags: ['Free', 'FOSS', 'Software', 'Android'],
  },
];

const proprietaryTools = [
  {
    name: 'WinGet',
    description: 'Package for the Windows Package Manager.',
    href: '/winget',
    icon: getPlatformIcon('WinGet'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-winget'),
    tags: ['Free', 'Software', 'Games', 'Windows'],
  },
  {
    name: 'Chocolatey',
    description: 'Create and validate Chocolatey packages.',
    href: '/chocolatey',
    icon: getPlatformIcon('Chocolatey'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-chocolatey'),
    tags: ['Freemium', 'Software', 'Windows'],
  },
  {
    name: 'Scoop',
    description: 'Generate manifests for the Scoop installer.',
    href: '/scoop',
    icon: getPlatformIcon('Scoop'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-scoop'),
    tags: ['Free', 'FOSS', 'Software', 'Windows'],
  },
  {
    name: 'Homebrew',
    description: 'Generate Casks for the macOS package manager.',
    href: '/homebrew',
    icon: getPlatformIcon('Homebrew'),
    image: PlaceHolderImages.find((img) => img.id === 'tool-homebrew'),
    tags: ['Free', 'FOSS', 'Software', 'macOS', 'Linux'],
  },
];
// Commercial Platforms - App Stores only (no gaming)
const commercialPlatforms = [
  // PC & Desktop
  {
    name: 'Microsoft Store',
    description: 'Publish apps to the Windows Microsoft Store.',
    href: '/microsoft-store',
    icon: getPlatformIcon('Microsoft Store'),
    tags: ['Free (Individual)', '$99 (Company)', 'Software', 'Windows'],
  },
  {
    name: 'Apple App Store',
    description: 'Distribute apps on iOS, iPadOS, and macOS.',
    href: '/apple-store',
    icon: getPlatformIcon('Apple App Store'),
    tags: ['Paid', '$99/year', 'Software', 'iOS', 'macOS'],
  },
  // Mobile Stores
  {
    name: 'Google Play Store',
    description: 'Publish Android apps and games worldwide.',
    href: '/play-store',
    icon: getPlatformIcon('Google Play Store'),
    tags: ['Paid', '$25 one-time', 'Software', 'Android'],
  },
  {
    name: 'Amazon Appstore',
    description: 'Distribute apps on Fire tablets, Fire TV, and Echo.',
    href: '/amazon-appstore',
    icon: getPlatformIcon('Amazon Appstore'),
    tags: ['Free', 'Software', 'Android'],
  },
  {
    name: 'Samsung Galaxy Store',
    description: 'Distribute apps on Samsung Galaxy devices.',
    href: '/galaxy-store',
    icon: getPlatformIcon('Samsung Galaxy Store'),
    tags: ['Free', 'Software', 'Android'],
  },
  {
    name: 'Huawei AppGallery',
    description: 'Distribute apps to Huawei and Honor devices.',
    href: '/huawei-store',
    icon: getPlatformIcon('Huawei AppGallery'),
    tags: ['Paid', '$150/year', 'Software', 'Android'],
  },
  {
    name: 'Aptoide',
    description: 'Independent Android marketplace with 300M+ users.',
    href: '/aptoide',
    icon: getPlatformIcon('Aptoide'),
    tags: ['Free', 'Software', 'Android'],
  },
  {
    name: 'Uptodown',
    description: 'Multi-platform app store with 130M+ users.',
    href: '/uptodown',
    icon: getPlatformIcon('Uptodown'),
    tags: ['Free', 'Software', 'Android', 'Windows'],
  },
  {
    name: 'APKPure',
    description: 'Alternative Android app store with global reach.',
    href: '/apkpure',
    icon: getPlatformIcon('APKPure'),
    tags: ['Free', 'Software', 'Android'],
  },
  {
    name: 'Softonic',
    description: 'One of the largest software download portals worldwide.',
    href: '/softonic',
    icon: getPlatformIcon('Softonic'),
    tags: ['Free', 'Software', 'Windows', 'macOS', 'Android'],
  },
  {
    name: 'Malavida',
    description: 'Spanish software download portal with global reach.',
    href: '/malavida',
    icon: getPlatformIcon('Malavida'),
    tags: ['Free', 'Software', 'Windows', 'macOS', 'Android'],
  },
  {
    name: 'APKMirror',
    description: 'Trusted source for verified Android APK downloads.',
    href: '/apk-mirror',
    icon: getPlatformIcon('APKMirror'),
    tags: ['Free', 'Software', 'Android'],
  },
  {
    name: 'AltStore',
    description: 'Alternative iOS app marketplace for EU (DMA compliant).',
    href: '/altstore',
    icon: getPlatformIcon('AltStore'),
    tags: ['Free', 'Software', 'iOS', 'EU Only'],
  },
];

// Gaming platforms for Games tab
const gamingPlatforms = [
  {
    name: 'Steam',
    description: 'Distribute games on the Steam platform.',
    href: '/steam',
    icon: getPlatformIcon('Steam'),
    tags: ['Paid', '$100/game', 'Games', 'Windows', 'macOS', 'Linux'],
  },
  {
    name: 'Epic Games Store',
    description: 'Publish games on the Epic Games Store.',
    href: '/epic-games',
    icon: getPlatformIcon('Epic Games Store'),
    tags: ['Paid', '$100/game', 'Games', 'Windows', 'macOS'],
  },
  {
    name: 'Xbox',
    description: 'Publish games for Xbox consoles and PC.',
    href: '/xbox',
    icon: getPlatformIcon('Xbox'),
    tags: ['Free', 'ID@Xbox', 'Games', 'Windows', 'Console'],
  },
  {
    name: 'PlayStation',
    description: 'Distribute games on PlayStation consoles.',
    href: '/playstation',
    icon: getPlatformIcon('PlayStation'),
    tags: ['Apply for access', 'Games', 'Console'],
  },
  {
    name: 'Itch.io',
    description: 'Indie-friendly platform for games and tools.',
    href: '/itch-io',
    icon: getPlatformIcon('Itch.io'),
    tags: ['Free', 'Pay what you want', 'Games', 'Software', 'Windows', 'macOS', 'Linux'],
  },
  {
    name: 'GOG.com',
    description: 'DRM-free game distribution by CD Projekt.',
    href: '/gog',
    icon: getPlatformIcon('GOG.com'),
    tags: ['Curated', 'DRM-Free', 'Games', 'Windows', 'macOS', 'Linux'],
  },
  {
    name: 'Game Jolt',
    description: 'Community platform for indie games.',
    href: '/gamejolt',
    icon: getPlatformIcon('Game Jolt'),
    tags: ['Free', '10% rev share', 'Indie', 'Games', 'Windows', 'macOS', 'Linux'],
  },
  {
    name: 'Nintendo',
    description: 'Publish games on Nintendo Switch and eShop.',
    href: '/nintendo',
    icon: getPlatformIcon('Nintendo'),
    tags: ['Apply for access', 'Games', 'Console'],
  },
  {
    name: 'Poki',
    description: 'Leading online gaming platform for web games.',
    href: '/poki',
    icon: getPlatformIcon('Poki'),
    tags: ['Free', 'Games', 'Web', 'HTML5'],
  },
  {
    name: 'Newgrounds',
    description: 'Legendary platform for indie games and animation.',
    href: '/newgrounds',
    icon: getPlatformIcon('Newgrounds'),
    tags: ['Free', 'Indie', 'Games', 'Web', 'HTML5'],
  },
];

type ToolItem = {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  image?: { id: string; imageUrl: string; description: string; imageHint: string };
  tags: string[];
};

// View mode type
type ViewMode = 'grid' | 'list' | 'icons';

// Memoized tool card component for Grid view
const ToolCardGrid = memo(function ToolCardGrid({ tool }: { tool: ToolItem }) {
  return (
    <Card className="flex h-full flex-col transition-all duration-200 ease-out hover:shadow-xl hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{tool.name}</CardTitle>
        <div className="text-primary">{tool.icon}</div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          {tool.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tool.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={tool.href} prefetch={true}>
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
});

// Memoized tool card component for List view
const ToolCardList = memo(function ToolCardList({ tool }: { tool: ToolItem }) {
  return (
    <Link href={tool.href} prefetch={true} className="block">
      <Card className="flex flex-row items-center gap-4 p-4 transition-all duration-200 ease-out hover:shadow-lg hover:bg-accent/50">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10">
          <div className="text-primary">{tool.icon}</div>
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-base truncate">{tool.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{tool.description}</p>
        </div>
        <div className="hidden sm:flex flex-wrap gap-1 justify-end max-w-[200px]">
          {tool.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      </Card>
    </Link>
  );
});

// Memoized tool card component for Icons view
const ToolCardIcons = memo(function ToolCardIcons({ tool }: { tool: ToolItem }) {
  return (
    <Link href={tool.href} prefetch={true} className="block">
      <Card className="flex flex-col items-center justify-center p-4 h-full min-h-[120px] transition-all duration-200 ease-out hover:shadow-xl hover:scale-105 hover:bg-accent/50 group">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
          <div className="text-primary scale-110">{tool.icon}</div>
        </div>
        <h3 className="font-medium text-sm text-center leading-tight">{tool.name}</h3>
      </Card>
    </Link>
  );
});

// Memoized tool display component with view modes
const ToolDisplay = memo(function ToolDisplay({
  tools,
  viewMode
}: {
  tools: ToolItem[];
  viewMode: ViewMode;
}) {
  const sortedTools = useMemo(() =>
    [...tools].sort((a, b) => a.name.localeCompare(b.name)),
    [tools]
  );

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-2">
        {sortedTools.map((tool) => (
          <ToolCardList key={tool.name} tool={tool} />
        ))}
      </div>
    );
  }

  if (viewMode === 'icons') {
    return (
      <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {sortedTools.map((tool) => (
          <ToolCardIcons key={tool.name} tool={tool} />
        ))}
      </div>
    );
  }

  // Default: Grid view
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedTools.map((tool) => (
        <ToolCardGrid key={tool.name} tool={tool} />
      ))}
    </div>
  );
});

// Hero section with optimized image loading
const HeroSection = memo(function HeroSection() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'dashboard-hero'
  );

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full md:h-64">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority={true}
            loading="eager"
            sizes="100vw"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Distribution Accelerator
          </h1>
          <p className="mt-2 text-lg text-white/90">
            Simplify and accelerate your software distribution.
          </p>
        </div>
      </div>
    </Card>
  );
});

// Section component for each category
const Section = memo(function Section({
  title,
  tools,
  viewMode
}: {
  title: string;
  tools: ToolItem[];
  viewMode: ViewMode;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <ToolDisplay tools={tools} viewMode={viewMode} />
    </div>
  );
});

// View mode toggle button component
const ViewModeToggle = memo(function ViewModeToggle({
  viewMode,
  setViewMode
}: {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-md transition-all duration-150 ${viewMode === 'grid'
          ? 'bg-background shadow-sm text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        title="Grid view"
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md transition-all duration-150 ${viewMode === 'list'
          ? 'bg-background shadow-sm text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        title="List view"
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => setViewMode('icons')}
        className={`p-2 rounded-md transition-all duration-150 ${viewMode === 'icons'
          ? 'bg-background shadow-sm text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        title="Icons view"
        aria-label="Icons view"
      >
        <Grid3X3 className="h-4 w-4" />
      </button>
    </div>
  );
});

// Search filter component
const SearchFilter = memo(function SearchFilter({
  searchQuery,
  setSearchQuery
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search platforms..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 pr-9 h-9"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});

// Tags to exclude from the filter (but still show on cards)
const excludedFilterTags = [
  '$100/game',
  '$19/year',
  '$25 one-time',
  '$99 (Company)',
  '$99/year',
  '10% rev share',
  'Curated',
  'Free (Individual)',
];

// Collect all unique tags from all platforms (static data, computed once)
// Excludes certain tags from the filter while keeping them on the cards
const allTags = (() => {
  const tagSet = new Set<string>();
  [...openSourceTools, ...proprietaryTools, ...commercialPlatforms, ...gamingPlatforms].forEach(tool => {
    tool.tags.forEach(tag => tagSet.add(tag));
  });
  // Filter out excluded tags
  return Array.from(tagSet)
    .filter(tag => !excludedFilterTags.includes(tag))
    .sort();
})();

// Tag filter component
const TagFilter = memo(function TagFilter({
  allTags,
  selectedTags,
  setSelectedTags
}: {
  allTags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map(tag => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border ${selectedTags.includes(tag)
            ? 'bg-primary text-primary-foreground border-primary shadow-sm'
            : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
            }`}
        >
          {tag}
        </button>
      ))}
      {selectedTags.length > 0 && (
        <button
          onClick={() => setSelectedTags([])}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center gap-1"
        >
          <X className="h-3 w-3" />
          Clear all
        </button>
      )}
    </div>
  );
});

// Helper function to filter tools based on search query AND selected tags
function filterTools(tools: ToolItem[], searchQuery: string, selectedTags: string[]): ToolItem[] {
  let filtered = tools;

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Filter by selected tags (tool must have ALL selected tags)
  if (selectedTags.length > 0) {
    filtered = filtered.filter(tool =>
      selectedTags.every(selectedTag => tool.tags.includes(selectedTag))
    );
  }

  return filtered;
}

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter all platform arrays based on search query AND tags
  const filteredOpenSource = useMemo(() => filterTools(openSourceTools, searchQuery, selectedTags), [searchQuery, selectedTags]);
  const filteredProprietary = useMemo(() => filterTools(proprietaryTools, searchQuery, selectedTags), [searchQuery, selectedTags]);
  const filteredCommercial = useMemo(() => filterTools(commercialPlatforms, searchQuery, selectedTags), [searchQuery, selectedTags]);
  const filteredGaming = useMemo(() => filterTools(gamingPlatforms, searchQuery, selectedTags), [searchQuery, selectedTags]);

  // Check if any results exist
  const hasResults = filteredOpenSource.length > 0 ||
    filteredProprietary.length > 0 ||
    filteredCommercial.length > 0 ||
    filteredGaming.length > 0;

  // Check if any filters are active
  const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.length > 0;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-300">
      <HeroSection />

      <Tabs defaultValue="all" className="w-full">
        {/* Filter and View Controls */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open-source">Open Source</TabsTrigger>
                <TabsTrigger value="closed-source">Closed Source</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
                <TabsTrigger value="games">Games</TabsTrigger>
              </TabsList>

              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>

            <div className="flex items-center gap-2">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 border ${showFilters || selectedTags.length > 0
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
                  }`}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {selectedTags.length > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                    {selectedTags.length}
                  </span>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          </div>

          {/* Collapsible Tag Filter */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="flex items-start gap-2 pt-2 pb-1">
              <span className="text-sm font-medium text-muted-foreground pt-1.5 flex-shrink-0">Filter by tags:</span>
              <TagFilter allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            </div>
          </div>
        </div>

        <TabsContent value="all" className="mt-6 space-y-10">
          {!hasResults && hasActiveFilters ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No platforms found</h3>
              <p className="text-sm text-muted-foreground/70 mt-1 max-w-md">
                {searchQuery && selectedTags.length > 0 ? (
                  <>No results match &quot;{searchQuery}&quot; with tags: {selectedTags.join(', ')}</>
                ) : searchQuery ? (
                  <>No results match &quot;{searchQuery}&quot;</>
                ) : (
                  <>No platforms found with tags: {selectedTags.join(', ')}</>
                )}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredOpenSource.length > 0 && (
                <Section title="Open Source Distribution" tools={filteredOpenSource} viewMode={viewMode} />
              )}
              {filteredProprietary.length > 0 && (
                <Section title="Closed Source Distribution" tools={filteredProprietary} viewMode={viewMode} />
              )}
              {filteredCommercial.length > 0 && (
                <Section title="Commercial Platforms" tools={filteredCommercial} viewMode={viewMode} />
              )}
              {filteredGaming.length > 0 && (
                <Section title="Gaming Platforms" tools={filteredGaming} viewMode={viewMode} />
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="open-source" className="mt-6 space-y-6">
          {filteredOpenSource.length > 0 ? (
            <Section title="Open Source Distribution" tools={filteredOpenSource} viewMode={viewMode} />
          ) : searchQuery ? (
            <div className="text-center py-8 text-muted-foreground">
              No open source platforms match &quot;{searchQuery}&quot;
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="closed-source" className="mt-6 space-y-6">
          {filteredProprietary.length > 0 ? (
            <Section title="Closed Source Distribution" tools={filteredProprietary} viewMode={viewMode} />
          ) : searchQuery ? (
            <div className="text-center py-8 text-muted-foreground">
              No closed source platforms match &quot;{searchQuery}&quot;
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="commercial" className="mt-6 space-y-6">
          {filteredCommercial.length > 0 ? (
            <Section title="Commercial Platforms" tools={filteredCommercial} viewMode={viewMode} />
          ) : searchQuery ? (
            <div className="text-center py-8 text-muted-foreground">
              No commercial platforms match &quot;{searchQuery}&quot;
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="games" className="mt-6 space-y-6">
          {filteredGaming.length > 0 ? (
            <Section title="Gaming Platforms" tools={filteredGaming} viewMode={viewMode} />
          ) : searchQuery ? (
            <div className="text-center py-8 text-muted-foreground">
              No gaming platforms match &quot;{searchQuery}&quot;
            </div>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}


