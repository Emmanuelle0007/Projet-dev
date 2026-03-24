import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
    type?: 'button' | 'submit';
}

export const Button = ({
                           children,
                           onClick,
                           variant = 'primary',
                           fullWidth = false,
                           type = 'button',
                       }: ButtonProps) => {
    const variants = {
        primary: {
            background: '#0F172A',
            color: 'white',
        },
        secondary: {
            background: '#D4A853',
            color: '#0F172A',
        },
        outline: {
            background: 'transparent',
            color: '#D4A853',
            border: '1px solid #D4A853',
        },
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className="font-medium uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
                ...variants[variant],
                fontSize: '11px',
                letterSpacing: '0.12em',
                padding: fullWidth ? '14px' : '10px 20px',
                borderRadius: '2px',
                border: variant === 'outline' ? '1px solid #D4A853' : 'none',
                cursor: 'pointer',
                width: fullWidth ? '100%' : 'auto',
            }}
        >
            {children}
        </button>
    );
};