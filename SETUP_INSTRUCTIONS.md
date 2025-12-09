# Setup Instructions

## Project Structure

This project has been set up as a **Next.js 14** application with:
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **shadcn/ui** - High-quality React components
- ✅ **Framer Motion** - Smooth animations
- ✅ **Lucide React** - Icon library

## Component Structure

The default path for components is `/components/ui/` which is the standard shadcn/ui convention. This folder structure is important because:
- shadcn/ui components are designed to live in `/components/ui/`
- This allows easy component management and organization
- Follows Next.js and React best practices
- Makes it easy to add more shadcn components later using `npx shadcn@latest add [component-name]`

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
my-js-app/
├── app/
│   ├── globals.css          # Global styles with Tailwind directives
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page (renders landing page)
├── components/
│   └── ui/
│       ├── landing-page.tsx # Main portfolio landing page component
│       ├── button.tsx       # shadcn Button component
│       ├── input.tsx        # shadcn Input component
│       └── textarea.tsx     # shadcn Textarea component
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies and scripts
```

## Adding More shadcn Components

To add more shadcn/ui components in the future, use:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add card
npx shadcn@latest add dialog
```

Components will automatically be added to `/components/ui/` as configured in `components.json`.

## Key Features

- **Sticky Header** - Smooth scroll navigation with backdrop blur
- **Hero Section** - Personalized introduction with call-to-action buttons
- **About Section** - Academic background and interests
- **Experience Section** - Three-column grid of professional experiences
- **Projects Section** - Bento-style grid showcasing key projects
- **Leadership Section** - Involvement and leadership roles
- **Skills Section** - Organized skill categories
- **Contact Section** - Contact form and information
- **Responsive Design** - Mobile-first approach with breakpoints
- **Smooth Animations** - Framer Motion animations throughout

## Environment Variables

No environment variables are required for basic functionality. The contact form is non-functional (no backend) as specified.

## Image Assets

The landing page uses Unsplash images for:
- Hero section (tech workspace)
- Project showcases (data visualization, dashboards)

Images are loaded via Next.js Image component with optimization.

## Customization

All content is editable in `/components/ui/landing-page.tsx`. The component is fully typed with TypeScript for easy modifications.

