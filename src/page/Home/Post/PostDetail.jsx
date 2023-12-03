import Header from '../../../components/Header/Header';
import Page from '../../../components/utils/Page';
import PostComment from './PostComment';
import './PostDetail.scss';
import PostInteraction from './PostInteraction';
import PostTechnical from './PostTechnical';
import { useState } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { Camera2, X } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const data = {
  __typename: 'Post',
  id: '656aec2eff3c9bd4995fc410',
  points: 14,
  title: 'MockTitleQ8JIC6RRCKZM',
  caption: '',
  postViewStatus: 'PUBLIC',
  createdAt: '1701506094528',
  userLikedPost: ['653e0f9e048b56b72b30a608', '6496c0da518d8caaf82fcac3'],
  tag: [],
  userId: {
    __typename: 'User',
    profileImageURL:
      'https://fastly.picsum.photos/id/1/500/500.jpg?hmac=6vo7WkHURh9CWfdf144ASqEaPNcbj2PHJK3UgGH24lM',
    name: 'hung',
    id: '6496c0da518d8caaf82fcac3',
    level: {
      __typename: 'Level',
      currentLevel: 34,
    },
  },
  image: {
    __typename: 'Image',
    url: 'https://bku-images.s3.amazonaws.com/MockImage_5QUW4R5KZGHV.jpg',
    imageInfoId: {
      __typename: 'ImageInfo',
      ISO: '',
      aperture: '',
      camera: '',
      copyRight: 'MockCopyRightVKPG52',
      focalLength: '',
      lens: '',
      shutterSpeed: '',
      takenWhen: '',
    },
  },
};

const PostDetail = () => {
  const navigate = useNavigate();

  const handleClickTag = useCallback(
    (tag) => {
      navigate('/explore/inspiration', {
        state: {
          tagValue: tag,
        },
      });
    },
    [navigate]
  );

  return useMemo(
    () => (
      <Page title="Flens-Post detail">
        <div className="post-detail">
          <div className="post-detail-content">
            <Header item={data} />
            <div className="post-content-wrapper">
              <div className="post-content">
                <div className="image-wrapper">
                  <img id="image-post" src={data?.image.url} alt="" />
                </div>

                <div className="post-title">{data?.title}</div>
                <div className="technical-container">
                  <PostTechnical item={data} showImageDetail={false} />
                </div>
                <div className="hash-tags">
                  {data?.tag.map((tag, index) => (
                    <span
                      id="tag"
                      key={index}
                      onClick={() => handleClickTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <PostInteraction item={data} />
                {data && (
                  <PostComment
                    item={data}
                    userLevel={data?.userId.level.currentLevel}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Page>
    ),
    [handleClickTag]
  );
};

export default PostDetail;

// {
//   "__typename": "Post",
//   "id": "656aec2eff3c9bd4995fc410",
//   "points": 14,
//   "title": "MockTitleQ8JIC6RRCKZM",
//   "caption": "",
//   "postViewStatus": "PUBLIC",
//   "createdAt": "1701506094528",
//   "userLikedPost": [
//       "653e0f9e048b56b72b30a608",
//       "6496c0da518d8caaf82fcac3"
//   ],
//   "tag": [],
//   "userId": {
//       "__typename": "User",
//       "profileImageURL": "https://fastly.picsum.photos/id/1/500/500.jpg?hmac=6vo7WkHURh9CWfdf144ASqEaPNcbj2PHJK3UgGH24lM",
//       "name": "hung",
//       "id": "6496c0da518d8caaf82fcac3",
//       "level": {
//           "__typename": "Level",
//           "currentLevel": 34
//       }
//   },
//   "image": {
//       "__typename": "Image",
//       "url": "https://bku-images.s3.amazonaws.com/MockImage_5QUW4R5KZGHV.jpg",
//       "imageInfoId": {
//           "__typename": "ImageInfo",
//           "ISO": "",
//           "aperture": "",
//           "camera": "",
//           "copyRight": "MockCopyRightVKPG52",
//           "focalLength": "",
//           "lens": "",
//           "shutterSpeed": "",
//           "takenWhen": ""
//       }
//   }
// }
