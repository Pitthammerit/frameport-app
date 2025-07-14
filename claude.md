# Claude Integration Guide

## Project Overview
This is Frameport App - a photo collaboration platform built with Next.js, Supabase, and Cloudflare R2. The platform enables photographers to share galleries with clients, collect feedback through color markings and star ratings, and manage permissions.

## Key Technologies
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Realtime)
- **Storage**: Cloudflare R2 (for images and files)
- **Deployment**: V0 (Vercel) Visually and on project start, and Claude Code for implementation

## Project Context
This platform aims to streamline the photographer-client collaboration process with features like:
- Drag-and-drop photo uploads (JPEG, PNG, RAW, PSD)
- Password-protected gallery sharing
- Real-time collaboration with color markings (3-5 colors)
- Star rating system (0-5 stars)
- Two modes: Collaboration (feedback) and Presentation (viewing/downloading)
- Client permissions without requiring login

## Important Architecture Decisions
1. **Direct Upload to R2**: Using presigned URLs for optimal performance
2. **Supabase RLS**: Row Level Security for multi-tenant data isolation
3. **Real-time Features**: Using Supabase channels for live collaboration
4. **Mobile-First**: Native gestures and PWA capabilities

## Current Development Phase
Starting MVP development (Phase 1) focusing on:
- Single photographer authentication
- Basic upload functionality
- Gallery creation and sharing
- Password protection and link expiration

## Code Style Guidelines
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Implement error boundaries and loading states
- Write clean, self-documenting code
- Use Tailwind for styling (core utilities only)

## File Naming Conventions
- Components: PascalCase (e.g., `GalleryView.tsx`)
- Utilities: camelCase (e.g., `imageProcessor.ts`)
- Types: PascalCase with `.types.ts` extension
- API Routes: kebab-case folders

## Testing Strategy
- Unit tests for utilities and hooks
- Integration tests for API routes
- E2E tests for critical user flows
- Visual regression tests for UI components

## Security Considerations
- JWT-based authentication
- Supabase Row Level Security
- Secure presigned URLs for uploads
- Input validation and sanitization
- Rate limiting on API routes

## Performance Goals
- <2s gallery load times
- <500ms upload initiation
- <100ms real-time collaboration latency
- Optimized image delivery via Cloudflare

## When working on this project:
1. Always consider mobile experience first
2. Implement proper error handling
3. Follow the established folder structure
4. Write tests for new features
5. Document API endpoints and complex logic
6. Use environment variables for sensitive data
7. Optimize for performance and user experience
