# Indo Movie Quo

Indo Movie Quo is a web application that serves as a comprehensive database for movie quotes from Indian cinema. It allows users to search, translate, and contribute their favorite movie quotes.

## Features

### 1. Quote Search
- Search through a vast collection of movie quotes
- User-friendly search interface with instant results
- View detailed information about quotes including movie context

### 2. Translation Support
- Translate movie quotes between different languages
- Preserve cultural context during translation
- Support for multiple Indian languages

### 3. Contribution System
- User contribution portal for adding new quotes
- Quality control system for submitted quotes
- Community-driven content growth

## Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **UI Components**: Tailwind CSS, shadcn/ui
- **Package Management**: pnpm
- **Monorepo Structure**: Turborepo

## Project Structure

```
/apps
  /main        # Main web application
  /admin       # Admin dashboard
  /server      # Backend API server
/packages
  /ui          # Shared UI components
  /eslint-config   # Shared ESLint configuration
  /typescript-config   # Shared TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Indian-Version-of-QuoDB-Site.git
cd Indian-Version-of-QuoDB-Site
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Development

- `pnpm dev` - Start the development server
- `pnpm build` - Build all applications and packages
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.