import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import {
  useGetContestInfo,
  useGetContestPosts,
} from '../../../../graphql/useContest';
import useModal from '../../../../hooks/useModal';
import './ContestDetail.scss';
import SubmitionContent from './SubmitionContent';
import { EXIF } from 'exif-js';
import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

const ContestDetail = () => {
  const { contestId } = useParams();
  const fileInputRef = useRef(null);
  const { fetchedData: contestInfo } = useGetContestInfo({
    contestInfoData: { contestId },
  });
  console.log({ contestInfo });
  const { posts, hasNextPage, isFetching, fetchError, loadNew } =
    useGetContestPosts(contestId);
  console.log({ posts });

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

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [aperture, setAperture] = useState('');
  const [lens, setLens] = useState('');
  const [takenWhen, setTakenWhen] = useState('');
  const [camera, setCamera] = useState('');
  const [focalLength, setFocalLength] = useState('');
  const [shutterSpeed, setShutterSpeed] = useState('');
  const [iso, setIso] = useState('');
  const [copyright, setCopyright] = useState('');
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
      // console.log(Jimp);
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

        setTitle(file.name.substring(0, file.name.indexOf('.')));
        setCamera(exifData.Model ? exifData.Model.toString() : '');
        setAperture(exifData.FNumber ? exifData.FNumber.toString() : '');
        setShutterSpeed(
          exifData.ShutterSpeedValue
            ? '1/' +
                Math.trunc(
                  1 / Math.pow(2, -exifData.ShutterSpeedValue)
                ).toString()
            : ''
        );

        setFocalLength(
          exifData.FocalLength ? exifData.FocalLength.toString() : ''
        );
        setTakenWhen(
          exifData.DateTimeOriginal ? exifData.DateTimeOriginal.toString() : ''
        );
        setIso(
          exifData.ISOSpeedRatings ? exifData.ISOSpeedRatings.toString() : ''
        );
        setCopyright(exifData.Copyright ? exifData.Copyright.toString() : '');
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

          <div className="content-wrapper">
            <div className="description">
              <span id="subtitle">Description</span>
              <p>{contestInfo?.contestInfo.description}</p>
            </div>

            <div className="contest-date">
              <span id="subtitle">Deadline</span>
              <div className="date-item">
                <span>Start date:</span>
                {contestInfo?.contestInfo.startDate}
              </div>

              <div className="date-item">
                <span>End date:</span>
                {contestInfo?.contestInfo.endDate}
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

            {/* <div className="button-upload">
              <Button text="Join now!" type="default" onClick={toggleModal} />
            </div> */}
            <div className="upload-image-input">
              <Button
                text="Join now!"
                type="default"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            {/* <InfiniteScroll
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
                  {posts.map((item, idx) => {
                    return (
                      <Post
                        key={'post_' + idx}
                        item={item.node}
                        userId={item.node.userId.id}
                        showReport={showReport}
                        showImageDetail={showImageDetail}
                        toggleShowReport={toggleShowReport}
                        setImageToReport={setImageToReport}
                        toggleImageDetail={toggleImageDetail}
                        setItemShowDetail={setItemShowDetail}
                      />
                    );
                  })}
                </InfiniteScroll> */}
          </div>
        </div>

        <Modal
          show={showModal}
          modalTitle="Submit Contest entry"
          modalContent={
            <SubmitionContent
              contestId={contestId}
              handleCloseModal={handleCloseModal}
              options={options}
              title={title}
              setTitle={setTitle}
              caption={caption}
              setCaption={setCaption}
              aperture={aperture}
              setAperture={setAperture}
              lens={lens}
              setLens={setLens}
              takenWhen={takenWhen}
              setTakenWhen={setTakenWhen}
              focalLength={focalLength}
              setFocalLength={setFocalLength}
              shutterSpeed={shutterSpeed}
              setShutterSpeed={setShutterSpeed}
              iso={iso}
              setIso={setIso}
              copyright={copyright}
              setCopyright={setCopyright}
              camera={camera}
              setCamera={setCamera}
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
            />
          }
          size="xl"
          hideButton
        />
      </>
    ),
    [
      album,
      albums,
      aperture,
      camera,
      caption,
      categories,
      category,
      contestId,
      contestInfo?.contestInfo.contestImageURL,
      contestInfo?.contestInfo.description,
      contestInfo?.contestInfo.endDate,
      contestInfo?.contestInfo.name,
      contestInfo?.contestInfo.startDate,
      copyright,
      focalLength,
      handleCloseModal,
      handleFileChange,
      iso,
      lens,
      options,
      previewImage,
      selectedFile,
      showModal,
      shutterSpeed,
      tag,
      tags,
      takenWhen,
      title,
    ]
  );
};

export default ContestDetail;
