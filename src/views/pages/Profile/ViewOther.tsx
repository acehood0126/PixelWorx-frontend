/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useAppSelector, useAppDispatch } from "../../../store";
import { ImagePath, FullName, ResumePath } from "../../../utils";
import { view } from "../../../store/reducers/authSlice";
import { SocialLinks } from "../../../global/constants";

import { ReactComponent as GITHUB } from "../../../assets/svgs/social_github.svg";
import { ReactComponent as TWITTER } from "../../../assets/svgs/social_twitter.svg";
import { ReactComponent as DISCORD } from "../../../assets/svgs/social_discord.svg";
import { ReactComponent as LINKEDIN } from "../../../assets/svgs/social_linkedin.svg";
import { ReactComponent as WEBSITE } from "../../../assets/svgs/social_website.svg";

interface navigatestate {
  isDeveloper: boolean;
}

const ViewOther = () => {
  const { state } = useLocation();
  const { isDeveloper } = state as navigatestate;
  const { id } = useParams();
  const {
    other,
    isError,
    //  isLoading
  } = useAppSelector((state) => state.auth);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
    }

    dispatch(view(id as string));
  }, [dispatch, isError]);

  return (
    <div className="mx-[150px] flex flex-row justify-center">
      {other && (
        <div className="max-w-[600px] w-[600px]">
          <div className="flex flex-col w-full bg-white p-[40px] px-[80px] rounded-[7px]">
            <div className="flex justify-start flex-col items-start gap-[20px] w-full">
              <div className="flex flex-row justify-between items-start w-full">
                <img
                  className="w-[100px] h-[100px] rounded-full border-[3px] p-[3px] object-cover border-gamboge"
                  src={ImagePath(other?.avatar)}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <p className="font-black text-[28px]">{FullName(other)}</p>
                <p className="text-[18px]">{other?.designation}</p>
              </div>
            </div>
            {other?.socials &&
              SocialLinks?.filter(
                (v) => other?.socials[Number(isDeveloper)][v?.key]
              ).length !== 0 && (
                <div className="flex flex-row flex-wrap items-center mt-[25px] gap-[27px] ">
                  {SocialLinks &&
                    other?.socials &&
                    SocialLinks?.filter(
                      (v) => other?.socials[Number(isDeveloper)][v?.key]
                    ).map(
                      (v) =>
                        ((isDeveloper && v.key !== "discord") ||
                          (!isDeveloper &&
                            v?.key !== "discordid" &&
                            v?.key !== "github")) &&
                        ((v?.key === "discord" && (
                          <a
                            href={other?.socials[Number(isDeveloper)][v?.key]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <SvgWrapper>
                              <DISCORD />
                            </SvgWrapper>
                          </a>
                        )) ||
                          (v?.key === "discordid" && (
                            <button
                              onClick={async () => {
                                await navigator.clipboard.writeText(
                                  other?.socials[Number(isDeveloper)][v?.key]
                                );
                                toast.success("Copied to clipboard");
                              }}
                            >
                              <SvgWrapper>
                                <DISCORD />
                              </SvgWrapper>
                            </button>
                          )) ||
                          (v?.key === "twitter" && (
                            <a
                              href={other?.socials[Number(isDeveloper)][v?.key]}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <SvgWrapper>
                                <TWITTER />
                              </SvgWrapper>
                            </a>
                          )) ||
                          (v?.key === "linkedin" && (
                            <a
                              href={other?.socials[Number(isDeveloper)][v?.key]}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <SvgWrapper>
                                <LINKEDIN />
                              </SvgWrapper>
                            </a>
                          )) ||
                          (v?.key === "github" && (
                            <a
                              href={other?.socials[Number(isDeveloper)][v?.key]}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <SvgWrapper>
                                <GITHUB />
                              </SvgWrapper>
                            </a>
                          )) ||
                          (v?.key === "website" && (
                            <a
                              href={other?.socials[Number(isDeveloper)][v?.key]}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <SvgWrapper>
                                <WEBSITE />
                              </SvgWrapper>
                            </a>
                          )))
                      // <a
                      //   className="bg-theme w-[352px] rounded-full border-[1px] border-gray-300 text-[16px] font-[600] py-[10px] text-center"
                      //   href={
                      //     v?.key === "discordid"
                      //       ? "#0"
                      //       : other?.socials[Number(other?.isDeveloper)][v?.key]
                      //   }
                      //   target={v?.key !== "discordid" ? "_blank" : ""}
                      //   rel="noreferrer"
                      // >
                      //   {v?.key === "discordid"
                      //     ? other?.socials[Number(other?.isDeveloper)][v?.key]
                      //     : v?.name}
                      // </a>
                    )}
                </div>
              )}
          </div>

          <div className="flex flex-col w-full bg-white p-[40px] px-[80px] rounded-[7px] mt-[30px]">
            {other?.name !== "" && (
              <div className="flex justify-between">
                <p className="font-black text-[18px]">
                  {isDeveloper ? "About Me" : "About Company"}
                </p>

                <div className="text-[14px] font-bold rounded-full border-[1px] p-[6px] px-[12px] text-gray-500 border-gray-100">
                  Time zone:{" "}
                  <span className="text-electric-purple font-bold">
                    {other?.timezone}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col h-full">
              <div className="text-[14px] py-[18px] text-black-400">
                <div
                  className="[&>ul]:list-disc [&>ol]:list-decimal [&>ol]:pl-5 [&>ul]:pl-5 [&>*]:my-[5px] [&>*>*]:my-[8px]"
                  dangerouslySetInnerHTML={{
                    __html: other?.description[Number(isDeveloper)],
                  }}
                />
              </div>
            </div>

            {isDeveloper && other?.resume?.name && (
              <div className="flex flex-col pr-[90px] mb-[30px]">
                <p className="font-black text-[18px]">Resume</p>
                {other?.resume?.name && (
                  <a
                    href={
                      other?.resume?.path
                        ? ResumePath(other?.resume?.path)
                        : "#0"
                    }
                    target={other?.resume?.path ? "_blank" : ""}
                    rel="noreferrer"
                    className="mt-[25px] bg-theme w-full rounded-[3px] border-primary border-l-[6px] p-[11px]"
                  >
                    <p className="text-[12px] font-[600]">
                      {other?.resume?.name}
                    </p>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SvgWrapper = styled.div`
  & path {
    fill: ${(props: any) => props.color || "#000"};
  }
`;

export default ViewOther;
