import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import JobListItem from "../../components/JobListItem";

import { useAppSelector, useAppDispatch } from "../../../store";
import { getJob, getJobs } from "../../../store/reducers/jobSlice";

import { ReactComponent as BlueFolderSvg } from "../../../assets/svgs/empty_application.svg";
import toast from "react-hot-toast";

const Applications = () => {
  const { jobs, isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.job
  );
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (isError) {
    }

    dispatch(getJobs({}));
  }, [dispatch, isError]);

  useEffect(() => {
    if (deleting && isSuccess && !isLoading) {
      toast.success(message);
      setDeleting(false);
      dispatch(getJobs({}));
    }
  }, [deleting, isSuccess, isLoading, dispatch]);

  const handleDelete = useCallback(() => {
    setDeleting(true);
  }, [setDeleting]);

  return (
    <>
      <div className="flex-1 bg-white rounded-[4px] pt-[5px] px-[20px]">
        {jobs &&
        user &&
        jobs.filter((v: any) => v?.user?.address === user?.address).length ? (
          <>
            <div className="flex items-center justify-between border-b-[1px] border-solid border-b-[#EAEAEA] h-[60px]">
              <p className="text-[20px] font-normal text-[#031926]">My Jobs</p>
              <button
                className="px-[12px] py-[8px] bg-slimy-green rounded-[4px]"
                onClick={() => navigate("/job/post")}
              >
                <p className="font-bold text-[14px] text-[#f9f9f9]">+Add Job</p>
              </button>
            </div>
            <div className="pl-[18px] pr-[36px]">
              <div className="flex items-end h-[50px] pb-[10px]">
                <input type="checkbox" />
                <p className="w-[30%] font-bold text-[14px] text-[#BDBDBD]">
                  &nbsp;&nbsp;#Job Title
                </p>
                <p className="w-[20%] font-bold text-[14px] text-[#BDBDBD] text-center">
                  Applicants
                </p>
                <p className="w-[10%] font-bold text-[14px] text-[#BDBDBD] text-center">
                  Status
                </p>
                <p className="w-[10%] font-bold text-[14px] text-[#BDBDBD] text-center">
                  Job Type
                </p>
                <p className="w-[15%] font-bold text-[14px] text-[#BDBDBD] text-center">
                  Date Posted
                </p>
                <div className="w-[20%]"></div>
              </div>
            </div>
            <div className="pl-[10px] pr-[20px] pb-[20px]">
              {jobs &&
                user &&
                jobs
                  .filter((v: any) => v?.user?.address === user?.address)
                  .map((job: any, index: number) => (
                    <JobListItem
                      jobOwner={job?.user?.address}
                      key={index}
                      role={user?.isDeveloper}
                      job={job}
                      handleDelete={handleDelete}
                    />
                  ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col">
            <div className="flex h-full items-center justify-center">
              <div>
                <div className="flex justify-center">
                  <BlueFolderSvg className="w-[100px] h-[100px]" />
                </div>
                <p className="text-center text-[22px] font-black mt-[20px]">
                  You don't have any job posts!
                </p>
                <p className="text-center text-[15px] mt-[10px]">
                  Create a job post with the button below.
                </p>
                <div className="flex justify-center mt-[20px]">
                  <button
                    className="text-[12px] font-bold rounded-lg bg-slimy-green text-white px-3 py-[9px] w-[195px]"
                    onClick={() => navigate("/job/post")}
                  >
                    Post A Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Applications;
