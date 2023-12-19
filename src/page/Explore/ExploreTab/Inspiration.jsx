import Modal from '../../../components/Modal/Modal';
import { useGetExplore } from '../../../graphql/usePost';
import useModal from '../../../hooks/useModal';
import Loading from '../../../utils/useLoading';
import SimilarImageDetail from './SimilarImageDetail';
import './styles.scss';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-layout-masonry';

const Inspiration = () => {
  const { isShowing: showModal, toggle: toggleModal } = useModal();
  const [imageToShow, setImageToShow] = useState({});

  const {
    posts: explorePosts,
    isFetching,
    hasNextPage,
    loadNew,
  } = useGetExplore();
  console.log({ hasNextPage });
  console.log({ explorePosts }, 'post');
  console.log({ hasNextPage });

  const modalContent = useCallback(() => {
    return (
      <SimilarImageDetail
        imageDetail={imageToShow}
        setImageToShow={setImageToShow}
      />
    );
  }, [imageToShow, setImageToShow]);

  return useMemo(
    () => (
      <>
        {explorePosts?.length > 0 && (
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
            <Masonry columns={4} gap={10} className="inspiration-container">
              {explorePosts.map((item) => {
                return (
                  <span key={item.node.id}>
                    <img
                      alt=""
                      src={item.node.image.url}
                      width="100%"
                      onClick={() => [toggleModal(), setImageToShow(item.node)]}
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                );
              })}
            </Masonry>
          </InfiniteScroll>
        )}
        <Loading loading={isFetching} />
        <Modal
          size="lg"
          show={showModal}
          handleClose={toggleModal}
          handleSavechanges={toggleModal}
          modalContent={modalContent()}
          hideButton={true}
        />
      </>
    ),
    [
      explorePosts,
      loadNew,
      hasNextPage,
      isFetching,
      showModal,
      toggleModal,
      modalContent,
    ]
  );
};

export default Inspiration;
