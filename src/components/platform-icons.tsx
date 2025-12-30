// Platform-specific PNG logos
// These logos are stored in /public/logos/ directory

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

interface IconProps {
    className?: string;
}

// Map of platform names to their logo file paths
export const PlatformLogos: Record<string, string> = {
    // Gaming Platforms
    'Steam': '/logos/steam.png',
    'Epic Games Store': '/logos/epic-games.png',
    'Xbox': '/logos/xbox.png',
    'PlayStation': '/logos/playstation.png',
    'Nintendo': '/logos/nintendo.png',
    'GOG.com': '/logos/gog.png',
    'Itch.io': '/logos/itchio.png',
    'Game Jolt': '/logos/gamejolt.png',
    'Poki': '/logos/poki.png',
    'Newgrounds': '/logos/newgrounds.png',

    // Commercial App Stores
    'Google Play Store': '/logos/google-play.png',
    'Microsoft Store': '/logos/microsoft-store.png',
    'Apple App Store': '/logos/apple-store.png',
    'Amazon Appstore': '/logos/amazon-appstore.png',
    'Samsung Galaxy Store': '/logos/samsung-galaxy.png',
    'Huawei AppGallery': '/logos/huawei.png',
    'APKPure': '/logos/apkpure.png',
    'Uptodown': '/logos/uptodown.png',
    'Aptoide': '/logos/aptoide.png',
    'Softonic': '/logos/softonic.png',
    'Malavida': '/logos/malavida.png',
    'APKMirror': '/logos/apkmirror.png',
    'AltStore': '/logos/altstore.png',
    'OpenAPK': '/logos/openapk.png',
    'Obtainium': '/logos/obtainium.png',
    'IzzyOnDroid': '/logos/izzyondroid.png',
    'Belberi': '/logos/belberi.png',

    // Open Source / Package Managers
    'Flathub': '/logos/flathub.png',
    'Snap': '/logos/snap.png',
    'F-Droid': '/logos/fdroid.png',
    'Nix': '/logos/nix.png',
    'AUR': '/logos/aur.png',
    'Homebrew': '/logos/homebrew.png',
    'Chocolatey': '/logos/chocolatey.png',
    'Scoop': '/logos/scoop.png',
    'WinGet': '/logos/winget.png',
    'Copr': '/logos/copr.png',
    'OBS': '/logos/obs.png',
};

// Component that renders platform logo as PNG image
export function PlatformLogo({
    platformName,
    className = "h-6 w-6",
    size = 24
}: {
    platformName: string;
    className?: string;
    size?: number;
}) {
    const logoPath = PlatformLogos[platformName];

    if (logoPath) {
        return (
            <Image
                src={logoPath}
                alt={`${platformName} logo`}
                width={size}
                height={size}
                className={`${className} object-contain rounded-sm`}
                loading="lazy"
            />
        );
    }

    // Return default icon for platforms without specific logos
    return <ShoppingBag className={className} />;
}

// Helper function to get icon by platform name, returns ReactNode
export function getPlatformIcon(platformName: string, className?: string): React.ReactNode {
    const logoPath = PlatformLogos[platformName];

    if (logoPath) {
        return (
            <Image
                src={logoPath}
                alt={`${platformName} logo`}
                width={24}
                height={24}
                className={`${className || "h-6 w-6"} object-contain rounded-sm`}
                loading="lazy"
            />
        );
    }

    // Return default icon for platforms without specific logos
    return <ShoppingBag className={className || "h-6 w-6"} />;
}

// Check if a platform has a custom logo
export function hasPlatformLogo(platformName: string): boolean {
    return platformName in PlatformLogos;
}
