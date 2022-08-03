import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import ViewSvg from "../../assets/svgs/view.svg";
// import EditSvg from "../../assets/svgs/edit.svg";
// import DeleteSvg from "../../assets/svgs/delete.svg";
import OpenStatusSvg from "../../assets/svgs/status-open.svg";
import DownArrowSvg from "../../assets/svgs/arrow-down.svg";

import { useAppSelector, useAppDispatch } from "../../store";
import { deleteJob } from "../../store/reducers/jobSlice";
// import toast from "react-hot-toast";

interface ItemProps {
  job: any;
  role?: boolean;
  jobOwner: string;
  handleDelete: () => void;
}

const JobListItem = ({
  job,
  jobOwner,
  role = false,
  handleDelete,
}: ItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.job
  );

  useEffect(() => {
    // if (!isLoading) {
    //   if (isSuccess) toast.success(message);
    //   if (isError) toast.error(message);
    // }
  }, [isLoading, isError, isSuccess, message]);

  return (
    <div className="flex items-center h-[64px] pl-[8px] pr-[20px] border-b-[1px] border-b-[#EAEAEA]">
      <input type="checkbox" className="" />
      <p className="font-normal text-[14px] text-[#22251D] w-[30%]">
        &nbsp;&nbsp;{job?.title}
      </p>
      <button
        className="w-[20%] flex justify-center cursor-pointer disabled:opacity-50 disabled:cursor-default"
        disabled={user.isDeveloper || user?.address !== jobOwner}
        onClick={() => navigate(`/applications/${job?._id}`)}
      >
        <div className="px-[8px] py-[5px] bg-slimy-green rounded-[4px]">
          <p className="font-normal text-[14px] text-[#FFFFFF]">
            {job?.appliedDevs.length || 0} Candidates
          </p>
        </div>
      </button>
      <div className="w-[10%] flex justify-center">
        <div className="flex gap-[4px] px-[8px] py-[4px] border-[1px] border-[#EAEAEA] rounded-full w-fit">
          <img src={OpenStatusSvg} alt="Open" />
          <p className="font-normal text-[14px] text-[#22251D]">Live</p>
          <img src={DownArrowSvg} alt="" />
        </div>
      </div>
      <div className="w-[10%] flex justify-center">
        <div className="px-[8px] py-[4px] border-[1px] border-[#EAEAEA] rounded-full w-fit">
          <p className="font-normal text-[14px] text-[#22251D] text-center">
            {job?.type}
          </p>
        </div>
      </div>
      <p className="font-normal text-[14px] text-[#22251D] w-[15%] text-center">
        {job?.startImmediately
          ? "Immediate"
          : new Date(job?.startDate).toDateString()}
      </p>
      <div className="flex justify-center w-[20%]">
        {/* <button
          className="flex items-center gap-[4px]"
          onClick={() => navigate(`/job/view/${job?._id}`)}
        >
          <img src={ViewSvg} alt="View" />
          <p className="font-normal text-[14px] text-[#7B8489]">View</p>
        </button>
        {!role && (
          <>
            <button
              className="flex items-center gap-[4px]"
              onClick={() => navigate(`/job/edit/${job?._id}`)}
            >
              <img src={EditSvg} alt="Edit" />
              <p className="font-normal text-[14px] text-[#7B8489]">Edit</p>
            </button>
            <button
              className="flex items-center gap-[4px]"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <img src={DeleteSvg} alt="Delete" />
              <p className="font-normal text-[14px] text-[#F9530B]">Delete</p>
            </button>
          </>
        )} */}
        <div className="flex items-center -space-x-4 hover:space-x-1">
          <button
            className="z-10 block p-4 text-slimy-green transition-all bg-green-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
            type="button"
            onClick={() => navigate(`/job/view/${job?._id}`)}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.24877 7C1.31252 7.11017 1.39704 7.25057 1.50174 7.41269C1.77067 7.8291 2.16893 8.38285 2.68598 8.93437C3.73072 10.0488 5.19138 11.0833 7 11.0833C8.80862 11.0833 10.2693 10.0488 11.314 8.93437C11.8311 8.38285 12.2293 7.8291 12.4983 7.41269C12.603 7.25057 12.6875 7.11017 12.7512 7C12.6875 6.88983 12.603 6.74943 12.4983 6.58731C12.2293 6.1709 11.8311 5.61715 11.314 5.06563C10.2693 3.95124 8.80862 2.91667 7 2.91667C5.19138 2.91667 3.73072 3.95124 2.68598 5.06563C2.16893 5.61715 1.77067 6.1709 1.50174 6.58731C1.39704 6.74943 1.31252 6.88983 1.24877 7ZM13.4167 7C13.9384 6.73913 13.9383 6.73893 13.9382 6.73871L13.9373 6.73684L13.9353 6.73286L13.9286 6.7199C13.9231 6.70908 13.9152 6.69393 13.9051 6.67476C13.8848 6.63641 13.8553 6.58188 13.8169 6.51349C13.74 6.37679 13.6268 6.18422 13.4783 5.95436C13.1821 5.49577 12.7418 4.88285 12.1651 4.2677C11.0224 3.04876 9.27471 1.75 7 1.75C4.72529 1.75 2.97761 3.04876 1.83485 4.2677C1.25815 4.88285 0.817872 5.49577 0.521696 5.95436C0.373246 6.18422 0.260045 6.37679 0.18315 6.51349C0.14468 6.58188 0.115232 6.63641 0.0949395 6.67476C0.0847914 6.69393 0.0769272 6.70908 0.0713638 6.7199L0.0647442 6.73286L0.062731 6.73684L0.0620492 6.7382C0.061942 6.73841 0.0615841 6.73913 0.583333 7L0.0615841 6.73912C-0.0205281 6.90335 -0.0205281 7.09665 0.0615841 7.26087L0.583333 7C0.0615841 7.26087 0.061477 7.26066 0.0615841 7.26087L0.062731 7.26316L0.0647442 7.26714L0.0713638 7.2801C0.0769272 7.29092 0.0847914 7.30607 0.0949395 7.32524C0.115232 7.36359 0.14468 7.41812 0.18315 7.48651C0.260045 7.62321 0.373246 7.81578 0.521696 8.04564C0.817872 8.50423 1.25815 9.11715 1.83485 9.7323C2.97761 10.9512 4.72529 12.25 7 12.25C9.27471 12.25 11.0224 10.9512 12.1651 9.7323C12.7418 9.11715 13.1821 8.50423 13.4783 8.04564C13.6268 7.81578 13.74 7.62321 13.8169 7.48651C13.8553 7.41812 13.8848 7.36359 13.9051 7.32524C13.9152 7.30607 13.9231 7.29092 13.9286 7.2801L13.9353 7.26714L13.9373 7.26316L13.938 7.2618C13.9381 7.26159 13.9384 7.26087 13.4167 7ZM13.4167 7L13.9384 7.26087C14.0205 7.09665 14.0203 6.90294 13.9382 6.73871L13.4167 7Z"
                fill="#15803d"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.00033 5.83317C6.35599 5.83317 5.83366 6.3555 5.83366 6.99984C5.83366 7.64417 6.35599 8.1665 7.00033 8.1665C7.64466 8.1665 8.16699 7.64417 8.16699 6.99984C8.16699 6.3555 7.64466 5.83317 7.00033 5.83317ZM4.66699 6.99984C4.66699 5.71117 5.71166 4.6665 7.00033 4.6665C8.28899 4.6665 9.33366 5.71117 9.33366 6.99984C9.33366 8.2885 8.28899 9.33317 7.00033 9.33317C5.71166 9.33317 4.66699 8.2885 4.66699 6.99984Z"
                fill="#15803d"
              />
            </svg>
          </button>
          {!role && (
            <>
              <button
                className="z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
                type="button"
                onClick={() => navigate(`/job/edit/${job?._id}`)}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>

              <button
                className="z-30 block p-4 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                  dispatch(deleteJob(job?._id));
                }}
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListItem;
