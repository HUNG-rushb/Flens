import { images } from '../ImageData';
import './styles.scss';
import React, { useMemo } from 'react';
import Masonry from 'react-layout-masonry';

const Inspiration = () => {
  return useMemo(
    () => (
      <Masonry columns={3} gap={16} className="inspiration-container">
        {images.map((item) => {
          return (
            <span key={item.id}>
              <img alt="" src={item.image} width="100%" />
            </span>
          );
        })}
      </Masonry>
    ),
    []
  );
};

export default Inspiration;
