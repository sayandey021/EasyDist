# EasyDist v1.2.0 Release Notes

**Release Date:** December 29, 2025

We are excited to announce the release of **EasyDist v1.2.0**! This major update brings 12 new distribution platforms, interactive config wizards for open-source packages, verified pricing information, and improved navigation.

## 🚀 New Features

### New Open Source Platforms (with Wizards)
*   **Copr (Cool Other Package Repo):** Fedora's community build system for RPM packages
    *   Interactive wizard to generate `.spec` files
    *   Support for Fedora, EPEL, openSUSE, and Mageia
*   **Open Build Service (OBS):** Build packages for 20+ Linux distributions from one source
    *   Supports RPM, DEB, Arch, AppImage, and more
*   **IzzyOnDroid:** F-Droid compatible repository with faster updates
    *   Wizard generates metadata and GitLab inclusion request template
    *   Category and anti-feature selection
*   **Obtainium:** Get Android app updates directly from release pages
    *   Wizard generates `obtainium://` deep links for easy app adding
    *   JSON config generator for crowdsourced app list
*   **OpenAPK:** Curated platform for FOSS Android apps
*   **Belberi:** Alternative FOSS Android app distribution channel

### New Commercial Platforms
*   **AltStore PAL:** Alternative iOS app marketplace for EU (DMA compliant)
    *   Free distribution (Epic MegaGrant covers Apple's CTF)
    *   Patreon integration info
*   **Softonic:** One of the largest software download portals worldwide
*   **Malavida:** Spanish software download portal with global reach
*   **APKMirror:** Trusted source for verified Android APK downloads

### New Gaming Platforms
*   **Poki:** Leading online gaming platform for HTML5/web games
*   **Newgrounds:** Legendary indie gaming community since 1995

### Navigation Improvements
*   **Back Button:** Added on all platform pages for easy navigation
*   Automatically hidden on Dashboard and Settings pages

## 🎨 Improvements

### Interactive Wizards
All open-source package managers now have step-by-step wizards:
*   **Copr Wizard:** Generate RPM spec files with build configuration
*   **Obtainium Wizard:** Create app configs and deep links
*   **IzzyOnDroid Wizard:** Generate metadata and submission templates

### Verified Pricing Information
Fixed incorrect pricing across multiple platforms:
*   **Epic Games Store:** Updated from "Free" to **$100/game** submission fee
*   **Xbox:** Fixed from "$19/year" to **FREE (ID@Xbox program)**
*   **Huawei AppGallery:** Fixed from "Free" to **$150/year (Individual) / $250/year (Company)**

### Platform Logos
*   Added logos for all 12 new platforms
*   Logos stored in `/public/logos/` for easy customization

### Sidebar Updates
*   New Android category with 5 FOSS platforms
*   New Linux category includes Copr and OBS
*   Commercial category includes AltStore

## 🐛 Bug Fixes

*   **URL Corrections:**
    *   Fixed Softonic developer portal URL
    *   Fixed Malavida website URL
    *   Fixed Game Jolt website URL
    *   Fixed PlayStation developer info URL
    *   Fixed GOG partner program URL
*   **Pricing Accuracy:** Verified and corrected fees for all 25+ platforms

---


# EasyDist v1.1.0 Release Notes

**Release Date:** December 21, 2025

We are excited to announce the release of **EasyDist v1.1.0**! This update brings a major UI overhaul with platform logos, enhanced dashboard controls, and a beautiful new exit confirmation dialog.

## 🚀 New Features

### Platform Logos
*   **PNG Platform Logos:** All major platforms now display their official logos instead of generic icons throughout the application.
    *   Gaming platforms: Steam, Epic Games, Xbox, PlayStation, Nintendo, GOG, Itch.io, Game Jolt
    *   Commercial stores: Google Play, Microsoft Store, Apple App Store, Amazon Appstore, Samsung Galaxy Store, Huawei AppGallery, APKPure, Uptodown, Aptoide
    *   Open Source: Flathub, Snap, F-Droid, Nix, AUR, Homebrew, Chocolatey, Scoop, WinGet

### Dashboard Enhancements
*   **View Modes:** New dashboard view toggle with three display options:
    *   **Grid View:** Full card layout with descriptions, tags, and action buttons
    *   **List View:** Compact horizontal rows for quick scanning
    *   **Icons View:** Minimal icon-focused grid for fast visual navigation
*   **Tag Filter:** Filter platforms by one or more tags (Free, Paid, FOSS, Games, etc.)
    *   Multi-select capability with AND logic
    *   Collapsible filter panel with toggle button
    *   Badge showing active filter count
*   **Search Filter:** Real-time search across platform names, descriptions, and tags

### Custom Exit Dialog
*   **Fluent UI Exit Confirmation:** Beautiful custom dialog replacing the native OS dialog:
    *   Acrylic backdrop blur effect
    *   Smooth slide-in animations
    *   "Don't ask again" checkbox with preference persistence
    *   Consistent styling with Windows 11 design language

## 🎨 Improvements

*   **Sidebar Enhancements:**
    *   Platform logos now displayed in sidebar navigation
    *   All sidebar items sorted alphabetically by name within categories
    *   Improved visual hierarchy with platform branding
*   **Dashboard Controls:**
    *   Reorganized toolbar layout with tabs and view mode on left, filter and search on right
    *   Responsive design adapts to different screen sizes
*   **Performance Optimizations:**
    *   Memoized components for efficient re-renders
    *   Optimized image loading with Next.js Image component

## 🐛 Bug Fixes

*   Fixed various lint errors related to unused imports
*   Improved error handling for IPC communication
*   Enhanced accessibility with proper ARIA attributes

---

# EasyDist v1.0.5 Release Notes

**Release Date:** December 20, 2025

We are excited to announce the release of **EasyDist v1.0.5**! This major update brings official Microsoft Store support, comprehensive rebranding, and expanded distribution platform integrations.

## 🚀 New Features

*   **MSIX Package Support:** Added full native support for building `.msix` packages, enabling direct submission to the Microsoft Store.
    *   Includes a dedicated build pipeline to ensure full compliance with Store identity and versioning requirements.
    *   Automatic generation of all required store assets and tile logos.
*   **Commercial Store Integrations:** 
    *   Added support for **GOG** and **Game Jolt**.
    *   Full instruction guides for publishing to these new platforms.
*   **Custom Icons for Linux:** You can now specify custom icon paths when generating packages for **Flathub**, **Snap**, **F-Droid**, and **Nix**, ensuring your branding stays consistent across all Linux distributions.
*   **App Info & Donation:** Added a new "Info" section in Settings featuring developer details and a direct **Ko-fi** donation button to support the project.

## 🎨 Improvements

*   **Brand Evolution:** The application has been officially renamed to **EasyDist** (formerly FOSSdistributeLite) to better reflect its mission of simplifying software distribution for everyone.
*   **Saayan Studio:** Updated all publisher details to **Saayan Studio**.
*   **UI/UX Enhancements:**
    *   Completely revamped Sidebar animations for a smoother, glitch-free experience.
    *   Improved sidebar navigation allows categories to be manually closed for a cleaner workspace.
    *   Fixed hydration errors providing a more stable application startup.

## 🐛 Bug Fixes

*   **Uninstaller Overhaul:** Fixed critical issues where the uninstaller would leave behind cached data or user settings. The uninstaller now cleanly removes all application traces.
*   **Build System:** Resolved build scripts to support both NSIS (EXE) and MSIX workflows simultaneously without conflicts.
*   **Platform Links:** Updated and verified submission portal links for APKPure, Uptodown, and Aptoide.

---

*Thank you for using EasyDist! If you encounter any issues, please report them on our GitHub repository.*
