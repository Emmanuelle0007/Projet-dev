import { ReactNode, useState } from 'react';

interface CardProps {
    children: ReactNode;
    image?: string;
    images?: string[];
    badge?: string;
    favorite?: boolean;
    onFavoriteToggle?: () => void;
}

export const Card = ({
                         children,
                         image,
                         images = [],
                         badge,
                         favorite = false,
                         onFavoriteToggle,
                     }: CardProps) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const allImages = images.length > 0 ? images : (image ? [image] : []);

    return (
        <div
            className="group relative bg-white overflow-hidden cursor-pointer"
            style={{
                borderRadius: '2px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* IMAGE */}
            <div className="relative overflow-hidden" style={{ height: '320px' }}>
                <img
                    src={allImages[currentImgIndex]}
                    alt=""
                    className="w-full h-full object-cover pointer-events-none"
                    style={{ transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80';
                    }}
                />

                {/* Dots de navigation */}
                {allImages.length > 1 && (
                    <div
                        className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            padding: '32px 20px 24px',
                            display: 'flex',
                            gap: '12px',
                            justifyContent: 'center',
                            zIndex: 20,
                        }}
                    >
                        {allImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImgIndex(i);
                                }}
                                style={{
                                    width: '40px',
                                    height: '5px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: currentImgIndex === i ? '#D4A853' : 'rgba(255,255,255,0.6)',
                                }}
                                aria-label={`Image ${i + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Flèche gauche */}
                {allImages.length > 1 && (
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.95)',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            zIndex: 15,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
                        }}
                    >
                        <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Flèche droite */}
                {allImages.length > 1 && (
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.95)',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            zIndex: 15,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
                        }}
                    >
                        <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                {/* Badge catégorie */}
                {badge && (
                    <div
                        className="absolute top-4 left-4 text-white uppercase px-3 py-1.5"
                        style={{
                            background: 'rgba(15,23,42,0.85)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '2px',
                            fontSize: '11px',
                            letterSpacing: '0.12em',
                            fontWeight: '500',
                            zIndex: 10,
                        }}
                    >
                        {badge}
                    </div>
                )}

                {/* Bouton Favori */}
                {onFavoriteToggle && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onFavoriteToggle();
                        }}
                        className="absolute top-4 right-4 flex items-center justify-center"
                        style={{
                            width: '40px',
                            height: '40px',
                            background: favorite ? '#FEE2E2' : 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '50%',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            zIndex: 10,
                        }}
                        aria-label="Ajouter aux favoris"
                    >
                        <svg
                            className="w-5 h-5"
                            fill={favorite ? '#EF4444' : 'none'}
                            stroke={favorite ? '#EF4444' : '#9CA3AF'}
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                            style={{ transition: 'all 0.25s' }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* CONTENT */}
            <div className="p-6">{children}</div>
        </div>
    );
};