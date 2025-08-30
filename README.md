# Dance of Mind Site

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- Node.js version 18.18.0 or higher

If you're using nvm, you can install the required Node.js version:

```bash
nvm install
nvm use
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages.

### Setup Instructions

1. **Enable GitHub Pages in your repository settings:**

   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **GitHub Actions**

2. **Push your changes to the master branch:**

   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin master
   ```

3. **The site will be automatically deployed to:** `https://s-SoMka-s.github.io/dance-of-mind-site/`

### Manual Build

To build the project locally for GitHub Pages:

```bash
npm run build
```

The static files will be generated in the `out` directory.

### Configuration Details

- **Static Export**: The project is configured to generate static HTML files
- **Base Path**: Set to `/dance-of-mind-site` for GitHub Pages
- **Image Optimization**: Disabled for GitHub Pages compatibility
- **Trailing Slash**: Enabled for better GitHub Pages routing

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub Pages Deployment](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) - static export documentation.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
