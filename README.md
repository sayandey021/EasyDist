<p align="center">
  <img src="icon.png" alt="EasyDist Logo" width="128" height="128">
</p>

<h1 align="center">EasyDist</h1>

<p align="center">
  <strong>Your all-in-one software distribution helper</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-supported-platforms">Platforms</a> •
  <a href="#-installation">Installation</a> •
  <a href="#%EF%B8%8F-development">Development</a> •
  <a href="#-license">License</a>
</p>

<p align="center">
  <a href="https://apps.microsoft.com/detail/9NZHV6S6MVQG">
    <img src="https://get.microsoft.com/images/en-us%20dark.svg" width="200" alt="Get it from Microsoft Store">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/sayandey021/EasyDist/releases/latest">
    <img src="https://github.com/nicehero/get-it-on-github/raw/main/get-it-on-github.svg" width="200" alt="Get it on GitHub">
  </a>
</p>

<p align="center">
  <a href="https://github.com/sayandey021/EasyDist/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-AGPL--3.0-orange?style=flat-square" alt="License">
  </a>
  &nbsp;
  <a href="https://apps.microsoft.com/detail/9NZHV6S6MVQG">
    <img src="https://img.shields.io/badge/Platform-Windows%2010%2F11-0078D4?style=flat-square&logo=windows11&logoColor=white" alt="Platform">
  </a>
</p>

---

## 🎯 Overview

**EasyDist** is a modern desktop application that simplifies software distribution by providing a unified hub for publishing your apps across 30+ platforms. Whether you're distributing games, mobile apps, or desktop software, EasyDist guides you through the submission process for each platform with step-by-step instructions and interactive wizards.

Built with Next.js and Electron, EasyDist offers a beautiful Windows 11-style interface with Mica effects, smooth animations, and a premium user experience.

## ✨ Features

- **30+ Distribution Platforms** — Gaming stores, app stores, package managers, and more
- **Interactive Wizards** — Step-by-step config generators for complex platforms (Copr, Obtainium, IzzyOnDroid, etc.)
- **Platform Dashboard** — Beautiful grid/list/icon views with tag filtering and search
- **Verified Pricing Info** — Accurate fee information for each platform
- **One-Click Access** — Quick links to developer portals and submission pages
- **Modern UI** — Windows 11 Mica effects, Fluent Design, smooth animations

## 🎮 Supported Platforms

### Gaming
| Platform | Fee |
|----------|-----|
| Steam | $100/game |
| Epic Games Store | $100/game |
| Xbox (ID@Xbox) | Free |
| PlayStation | Invite-only |
| Nintendo | Apply required |
| GOG | Free (rev share) |
| Itch.io | Free |
| Game Jolt | Free |
| Poki | Free |
| Newgrounds | Free |

### Mobile
| Platform | Fee |
|----------|-----|
| Google Play Store | $25 one-time |
| Apple App Store | $99/year |
| Amazon Appstore | Free |
| Samsung Galaxy Store | Free |
| Huawei AppGallery | $150-250/year |
| F-Droid | Free |
| APKPure | Free |
| Uptodown | Free |
| Aptoide | Free |
| APKMirror | Free |
| IzzyOnDroid | Free |
| Obtainium | Free |
| OpenAPK | Free |
| Belberi | Free |
| AltStore PAL | Free |

### Desktop & Package Managers
| Platform | Fee |
|----------|-----|
| Microsoft Store | Free (MSIX) |
| Flathub | Free |
| Snap Store | Free |
| WinGet | Free |
| Chocolatey | Free |
| Scoop | Free |
| Homebrew | Free |
| AUR | Free |
| Nix | Free |
| Copr | Free |
| Open Build Service | Free |

### Commercial Portals
| Platform | Fee |
|----------|-----|
| Softonic | Free |
| Malavida | Free |

## 💻 Installation

### Download
Download the latest installer from the [Releases](https://github.com/sayandey021/EasyDist/releases) page:
- **Windows Installer (.exe)** — Standard NSIS installer
- **MSIX Package** — Microsoft Store style installation

### System Requirements
- Windows 10 version 1809 or later
- Windows 11 recommended for best UI experience

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/sayandey021/EasyDist.git
cd EasyDist

# Install dependencies
npm install

# Run in development mode
npm run electron:dev
```

### Build
```bash
# Build Windows installer (.exe)
npm run electron:build:nsis

# Build MSIX package
npm run electron:build:msix
```

## 🏗️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with React 18
- **Desktop:** [Electron](https://www.electronjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Windows Effects:** [Mica Electron](https://github.com/AdiHarif/mica-electron)

## 📄 License

This project is licensed under the [AGPL-3.0 License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ☕ Support

If you find EasyDist helpful, consider supporting the development:

<a href="https://ko-fi.com/saayanstudio">
  <img src="https://img.shields.io/badge/Ko--fi-Support%20Development-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Ko-fi">
</a>

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/sayandey021">Saayan Studio</a>
</p>
