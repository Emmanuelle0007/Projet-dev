import { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
    onSuccess?: boolean;
    successMessage?: string;
}

export const Modal = ({
                          isOpen,
                          onClose,
                          title,
                          subtitle,
                          children,
                          size = 'md',
                          showCloseButton = true,
                          onSuccess = false,
                          successMessage = 'Opération réussie !',
                      }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                className={`bg-white w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto rounded-sm`}
                onClick={(e) => e.stopPropagation()}
            >
                {(title || subtitle || showCloseButton) && (
                    <div className="border-b border-stone-100 px-7 py-6">
                        <div className="flex justify-between items-start">
                            <div>
                                {subtitle && (
                                    <p className="text-amber-600 uppercase text-[10px] tracking-[0.2em] mb-1">
                                        {subtitle}
                                    </p>
                                )}
                                {title && (
                                    <h3 className="text-stone-900 font-serif text-2xl font-semibold">{title}</h3>
                                )}
                            </div>
                            {showCloseButton && (
                                <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <div className="p-7">
                    {onSuccess ? (
                        <div className="text-center py-10">
                            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-stone-900 font-semibold font-serif text-lg mb-1">{successMessage}</p>
                            <p className="text-stone-400 text-sm">Un email de confirmation vous a été envoyé.</p>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>
    );
};