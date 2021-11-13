import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// import { Eye } from 'react-feather';

import EyeIcon from '../components/EyeIcon';

interface SeeMoreProps {
  mediaPath: string;
  slideshowImages: {
    filepath: string;
    caption: string;
  }[];
}

const SeeMore: React.FC<SeeMoreProps> = ({ mediaPath, slideshowImages }) => {
  const { t } = useTranslation();
  const [imageIndex, setImageIndex] = useState(0);

  const seeMoreClickHandler = () => {
    if (imageIndex < slideshowImages.length - 1) {
      setImageIndex((prevState) => prevState + 1);
    } else {
      setImageIndex(0);
    }
  };

  const slideshowStyle = {
    backgroundImage: `url(${mediaPath}${slideshowImages[imageIndex].filepath})`,
  };

  return (
    <section className="zone-info-content">
      <div className="zone-info-eyes">
        <EyeIcon />
        {/*
            <Eye />
            */}
        <span> {t('Here_you_can_see') + ':'} </span>
        <EyeIcon />
      </div>
      <div className="zone-see-more">
        <div className="zone-see-more-item">
          <div style={slideshowStyle} onClick={seeMoreClickHandler}>
            <span>{slideshowImages[imageIndex].caption}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeeMore;
