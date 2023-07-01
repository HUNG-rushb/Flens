import { useGetAllUserPost } from '../../../../graphql/usePost';

const LatestUploadImage = ({ userId }) => {
  const { isFetching, fetchedData, fetchError } = useGetAllUserPost({
    getAllUserPostId: { userId },
  });
  console.log({ fetchedData });

  return (
    <div className="latest-upload">
      <span  id='portfolio-title'>Latest upload ({fetchedData?.userInfo.posts.length})</span>
      <div className="latest-upload-images">
        {fetchedData?.userInfo.posts.slice(0, 3).map((item) => (
          <img key={item.id} src={item.image.url} alt="" />
        ))}
      </div>
    </div>
  );
};

export default LatestUploadImage;
