import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import PackageLogo from "../../assets/icons/package.svg";
import "../pictureWrapper/PictureWrapper.scss";

const PictureWrapper = (props) => {
  const { articleImages } = props;
  const [images, setImages] = useState();

  const setMainImage = (articleImages, mainImage = null) => {
    const imagesData = articleImages;
    const parsedImages = imagesData.map((i) => ({
      mainImage: false,
      imgSrc: i.imgSrc || i,
      // filling the images for demonstration purposes, so the functionality of selecting the image is visible
      fill: i.fill || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));
    if (mainImage) {
      const selectedImage = parsedImages.find(
        (i) => i.imgSrc === mainImage.imgSrc
      );
      selectedImage.mainImage = true;
    } else {
      parsedImages[0].mainImage = true;
    }
    setImages(parsedImages);
  };

  useEffect(() => {
    setMainImage(articleImages);
  }, []);

  return (
    <div className="imgs-wrapper">
      {images && (
        <>
          <div className="main-image-wrapper">
            {images
              .filter((image) => image.mainImage)
              .map((image) => (
                <div className="main-image" key={image.imgSrc}>
                  <PackageLogo fill={image.fill} />
                </div>
              ))}
          </div>
          <div className="small-images-wrapper">
            {images
              .filter((image) => !image.mainImage)
              .map((image) => (
                <div
                  className="small-image"
                  key={image.imgSrc}
                  onClick={() => setMainImage(images, image)}
                >
                  <PackageLogo key={image.imgSrc} fill={image.fill} />
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

PictureWrapper.propTypes = {
  articleImages: PropTypes.array,
};

export default PictureWrapper;
