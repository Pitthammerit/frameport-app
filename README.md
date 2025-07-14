# Frameport App

A modern, performant photo sharing and collaboration platform built with Next.js, Supabase, and Cloudflare R2.

Professional photo sharing platform for photographers.

## Features

### Current (MVP)
- 📸 Drag-and-drop photo uploads (JPEG, PNG)
- 🔐 Secure photographer authentication
- 📁 Gallery organization and management
- 🔗 Password-protected shareable links
- ⏰ Link expiration dates
- 📧 Email notifications

### Coming Soon
- 🎨 Color marking system for feedback
- ⭐ Star rating system (0-5 stars)
- 👥 Multi-photographer support
- 📱 Progressive Web App (PWA)
- 🎥 Video support (MOV)
- 🖼️ RAW and PSD file support
- 🔄 Real-time collaboration

## Tech Stack

- **Frontend**: Next.js 15+, TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Realtime)
- **Storage**: Cloudflare R2
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Cloudflare account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Pitthammerit/frameport-app.git
cd frameport-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
- Supabase credentials
- Cloudflare R2 credentials
- Email service configuration

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

See [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) for detailed organization.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run type-check` - Run TypeScript compiler

### Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## Documentation

- [Claude Integration Guide](./CLAUDE.md) - AI assistant context
- [TODO List](./todo.md) - Development roadmap
- [Project History](./project_history.md) - Decision log

## Performance Goals

- Gallery load time: <2 seconds
- Upload initiation: <500ms
- Real-time sync: <100ms latency
- Lighthouse score: >90

## Security

- JWT-based authentication
- Row Level Security (RLS) in Supabase
- Secure presigned URLs for uploads
- Input validation and sanitization
- Rate limiting on API endpoints

## License

MIT License

## Contact

For questions or support, please open an issue on GitHub.
