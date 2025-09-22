# SciFix

A comprehensive scientific tools and utilities platform built with modern web technologies.

🌐 **Live Demo:** [sci-fix.vercel.app](https://sci-fix.vercel.app)

## About SciFix

SciFix is a powerful web application designed to provide scientists, researchers, and students with essential scientific tools and utilities. The platform offers a clean, intuitive interface for various scientific calculations, data analysis tools, and educational resources.

### Key Features

- **Scientific Calculator** - Advanced mathematical calculations
- **Unit Converter** - Convert between different measurement units
- **Data Visualization** - Charts and graphs for scientific data
- **Formula Reference** - Quick access to scientific formulas
- **Educational Resources** - Learning materials and tutorials
- **Responsive Design** - Works seamlessly on all devices

## Tools & Technologies Used

### Frontend Technologies
- **Next.js 15.5.3** - React framework with App Router for optimal performance
- **TypeScript** - Type-safe JavaScript for better code quality
- **Tailwind CSS v4** - Utility-first CSS framework for rapid styling
- **React 19.1.0** - Modern React with latest features
- **Geist Fonts** - Clean, modern typography (Sans & Mono)

### Development Tools
- **Turbopack** - Ultra-fast bundler for development
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Git** - Version control and collaboration

### Deployment & Hosting
- **Vercel** - Cloud platform for deployment and hosting
- **Automatic Deployments** - CI/CD pipeline for seamless updates

### Performance Features
- **Server-Side Rendering (SSR)** - Fast initial page loads
- **Static Site Generation (SSG)** - Pre-built pages for optimal performance
- **Image Optimization** - Automatic image compression and resizing
- **Font Optimization** - Automatic font loading and optimization

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/anaszia60/SciFix.git
cd SciFix
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- The page auto-updates as you edit files
- Uses Turbopack for faster development builds
- TypeScript for type safety
- ESLint for code quality

## Project Structure

```
scifix-nextjs/
├── src/
│   └── app/                 # Next.js App Router
│       ├── layout.tsx      # Root layout component
│       ├── page.tsx        # Homepage component
│       └── globals.css     # Global styles
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack (ultra-fast)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality and consistency

## Deployment

This project is deployed on Vercel and automatically updates when you push to the main branch.

**Live URL:** [sci-fix.vercel.app](https://sci-fix.vercel.app)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org) - JavaScript with syntax for types

## License

This project is open source and available under the [MIT License](LICENSE).
