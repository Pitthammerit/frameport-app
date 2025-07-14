import Gallery from '../../components/gallery/Gallery';
import type { ImageProps } from '../../lib/gallery-types';

// Sample data for testing - will be replaced with Supabase data
const sampleImages: ImageProps[] = [
  {
    id: 1,
    height: "800",
    width: "600", 
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
    format: "jpg",
    title: "Mountain Landscape",
    blurDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
  },
  {
    id: 2,
    height: "900",
    width: "600",
    image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=900&fit=crop",
    format: "jpg", 
    title: "Forest Path",
    blurDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
  },
  {
    id: 3,
    height: "600",
    width: "800",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    format: "jpg",
    title: "Ocean Sunset"
  },
  {
    id: 4,
    height: "700",
    width: "500",
    image_url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=700&fit=crop",
    format: "jpg",
    title: "City Lights"
  },
  {
    id: 5,
    height: "900",
    width: "600",
    image_url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=900&fit=crop",
    format: "jpg",
    title: "Cherry Blossoms"
  }
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <Gallery 
          images={sampleImages}
          title="Sample Photo Gallery"
          galleryId="sample-gallery"
        />
      </div>
    </main>
  );
}