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
  useGetTop5Posts,
  useUserJoinContest,
} from '../../../../graphql/useContest';
import {
  useCreatePostLazy,
  useCreateTag,
  useUpdatePointPostingLazy,
} from '../../../../graphql/usePost';
import useModal from '../../../../hooks/useModal';
import useUploadImageToAWS from '../../../../hooks/useUploadImageToAWS';
import ErrorPopup from '../../../../utils/errorPopup';
import unixToDateTime from '../../../../utils/unixToDateTime';
import Loading from '../../../../utils/useLoading';
import { successfullNoty } from '../../../../utils/useNotify';
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
import { useNavigate, useParams } from 'react-router-dom';

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
  const { posts, hasNextPage, isFetching, fetchError, loadNew, refetch } =
    useGetContestPosts(contestId, userId);
  const navigate = useNavigate();
  const { isShowing: showModal, toggle: toggleModal } = useModal();
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

  const handleCloseModal = useCallback(() => {
    toggleModal();
    setCategories([]);
    setCategory({
      id: 1,
      value: options[0],
    });
    setTags([]);
    setAlbums([]);
  }, [options, toggleModal]);

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

  const { fetchedData: top5, refetchtop5 } = useGetTop5Posts({
    data: { contestId },
  });


  console.log(top5)
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

  const {
    createPost,
    isFetching: creatContest,
    fetchError: createContestError,
  } = useCreatePostLazy();

  const { updateLevel } = useUpdatePointPostingLazy();
  const { createTag } = useCreateTag();
  const uploadImageToAWS = useUploadImageToAWS();
  const { userJoinContest } = useUserJoinContest();

  const handleConfirmUpload = useCallback(
    async (event) => {
      event.preventDefault();

      const result = await uploadImageToAWS({ selectedFile });

      try {
        await createPost({
          variables: {
            createPostData: {
              userId,
              title: contestInfor.title,
              caption: contestInfor.caption,
              contestId,
              postViewStatus: 'PUBLIC',
              aperture: contestInfor.aperture,
              lens: contestInfor.lens,
              takenWhen: contestInfor.takenWhen,
              camera: contestInfor.camera,
              focalLength: contestInfor.focalLength,
              shutterSpeed: contestInfor.shutterSpeed,
              ISO: contestInfor.iso,
              copyRight: contestInfor.copyright,
              imageURL: result.Location,
              categoryId: categories.map((a) => a.id),
              albumId: albums.map((a) => a.id),
              tag: [
                ...new Set(
                  tags
                    .map((a) => a.value)
                    .map((element) => element.toLowerCase())
                ),
              ],
            },
          },
        });

        await updateLevel({
          variables: {
            updatePointPostingData: {
              userId,
              xp: 50,
            },
          },
        });

        await createTag({
          variables: {
            createTagData: {
              name: [
                ...new Set(
                  tags
                    .map((a) => a.value)
                    .map((element) => element.toLowerCase())
                ),
              ],
            },
          },
        });

        await userJoinContest({
          variables: {
            userJoinContestData: {
              contestId,
              userId,
            },
          },
        });

        contestInfoRefetch();
        successfullNoty("You've joined this contest!");
        handleCloseModal();
        refetch();
      } catch (e) {
        throw e;
      }

      if (!fetchError) {
        navigate(`/contest/${contestId}`);
      }
    },
    [
      uploadImageToAWS,
      selectedFile,
      fetchError,
      createPost,
      userId,
      contestInfor.title,
      contestInfor.caption,
      contestInfor.aperture,
      contestInfor.lens,
      contestInfor.takenWhen,
      contestInfor.camera,
      contestInfor.focalLength,
      contestInfor.shutterSpeed,
      contestInfor.iso,
      contestInfor.copyright,
      contestId,
      categories,
      albums,
      tags,
      updateLevel,
      createTag,
      userJoinContest,
      contestInfoRefetch,
      refetch,
      handleCloseModal,
      navigate,
    ]
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
            {contestInfo?.contestInfo?.isFinished === true ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '40%',
                  alignItems: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: 30,
                    fontFamily: 'Abhaya Libre',
                    borderRadius: 5,
                  }}
                >
                  Contest winner
                </p>
                <div className="contest-winner-content">
                  {contestInfo?.contestInfo.contestPrizeList.map(
                    (item, index) => {
                      return (
                        <div key={item.id}>
                          {item.userId.id === '000000000000000000000000' ? (
                            <></>
                          ) : (
                            <div className="contest-winner">
                              <div className="contest-winner-item">
                                <p style={{alignContent:"center"}}>{index + 1}</p>
                                <img
                                  src={item.prizeImageURL}
                                  alt=""
                                  width={30}
                                  height={30}
                                />
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                  }}
                                >
                                  <img
                                    src={item.userId.profileImageURL}
                                    alt=""
                                    style={{ width: 50, borderRadius: '50%' }}
                                  />
                                  <p style={{ fontSize: 20, fontweight: 500 }}>
                                    {item.userId.name}
                                  </p>
                                </div>
                                <p style={{fontweight:600, fontSize:20}}><span style={{fontweight:600}}>Points:</span> {top5?.getTopContestPosts[index].points}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            ) : (
              posts && (
                <RankingBoard top5={top5} posts={posts} refetch={refetchtop5} />
              )
            )}

            <div className="content-wrapper">
              <div className="description">
                <span id="subtitle">Description</span>
                <p>{contestInfo?.contestInfo.description}</p>
              </div>

              <div className="contest-date">
                <span id="subtitle">Deadline</span>
                <div className="date-item">
                  <span>Start date:</span>
                  {unixToDateTime(contestInfo?.contestInfo.startDate || '')}
                </div>

                <div className="date-item">
                  <span>End date:</span>
                  {unixToDateTime(contestInfo?.contestInfo.endDate || '')}
                </div>
              </div>

              <div className="upload-image-input">
                {contestInfo?.contestInfo?.isFinished ? (
                  <p style={{ fontSize: 30, fontFamily: 'Abhaya Libre' }}>
                    This contest is completed. Please join another contest !
                  </p>
                ) : contestInfo?.contestInfo?.joinedUserIds?.findIndex(
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
                      style={{ display: 'none' }}
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
                      <b>---</b>
                    </p>
                  }
                >
                  {posts.map((item) => {
                    return (
                      <Post
                        key={item.node.id}
                        item={item.node}
                        userId={item.node.userId.id}
                        showInteraction={
                          contestInfo?.contestInfo?.isFinished ? false : true
                        }
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
        <Loading loading={loadContest || creatContest} />
        {loadContestError?.message && (
          <ErrorPopup message={loadContestError?.message} />
        )}

        <Modal
          show={showModal}
          modalTitle="Contest submition"
          modalContent={
            <SubmitionContent
              contestId={contestId}
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
          submitText="Upload Entry"
          size="xl"
          handleClose={handleCloseModal}
          handleSavechanges={handleConfirmUpload}
        />
      </>
    ),
    [
      contestInfo?.contestInfo.contestImageURL,
      contestInfo?.contestInfo.name,
      contestInfo?.contestInfo?.isFinished,
      contestInfo?.contestInfo.contestPrizeList,
      contestInfo?.contestInfo.description,
      contestInfo?.contestInfo.startDate,
      contestInfo?.contestInfo.endDate,
      contestInfo?.contestInfo?.joinedUserIds,
      posts,
      top5,
      refetchtop5,
      handleFileChange,
      hasNextPage,
      loadContest,
      creatContest,
      loadContestError?.message,
      showModal,
      contestId,
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
      handleCloseModal,
      handleConfirmUpload,
      userId,
      loadNew,
    ]
  );
};

export default ContestDetail;
