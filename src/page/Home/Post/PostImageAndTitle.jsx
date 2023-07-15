import PostTechnical from './PostTechnicalInformation';
import React, { useState } from 'react';
import {EyeFill, EyeSlashFill} from 'react-bootstrap-icons'

const PostImageAndTitle = ({
  item,
  toggleImageDetail,
  setItemShowDetail,
  showImageDetail,
}) => {
  const handleClickToShowDetail = () => {
    setItemShowDetail(item);
    toggleImageDetail();
  };

  const [showTechnicalInfor, setTechnicalInfor] = useState(false);

  return (
    <div className="post-image-and-tittle">
      <div className="image-post-container">
        <img
          id="image-post"
          src={item.image.url}
          alt=""
          onClick={handleClickToShowDetail}
        />
        {showTechnicalInfor && <div className="post-technical-container">
          <PostTechnical item={item} showImageDetail={showImageDetail} />
        </div>}
        <div className="see-technical-infor-icon"> 
        {!showTechnicalInfor? <EyeFill size={28} color='#f08080' onClick={()=>setTechnicalInfor(true)} />
        : <EyeSlashFill size={28} color='#f08080' onClick={()=>setTechnicalInfor(false)}/>
  }
        </div>
      </div>
      <div className="post-title">{item.title}</div>
    </div>
  );
};

export default PostImageAndTitle;
