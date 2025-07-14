import { z } from 'zod'

// =============================================================================
// DATABASE TYPES
// =============================================================================

export interface Database {
  public: {
    Tables: {
      photographers: {
        Row: {
          id: string
          email: string
          name: string
          subscription_tier: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          subscription_tier?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          subscription_tier?: string
          created_at?: string
        }
      }
      galleries: {
        Row: {
          id: string
          photographer_id: string
          name: string
          description: string | null
          cover_image: string | null
          mode: string
          settings: any
          created_at: string
        }
        Insert: {
          id?: string
          photographer_id: string
          name: string
          description?: string | null
          cover_image?: string | null
          mode?: string
          settings?: any
          created_at?: string
        }
        Update: {
          id?: string
          photographer_id?: string
          name?: string
          description?: string | null
          cover_image?: string | null
          mode?: string
          settings?: any
          created_at?: string
        }
      }
      images: {
        Row: {
          id: string
          gallery_id: string
          filename: string
          original_filename: string
          file_size: number
          file_type: string
          cloudflare_key: string
          thumbnail_key: string | null
          created_at: string
        }
        Insert: {
          id?: string
          gallery_id: string
          filename: string
          original_filename: string
          file_size: number
          file_type: string
          cloudflare_key: string
          thumbnail_key?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          gallery_id?: string
          filename?: string
          original_filename?: string
          file_size?: number
          file_type?: string
          cloudflare_key?: string
          thumbnail_key?: string | null
          created_at?: string
        }
      }
      share_links: {
        Row: {
          id: string
          gallery_id: string
          token: string
          password_hash: string | null
          permissions: string
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          gallery_id: string
          token: string
          password_hash?: string | null
          permissions?: string
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          gallery_id?: string
          token?: string
          password_hash?: string | null
          permissions?: string
          expires_at?: string | null
          created_at?: string
        }
      }
    }
  }
}

// =============================================================================
// APP TYPES
// =============================================================================

export type Photographer = Database['public']['Tables']['photographers']['Row']
export type Gallery = Database['public']['Tables']['galleries']['Row']
export type Image = Database['public']['Tables']['images']['Row']
export type ShareLink = Database['public']['Tables']['share_links']['Row']

// =============================================================================
// GALLERY TYPES
// =============================================================================

export type GalleryMode = 'presentation' | 'collaboration'

export interface GallerySettings {
  allowDownload: boolean
  allowComments: boolean
  allowRating: boolean
  allowColorMarking: boolean
  watermarkEnabled: boolean
  notificationEmails: string[]
}

export interface ExtendedGallery extends Gallery {
  images: Image[]
  shareLinks: ShareLink[]
  settings: GallerySettings
}

// =============================================================================
// IMAGE TYPES
// =============================================================================

export interface ImageUpload {
  file: File
  id: string
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
}

export interface ImageMetadata {
  width: number
  height: number
  orientation?: number
  cameraMake?: string
  cameraModel?: string
  dateTaken?: string
  location?: {
    latitude: number
    longitude: number
  }
}

export interface ExtendedImage extends Image {
  metadata?: ImageMetadata
  url: string
  thumbnailUrl?: string
  downloadUrl?: string
}

// =============================================================================
// SHARING TYPES
// =============================================================================

export type SharePermission = 'view_only' | 'view_download' | 'view_download_comment'

export interface ShareLinkOptions {
  password?: string
  expiresAt?: Date
  permissions: SharePermission
  notifyEmails?: string[]
}

export interface ExtendedShareLink extends ShareLink {
  gallery: Gallery
  isExpired: boolean
  totalViews: number
  lastViewedAt?: string
}

// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar_url?: string
  subscription_tier: string
  created_at: string
}

export interface AuthSession {
  user: AuthUser | null
  loading: boolean
  error: string | null
}

// =============================================================================
// API TYPES
// =============================================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

// =============================================================================
// FORM VALIDATION SCHEMAS
// =============================================================================

export const createGallerySchema = z.object({
  name: z.string().min(1, 'Gallery name is required').max(100, 'Gallery name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  mode: z.enum(['presentation', 'collaboration']).default('presentation'),
  settings: z.object({
    allowDownload: z.boolean().default(true),
    allowComments: z.boolean().default(false),
    allowRating: z.boolean().default(false),
    allowColorMarking: z.boolean().default(false),
    watermarkEnabled: z.boolean().default(false),
    notificationEmails: z.array(z.string().email()).default([]),
  }).default({}),
})

export const createShareLinkSchema = z.object({
  password: z.string().optional(),
  expiresAt: z.date().optional(),
  permissions: z.enum(['view_only', 'view_download', 'view_download_comment']).default('view_only'),
  notifyEmails: z.array(z.string().email()).default([]),
})

export const updatePhotographerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Valid email is required'),
})

export const uploadImageSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 50 * 1024 * 1024, // 50MB
    'File size must be less than 50MB'
  ).refine(
    (file) => ['image/jpeg', 'image/png'].includes(file.type),
    'Only JPEG and PNG files are supported'
  ),
  galleryId: z.string().uuid('Invalid gallery ID'),
})

// =============================================================================
// FORM TYPES
// =============================================================================

export type CreateGalleryForm = z.infer<typeof createGallerySchema>
export type CreateShareLinkForm = z.infer<typeof createShareLinkSchema>
export type UpdatePhotographerForm = z.infer<typeof updatePhotographerSchema>
export type UploadImageForm = z.infer<typeof uploadImageSchema>

// =============================================================================
// COMPONENT TYPES
// =============================================================================

export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ErrorState {
  hasError: boolean
  message: string
  retry?: () => void
}

export interface DropzoneProps {
  onDrop: (files: File[]) => void
  accept?: string[]
  maxFiles?: number
  maxSize?: number
  multiple?: boolean
  disabled?: boolean
  className?: string
}

export interface GalleryGridProps {
  images: ExtendedImage[]
  onImageSelect?: (image: ExtendedImage) => void
  onImageLoad?: (image: ExtendedImage) => void
  loading?: boolean
  error?: string
  className?: string
}

export interface ImageViewerProps {
  image: ExtendedImage
  images: ExtendedImage[]
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
  showNavigation?: boolean
  showInfo?: boolean
  allowDownload?: boolean
  className?: string
}

// =============================================================================
// MOBILE GESTURE TYPES
// =============================================================================

export interface GestureState {
  scale: number
  translateX: number
  translateY: number
  rotation: number
}

export interface TouchGestureProps {
  onPinch?: (scale: number) => void
  onPan?: (x: number, y: number) => void
  onRotate?: (rotation: number) => void
  onTap?: () => void
  onDoubleTap?: () => void
  onLongPress?: () => void
  disabled?: boolean
  className?: string
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface InfiniteScrollState<T> {
  items: T[]
  hasMore: boolean
  loading: boolean
  error: string | null
  page: number
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png'] as const
export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
export const MAX_FILES_PER_UPLOAD = 20
export const THUMBNAIL_SIZE = 400
export const PREVIEW_SIZE = 1200

export const GALLERY_MODES = {
  PRESENTATION: 'presentation',
  COLLABORATION: 'collaboration',
} as const

export const SHARE_PERMISSIONS = {
  VIEW_ONLY: 'view_only',
  VIEW_DOWNLOAD: 'view_download',
  VIEW_DOWNLOAD_COMMENT: 'view_download_comment',
} as const

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const