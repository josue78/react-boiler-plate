# React Boiler Plate

Base project for web applications developed with React, TypeScript, and Vite. Includes a complete setup with UI components, routing, internationalization, and development tools.

## Description

This is a boilerplate project that provides a complete configuration to start developing React applications with TypeScript using Vite as a build tool. It includes:

- **Mantine UI** - Modern and accessible React component library
- **React Router** - Routing for single-page applications (SPA)
- **i18next** - Internationalization (i18n) with support for multiple languages
- **TypeScript** - Static typing for increased safety and productivity
- **ESLint** - Linter configured with rules for React and TypeScript
- **Husky** - Git hooks to automate tasks
- **Commitlint** - Commit message validation following conventions
- **Driver.js** - Library for creating guided tours in the application

## Prerequisites

Before starting, make sure you have installed:

- **Node.js** (version 18 or higher)
- **npm** (included with Node.js)

You can verify the installed versions by running:

```bash
node --version
npm --version
```

## Installation

1. Clone or download this repository
2. Install the project dependencies:

```bash
npm install
```

3. (Optional) Configure environment files according to the mode you will use:
   - `.env.development` - Variables for development
   - `.env.staging` - Variables for staging
   - `.env.production` - Variables for production
   - `.env` - Variables shared across all modes

## Available Commands

### Development

Start the development server with Hot Module Replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

#### Development Modes

You can also run the server in different modes:

```bash
npm run dev:staging    # Staging mode
npm run dev:prod      # Production mode (simulates production locally)
```

### Build

Compile the project for production:

```bash
npm run build
```

Optimized files will be generated in the `dist/` folder.

#### Build Modes

```bash
npm run build:staging  # Build for staging
npm run build:prod     # Build for production
```

### Preview

Preview the production version locally:

```bash
npm run preview
```

### Linting

Run the linter to check the code:

```bash
npm run lint
```

## Project Structure

```
react-boiler-plate/
├── public/                    # Public static files
│   └── vite.svg
├── src/                       # Application source code
│   ├── assets/                # Resources such as images, icons, etc.
│   │   └── react.svg
│   ├── components/            # Shared components
│   │   └── DataGrid/         # Data table component
│   ├── features/             # Features organized by domain
│   │   └── dashboard/        # Dashboard feature
│   │       ├── components/   # Feature-specific components
│   │       ├── hooks/        # Feature-specific hooks
│   │       ├── services/     # Feature services/API
│   │       └── index.ts      # Barrel export
│   ├── i18n/                 # Internationalization configuration
│   │   ├── config.ts         # i18next configuration
│   │   └── locales/          # Translation files
│   │       ├── en.json       # English translations
│   │       └── es.json       # Spanish translations
│   ├── layout/               # Shared layout components
│   │   ├── components/       # Layout components
│   │   │   ├── AppShell.tsx  # Main application shell
│   │   │   ├── LanguageToggle.tsx  # Language selector
│   │   │   ├── NavMenu.tsx   # Navigation menu
│   │   │   ├── Sidebar.tsx   # Sidebar
│   │   │   └── ThemeToggle.tsx  # Theme selector
│   │   └── types/            # Layout-related types
│   │       └── menu.types.ts
│   ├── shared/               # Code shared between features
│   │   ├── components/       # Reusable components
│   │   ├── config/           # Shared configurations
│   │   │   └── env.ts        # Environment variables configuration
│   │   ├── hooks/             # Shared hooks
│   │   │   └── useTour.ts    # Hook for guided tours
│   │   └── utils/            # Utilities
│   ├── App.tsx               # Main application component
│   ├── App.css               # App component styles
│   ├── main.tsx              # Application entry point
│   ├── index.css             # Global styles
│   └── vite-env.d.ts         # Vite types
├── .husky/                   # Git hooks (automatically configured)
├── index.html                # Main HTML template
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # TypeScript configuration for the app
├── tsconfig.node.json        # TypeScript configuration for Node
├── vite.config.ts            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

## Technologies Used

### Main Dependencies

- **React** (^19.2.0) - Library for building user interfaces
- **React DOM** (^19.2.0) - React rendering in the DOM
- **TypeScript** (~5.9.3) - JavaScript superset with static typing
- **Vite** (^7.2.2) - Build tool and development server
- **@mantine/core** (8.3.8) - Modern UI component library
- **@mantine/hooks** (8.3.8) - Useful Mantine hooks
- **React Router DOM** (^7.9.6) - Routing for React applications
- **i18next** (^25.6.3) - Internationalization framework
- **react-i18next** (^16.3.5) - i18next integration with React
- **i18next-browser-languagedetector** (^8.2.0) - Automatic language detection
- **@tabler/icons-react** (^3.35.0) - Tabler React icons
- **driver.js** (^1.4.0) - Library for creating guided tours

### Development Dependencies

- **ESLint** (^9.39.1) - Linter to maintain code quality
- **TypeScript ESLint** (^8.46.3) - ESLint rules for TypeScript
- **Husky** (^9.1.7) - Git hooks to automate tasks
- **Commitlint** (^20.1.0) - Commit message validation
- **@vitejs/plugin-react** (^5.1.0) - Vite plugin for React

## Features

### Development

- ⚡ **Fast development with Vite** - Instant server startup
- 🔥 **Hot Module Replacement (HMR)** - Automatic reload without losing state
- 📦 **TypeScript configured** - Complete static typing
- 🎯 **ESLint configured** - Rules for React and TypeScript
- 🚀 **Production optimized** - Automatically optimized builds
- 🌍 **Multiple environment modes** - Development, Staging, and Production

### UI and UX

- 🎨 **Mantine UI** - Modern and accessible components
- 🌓 **Light/Dark theme** - Support for light and dark mode
- 🗺️ **React Router** - Complete navigation with nested routes
- 🎯 **Guided tours** - Driver.js integration for onboarding

### Internationalization

- 🌐 **i18next** - Complete support for multiple languages
- 🔍 **Automatic detection** - Detects browser language
- 💾 **Persistence** - Saves language preference in localStorage
- 📝 **Supported languages** - Spanish (default) and English

### Code Quality

- ✅ **Git Hooks** - Automatic validation with Husky
- 📋 **Commitlint** - Commit messages following conventions
- 🔍 **Strict TypeScript** - Strict configuration for increased safety
- 📐 **Modular structure** - Organization by features and shared

## Architecture

The project follows a feature-based architecture, where each feature is an independent module that contains:

- **components/** - Feature-specific components
- **hooks/** - Feature-specific custom hooks
- **services/** - Business logic and API calls
- **index.ts** - Barrel export to facilitate imports

Shared components and utilities are located in:
- **shared/** - Reusable code between features
- **layout/** - Structure and navigation components

## Environment Configuration

The project supports multiple environment modes through `.env` files:

- `.env` - Shared variables (lowest priority)
- `.env.development` - Variables for development
- `.env.staging` - Variables for staging
- `.env.production` - Variables for production (highest priority)

Vite automatically loads the corresponding file according to the specified mode.

## Internationalization

The project is configured with i18next to support multiple languages:

- **Default language**: Spanish (es)
- **Supported languages**: Spanish (es), English (en)
- **Automatic detection**: Based on localStorage and browser
- **Translation files**: `src/i18n/locales/`

To add a new language:
1. Create a `[code].json` file in `src/i18n/locales/`
2. Add the language code in `src/i18n/config.ts`

## Git Hooks

The project includes Husky to automatically execute tasks:

- **Pre-commit**: Code validation (configurable)
- **Commit-msg**: Commit message validation with Commitlint

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting changes
- `refactor:` - Code refactoring
- `test:` - Add or modify tests
- `chore:` - Maintenance tasks

## Development

This project uses Vite as a bundler, which provides:

- Instant development server startup
- Ultra-fast Hot Module Replacement (HMR)
- Automatic production optimizations
- Native TypeScript support
- Automatic tree-shaking
- Optimized code splitting

## License

This project is open source and available under the MIT license.
