'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ImagenConFallback({
  src,
  alt,
  priority = false,
  quality,
  ...props
}) {
  // Creo un estado para manejar la imagen actual
  const [srcActual, setSrcActual] = useState(src);

  return (
    <Image
      src={srcActual}
      alt={alt}
      priority={priority}
      quality={quality}
      onError={() => setSrcActual('/images/fallback.png')} // Si picsum devuelve un error, uso esta imagen de fallback
      {...props}
    />
  );
}
