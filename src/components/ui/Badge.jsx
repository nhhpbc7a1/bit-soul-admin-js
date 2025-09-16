import React from 'react';

const Badge = ({ 
  children, 
  variant = 'neutral', 
  tone = 'soft', // 'soft' | 'solid'
  size = 'md',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center gap-1 rounded-full text-xs font-medium';

  const toneMap = {
    soft: {
      primary: 'bg-primary-50 text-primary-700',
      info: 'bg-blue-50 text-blue-700',
      success: 'bg-green-50 text-green-700',
      warning: 'bg-yellow-50 text-yellow-700',
      danger: 'bg-red-50 text-red-700',
      secondary: 'bg-gray-100 text-gray-800',
      neutral: 'bg-gray-100 text-gray-800'
    },
    solid: {
      primary: 'bg-primary-600 text-white',
      info: 'bg-blue-600 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-500 text-white',
      danger: 'bg-red-600 text-white',
      secondary: 'bg-gray-700 text-white',
      neutral: 'bg-gray-600 text-white'
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5',
    md: 'px-2.5 py-0.5'
  };

  const classes = [
    baseClasses,
    toneMap[tone][variant] || toneMap[tone].neutral,
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;

