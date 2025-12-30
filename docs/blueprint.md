# **App Name**: Distri-Accel

## Core Features:

- WinGet Manifest Creation: Guided step-by-step creation of WinGet YAML manifests with schema validation and SHA256 hash calculation.
- Chocolatey Package Creation: Guided creation of .nuspec and chocolateyInstall.ps1 files, with one-click package validation and push guidance.
- Scoop Manifest Generation: Guided generation of Scoop JSON manifests with intelligent binary type detection.
- F-Droid Metadata Creation: Guided creation of F-Droid YAML metadata, prompting for source code location, build commands, and signing key details.
- Git Integration Tool: Integration with local Git installations to pre-populate commit messages and branch names for streamlined submission.
- Wizard-Based Navigation: Step-by-step wizard interface with context-sensitive help and clear explanations for each submission flow.
- Automated Field Population: Uses an LLM tool to prepopulate appropriate fields based on installer and binary information, reducing manual input and potential errors.

## Style Guidelines:

- Primary color: Windows Blue (#0078D4) to align with the Windows aesthetic.
- Background color: Light gray (#F2F2F2) to provide a clean and modern feel.
- Accent color: Darker shade of Windows Blue (#005A9E) for interactive elements and highlights.
- Font: 'Segoe UI Variable' (sans-serif) for a native Windows 11 look and feel. Note: currently only Google Fonts are supported.
- Modern, spacious layouts with rounded corners to align with Windows 11 design principles.
- Seamless, fluid animations for transitions between wizard steps, using Lottie or similar for non-blocking loading animations.
- Use icons from the Fluent UI icon set to maintain visual consistency with Windows 11.