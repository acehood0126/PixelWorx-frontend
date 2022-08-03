/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import Select from "../../assets/svgs/select.svg";
// import { ReactComponent as MailSvg } from "../../assets/svgs/mail.svg";
// import { ReactComponent as PhoneSvg } from "../../assets/svgs/phone.svg";
// import { ReactComponent as MoreSvg } from "../../assets/svgs/more_vertical.svg";

import { useAppSelector, useAppDispatch } from "../../../store";
import { getJob } from "../../../store/reducers/jobSlice";
import { ImagePath, FullName, ResumePath } from "../../../utils";

const AppliedDevs = () => {
  const { id } = useParams();
  const { job, isError } = useAppSelector((state: any) => state.job);
  // const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
    }

    dispatch(getJob(id));
  }, [dispatch, isError]);

  return (
    <>
      {job && (
        <>
          {/* <div className="flex justify-between items-center mt-[20px] mb-[18px]">
              <div className="flex flex-col gap-[4px]">
                <p className="font-[600] text-[14px]">
                  Showing {(job?.appliedDevs as any)?.length}
                </p>
                <p className="font-[600] text-[12px] text-gray-600">
                  Based your preferences
                </p>
              </div>
              <div className="flex items-center gap-[28px]">
                <div className="flex gap-[12px]">
                  <input
                    type="radio"
                    className="w-[16px] h-[16px] accent-black"
                  />
                  <p className="font-[400] text-[14px]">Fulltime</p>
                </div>
                <div className="flex gap-[12px]">
                  <input
                    type="radio"
                    className="w-[16px] h-[16px] accent-black"
                  />
                  <p className="font-[400] text-[14px]">Freelance</p>
                </div>
                <div className="flex items-center gap-[8px] h-[36px] px-[12px] border-[1px] border-black rounded-xl">
                  <img src={Select} alt="" />
                  <select className="bg-transparent pt-[12px] pb-[10px] text-[14px]">
                    <option>Accepted</option>
                  </select>
                </div>
                <div className="flex items-center gap-[8px] h-[36px] px-[12px] border-[1px] border-black rounded-xl">
                  <img src={Select} alt="" className="p-1 path fill-pink-600" />
                  <select className="bg-transparent pt-[12px] pb-[10px] text-[14px]">
                    <option>News</option>
                  </select>
                </div>
              </div>
            </div> */}
          <div className="flex-1 bg-white rounded-[4px] pt-[5px] px-[20px]">
            <div className="flex items-center justify-between border-b-[1px] border-solid border-b-[#EAEAEA] h-[60px]">
              <p className="text-[20px] font-normal text-[#031926]">
                {job?.title}
              </p>
              <div className="flex items-center gap-[6px] font-normal text-[12px] text-[#7B8489]">
                <p>Show:</p>
                <div className="h-8 p-2 border-[1px] border-[#EAEAEA] rounded-lg pr-6">
                  10 rows
                </div>
                <div className="h-8 p-2 border-[1px] border-[#EAEAEA] rounded-lg">
                  1-50 of 100
                </div>
                <button className="w-8 h-8 border-[1px] border-[#EAEAEA] rounded-lg hover:bg-[#F9F9F9]">
                  &lt;
                </button>
                <button className="w-8 h-8 border-[1px] border-[#EAEAEA] rounded-lg hover:bg-[#F9F9F9]">
                  &gt;
                </button>
              </div>
            </div>
            <div className="pr-[36px]">
              <div className="flex items-center px-[16px] py-[20px]">
                <input type="checkbox" className="mr-[8px]" />
                <p className="w-[40%] font-[400] text-[14px] text-[#BDBDBD] ">
                  # Name
                </p>
                <p className="w-[15%] font-[400] text-[14px] text-[#BDBDBD] text-center">
                  Applied on
                </p>
                <p className="w-[15%] font-[400] text-[14px] text-[#BDBDBD] text-center">
                  Job Type
                </p>
                <p className="w-[15%] font-[400] text-[14px] text-[#BDBDBD] text-center">
                  Status
                </p>
                <p className="w-[15%] font-[400] text-[14px] text-[#BDBDBD] text-center">
                  Resume
                </p>
              </div>
              {(job?.appliedDevs as any)?.map((dev: any, index: number) => {
                return (
                  <div
                    className="flex items-center px-[16px] py-[20px] border-b-[1px] border-b-[#eaeaea]]"
                    key={index}
                  >
                    <input type="checkbox" className="mr-[8px]" />
                    <div className="w-[40%] flex justify-left">
                      {/* <button> */}
                      <div
                        className="w-fit flex gap-[11px] cursor-pointer"
                        onClick={() =>
                          navigate(`/profile/view/${dev?._id}`, {
                            state: { isDeveloper: true },
                          })
                        }
                      >
                        <img
                          className="w-[32px] h-[32px] object-cover bg-[#eaeaea] rounded-full"
                          src={ImagePath(dev.avatar)}
                          alt=""
                        />
                        <div className="flex flex-col gap-[2px]">
                          <p className="font-[400] text-[14px] text-[#22251d]">
                            {FullName(dev)}
                          </p>
                          <p className="font-[400] text-[12px] text-[#7b8489]">
                            {dev?.designation}
                          </p>
                        </div>
                      </div>
                      {/* </button> */}
                    </div>
                    <p className="w-[15%] font-[400] text-[14px] text-[#22251d] text-center">
                      {job?.startImmediately
                        ? "Immediate"
                        : new Date(job?.startDate as string).toDateString()}
                    </p>
                    <div className="w-[15%] flex justify-center">
                      <div className="w-fit px-[13px] py-[6px] bg-[#f7f5f5] rounded-full">
                        <p className="font-[400] text-[12px] text-[#22251d]">
                          Full-time
                        </p>
                      </div>
                    </div>
                    <div className="w-[15%] flex justify-center">
                      <div className="w-fit px-[12px] py-[6px] bg-[#f9f9f9] border-[1px] border-[#eaeaea] rounded-full">
                        <p className="font-[400] text-[12px] text-[#22251d]">
                          New
                        </p>
                      </div>
                    </div>
                    <div className="w-[15%] flex justify-center">
                      <a
                        href={
                          dev?.resume?.path
                            ? ResumePath(dev?.resume?.path)
                            : "#0"
                        }
                        className="w-fit px-[13px] py-[6px] bg-[#785FD3] rounded-lg"
                        // download={true}
                        target={dev?.resume?.path ? "_blank" : ""}
                        rel="noreferrer"
                        onClick={() => {
                          if (!dev?.resume?.path)
                            toast.error("There's no resume or cv!");
                        }}
                      >
                        <p className="font-[400] text-[12px] text-white">
                          Resume
                        </p>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppliedDevs;
