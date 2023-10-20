import './styles.scss';
import React, { useMemo } from 'react';
import { images } from '../ImageData';

const Inspiration = ({ toggleModal, setImageToShow }) => {
  const countNumberColumn = useMemo(() => images.length / 3, []);

  const firstColum = images
    .slice(0, countNumberColumn)
    .map((image) => (
      <img
        key={image.id}
        src={image.image}
        alt=""
        width={500}
        height={300}
        onClick={() => [setImageToShow(image.image), toggleModal()]}
      />
    ));
  const secondColumn = images
    .slice(countNumberColumn, countNumberColumn * 2)
    .map((image) => (
      <img
        key={image.id}
        src={image.image}
        alt=""
        width={500}
        height={300}
        onClick={() => [setImageToShow(image.image), toggleModal()]}
      />
    ));
  const thirdColumn = images
    .slice(countNumberColumn * 2, countNumberColumn * 3)
    .map((image) => (
      <img
        key={image.id}
        src={image.image}
        alt=""
        width={500}
        height={300}
        onClick={() => [setImageToShow(image.image), toggleModal()]}
      />
    ));
  return useMemo(
    () => (
      <div className='inspiration-container'>
        <div className="inspiration-content">
          <div className="first-column-image">{firstColum}</div>
          <div className="second-column-image">{secondColumn}</div>
          <div className="third-column-image">{thirdColumn}</div>
        </div>
        <span>See More ...</span>
      </div>
    ),
    [firstColum, secondColumn, thirdColumn]
  );
};

export default Inspiration;
