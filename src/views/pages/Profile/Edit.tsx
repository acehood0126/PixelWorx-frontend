/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import toast from "react-hot-toast";
import axios from "axios";

import { edit, reset } from "../../../store/reducers/authSlice";

import { useAppSelector, useAppDispatch } from "../../../store";
import { ImagePath } from "../../../utils";
import { MENU, CLOSE } from "../../../global/constants/svgs";

import {
  SocialLinks,
  TimezoneTypes,
  JOB_SEEKER,
  BUSINESS,
} from "../../../global/constants";

interface IForm {
  name: string;
  avatar: string;
  designation: string;
  timezone: string;
  description: Array<string>;
  resume: any;
  socials: Array<any>;
}

const Edit = () => {
  const { user, isError, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState<IForm>({
    name: user.name,
    avatar: user.avatar || "avatar.png",
    designation: user.designation,
    timezone: user.timezone,
    description: user.description,
    resume: user.resume,
    socials: user.socials,
  });

  let { name, designation, timezone, description, resume, socials } = formData;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imagePath, setImagePath] = useState(ImagePath(user?.avatar));
  const [avatarPath, setAvatarPath] = useState(user?.avatar);
  const [resumeName, setResumeName] = useState(user?.resume?.name || "");
  const [resumePath, setResumePath] = useState<any>();
  const [socialStatus, setSocialStatus] = useState<any>({
    value: "",
    isEditing: "",
  });

  const contentState1 = stateFromHTML(description[BUSINESS]),
    contentState2 = stateFromHTML(description[JOB_SEEKER]);

  const [editor1, setEditor1] = useState(
    EditorState.createWithContent(contentState1)
  );

  const [editor2, setEditor2] = useState(
    EditorState.createWithContent(contentState2)
  );

  const onEditorStateChange = (value: any) => {
    setFormData((prevState: IForm) => ({
      ...prevState,
      description: [
        user?.isDeveloper
          ? description[BUSINESS]
          : stateToHTML(value.getCurrentContent()),
        user?.isDeveloper
          ? stateToHTML(value.getCurrentContent())
          : description[JOB_SEEKER],
      ],
    }));
    user?.isDeveloper === false ? setEditor1(value) : setEditor2(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: IForm) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    let finalImagePath = avatarPath,
      finalResume = resume;

    if (finalImagePath !== user?.avatar) {
      const formData = new FormData();

      formData.append("image", avatarPath);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          "/api/uploads/avatar",
          formData,
          config
        );

        finalImagePath = data[0].filename;
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    if (resumePath !== undefined) {
      const formData = new FormData();

      formData.append("resume", resumePath);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          "/api/uploads/resume",
          formData,
          config
        );

        finalResume = {
          path: data[0].filename,
          name: resumeName,
        };
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    const userData = {
      name,
      avatar: finalImagePath,
      designation,
      timezone,
      description,
      resume: finalResume,
      socials,
    };

    dispatch(edit(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!isLoading && isSuccess) {
      toast.success("Successfully saved");
      navigate("/profile/view");
    }

    dispatch(reset());
  }, [user, isError, isLoading, isSuccess, message, dispatch, reset]);

  const handleUpload = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    if (!target.files?.length) {
      return;
    }

    const file = target.files[0];

    setAvatarPath(file);
    setImagePath(URL.createObjectURL(file));
  };

  const handleUploadResume = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    if (!target.files?.length) {
      return;
    }

    const file = target.files[0];

    setResumeName(`${file.name} (${file.size / 1000} KB)`);
    setResumePath(file);
  };

  const urlPatternValidation = (URL: string) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
  };

  const handleSocialEditCancel = () => {
    setSocialStatus({ isEditing: "", value: "" });
  };

  const handleSocialEdit = (key: string) => {
    if (
      socialStatus?.isEditing !== "" &&
      ((socialStatus?.isEditing === "discordid" &&
        socialStatus?.value.length) ||
        urlPatternValidation(socialStatus?.value))
    ) {
      let newValue = {
        ...socials[Number(user?.isDeveloper)],
        [socialStatus?.isEditing]: socialStatus?.value,
      };
      setFormData({
        ...formData,
        socials: [
          user?.isDeveloper ? socials[BUSINESS] : newValue,
          user?.isDeveloper ? newValue : socials[JOB_SEEKER],
        ],
      });
    }
    if (
      socialStatus?.isEditing === "" ||
      (socialStatus?.isEditing === "discordid" && socialStatus?.value.length) ||
      urlPatternValidation(socialStatus?.value)
    ) {
      setSocialStatus({ isEditing: key, value: "" });
    } else {
      toast.error("Oops! Invalid Input!");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-row bg-white py-[14px] px-[30px] justify-between items-center rounded-[7px] mb-[20px]">
          <p className="text-[16px] font-[600]">Profile Information</p>
          <div className="text-[14px] font-bold">
            <button
              type="button"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();

                navigate("/profile/view");
              }}
              className="bg-theme py-[8px] px-[12px] rounded-[6px] mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="bg-slimy-green text-white py-[8px] px-[12px] rounded-[6px] disabled:opacity-40"
              disabled={isLoading}
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full h-full bg-white p-[24px] pl-[90px] rounded-[7px]">
          <div className="flex justify-start flex-row items-center gap-[40px] mt-[20px] mb-[60px] pr-[90px]">
            <div className="">
              <img
                className="w-[100px] h-[100px] inline-block rounded-full border-[3px] p-[3px] object-cover border-gamboge"
                src={imagePath}
                alt=""
              />
            </div>
            <div className="flex gap-[16px]">
              <button className="text-[14px] font-[600] rounded-lg bg-slimy-green text-white px-4 py-2">
                Upload new picture
              </button>
              <input
                className="cursor-pointer absolute block py-2 px-4 opacity-0 pin-r pin-t w-[160px]"
                type="file"
                accept=".jpg,.jpeg,.png"
                name="avatar"
                onChange={handleUpload}
              />
              <button className="text-[14px] font-[600] rounded-lg bg-gray-300 px-4 py-2">
                Delete
              </button>
            </div>
          </div>

          <div className="flex flex-col pr-[90px] mb-[20px]">
            <div className="flex flex-row gap-[20px] items-center">
              <p className="font-[600] text-[18px]">Generals</p>
              <div className="flex-1 border-t-[1px]"></div>
            </div>
            <div className="grid grid-cols-2 gap-[20px] py-[25px]">
              <div>
                <label htmlFor="name" className="text-[14px] font-[600] p-1">
                  {user?.isDeveloper ? "User Name" : "Company Name"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="text-[14px] w-full bg-theme p-[16px] rounded-[10px] border-[1px] border-gray-300"
                  placeholder={`Enter your ${
                    user?.isDeveloper ? "user name" : "company name"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="designation"
                  className="text-[14px] font-[600] p-1"
                >
                  {user?.isDeveloper ? "Status" : "Tag Line"}
                </label>
                <input
                  type="text"
                  name="designation"
                  value={designation}
                  onChange={onChange}
                  className="text-[14px] w-full bg-theme p-[16px] rounded-[10px] border-[1px] border-gray-300"
                  placeholder={`Enter a ${
                    user?.isDeveloper ? "status" : "tag line"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="timezone"
                  className="text-[14px] font-[600] p-1"
                >
                  Select Your Time Zone
                </label>
                <select
                  name="timezone"
                  id="timezone"
                  className="text-[14px] w-full bg-theme p-[16px] rounded-[10px] border-[1px] border-gray-300"
                  onChange={(e) => {
                    setFormData((prevState: IForm) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                >
                  {TimezoneTypes &&
                    TimezoneTypes?.map((v) => (
                      <option value={v.value} selected={v.value === timezone}>
                        {v.name}
                      </option>
                    ))}
                </select>
                {/* <input
                      type="text"
                      name="timezone"
                      value={timezone}
                      onChange={onChange}
                      className="text-[14px] w-full bg-theme p-[16px] rounded-[10px] border-[1px] border-gray-300"
                      placeholder="Enter your timezone"
                    /> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col pr-[90px] mb-[20px]">
            <div className="flex flex-row gap-[20px] items-center">
              <p className="font-[600] text-[18px]">
                {user?.isDeveloper ? "About Yourself" : "About Company"}
              </p>
              <div className="flex-1 border-t-[1px]"></div>
            </div>
            <div className="py-[25px]">
              <label
                htmlFor="description"
                className="text-[14px] font-[600] p-1"
              >
                Tell Us {user?.isDeveloper ? "About Yourself" : "About Company"}
              </label>
              <Editor
                editorState={user?.isDeveloper ? editor2 : editor1}
                toolbarClassName=""
                wrapperClassName="border rounded-md min-h-[200px] mt-[20px]"
                editorClassName="px-4"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </div>

          {user?.isDeveloper && (
            <div className="flex flex-col pr-[90px] mb-[40px] gap-4">
              <div className="flex flex-row gap-[20px] items-center">
                <p className="font-bold text-[18px]">Resume</p>
                <hr className="flex-1 border-t-[1px]"></hr>
              </div>
              {resumeName !== "" && (
                <div className="mt-3 bg-theme w-full rounded-[3px] border-primary border-l-[6px] p-[11px]">
                  <p className="text-[12px] font-[600]">{resumeName}</p>
                </div>
              )}
              <div className="relative">
                <button
                  className="bg-slimy-green text-white text-[16px] p-2 w-[156px] font-bold rounded-lg"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                  }}
                >
                  Attach CV
                </button>
                <input
                  className="cursor-pointer absolute block p-2 top-0 opacity-0 pin-r pin-t w-[156px]"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  name="resume"
                  onChange={handleUploadResume}
                />
              </div>
            </div>
          )}

          {SocialLinks && (
            <div className="flex flex-col pr-[90px] mb-[30px] gap-4">
              <div className="flex flex-row gap-[20px] items-center">
                <p className="font-bold text-[18px]">Social Links</p>
                <hr className="flex-1 border-t-[1px]"></hr>
              </div>
              <div className="flex flex-col w-full">
                {SocialLinks?.map(
                  (v, index) =>
                    ((user?.isDeveloper && v.key !== "discord") ||
                      (!user?.isDeveloper &&
                        v.key !== "discordid" &&
                        v.key !== "github")) && (
                      <div
                        className="flex w-full px-4 py-5 justify-between border-b-[1px]"
                        key={index}
                      >
                        <div className="flex gap-4 items-center">
                          <img src={MENU} className="pr-2" alt="" />
                          <img src={v.image} alt="" />
                          <p className="text-4 font-bold">{v.name}</p>
                        </div>

                        <div className="flex">
                          {v.key === socialStatus?.isEditing ? (
                            <div className="flex gap-[15px]">
                              <input
                                type="text"
                                className="border-[1px] rounded-md w-[150px] px-2 py-1 text-[14px]"
                                value={socialStatus?.value}
                                placeholder={`${v.name} ${
                                  v.key === "discordid" ? "" : "URL"
                                }`}
                                onChange={(e) =>
                                  setSocialStatus({
                                    ...socialStatus,
                                    value: e.target.value,
                                  })
                                }
                              />
                              <button
                                type="button"
                                className="text-[14px] text-gray-500 py-[6px] font-bold"
                                onClick={() => handleSocialEdit("")}
                              >
                                Submit
                              </button>
                              <img
                                src={CLOSE}
                                alt=""
                                className="w-[10px] h-[10px] m-auto cursor-pointer"
                                onClick={() => handleSocialEditCancel()}
                              />
                            </div>
                          ) : socials &&
                            socials[Number(user?.isDeveloper)] &&
                            socials[Number(user?.isDeveloper)][v.key] ? (
                            <div className="flex gap-2 items-center">
                              <p className="text-[14px] text-gray-500">
                                {socials[Number(user?.isDeveloper)][v.key]}
                              </p>
                              <img
                                src={CLOSE}
                                alt=""
                                className="w-[10px] h-[10px] m-auto cursor-pointer"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    socials: {
                                      ...socials,
                                      [v.key]: "",
                                    },
                                  });
                                }}
                              />
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="bg-slimy-green px-[25px] py-[6px] text-white rounded-md font-bold"
                              onClick={() => handleSocialEdit(v.key)}
                            >
                              Link
                            </button>
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
        <div className="text-[14px] font-bold flex flex-row justify-end gap-2 mt-[20px] mr-[30px]">
          <button
            type="button"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();

              navigate("/profile/view");
            }}
            className="bg-theme py-[8px] px-[12px] rounded-[6px] mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="bg-slimy-green text-white py-[8px] px-[12px] rounded-[6px] disabled:opacity-40"
            disabled={isLoading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
