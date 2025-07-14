/* eslint-disable no-unused-vars */

// Adapted from Cloudinary types to work with Cloudflare R2
export interface ImageProps {
  id: number;
  height: string;
  width: string;
  image_url: string; // Full Cloudflare R2 URL instead of public_id
  format: string;
  blurDataUrl?: string;
  // Optional metadata for Frameport features
  title?: string;
  description?: string;
  uploaded_at?: string;
  file_size?: number;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

// Additional types for our Frameport gallery features
export interface GalleryProps {
  images: ImageProps[];
  galleryId?: string;
  title?: string;
  isPublic?: boolean;
  password?: string;
}

export interface ColorMark {
  id: string;
  x: number;
  y: number;
  color: string;
  comment?: string;
  created_at: string;
}

export interface ImageRating {
  image_id: number;
  rating: number; // 0-5 stars
  created_at: string;
}