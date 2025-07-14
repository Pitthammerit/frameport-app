# TODO List - Frameport App

## Phase 1: MVP Foundation (Current)

### Week 1-2: Infrastructure Setup
- [ ] Initialize Next.js project with TypeScript and Tailwind
- [ ] Set up Git repository and initial commit
- [ ] Configure ESLint and Prettier
- [ ] Set up environment variables structure
- [ ] Create Supabase project
- [ ] Design initial database schema
  - [ ] Users table (photographers)
  - [ ] Galleries table
  - [ ] Photos table
  - [ ] Gallery links table
- [ ] Set up Cloudflare R2 bucket
- [ ] Configure R2 client with AWS SDK
- [ ] Implement presigned URL generation
- [ ] Set up basic CI/CD with Vercel

### Week 3-4: Core Features
- [ ] Implement Supabase authentication
  - [ ] Sign up flow for photographers
  - [ ] Login/logout functionality
  - [ ] Protected routes middleware
- [ ] Create drag-and-drop upload component
  - [ ] Support JPEG and PNG only for MVP
  - [ ] Show upload progress
  - [ ] Handle multiple file uploads
- [ ] Build basic gallery display
  - [ ] Grid layout for photos
  - [ ] Mobile-responsive design
  - [ ] Basic image viewer modal
  - [ ] Implement pinch-to-zoom on mobile
- [ ] Create gallery management
  - [ ] Create new gallery
  - [ ] Add photos to gallery
  - [ ] Basic folder structure
- [ ] Implement link sharing
  - [ ] Generate shareable links
  - [ ] Password protection
  - [ ] Link expiration dates
  - [ ] Copy link functionality
- [ ] Set up email sending via Supabase
  - [ ] Email templates
  - [ ] Send gallery links to clients

## Phase 2: Enhanced Features (Next)

### Rating & Collaboration Systems
- [ ] Implement color marking system
  - [ ] 3-5 color options
  - [ ] Keyboard shortcuts (1-5)
  - [ ] Visual feedback on selection
  - [ ] Persist markings to database
- [ ] Build star rating component
  - [ ] 0-5 star rating
  - [ ] Keyboard shortcuts (0-5)
  - [ ] Half-star support?
- [ ] Create collaboration mode
  - [ ] Show markings and ratings
  - [ ] Add comments feature
  - [ ] Export feedback summary
- [ ] Create presentation mode
  - [ ] Clean gallery view
  - [ ] Download options
  - [ ] Slideshow feature

### Advanced File Support
- [ ] Add RAW file support
  - [ ] Handle CR2, NEF, ARW formats
  - [ ] Generate preview thumbnails
  - [ ] Implement lazy loading
- [ ] Add PSD file support
  - [ ] Generate PNG previews
  - [ ] Show file metadata
- [ ] Optimize image delivery
  - [ ] Implement image CDN
  - [ ] Generate multiple sizes
  - [ ] WebP conversion

### Multi-User & Permissions
- [ ] Implement multi-photographer support
  - [ ] Organization/team structure
  - [ ] Shared galleries
  - [ ] User management
- [ ] Build permission system
  - [ ] View-only access
  - [ ] View + Download
  - [ ] View + Download + Delete
  - [ ] Full access (includes upload)
- [ ] Create permission UI
  - [ ] Easy permission toggles
  - [ ] Bulk permission updates

## Phase 3: Real-time & Mobile

### Real-time Features
- [ ] Implement Supabase Realtime
  - [ ] Live photo uploads
  - [ ] Real-time markings
  - [ ] Presence indicators
  - [ ] Sync conflict resolution
- [ ] Add collaboration notifications
  - [ ] New photo alerts
  - [ ] Marking updates
  - [ ] Comment notifications

### PWA Implementation
- [ ] Create service worker
  - [ ] Offline gallery viewing
  - [ ] Background sync for uploads
  - [ ] Cache management
- [ ] Implement push notifications
  - [ ] Gallery update alerts
  - [ ] Client feedback notifications
- [ ] Add install prompts
  - [ ] iOS installation guide
  - [ ] Android installation
- [ ] Optimize for mobile
  - [ ] Touch gestures
  - [ ] Swipe navigation
  - [ ] Haptic feedback

### Video Support
- [ ] Add MOV file support
  - [ ] Video player component
  - [ ] Thumbnail generation
  - [ ] Streaming optimization

## Technical Debt & Optimization

### Performance
- [ ] Implement lazy loading for galleries
- [ ] Add virtual scrolling for large galleries
- [ ] Optimize bundle size
- [ ] Implement code splitting
- [ ] Add performance monitoring

### Testing
- [ ] Set up Jest and React Testing Library
- [ ] Write unit tests for utilities
- [ ] Create integration tests for API routes
- [ ] Implement E2E tests with Playwright
- [ ] Set up visual regression testing

### Documentation
- [ ] Create API documentation
- [ ] Write component storybook
- [ ] Document deployment process
- [ ] Create user guides
- [ ] Write contributing guidelines

### Security
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Set up security headers
- [ ] Implement audit logging
- [ ] Regular dependency updates

## Future Considerations

### AI Features
- [ ] Auto-tagging with vision AI
- [ ] Smart gallery organization
- [ ] Duplicate detection
- [ ] Face grouping
- [ ] Content-aware search

### Business Features
- [ ] Billing integration
- [ ] Usage analytics
- [ ] Client portal
- [ ] White-label options
- [ ] API for third-party integrations

## Notes
- Always prioritize mobile experience
- Keep performance metrics in mind
- Maintain backwards compatibility
- Regular security audits
- User feedback integration
