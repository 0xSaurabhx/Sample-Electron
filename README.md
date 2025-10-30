# Electron Todo App

A cross-platform todo application built with Electron, React, TypeScript, and Material-UI.

## Features

- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Modern, responsive UI with dark mode
- Cross-platform (Windows, macOS, Linux)
- Data persistence using electron-store

## Development

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later) or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm run package` - Package the application for the current platform
- `npm run package:win` - Package for Windows
- `npm run package:mac` - Package for macOS
- `npm run package:linux` - Package for Linux
- `npm run lint` - Run ESLint

## Building for Production

To create a production build for your current platform:

```bash
npm run build
npm run package
```

The built application will be available in the `release` directory.

## License

MIT

## Screenshot

![Electron Todo App Screenshot](screenshot.png)
