/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
// import { stateFromHTML } from "draft-js-import-html";

// import { ReactComponent as BackSvg } from "../../assets/svgs/back.svg";

import { useAppSelector, useAppDispatch } from "../../../store";
import { postJob, reset } from "../../../store/reducers/jobSlice";
import { JobType, ChainType, PaymentType } from "../../../global/constants";

interface IForm {
  title: string;
  type: string;
  chain: string;
  startDate: string;
  startImmediately: boolean;
  salarType: string;
  paymentWay: string;
  salary: number;
  description: any;
}

const JobPost = () => {
  const [saving, setSaving] = useState(false);

  const {
    job,
    isError,
    // isLoading,
    isSuccess,
    message,
  } = useAppSelector((state) => state.job);

  const [formData, setFormData] = useState<IForm>({
    title: job.title || "",
    type: job.type || JobType[0],
    chain: job.chain || ChainType[0],
    startDate: job.startDate || "",
    startImmediately: job.startImmediately || false,
    salarType: job.salarType || ChainType[0],
    paymentWay: job.paymentWay || PaymentType[0],
    salary: job.salary || 0,
    description: job.description || "",
  });

  const {
    title,
    type,
    chain,
    startDate,
    startImmediately,
    salarType,
    paymentWay,
    salary,
    description,
  } = formData;
  const [editor, setEditor] = useState(EditorState.createEmpty());

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: IForm) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onEditorStateChange = (value: any) => {
    setFormData((prevState: IForm) => ({
      ...prevState,
      description: stateToHTML(value.getCurrentContent()),
    }));
    setEditor(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jobData = {
      title,
      type,
      chain,
      startDate,
      startImmediately,
      salarType,
      paymentWay,
      salary,
      description,
    };

    setSaving(true);
    dispatch(postJob(jobData));
  };

  useEffect(() => {
    if (isError) {
    }

    if (saving && isSuccess && job) {
      navigate("/job");
      setSaving(false);
    }

    dispatch(reset());
  }, [
    isError,
    isSuccess,
    job,
    message,
    navigate,
    saving,
    setSaving,
    dispatch,
    reset,
  ]);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex-1 bg-white rounded-[8px] pt-[10px] px-[20px] pb-[30px]">
        <div className="flex items-center gap-[10px] border-b-[1px] border-solid border-b-[#eaeaea] h-[60px]">
          {/* <button
                  className="flex items-center gap-[4px]"
                  onClick={() => navigate("/job")}
                >
                  <BackSvg />
                  <p className="font-[400] text-[16px] text-[#7b8489]">Back</p>
                </button> */}
          <p className="font-black text-[20px] text-[#031926]">Post Job</p>
        </div>
        <div className="grid grid-cols-2 gap-[16px] my-[22px]">
          <div className="flex flex-col gap-[5px] py-[px]">
            <p className="font-bold text-[14px] text-[#111111]">Job Title</p>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px]"
              placeholder="Type here"
            />
          </div>
          <div className="flex flex-col gap-[5px] py-[px]">
            <p className="font-bold text-[14px] text-[#111111]">Job Type</p>
            <select
              name="type"
              id="type"
              className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px]"
              onChange={(e) => {
                setFormData((prevState: IForm) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            >
              {JobType?.map((v) => (
                <option value={v} selected={v === type}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-[5px] py-[px]">
            <p className="font-bold text-[14px] text-[#111111]">Main Chain</p>
            <select
              name="chain"
              id="chain"
              className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px]"
              onChange={(e) => {
                setFormData((prevState: IForm) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            >
              {ChainType?.map((v) => (
                <option value={v} selected={v === chain}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-[5px] py-[px]">
            <p className="font-bold text-[14px] text-[#111111]">
              Salary Paid In
            </p>
            <select
              name="salarType"
              id="salarType"
              className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px]"
              onChange={(e) => {
                setFormData((prevState: IForm) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            >
              {ChainType?.map((v) => (
                <option value={v} selected={v === salarType}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-[5px] py-[px]">
            <p className="font-bold text-[14px] text-[#111111]">
              Payout frequency
            </p>
            <select
              name="paymentWay"
              id="paymentWay"
              className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px]"
              onChange={(e) => {
                setFormData((prevState: IForm) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            >
              {PaymentType?.map((v) => (
                <option value={v} selected={v === paymentWay}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-[5px] py-[px]">
            <p className="font-bold text-[14px] text-[#111111]">Expected pay</p>
            <input
              type="number"
              step="0.1"
              name="salary"
              value={salary}
              onChange={onChange}
              className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px]"
              placeholder="Input your expected pay"
            />
          </div>

          <div className="flex flex-row gap-[30px] py-[px] items-center justify-center mt-[30px]">
            <div className="flex flex-row gap-[5px]">
              <input
                type="radio"
                name="startImmediately"
                value={"false"}
                checked={startImmediately}
                className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px]"
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    startImmediately: true,
                  });
                }}
              />
              <p> Immediate </p>
            </div>
            <div className="flex flex-row gap-[5px]">
              <input
                type="radio"
                name="startImmediately"
                value={"true"}
                checked={!startImmediately}
                className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px]"
                onClick={(e) => {
                  setFormData({
                    ...formData,
                    startImmediately: false,
                  });
                }}
              />
              <p>Calendar</p>
            </div>
          </div>

          <div className="flex flex-col gap-[5px] py-[px]">
            <p className="font-bold text-[14px] text-[#111111]">Start Date</p>
            <input
              type="date"
              name="startDate"
              value={startDate && startDate.toString()}
              onChange={onChange}
              className="p-[16px] bg-[#f9f9f9] border-[1px] border-solid border-[#eaeaea] rounded-[10px] text-[14px] disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={startImmediately}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <p className="font-bold text-[14px] text-[#111111]">Descriptions</p>
          <Editor
            editorState={editor}
            toolbarClassName=""
            wrapperClassName="border rounded-md min-h-[200px]"
            editorClassName="px-4"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <div className="mt-[15px] flex flex-row justify-end">
          <button
            type="submit"
            className="w-fit px-[32px] py-[8px] bg-slimy-green rounded-[4px] font-black text-[14px] text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobPost;
