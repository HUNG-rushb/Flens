import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import { useAuthState } from '../../../../context/AuthContext';
import {
  initialContestInfo,
  ContestInfoReducer,
} from '../../../../context/reducer/ContestReducer';
import {
  useGetContestInfo,
  useGetContestPosts,
} from '../../../../graphql/useContest';
import useModal from '../../../../hooks/useModal';
import ErrorPopup from '../../../../utils/errorPopup';
import unixToDateTime from '../../../../utils/unixToDateTime';
import Loading from '../../../../utils/useLoading';
import Post from '../../../Home/Post/Post';
import './ContestDetail.scss';
import RankingBoard from './RankingBoard';
import SubmitionContent from './SubmitionContent';
import { EXIF } from 'exif-js';
import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useReducer,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

const ContestDetail = () => {
  const { contestId } = useParams();
  const { id: userId } = useAuthState();
  const fileInputRef = useRef(null);
  const {
    fetchedData: contestInfo,
    isFetching: loadContest,
    fetchError: loadContestError,
    refetch: contestInfoRefetch,
  } = useGetContestInfo({
    contestInfoData: { contestId },
  });
  // console.log({ contestInfo });

  const { posts, hasNextPage, isFetching, fetchError, loadNew, refetch } =
    useGetContestPosts(contestId, userId);
  // console.log({ posts });

  const { isShowing: showModal, toggle: toggleModal } = useModal();

  const handleCloseModal = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  const options = useMemo(
    () => [
      { name: 'All categories', id: '64ecb68380295e50c958e547' },
      { name: 'Animal', id: '64edaf03809a20aed5684794' },
      { name: 'Architecture', id: '64edaf2d809a20aed5684795' },
      { name: 'Black and White', id: '64edaf3c809a20aed5684796' },
      { name: 'Cityscapes', id: '64edaf4c809a20aed5684797' },
      { name: 'Family', id: '64edaf62809a20aed5684798' },
      { name: 'Fashion', id: '64edaf66809a20aed5684799' },
      { name: 'Film', id: '64edaf72809a20aed568479a' },
      { name: 'Food', id: '64edaf77809a20aed568479b' },
      { name: 'Vintage', id: '64edafb5809a20aed568479c' },
      { name: 'Vehicle', id: '64edafbb809a20aed568479d' },
      { name: 'Urban', id: '64edafbf809a20aed568479e' },
      { name: 'Underwater', id: '64edb08f809a20aed568479f' },
      { name: 'Travel', id: '64edb0a5809a20aed56847a0' },
      { name: 'Street photography', id: '64edb0ae809a20aed56847a1' },
      { name: 'Sports', id: '64edb0c7809a20aed56847a2' },
      { name: 'Landscape', id: '64edb0df809a20aed56847a3' },
      { name: 'Nature', id: '64edb0e2809a20aed56847a4' },
      { name: 'Sea', id: '64edb0f6809a20aed56847a5' },
      { name: 'People', id: '64edb117809a20aed56847a7' },
      { name: 'Interior', id: '64edb11c809a20aed56847a8' },
      { name: 'Random', id: '64edb0f9809a20aed56847a6' },
    ],
    []
  );

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [contestInfor, dispatch] = useReducer(
    ContestInfoReducer,
    initialContestInfo
  );

  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({
    id: 0,
    value: '',
  });

  const [categories, setCategories] = useState([options[0]]);
  const [category, setCategory] = useState(options[0]);

  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState({
    id: '',
    name: '',
  });

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageUrl = event.target.result;

        const image = new Image();
        image.src = imageUrl;
        setPreviewImage(imageUrl);

        const exifData = await new Promise((resolve) => {
          EXIF.getData(file, function () {
            resolve(EXIF.getAllTags(this));
          });
        });

        const exifInfo = [
          {
            field: 'title',
            value: file.name.substring(0, file.name.indexOf('.')),
          },
          {
            field: 'camera',
            value: exifData.Model ? exifData.Model.toString() : '',
          },
          {
            field: 'aperture',
            value: exifData.FNumber ? exifData.FNumber.toString() : '',
          },
          {
            field: 'shutterSpeed',
            value: exifData.ShutterSpeedValue
              ? '1/' +
                Math.trunc(
                  1 / Math.pow(2, -exifData.ShutterSpeedValue)
                ).toString()
              : '',
          },
          {
            field: 'focalLength',
            value: exifData.FocalLength ? exifData.FocalLength.toString() : '',
          },
          {
            field: 'takenWhen',
            value: exifData.DateTimeOriginal
              ? exifData.DateTimeOriginal.toString()
              : '',
          },
          {
            field: 'iso',
            value: exifData.ISOSpeedRatings
              ? exifData.ISOSpeedRatings.toString()
              : '',
          },
          {
            field: 'copyright',
            value: exifData.Copyright ? exifData.Copyright.toString() : '',
          },
        ];
        exifInfo.forEach(({ field, value }) => {
          dispatch({
            type: 'UPDATE_CONTEST_FIELD',
            field,
            value,
          });
        });
      };

      reader.readAsDataURL(file);
      toggleModal();
      setSelectedFile(file);
    },
    [toggleModal]
  );

  return useMemo(
    () => (
      <>
        <div className="contest-detail-container">
          <div className="contest-header">
            <img
              src={contestInfo?.contestInfo.contestImageURL}
              id="banner-image"
              alt=""
            />
            <div className="contest-title">
              {contestInfo?.contestInfo.name} competition
            </div>
          </div>

          <div className="below-content-wrapper">
            {posts && <RankingBoard contestId={contestId} posts={posts} />}

            <div className="content-wrapper">
              <div className="description">
                <span id="subtitle">Description</span>
                <p>{contestInfo?.contestInfo.description}</p>
              </div>

              <div className="contest-date">
                <span id="subtitle">Deadline</span>
                <div className="date-item">
                  <span>Start date:</span>
                  {unixToDateTime(contestInfo?.contestInfo.startDate|| '')}
                </div>

                <div className="date-item">
                  <span>End date:</span>
                  {unixToDateTime(contestInfo?.contestInfo.endDate||"")}
                </div>
              </div>

              {/* <div className="contest-prizes">
              <span id="subtitle">Prizes</span>
              <ul>
                {contestInfo?.contestInfo.prizes?.map((prize, index) => (
                  <li key={index}>
                    {prize.rank} - {prize.prize}
                  </li>
                ))}
              </ul>
            </div>

            <div className="contest-uploader">
              <span id="subtitle">Uploader</span>
              <p>Mr/Ms. {contestInfo?.uploader}</p>
            </div> */}

              <div className="upload-image-input">
                {contestInfo?.contestInfo?.joinedUserIds?.findIndex(
                  (x) => x.id === userId
                ) !== -1 ? (
                  <p> You've already joined this contest.</p>
                ) : (
                  <>
                    <div className="join-button">
                      <Button
                        text="Join now!"
                        type="default"
                        onClick={() => fileInputRef.current.click()}
                      />
                    </div>
                    <input
                      type="file"
                      id="fileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </>
                )}
              </div>
              <hr />

              {posts?.length ? (
                <InfiniteScroll
                  dataLength={posts.length}
                  next={() => {
                    loadNew();
                  }}
                  hasMore={hasNextPage}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {posts.map((item) => {
                    return (
                      <Post
                        key={item.node.id}
                        item={item.node}
                        userId={item.node.userId.id}
                        // showReport={showReport}
                        // showImageDetail={showImageDetail}
                        // toggleShowReport={toggleShowReport}
                        // setImageToReport={setImageToReport}
                        // toggleImageDetail={toggleImageDetail}
                        // setItemShowDetail={setItemShowDetail}
                      />
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <p style={{ textAlign: 'center' }}>
                  <b>Be the first one to join</b>
                </p>
              )}
            </div>
          </div>
        </div>
        <Loading loading={loadContest} />
        {loadContestError?.message && (
          <ErrorPopup message={loadContestError?.message} />
        )}

        <Modal
          show={showModal}
          modalTitle="Submit your photo"
          modalContent={
            <SubmitionContent
              contestId={contestId}
              handleCloseModal={handleCloseModal}
              options={options}
              tags={tags}
              setTags={setTags}
              tag={tag}
              setTag={setTag}
              categories={categories}
              setCategories={setCategories}
              category={category}
              setCategory={setCategory}
              album={album}
              setAlbum={setAlbum}
              albums={albums}
              setAlbums={setAlbums}
              previewImage={previewImage}
              selectedFile={selectedFile}
              refetch={refetch}
              contestInfoRefetch={contestInfoRefetch}
              contestInfor={contestInfor}
              dispatch={dispatch}
            />
          }
          size="xl"
          hideButton
        />
      </>
    ),
    [
      contestInfo?.contestInfo.contestImageURL,
      contestInfo?.contestInfo.name,
      contestInfo?.contestInfo.description,
      contestInfo?.contestInfo.startDate,
      contestInfo?.contestInfo.endDate,
      contestInfo?.contestInfo?.joinedUserIds,
      posts,
      contestId,
      handleFileChange,
      hasNextPage,
      loadContest,
      loadContestError?.message,
      showModal,
      handleCloseModal,
      options,
      tags,
      tag,
      categories,
      category,
      album,
      albums,
      previewImage,
      selectedFile,
      refetch,
      contestInfoRefetch,
      contestInfor,
      userId,
      loadNew,
    ]
  );
};

export default ContestDetail;
