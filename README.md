# EasyDist - Microsoft Store Description


## Description

**Simplify Your Software Distribution**

EasyDist is a powerful, open-source desktop utility designed to take the headache out of packaging and publishing software. Whether you are an indie developer, a FOSS maintainer, or a studio, EasyDist streamlines the complex process of getting your app into the hands of users across every major platform.

**🚀 Key Features:**

*   **Multi-Platform Packaging:**
    *   **Windows:** Create standard installers (NSIS) and modern Store-ready packages (MSIX) with ease.
    *   **Linux:** Generate configuration files and build commands for Flatpak (Flathub), Snap (Snapcraft), Arch User Repository (AUR), NixOS, and AppImage.
    *   **Mobile:** Prepare releases for Android (Play Store, Amazon Appstore) and instruction sets for F-Droid.

*   **Store-Ready Workflows:**
    Stop fighting with complex documentation. EasyDist provides visual wizards that walk you through the requirements for major app stores, ensuring you have the right metadata, icons, and configurations ready for submission.

*   **Commercial & Indie Store Support:**
    Includes guidance and setups for distributing on platforms like GOG, Itch.io, and Game Jolt, making it perfect for game developers.

*   **Privacy-First & Local:**
    EasyDist runs 100% locally on your machine. Your private keys, project files, and configurations never leave your computer. We value your privacy and security.

*   **Modern & Intuitive UI:**
    Built with a clean, dark-themed interface that makes navigating complex distribution options simple and efficient.

**Why EasyDist?**
Releasing software shouldn't be harder than building it. EasyDist bridges the gap between your code and your users, automating the tedious parts of distribution so you can focus on building great software.

**Download EasyDist today and ship faster!**

## Restricted Capabilities Justification (runFullTrust)

**Reason for Request:**
EasyDist is a desktop development utility built with the Electron framework. It requires the `runFullTrust` capability to function correctly because:

1.  **File System Access:** The application needs unrestricted access to the user's file system to create project directories, write configuration files, and generate build artifacts in locations chosen by the user.
2.  **Process Management:** It functions as a GUI wrapper for build tools and needs to spawn child processes (CLI commands) to compile and package applications for different platforms.
3.  **Electron Architecture:** As a desktop bridge application, `runFullTrust` is required to allow the Electron runtime to operate as a standard Win32 desktop application without the limitations of the AppContainer sandbox.
