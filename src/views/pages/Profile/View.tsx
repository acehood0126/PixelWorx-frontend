import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";

import { useAppSelector } from "../../../store";
import { ImagePath, FullName, ResumePath } from "../../../utils";
import { SocialLinks } from "../../../global/constants";

import { ReactComponent as SQUARE_POSTS } from "../../../assets/svgs/square_posts.svg";
import { ReactComponent as GITHUB } from "../../../assets/svgs/social_github.svg";
import { ReactComponent as TWITTER } from "../../../assets/svgs/social_twitter.svg";
import { ReactComponent as DISCORD } from "../../../assets/svgs/social_discord.svg";
import { ReactComponent as LINKEDIN } from "../../../assets/svgs/social_linkedin.svg";
import { ReactComponent as WEBSITE } from "../../../assets/svgs/social_website.svg";

const View = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="mx-[150px] flex flex-row justify-center">
      {user && (
        <div className="max-w-[600px] w-[600px]">
          <div className="flex flex-col w-full bg-white p-[40px] px-[80px] rounded-[7px]">
            <div className="flex justify-start flex-col items-start gap-[20px] w-full">
              <div className="flex flex-row justify-between items-start w-full">
                <img
                  className="w-[100px] h-[100px] rounded-full border-[3px] p-[3px] object-cover border-gamboge"
                  src={ImagePath(user?.avatar)}
                  alt=""
                />
                {user?.name !== "" && (
                  <button
                    className="text-[14px] font-bold rounded-[5px] bg-slimy-green text-white py-[9px] w-[125px] mt-[10px]"
                    onClick={() => navigate("/profile/edit")}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              <div className="flex flex-col">
                <p className="font-black text-[28px]">{FullName(user)}</p>
                <p className="text-[18px]">{user?.designation}</p>
              </div>
            </div>
            {user?.socials &&
              SocialLinks?.filter(
                (v) => user?.socials[Number(user?.isDeveloper)][v?.key]
              ).length !== 0 && (
                <div className="flex flex-row flex-wrap items-center mt-[25px] gap-[27px] ">
                  {SocialLinks &&
                    user?.socials &&
                    SocialLinks?.filter(
                      (v) => user?.socials[Number(user?.isDeveloper)][v?.key]
                    ).map(
                      (v) =>
                        ((user?.isDeveloper && v.key !== "discord") ||
                          (!user?.isDeveloper &&
                            v?.key !== "discordid" &&
                            v?.key !== "github")) &&
                        ((v?.key === "discord" && (
                          <a
                            href={
                              user?.socials[Number(user?.isDeveloper)][v?.key]
                            }
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
                                  user?.socials[Number(user?.isDeveloper)][
                                    v?.key
                                  ]
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
                              href={
                                user?.socials[Number(user?.isDeveloper)][v?.key]
                              }
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
                              href={
                                user?.socials[Number(user?.isDeveloper)][v?.key]
                              }
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
                              href={
                                user?.socials[Number(user?.isDeveloper)][v?.key]
                              }
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
                              href={
                                user?.socials[Number(user?.isDeveloper)][v?.key]
                              }
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
                      //       : user?.socials[Number(user?.isDeveloper)][v?.key]
                      //   }
                      //   target={v?.key !== "discordid" ? "_blank" : ""}
                      //   rel="noreferrer"
                      // >
                      //   {v?.key === "discordid"
                      //     ? user?.socials[Number(user?.isDeveloper)][v?.key]
                      //     : v?.name}
                      // </a>
                    )}
                </div>
              )}
          </div>

          <div className="flex flex-col w-full bg-white p-[40px] px-[80px] rounded-[7px] mt-[30px]">
            {user?.name !== "" && (
              <div className="flex justify-between">
                <p className="font-black text-[18px]">
                  {user?.isDeveloper ? "About Me" : "About Company"}
                </p>

                <div className="text-[14px] font-bold rounded-full border-[1px] p-[6px] px-[12px] text-gray-500 border-gray-100">
                  Time zone:{" "}
                  <span className="text-electric-purple font-bold">
                    {user?.timezone}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col h-full">
              <div className="text-[14px] py-[18px] text-black-400">
                <div
                  className="[&>ul]:list-disc [&>ol]:list-decimal [&>ol]:pl-5 [&>ul]:pl-5 [&>*]:my-[5px] [&>*>*]:my-[8px]"
                  dangerouslySetInnerHTML={{
                    __html: user?.description[Number(user?.isDeveloper)],
                  }}
                />
              </div>
              {user.name === "" && (
                <div className="flex flex-col h-full">
                  <div className="flex h-full items-center justify-center">
                    <div>
                      <div className="flex justify-center">
                        <SQUARE_POSTS />
                      </div>
                      <p className="text-center text-[22px] font-black mt-[10px]">
                        Your profile is Empty!
                      </p>
                      <p className="text-center text-[17px] mt-[10px]">
                        Fill in your profile details and contact details for
                        higher application success.
                        <br />
                        And allow employers to reach you for engagement!
                      </p>
                      <div className="flex justify-center mt-[20px]">
                        <button
                          className="rounded-lg bg-slimy-green text-white px-3 py-[9px] w-[195px] text-[14px] font-bold"
                          onClick={() => navigate("/profile/edit")}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user?.isDeveloper && user?.resume?.name && (
              <div className="flex flex-col pr-[90px] mb-[30px]">
                <p className="font-black text-[18px]">Resume</p>
                {user?.resume?.name && (
                  <a
                    href={
                      user?.resume?.path ? ResumePath(user?.resume?.path) : "#0"
                    }
                    target={user?.resume?.path ? "_blank" : ""}
                    rel="noreferrer"
                    className="mt-[25px] bg-theme w-full rounded-[3px] border-primary border-l-[6px] p-[11px]"
                  >
                    <p className="text-[12px] font-[600]">
                      {user?.resume?.name}
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

export default View;
