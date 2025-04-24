# Portfolio Website - Konstantine.fr

A modern portfolio website built with React 18, Vite, and shadcn/ui.

## Setup Instructions

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-konstantine-fr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your local development settings.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Production Deployment (OVH)

1. Create production environment file:
   ```bash
   cp env.example .env.production
   ```
   Edit `.env.production` with your production settings.

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy to OVH:
   - Set up Git webhooks in OVH panel
   - Push to your repository to trigger automatic deployment
   - Ensure the `.htaccess` file is properly configured

## OVH Specific Configuration

The `.htaccess` file is configured to:
- Handle client-side routing (React Router)
- Set appropriate caching headers
- Enable compression
- Add security headers

## Features

- Modern React 18 with Vite build system
- Styled with shadcn/ui components
- Responsive design with mobile-first approach
- Docker-style UI with bottom navigation
- Portfolio showcasing projects and skills

## License

[MIT](LICENSE)
