import React from 'react';

const Logo = () => {
  return (
    <div className="logo">
      <img 
        src="/logo.png" 
        alt="Digital Library Logo" 
        width={180} 
        height={60}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
