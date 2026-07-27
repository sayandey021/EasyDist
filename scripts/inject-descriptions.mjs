import fs from 'fs';
import path from 'path';

const descriptions = {
    'altstore': 'An alternative app store for iOS devices that allows users to sideload apps without jailbreaking. It uses a companion computer app to refresh certificates and keep apps active.',
    'amazon-appstore': 'The official app store for Amazon Fire devices and Windows 11. It offers a curated selection of Android apps and games, fully integrated with Amazon\'s ecosystem.',
    'apk-mirror': 'A popular, community-trusted repository for Android APKs. It provides version history, beta releases, and geographically restricted apps safely without modifications.',
    'apkpure': 'An alternative Android app store offering raw APK and XAPK files. It bypasses regional restrictions and allows users to download historical app versions freely.',
    'apple-store': 'The premier digital distribution platform for iOS, iPadOS, watchOS, and macOS apps. It enforces strict review guidelines to ensure security, privacy, and high-quality user experiences.',
    'aptoide': 'A decentralized, open-source Android app store where users manage their own repositories. It offers a community-driven alternative to mainstream app discovery and distribution.',
    'aur': 'The Arch User Repository is a community-driven repository for Arch Linux users. It contains package descriptions that allow you to compile a package from source and install it.',
    'belberi': 'A specialized platform for application distribution and software management. It aims to provide seamless access to community-driven digital tools and applications.',
    'bitbucket': 'A Git-based source code repository hosting service. It provides excellent integration with Jira and Trello, catering strongly to professional teams and enterprise workflows.',
    'bun': 'A fast all-in-one JavaScript runtime, bundler, transpiler, and package manager built in Zig. It aims to be a drop-in replacement for Node.js, delivering significantly higher performance.',
    'cargo': 'The official package manager and build system for the Rust programming language. It manages project dependencies, compiles packages (crates), and easily publishes them.',
    'chocolatey': 'A machine-level package manager for Windows. It brings the concepts of true package management to Windows, allowing users to install, upgrade, and configure software via the CLI.',
    'codeberg': 'A collaboration platform and Git hosting service dedicated to the open-source community. It is non-profit, ad-free, and respects user privacy as an ethical alternative.',
    'copr': 'An easy-to-use automatic build system for Fedora, RHEL, and CentOS. It provides a package repository hosting service, allowing developers to build and share RPM packages quickly.',
    'dockerhub': 'The world\'s largest library and community for container images. It provides a centralized resource for image discovery, distribution, user collaboration, and automated build workflows.',
    'epic-games': 'A digital storefront and game launcher developed by Epic Games. It offers an extensive library of exclusive titles, Unreal Engine assets, and provides developers with favorable revenue sharing.',
    'fdroid': 'An installable catalogue of Free and Open Source Software (FOSS) applications for the Android platform. The client makes it easy to browse, install, and keep track of updates.',
    'flathub': 'The central repository for Flatpak applications on Linux. It allows developers to distribute apps seamlessly across various Linux distributions without worrying about fragmented dependencies.',
    'galaxy-store': 'Samsung\'s official app store tailored for Galaxy devices. It features specialized apps, unique themes, watch faces, and exclusive gaming offers optimized for Samsung hardware.',
    'gamejolt': 'A social community and hosting platform for gamers and indie developers. It supports indie games, fan art, and provides a space to discover unique, experimental gaming projects.',
    'gitea': 'A lightweight, painless, self-hosted Git service. Written in Go, it is designed to be highly efficient, simple to install, and easily configurable across various operating systems.',
    'github': 'The world\'s leading AI-powered developer platform to build, scale, and deliver secure software. It offers version control, CI/CD with Actions, issue tracking, and a massive open-source ecosystem.',
    'gitlab': 'A comprehensive DevSecOps platform delivered as a single application. It fundamentally changes the way development, security, and ops teams collaborate and build software.',
    'gog': 'A digital game storefront that focuses on DRM-free PC games. Originally "Good Old Games", it specializes in classic titles curated to work on modern systems alongside new releases.',
    'homebrew': 'The missing package manager for macOS (and Linux). It simplifies the installation of software on Apple\'s operating system and Linux by compiling and installing packages cleanly.',
    'huawei-store': 'The official app distribution platform for Huawei devices. Serving as the primary ecosystem for Huawei\'s global user base, it provides millions of secure applications.',
    'huggingface': 'The premier platform for the machine learning community. It serves as a central hub to build, train, and deploy state-of-the-art open-source AI models, datasets, and applications.',
    'itch-io': 'An open marketplace for independent digital creators with a focus on indie video games. It gives creators complete control over pricing, distribution, and the design of their store pages.',
    'izzyondroid': 'A specialized F-Droid repository that hosts Android apps built from open-source code. It bridges the gap between official F-Droid strictness and developer accessibility.',
    'macports': 'An open-source community initiative to design an easy-to-use system for compiling, installing, and managing open-source software on macOS using a vast ports tree.',
    'malavida': 'An alternative software distribution platform offering curated downloads for Windows, Android, and Mac. It focuses on providing safe, virus-tested executable files and app reviews.',
    'microsoft-store': 'The official digital storefront for Windows applications, games, movies, and hardware. It ensures applications are verified for security and provides a unified update mechanism.',
    'newgrounds': 'A legendary entertainment website and community hosting user-generated games, animations, art, and music. It has historically been a foundational pillar of independent web content.',
    'nintendo': 'The digital distribution network for the Nintendo Switch. It hosts a massive library of first-party Nintendo titles, beloved indie games, and classic retro releases.',
    'nix': 'A powerful, purely functional package manager designed for reliable and reproducible package management. It isolates packages, allowing multiple versions to coexist seamlessly.',
    'npm': 'The default package manager for Node.js and the world\'s largest software registry. It empowers developers to easily share, borrow, and build upon millions of JavaScript packages.',
    'nuget': 'The package manager for .NET. The client tools provide the ability to produce and consume packages, while the Gallery is the central repository used by authors globally.',
    'obs': 'A generic system to build and distribute binary packages from sources automatically, consistently, and securely across multiple operating systems and hardware architectures.',
    'obtainium': 'An Android app that allows you to install and update apps directly from their release pages (GitHub, GitLab, etc.) bypassing traditional app stores while staying automatically updated.',
    'openapk': 'An alternative source for downloading Android APKs. It provides direct access to installable application packages, helping users bypass regional restrictions and access older versions.',
    'packagist': 'The primary repository for Composer, the PHP package manager. It aggregates all public PHP packages installable with Composer, serving as the central hub for the PHP ecosystem.',
    'pip': 'The standard package installer for Python. You can use pip to easily install packages from the Python Package Index (PyPI) and other indexes to manage project dependencies.',
    'play-store': 'Google\'s official app store for Android devices. It provides access to millions of verified apps, games, books, and movies with integrated Play Protect security scanning.',
    'playstation': 'The digital storefront for Sony consoles. It provides gamers with access to full game downloads, DLCs, pre-orders, and PlayStation Plus subscription benefits.',
    'poki': 'A personalized exploration platform for free online games. It curates a massive collection of web-based HTML5 games that are playable instantly in the browser without downloads.',
    'scoop': 'A command-line installer for Windows. It focuses on open-source, developer-oriented tools and strictly avoids administrative prompts (UAC), installing programs cleanly.',
    'snap': 'A software packaging and deployment system developed by Canonical. Snaps are containerized software packages that are simple to create, secure, and run reliably.',
    'softonic': 'One of the oldest software downloading portals. It provides safe downloads, reviews, and guides for applications across Windows, Mac, Android, and iOS ecosystems.',
    'sourceforge': 'An iconic web-based service that provides an online centralized space for software developers to control and manage free and open-source software projects.',
    'steam': 'The ultimate digital distribution service for PC gaming. It offers an unmatched library of games, social networking features, cloud saving, and community mod workshops.',
    'uptodown': 'A global marketplace for desktop and mobile apps. It specializes in offering localized content and older app versions without requiring a user account or Google Play services.',
    'vcpkg': 'A cross-platform C/C++ package manager from Microsoft. It drastically simplifies the acquisition and installation of third-party libraries on Windows, Linux, and macOS.',
    'winget': 'The official Windows Package Manager CLI. It empowers users to quickly discover, install, upgrade, and configure applications directly from the Windows command line.',
    'xbox': 'The digital storefront for the Xbox ecosystem and PC Game Pass. It integrates closely with Windows to deliver a massive catalog of high-quality games, DLC, and multiplayer services.'
};

const MAIN_DIR = 'src/app/(main)';
const dirs = fs.readdirSync(MAIN_DIR);
let count = 0;

for (const d of dirs) {
    const pagePath = path.join(MAIN_DIR, d, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    if (!descriptions[d]) continue; // skip history, settings, etc.

    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // We want to rename <CardTitle>Tags</CardTitle> back to <CardTitle>Overview</CardTitle>
    // And inject the specific description paragraph before the <div className="flex flex-wrap gap-2">
    
    content = content.replace(/<CardTitle className="text-([^"]+)">Tags<\/CardTitle>/, '<CardTitle className="text-$1">Overview</CardTitle>');
    content = content.replace(/<CardTitle className="text-([^"]+)">Overview<\/CardTitle>/, '<CardTitle className="text-$1">Overview</CardTitle>'); // safety

    const descPara = `\n                        <p className="text-sm text-muted-foreground leading-relaxed">\n                            ${descriptions[d]}\n                        </p>\n                        `;

    content = content.replace(/(\s*<div className="flex flex-wrap gap-2">)/, descPara + '$1');

    fs.writeFileSync(pagePath, content, 'utf-8');
    count++;
}
console.log('Injected rich descriptions into ' + count + ' pages.');
