import React from 'react';

interface HeaderImageProps {
  imageSrc: string;
  imageText: string;
}

export const HeaderImage: React.FC<HeaderImageProps> = ({
  imageSrc,
  imageText,
}) => {
  return (
    <div className="header-image">
      <img src={imageSrc} />
      {imageText.length > 0 && <span>{imageText}</span>}
    </div>
  );
};
