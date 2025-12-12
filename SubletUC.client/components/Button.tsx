import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-uc-red text-white hover:bg-red-700 focus:ring-uc-red",
    secondary: "bg-uc-purple text-white hover:bg-purple-800 focus:ring-uc-purple",
    outline: "border border-gray-300 text-uc-dark bg-white hover:bg-gray-50 focus:ring-uc-purple",
    danger: "bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500",
    black: "bg-black text-white hover: bg-black-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;