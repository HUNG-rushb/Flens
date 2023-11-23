import './styles.scss';
import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-layout-masonry';

const Inspiration = ({
  toggleModal,
  setImageToShow,
  explorePosts,
  hasNextPage,
  loadNew,
}) => {
  console.log({ hasNextPage });
  return useMemo(
    () => (
      <InfiniteScroll
        dataLength={explorePosts.length}
        next={loadNew}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Masonry columns={3} gap={16} className="inspiration-container">
          {explorePosts.map((item) => {
            return (
              <span key={item.node.id}>
                <img
                  alt=""
                  src={item.node.image.url}
                  width="100%"
                  onClick={() => [toggleModal(), setImageToShow(item.node)]}
                />
              </span>
            );
          })}
        </Masonry>
      </InfiniteScroll>
    ),
    [setImageToShow, toggleModal, explorePosts, hasNextPage, loadNew]
  );
};

export default Inspiration;
