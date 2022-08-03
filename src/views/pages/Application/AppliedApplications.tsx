import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { ReactComponent as MailSvg } from "../../assets/svgs/mail.svg";
// import { ReactComponent as PhoneSvg } from "../../assets/svgs/phone.svg";
// import { ReactComponent as MoreSvg } from "../../assets/svgs/more_vertical.svg";
import { ReactComponent as BlueFolderSvg } from "../../../assets/svgs/empty_application.svg";

import { useAppSelector, useAppDispatch } from "../../../store";
import { getJobs } from "../../../store/reducers/jobSlice";
import { ImagePath } from "../../../utils";

const AppliedApplications = () => {
  const {
    jobs,
    isError,
    // isLoading,
    // isSuccess,
    //  message
  } = useAppSelector((state) => state.job);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
    }

    dispatch(getJobs({}));
  }, [dispatch, isError]);

  return (
    <>
      <div className="flex-1 bg-white rounded-[4px] pt-[5px] px-[20px]">
        {jobs &&
        jobs.filter(
          (v: any) =>
            v.appliedDevs?.findIndex(
              (vv: any) => vv.address === user.address
            ) !== -1
        ).length ? (
          <>
            <div className="flex items-center justify-between border-b-[1px] border-solid border-b-[#EAEAEA] h-[60px]">
              <p className="text-[20px] font-black text-[#031926]">
                All Applied Applications
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
                <p className="w-[10%] font-[400] text-[14px] text-[#BDBDBD] ">
                  # Job ID
                </p>
                <p className="w-[30%] font-[400] text-[14px] text-[#BDBDBD] text-left">
                  Company
                </p>
                <p className="w-[15%] font-[400] text-[14px] text-[#BDBDBD] text-center">
                  Positions
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
              </div>
              {jobs &&
                jobs
                  .filter(
                    (v: any) =>
                      v.appliedDevs?.findIndex(
                        (vv: any) => vv.address === user.address
                      ) !== -1
                  )
                  .map((job) => (
                    <div className="flex items-center px-[16px] py-[20px] border-b-[1px] border-b-[#eaeaea]]">
                      <input type="checkbox" className="mr-[8px]" />
                      <p className="w-[10%] font-[400] text-[14px] text-[#22251d] ">
                        #APL-0002
                      </p>
                      <div
                        className="w-[30%] flex justify-left cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/profile/view/${((job as any).user as any)._id}`,
                            { state: { isDeveloper: false } }
                          )
                        }
                      >
                        <div className="w-fit flex gap-[11px]">
                          <img
                            className="w-[32px] h-[32px] object-cover bg-[#eaeaea] rounded-full"
                            src={ImagePath(((job as any).user as any).avatar)}
                            alt=""
                          />
                          <div className="flex flex-col gap-[2px]">
                            <p className="font-bold text-[14px] text-[#22251d]">
                              {((job as any).user as any).name}
                            </p>
                            <p className="font-[400] text-[12px] text-[#7b8489]">
                              {((job as any).user as any).designation}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="w-[15%] font-[400] text-[14px] text-[#22251d] text-center">
                        {(job as any).title}
                      </p>
                      <p className="w-[15%] font-[400] text-[14px] text-[#22251d] text-center">
                        {(job as any)?.startImmediately
                          ? "Immediate"
                          : new Date(
                              (job as any).startDate as string
                            ).toDateString()}
                      </p>
                      <div className="w-[15%] flex justify-center">
                        <div className="w-fit px-[13px] py-[6px] bg-[#f7f5f5] rounded-full">
                          <p className="font-[400] text-[12px] text-[#22251d] text-center">
                            {(job as any)?.type}
                          </p>
                        </div>
                      </div>
                      <div className="w-[15%] flex justify-center">
                        <div className="w-fit px-[12px] py-[6px] bg-[#f9f9f9] border-[1px] border-[#eaeaea] rounded-full">
                          <p className="font-[400] text-[12px] text-[#22251d]">
                            Pending
                          </p>
                        </div>
                      </div>
                    </div>
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
                  You haven't applied for any positions!
                </p>
                <p className="text-center text-[15px] mt-[10px]">
                  Apply for your next web 3 job with the button below.
                </p>
                <div className="flex justify-center mt-[20px]">
                  <button
                    className="text-[12px] font-bold rounded-lg bg-slimy-green text-white px-3 py-[9px] w-[195px]"
                    onClick={() => navigate("/job/grid")}
                  >
                    View Job Listings
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

export default AppliedApplications;
