/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";

import { useAppSelector, useAppDispatch } from "../../../store";
import { getJob, applyJob } from "../../../store/reducers/jobSlice";
import { ImagePath } from "../../../utils";
// import { ReactComponent as FACEBOOK } from "../../assets/svgs/social_facebook.svg";
import { ReactComponent as TWITTER } from "../../../assets/svgs/social_twitter.svg";
import { ReactComponent as DISCORD } from "../../../assets/svgs/social_discord.svg";
import { ReactComponent as LINKEDIN } from "../../../assets/svgs/social_linkedin.svg";
import { ReactComponent as WEBSITE } from "../../../assets/svgs/social_website.svg";
import { BUSINESS, SocialLinks } from "../../../global/constants";
// import { wait } from "@testing-library/user-event/dist/utils";

const JobView = () => {
  const { id } = useParams();
  const { job, isError } = useAppSelector((state) => state.job);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { connect, select } = useWallet();

  useEffect(() => {
    if (isError) {
    }

    dispatch(getJob(id));
  }, [dispatch, isError]);

  const connectWallet = async () => {
    // @ts-ignore
    await select("Phantom");
    await connect();
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      dispatch(applyJob(id));
      navigate("/job");
    } else {
      connectWallet();
    }
  };

  return (
    <>
      {job && (
        <>
          <div className="w-full pt-[15px] flex items-center justify-start text-[14px]">
            {/* <button
                className="rounded-[4px] w-[78px] h-[34px] bg-[#eaeaea]/50"
                onClick={() => navigate("/job")}
              >
                Back
              </button> */}
            <p className="text-gray-500 ml-[20px]">
              Post Date:{" "}
              <span className="text-black-300">
                {new Date(job?.createdAt).toDateString()}
              </span>
            </p>
            <p className="text-gray-500 ml-[20px]">
              Start Date:{" "}
              <span className="text-black-300">
                {job?.startImmediately
                  ? "Immediate"
                  : new Date(job?.startDate).toDateString()}
              </span>
            </p>
          </div>
          <div className="w-full mt-[18px] grid grid-cols-[auto_320px] gap-[18px]">
            <div className="pl-[36px] py-[34px] pr-[117px] bg-white rounded-[10px]">
              <p className="text-gray-600 text-[12px]">JOB DESCRIPTION</p>
              <p className="mt-[7px] text-[22px] text-black-400 font-bold">
                {job?.title}
              </p>
              <div className="mt-[14px] text-[14px] text-gray-600 flex gap-[20px]">
                <p className="">{job?.type}</p>
                {/* <p className="">{job?.department}</p> */}
                <p className="">
                  {job?.salary} {job?.salaryType}
                </p>
                <p className="">{job?.paymentWay}</p>
              </div>
              {(!user ||
                (user &&
                  user.isDeveloper &&
                  user._id !== job.userid &&
                  (job.appliedDevs as any)?.findIndex(
                    (v: any) => v.address === user?.address
                  ) === -1)) && (
                <button
                  className="px-[15px] h-[38px] mt-[17px] bg-slimy-green rounded-[4px] text-white text-[14px] disabled:opacity-30"
                  onClick={handleApply}
                >
                  {user ? "APPLY NOW" : "CONNECT WALLET"}
                </button>
              )}
              <div className="w-full text-[14px] p-[5px] mt-[16px] leading-[17px]">
                <div
                  className="[&>ul]:list-disc [&>ol]:list-decimal [&>ol]:pl-5 [&>ul]:pl-5 [&>*]:my-[5px] [&>*>*]:my-[8px]"
                  dangerouslySetInnerHTML={{ __html: job?.description }}
                />
              </div>

              {(job?.user as any)?.socials &&
                SocialLinks?.filter(
                  (v) =>
                    (job?.user as any)?.socials[0][
                      v?.key
                    ]
                ).length !== 0 && (
                  <>
                    <div className="w-full flex items-center mt-[51px]">
                      <p className="mr-[21px] text-[15px] font-bold">
                        Social Link
                      </p>
                      <div className="flex-1 w-full h-[1px] bg-gray-300"></div>
                    </div>
                    <div className="w-full flex items-center mt-[24px] mb-[20px] gap-8">
                      {(job?.user as any)?.socials[0][
                        "discord"
                      ] && (
                        <a
                          href={
                            (job?.user as any)?.socials[
                              0
                            ].discord
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SvgWrapper>
                            <DISCORD />
                          </SvgWrapper>
                        </a>
                      )}
                      {(job?.user as any)?.socials[0][
                        "twitter"
                      ] && (
                        <a
                          href={(job?.user as any)?.socials[0].twitter}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SvgWrapper>
                            <TWITTER />
                          </SvgWrapper>
                        </a>
                      )}
                      {(job?.user as any)?.socials[0][
                        "linkedin"
                      ] && (
                        <a
                          href={(job?.user as any)?.socials[0].linkedin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SvgWrapper>
                            <LINKEDIN />
                          </SvgWrapper>
                        </a>
                      )}
                      {(job?.user as any)?.socials[0][
                        "website"
                      ] && (
                        <a
                          href={(job?.user as any)?.socials[0].website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SvgWrapper>
                            <WEBSITE />
                          </SvgWrapper>
                        </a>
                      )}
                    </div>
                  </>
                )}
            </div>
            <div>
              <div
                className="px-[25px] py-[30px] bg-white rounded-[10px] cursor-pointer"
                onClick={() => {
                  navigate(`/profile/view/${(job?.user as any)?._id}`, {
                    state: { isDeveloper: false },
                  });
                }}
              >
                <div className="flex justify-between items-start">
                  <img
                    className="w-[90px] h-[90px] object-cover bg-black-400 rounded-full flex justify-center text-[35px] font-black items-center text-white"
                    src={ImagePath((job?.user as any)?.avatar)}
                    alt=""
                  />
                  {/* <a
                      href="#0"
                      className="text-[14px] underline"
                      rel="noreferrer"
                    >
                      Visit Site
                    </a> */}
                </div>
                <div className="">
                  <div className="flex justify-between items-center mt-[18px]">
                    <p className="text-[20px] leading-[24px] font-bold">
                      {(job?.user as any)?.name}
                    </p>
                    {/* <button className="text-[14px] leading-[17px] text-gray-600">
                        Edit
                      </button> */}
                  </div>
                  <div className="mt-[14px] text-gray-600 text-[14px] overflow-hidden">
                    <div
                      className="[&>ul]:list-disc [&>ol]:list-decimal [&>ol]:pl-5 [&>ul]:pl-5 [&>*]:my-[5px] [&>*>*]:my-[8px]"
                      dangerouslySetInnerHTML={{
                        __html: (job?.user as any)?.description[BUSINESS],
                      }}
                    />
                  </div>
                </div>
                {(!user ||
                  (user &&
                    user.isDeveloper &&
                    user._id !== job.userid &&
                    (job.appliedDevs as any)?.findIndex(
                      (v: any) => v.address === user?.address
                    ) === -1)) && (
                  <button
                    className="mt-[12px] w-full h-[45px] bg-slimy-green rounded-[4px] font-[14p] text-white disabled:opacity-30"
                    onClick={handleApply}
                  >
                    {user ? "APPLY NOW" : "CONNECT WALLET"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const SvgWrapper = styled.div`
  & path {
    fill: ${(props: any) => props.color || "#000"};
  }
`;
export default JobView;
