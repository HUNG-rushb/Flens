import Header from '../../../components/Header/Header';
import Page from '../../../components/utils/Page';
import { usePostInfo } from '../../../graphql/usePost';
import PostComment from './PostComment';
import './PostDetail.scss';
import PostInteraction from './PostInteraction';
import PostTechnical from './PostTechnical';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const PostDetail = () => {
  const navigate = useNavigate();
  const postId = useParams();
  const { fetchedData } = usePostInfo({
    postInfoData: postId,
  });
  console.log({ fetchedData }, 'posst info');

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
            <Header item={fetchedData?.postInfo} />
            <div className="post-content-wrapper">
              <div className="post-content">
                <div className="image-wrapper">
                  <img
                    id="image-post"
                    src={fetchedData?.postInfo.image.url}
                    alt=""
                  />
                </div>

                <div className="post-title">{fetchedData?.postInfo.title}</div>
                <div className="technical-container">
                  <PostTechnical
                    item={fetchedData?.postInfo}
                    showImageDetail={false}
                  />
                </div>
                <div className="hash-tags">
                  {fetchedData?.postInfo?.tag.map((tag, index) => (
                    <span
                      id="tag"
                      key={index}
                      onClick={() => handleClickTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <PostInteraction item={fetchedData?.postInfo} />
                {fetchedData?.postInfo && (
                  <PostComment
                    item={fetchedData?.postInfo}
                    userLevel={fetchedData?.postInfo.userId.level.currentLevel}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Page>
    ),
    [fetchedData?.postInfo, handleClickTag]
  );
};

export default PostDetail;
