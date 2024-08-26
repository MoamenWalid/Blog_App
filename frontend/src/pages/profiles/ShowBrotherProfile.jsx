import React, { useState } from "react";
import Spinner from "../../components/animation/Spinner";

const ShowBrotherProfile = ({ profile }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <div className="profile mx-auto my-0 sm:my-[90px] flex flex-col gap-3 items-center py-[30px] px-[30px] rounded-[0] sm:rounded-[24px] w-full sm:w-[500px] md:w-[600px] bg-[#ffffff9e] border-[0] sm:border border-[#EEE]">
      <div className="photo relative w-[100px] md:w-[150px] h-[100px] md:h-[150px] flex items-center rounded-full border-[2px] md:border-[4px] border-solid border-gray">
        {loading ? <Spinner /> : null}
        <div className="overflow-hidden w-full h-full rounded-full">
          <img
            onLoad={handleImageLoad}
            loading="lazy"
            className="w-full h-full object-cover object-[center_top]"
            src={ profile?.profilePhoto?.url }
            alt="avatar"
          />
        </div>
      </div>

      <div className="username">{ profile?.username }</div>
      <div className="bio">{ profile?.bio }</div>
    </div>
  );
};

export default ShowBrotherProfile;
