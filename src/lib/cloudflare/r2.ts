import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { generateUniqueFilename } from '@/lib/utils'

// Initialize R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME!

/**
 * Generate a presigned URL for uploading a file to R2
 */
export async function generatePresignedUploadUrl(
  filename: string,
  contentType: string,
  maxSizeInBytes: number = 50 * 1024 * 1024 // 50MB default
): Promise<{
  uploadUrl: string
  key: string
  fields: Record<string, string>
}> {
  const key = generateUniqueFilename(filename)
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    ContentLength: maxSizeInBytes,
    Metadata: {
      originalFilename: filename,
      uploadedAt: new Date().toISOString(),
    },
  })

  const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn: 3600 }) // 1 hour

  return {
    uploadUrl,
    key,
    fields: {
      'Content-Type': contentType,
      'Content-Length': maxSizeInBytes.toString(),
    },
  }
}

/**
 * Generate a presigned URL for downloading a file from R2
 */
export async function generatePresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  return await getSignedUrl(r2Client, command, { expiresIn })
}

/**
 * Delete a file from R2
 */
export async function deleteFile(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  await r2Client.send(command)
}

/**
 * Upload a file directly to R2 (server-side)
 */
export async function uploadFile(
  file: Buffer | Uint8Array,
  key: string,
  contentType: string,
  metadata?: Record<string, string>
): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
    Metadata: metadata,
  })

  await r2Client.send(command)
}

/**
 * Get public URL for an object (if bucket is configured for public access)
 */
export function getPublicUrl(key: string): string {
  const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT!
  const bucketName = BUCKET_NAME
  
  // Replace endpoint format for public access
  const publicEndpoint = endpoint.replace(
    'https://a9d607f4223071c884434e2efd48f485.r2.cloudflarestorage.com',
    'https://pub-a9d607f4223071c884434e2efd48f485.r2.dev'
  )
  
  return `${publicEndpoint}/${key}`
}

/**
 * Generate thumbnail key from original image key
 */
export function generateThumbnailKey(originalKey: string): string {
  const parts = originalKey.split('.')
  const extension = parts.pop()
  const nameWithoutExt = parts.join('.')
  return `${nameWithoutExt}_thumb.${extension}`
}

/**
 * Generate preview key from original image key
 */
export function generatePreviewKey(originalKey: string): string {
  const parts = originalKey.split('.')
  const extension = parts.pop()
  const nameWithoutExt = parts.join('.')
  return `${nameWithoutExt}_preview.${extension}`
}

/**
 * Get signed URL for a specific image size
 */
export async function getImageUrl(
  key: string,
  size: 'original' | 'preview' | 'thumbnail' = 'original',
  expiresIn: number = 3600
): Promise<string> {
  let imageKey = key
  
  if (size === 'thumbnail') {
    imageKey = generateThumbnailKey(key)
  } else if (size === 'preview') {
    imageKey = generatePreviewKey(key)
  }
  
  return await generatePresignedDownloadUrl(imageKey, expiresIn)
}

/**
 * Batch delete multiple files
 */
export async function deleteMultipleFiles(keys: string[]): Promise<void> {
  const deletePromises = keys.map(key => deleteFile(key))
  await Promise.all(deletePromises)
}

/**
 * Check if a file exists in R2
 */
export async function fileExists(key: string): Promise<boolean> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    
    await r2Client.send(command)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Get file metadata from R2
 */
export async function getFileMetadata(key: string): Promise<{
  size: number
  lastModified: Date
  contentType: string
  metadata: Record<string, string>
} | null> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    
    const response = await r2Client.send(command)
    
    return {
      size: response.ContentLength || 0,
      lastModified: response.LastModified || new Date(),
      contentType: response.ContentType || 'application/octet-stream',
      metadata: response.Metadata || {},
    }
  } catch (error) {
    return null
  }
}

/**
 * Configuration for different image sizes
 */
export const IMAGE_SIZES = {
  THUMBNAIL: { width: 400, height: 400 },
  PREVIEW: { width: 1200, height: 1200 },
  ORIGINAL: { width: null, height: null },
} as const

/**
 * Get appropriate image size based on use case
 */
export function getImageSize(useCase: 'gallery' | 'lightbox' | 'thumbnail'): keyof typeof IMAGE_SIZES {
  switch (useCase) {
    case 'thumbnail':
      return 'THUMBNAIL'
    case 'gallery':
      return 'PREVIEW'
    case 'lightbox':
      return 'ORIGINAL'
    default:
      return 'PREVIEW'
  }
}