import { useGetAllUserPost } from '../../../../graphql/usePost';

const LatestUploadImage = ({ userId }) => {
  const { isFetching, fetchedData, fetchError } = useGetAllUserPost({
    getAllUserPostId: { userId },
  });
  console.log({ fetchedData });

  return (
    <div className="latest-upload">
      <span>Latest upload</span>

      <div className="latest-upload-images">
        {fetchedData?.userInfo.posts.map((item) => (
          <img key={item.id} src={item.image.url} width={'45%'} />
        ))}
      </div>
    </div>
  );
};

export default LatestUploadImage;
