import { useEffect, useRef, useState } from 'react';

export interface FotoGaleria {
  thumbSrc: string;
  thumbWidth: number;
  thumbHeight: number;
  fullSrc: string;
  fullWidth: number;
  fullHeight: number;
  alt: string;
}

interface Props {
  fotos: FotoGaleria[];
}

export default function GalleryLightbox({ fotos }: Props) {
  const [indiceActivo, setIndiceActivo] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (indiceActivo === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
  }, [indiceActivo]);

  function cerrar() {
    setIndiceActivo(null);
  }

  function siguiente() {
    setIndiceActivo((actual) => (actual === null ? null : (actual + 1) % fotos.length));
  }

  function anterior() {
    setIndiceActivo((actual) => (actual === null ? null : (actual - 1 + fotos.length) % fotos.length));
  }

  const fotoActiva = indiceActivo === null ? null : fotos[indiceActivo];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {fotos.map((foto, indice) => (
          <button
            key={foto.thumbSrc}
            type="button"
            onClick={() => setIndiceActivo(indice)}
            className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-transform hover:-translate-y-1 hover:shadow-lg"
            aria-label={`Ver foto ampliada: ${foto.alt}`}
          >
            <img
              src={foto.thumbSrc}
              width={foto.thumbWidth}
              height={foto.thumbHeight}
              alt={foto.alt}
              loading="lazy"
              className="h-32 w-full object-cover sm:h-40"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={cerrar}
        className="max-h-[90vh] max-w-[95vw] rounded-2xl bg-white p-0 backdrop:bg-black/80 md:max-w-3xl"
        aria-label="Foto ampliada"
      >
        {fotoActiva && (
          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar foto ampliada"
              className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-tinta/70 text-white"
            >
              ✕
            </button>
            <img
              src={fotoActiva.fullSrc}
              width={fotoActiva.fullWidth}
              height={fotoActiva.fullHeight}
              alt={fotoActiva.alt}
              className="max-h-[80vh] w-auto rounded-2xl object-contain"
            />
            <div className="flex w-full items-center justify-between gap-2 p-3">
              <button
                type="button"
                onClick={anterior}
                aria-label="Foto anterior"
                className="rounded-full bg-menta-light px-4 py-2 font-bold text-tinta"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={siguiente}
                aria-label="Foto siguiente"
                className="rounded-full bg-menta-light px-4 py-2 font-bold text-tinta"
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
