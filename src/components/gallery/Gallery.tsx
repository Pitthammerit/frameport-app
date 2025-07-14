'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLastViewedPhoto } from '../../lib/useLastViewedPhoto';
import type { ImageProps } from '../../lib/gallery-types';
import Modal from './Modal';

interface GalleryProps {
  images: ImageProps[];
  galleryId?: string;
  title?: string;
}

export default function Gallery({ images, galleryId, title }: GalleryProps) {
  const [lastViewedPhoto] = useLastViewedPhoto();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // Scroll to last viewed photo if it exists
    if (lastViewedPhoto && !modalOpen) {
      const lastViewedPhotoRef = document.getElementById(`photo-${lastViewedPhoto}`);
      if (lastViewedPhotoRef) {
        lastViewedPhotoRef.scrollIntoView({ block: 'center' });
      }
    }
  }, [lastViewedPhoto, modalOpen]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">No images in this gallery</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-[1960px] p-4">
        {title && (
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            {title}
          </h1>
        )}
        
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative mb-4 break-inside-avoid"
            >
              <Image
                id={`photo-${image.id}`}
                alt={image.title || `Gallery image ${index + 1}`}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110 cursor-pointer"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                src={image.image_url}
                width={parseInt(image.width)}
                height={parseInt(image.height)}
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1280px) 50vw,
                       (max-width: 1536px) 33vw,
                       25vw"
                onClick={() => openModal(index)}
                placeholder={image.blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={image.blurDataUrl}
              />
              
              {/* Overlay for interaction feedback */}
              <div className="absolute inset-0 rounded-lg bg-black opacity-0 transition-opacity group-hover:opacity-10" />
              
              {/* Optional image info overlay */}
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-lg">
                  <p className="text-white text-sm font-medium truncate">
                    {image.title}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal
          images={images}
          onClose={closeModal}
        />
      )}
    </>
  );
}