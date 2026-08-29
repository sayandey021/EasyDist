# EasyDist v1.5.0 Release Notes

**Release Date:** August 29, 2026

We are excited to announce the release of **EasyDist v1.5.0**! This major release introduces a brand new category of distribution storefronts: **Browser Extension Stores**, bringing complete guides, vector branding, and publishing workflows for the world's leading browser extension marketplaces.

## 🚀 New Features

### Browser Extension Stores (New Category)
*   **New Storefront Category:** Added dedicated **Browser Extensions** tab and sidebar navigation supporting the world's leading web browser add-on marketplaces.
*   **Chrome Web Store:** Full guide for Manifest V3, $5 developer fee, Chromium ecosystem reach (Chrome, Brave, Arc, Vivaldi), and CWS Developer Dashboard links.
*   **Firefox Add-ons (AMO):** Complete documentation for WebExtensions API, free registration, automated signing tools (`web-ext`), and Firefox for Android extension support.
*   **Edge Add-ons:** Dedicated guide for Edge Partner Center publishing, free registration, and 1-click Chrome Web Store import tools.
*   **Opera Add-ons:** Guide covering Opera One and Opera GX gaming browser extension publishing, Sidebar Action APIs, and developer portals.
*   **Safari Web Extensions:** Comprehensive guide for Apple Safari extension packaging (`safari-web-extension-converter`), Xcode app wrapping, and universal macOS/iOS/iPadOS/visionOS distribution.
*   **Greasy Fork Integration:** Complete publishing guide for the world's leading user script repository, Tampermonkey/Violentmonkey integration, and automated GitHub sync.
*   **OpenUserJS Integration:** Guide for open-source userscript distribution, GitHub/Gist synchronization, and collaborative script issue tracking.
*   **Naver Whale Store:** Dedicated guide for Naver Whale extensions, custom Sidebar Action APIs, dual tab support, and Asian Chromium market distribution.
*   **Custom Vector Assets:** Designed and integrated high-resolution SVG logos for all 8 browser extension and script marketplaces.

## 🎨 UI & UX Improvements

### Responsive Multi-Word Category Tabs
*   **Dynamic Two-Line Stacking:** Optimized the category navigation tabs bar for smaller window widths. Multi-word platform tabs (e.g. *Open Source*, *Closed Source*, *Source Control*, *Language Managers*, *Browser Extensions*) automatically stack their words vertically top-and-bottom to conserve horizontal footprint, preventing tab overflow and truncation on compact window sizes.

---

# EasyDist v1.4.5 Release Notes

**Release Date:** August 29, 2026

We are excited to announce the release of **EasyDist v1.4.5**! This update introduces major new commercial OEM app stores to EasyDist, along with a newly redesigned, animated light/dark mode hero experience.

## 🚀 New Features

### Xiaomi GetApps Integration
*   Added full distribution documentation and guide for **Xiaomi GetApps** (HyperOS & MIUI).
*   Direct access to the Xiaomi Global Developer Console (`global.developer.mi.com`), Submission Guide, and Developer Support.
*   Comprehensive details on zero-fee developer registration, 70/30 revenue share model, and device coverage (Xiaomi, Redmi, POCO).
*   Added custom high-resolution SVG logo.

### OPPO App Market Integration
*   Added complete distribution documentation and guide for **OPPO App Market**.
*   Direct links to the OPPO Open Platform (`open.oppomobile.com`), Global Developer Portal, and development documentation.
*   Covers publishing workflows for ColorOS, OxygenOS, and Realme UI across OPPO, OnePlus, and Realme devices.
*   Added custom high-resolution SVG logo.

### Vivo V-Appstore Integration
*   Added full distribution overview and guide for **Vivo V-Appstore**.
*   Direct links to the vivo Developer Platform (`developer.vivo.com`), Developer Documentation, and Customer Service support.
*   Covers publishing guidelines for Funtouch OS and OriginOS across vivo and iQOO smartphones and devices.
*   Added custom high-resolution SVG logo.

## 🎨 UI & UX Improvements

### Dynamic Light & Dark Mode Hero Banner
*   **Theme-Aware Hero Assets:** The dashboard hero banner now features dedicated, high-resolution visuals tailored specifically for light and dark themes.
*   **Smooth Switch Animation:** Emulates an animated cross-fade with subtle scale zooming when toggling between light and dark modes.
*   **Adaptive Gradient Overlays:** Added morphing contrast overlays ensuring optimal typography contrast in both light and dark themes.

### Seamless Theme Transition Wave
*   **Artifact-Free Ripple Animation:** Enhanced the circular view-transition effect across the TitleBar and Sidebar theme toggles. The transition wave now emanates cleanly from the clicked trigger button in both light and dark directions without clipping artifacts, dark shadow lines, or raster boundary glitches.

### Navigation & Discovery
*   Integrated all three stores alphabetically into the **Commercial** sidebar group and **TitleBar** breadcrumb resolution.
*   Added full search querying and tag filtering support for Xiaomi GetApps, OPPO App Market, and Vivo V-Appstore on the Dashboard.

---

# EasyDist v1.4.3 Release Notes

**Release Date:** August 05, 2026

We are excited to announce the release of **EasyDist v1.4.3**! This update focuses heavily on optimization, significantly reducing the app's footprint and refining the build pipeline.

## 🛠️ Fixes & Optimizations

### Massive Size Reduction
*   **App Size Slashed:** Drastically reduced the installed application size from **~800 MB to ~165 MB**.
*   **Dependency Optimization:** Reorganized `package.json` to move massive frontend UI libraries (Next.js, React, Tailwind, etc.) to `devDependencies`, ensuring only essential runtime dependencies are bundled by Electron.
*   **Icon Build Optimization:** Prevented redundant duplication of the 1MB `icon.png` asset across multiple target sizes, saving an additional 8 MB from the final MSIX bundle.

### Taskbar Icon Fix
*   **Full-size Icons:** Fixed an issue where the EasyDist logo appeared smaller than other apps in the Windows Taskbar and Start Menu. The MSIX build script now generates special "unplated" TargetSize assets, forcing Windows to render the icon edge-to-edge without a padded background plate.

### Build Script Improvements
*   **Automatic Cleanup:** Updated `build-msix.ps1` to automatically delete all temporary packaging folders (`win-unpacked`, `__appx-x64`) and configuration files after a successful build. The `dist/` folder now remains completely clean, containing only the final `.exe` and `.msix` artifacts.

---

# EasyDist v1.4.2 Release Notes

**Release Date:** July 13, 2026

We are excited to announce the release of **EasyDist v1.4.2**! This quick follow-up update introduces Launchpad to our growing list of platforms and optimizes the desktop application bounds.

## 🚀 New Features

### Launchpad Integration
*   Added **Launchpad** (Canonical's software collaboration platform) to the Source Control sections of the dashboard and sidebar.
*   Included a dedicated informational page detailing its features, pricing, and how to utilize Personal Package Archives (PPAs).
*   Added an official, high-quality Launchpad logo to the UI.

## 🎨 UI & UX Improvements
*   **Optimal Window Sizing:** Re-adjusted the minimum window bounds to `1200x800`. This completely removes the "lowest possible ratio" constraints from the previous patch, ensuring the application always remains in its intended, expansive "App Store" layout mode without breaking.

---


# EasyDist v1.4.1 Release Notes
**Release Date:** July 13, 2026

We are excited to announce the release of **EasyDist v1.4.1**! This minor update adds support for Go Modules, updates visual assets, and includes several UI layout and type-safety improvements.

## 🚀 New Features

### Go Modules Support
*   Added an interactive 4-step configuration wizard for managing `go.mod` files and Go module distribution.
*   Go has been successfully integrated into the Language Package Managers section on the dashboard and the sidebar.

## 🎨 UI & Design Improvements
*   **Logo Updates:** Upgraded the icons for `Go`, `Packagist`, and `vcpkg` to brand new, high-quality images.
*   **Predictable Dashboard Layout:** Restructured the dashboard's top controls to prevent the Search and Filter bars from jumping to the far right on wide/fullscreen monitors. The tabs now scroll horizontally while keeping everything perfectly left-aligned.

## 🐛 Bug Fixes & Stability
*   **Type Safety:** Fixed a TypeScript typing issue where newer platforms (`Copr`, `IzzyOnDroid`, `Obtainium`, `Go`) were missing from the `HistoryItem` type union, restoring robust history tracking for these packages.
*   **Window Bounds:** Enforced a minimum window ratio/size constraint for the desktop application to prevent UI breakage on extreme downscaling.

---


# EasyDist v1.4.0 Release Notes
**Release Date:** July 13, 2026

We are excited to announce the release of **EasyDist v1.4.0**! This update focuses on giving the app a premium, native desktop feel with an expansive layout and refined interactions.

## 🚀 New Features

### Expanded Platform Support
*   **MacPorts:** Added MacPorts as a new open-source macOS package manager, complete with a 4-step interactive configuration wizard for generating Portfiles.

### Sidebar Categories
*   **Source Control:** New sidebar section added containing GitHub, GitLab, Bitbucket, Gitea, Codeberg, SourceForge, and Hugging Face.
*   **Language Managers:** New sidebar section added containing Pip, Cargo, vcpkg, Bun, npm, Docker Hub, NuGet, and Packagist.

### App Store Expansive Layout
*   Increased the maximum width of all platform pages to create a wider, commercial "App Store" experience.
*   Removed hardcoded width constraints on wizard cards to allow them to scale beautifully on modern, wide monitors.

### Native Desktop Experience
*   Disabled global text selection across the app interface to prevent accidental highlighting, making it feel like a true native application.
*   Retained text selection capabilities where it matters: inputs, text areas, and generated code blocks.

## 🐛 Bug Fixes
*   Fixed an issue where the "Download" button was overlapping with the built-in "Copy" button in CodeBlock components.
*   Fixed a missing import error (`ExternalLink`) that caused the Obtainium page to crash.

---


# EasyDist v1.3.0 Release Notes

**Release Date:** July 13, 2026

We are excited to announce the release of **EasyDist v1.3.0**! This major update brings a completely standardized 4-step interactive wizard experience across all open-source package managers.

## 🚀 New Features

### Standardized 4-Step Wizards
*   Unified the wizard experience across all 13 open-source platforms (WinGet, Scoop, Chocolatey, Homebrew, MacPorts, F-Droid, Flatpak, Snap, Nix, AUR, Copr, IzzyOnDroid, Obtainium).
*   Introduced a standard 4-step flow: 
    1. **About**: Overview and helpful resources.
    2. **Upload Installer**: Calculate file hashes directly in the browser.
    3. **App Details**: Input package metadata.
    4. **Generate Config**: Get your manifest ready for distribution.

### Enhanced Configuration Generation
*   Added dedicated **Download** buttons directly inside all generated code blocks, allowing you to instantly save your generated manifests (`.yaml`, `.json`, etc.) to your local machine.

## 🎨 Improvements
*   Added explicit "Back" buttons to the Upload Installer / APK steps across all wizards to ensure users can easily navigate back to the About section.

---


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
