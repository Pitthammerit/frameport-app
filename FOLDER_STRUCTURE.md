# Frameport App - Folder Structure

## Project Organization

```
frameport_app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── galleries/    # Gallery CRUD operations
│   │   │   ├── upload/       # File upload endpoints
│   │   │   └── r2/           # Cloudflare R2 operations
│   │   ├── auth/             # Authentication pages
│   │   ├── galleries/        # Gallery viewing pages
│   │   └── upload/           # Upload interface pages
│   │
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── gallery/          # Gallery-specific components
│   │   └── upload/           # Upload-specific components
│   │
│   ├── lib/                   # Core libraries
│   │   ├── supabase/         # Supabase client & utilities
│   │   └── cloudflare/       # R2 client & utilities
│   │
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── contexts/              # React contexts (auth, etc.)
│   ├── services/              # Business logic services
│   ├── middleware/            # Next.js middleware
│   └── styles/                # Global styles & Tailwind
│
├── public/                    # Static assets
├── tests/                     # Test files
├── docs/                      # Documentation
└── scripts/                   # Build & deployment scripts
```

## Directory Purpose Guide

- **app/**: Next.js 13+ App Router structure for pages and API routes
- **components/**: Modular React components organized by feature
- **lib/**: External service integrations (Supabase, Cloudflare R2)
- **hooks/**: Custom hooks for auth, data fetching, etc.
- **types/**: TypeScript interfaces for type safety
- **utils/**: Helper functions for image processing, validation, etc.
- **contexts/**: Global state management (auth, theme, etc.)
- **services/**: Business logic separate from components
- **middleware/**: Auth checks, rate limiting, etc.
- **styles/**: Tailwind configuration and global CSS
