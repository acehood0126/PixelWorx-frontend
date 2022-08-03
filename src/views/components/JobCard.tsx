// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState, ContentState } from "draft-js";

import { ImagePath } from "../../utils";

const JobCard = ({ job }: any) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-between w-full h-[292px] bg-white px-[20px] py-[24px] rounded-md font-normal cursor-pointer hover:drop-shadow-md transition ease-linear"
      onClick={() => navigate(`/job/view/${job._id}`)}
    >
      <div className="flex justify-between items-start">
        <div className="mr-[10px]">
          <p className="font-[400] text-[14px] text-gray-600">
            {job?.user?.name}
          </p>
          <p className="font-bold text-[20px] text-black">{job?.title}</p>
        </div>
        <img
          className="w-[45px] h-[45px] min-w-[45px] min-h-[45px] object-cover bg-gray-300 rounded-full"
          src={ImagePath(job?.user?.avatar)}
          alt=""
        />
      </div>
      <p className="font-[400] text-[16px] text-black">
        {job?.salary} {job?.salaryType}
      </p>
      <div className="relative">
        <div
          className="font-[400] text-[14px] text-gray-600 h-[100px] overflow-hidden [&>ul]:list-disc [&>ol]:list-decimal [&>ol]:pl-5 [&>ul]:pl-5 [&>*]:my-[5px] [&>*>*]:my-[8px]"
          dangerouslySetInnerHTML={{ __html: job?.description as string }}
        />
        <div className="absolute bottom-0 w-full h-[50px] bg-gradient-to-t from-white to-blue-500/0" />
      </div>
      <div className="w-fit px-[18px] py-[9px] bg-[#ddfae3] rounded-full">
        <p className="font-normal text-[14px] text-slimy-green">{job?.type}</p>
      </div>
    </div>
  );
};

export default JobCard;
