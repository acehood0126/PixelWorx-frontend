import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

import JobCard from "../../components/JobCard";
// import { ReactComponent as Grid } from "../../assets/svgs/view_tiles.svg";
// import Select from "../../assets/svgs/select.svg";

import { useAppSelector, useAppDispatch } from "../../../store";
import { getJobs } from "../../../store/reducers/jobSlice";
import { cardcounts } from "../../../global/constants";

const JobGridView = () => {
  const [jobcount, setJobCount] = useState(4);
  const [currentpage, setCurrentPage] = useState(0);

  const {
    jobs,
    isError,
    total,
    //  isLoading,
    // isSuccess,
    //  message
  } = useAppSelector((state) => state.job);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
    }

    dispatch(getJobs({ currentpage, jobcount }));
  }, [dispatch, isError, currentpage, jobcount]);

  return (
    <>
      <div className="flex justify-between items-center h-[70px] mt-[15px] mb-[25px] pl-[30px] pr-[12px] bg-white rounded-[4px]">
        <div className="flex items-center">
          <p className="font-black text-[18px] text-[#031926]">All Jobs</p>
          {/* <div className='w-0 h-9 border-[1px] border-[#EAEAEA] ml-7 mr-8' />
                  <input type='text' className='w-[475px] h-11 p-3 bg-[#F9F9F9] border-[1px] border-[#EAEAEA] rounded-full font-normal text-[14px]' placeholder='Search by company, title and job key...........'/> */}
        </div>
        <div className="flex items-center gap-[6px] font-normal text-[12px] text-[#7B8489]">
          <p>Jobs Per Page:</p>
          <select
            className="h-8 p-2 border-[1px] border-[#EAEAEA] rounded-lg pr-6 mr-3"
            onChange={(e) => {
              setJobCount(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            {cardcounts.map((v) => (
              <option value={v.value} key={v.name}>
                {v.name}
              </option>
            ))}
          </select>
          <button
            className="w-8 h-8 border-[1px] border-[#EAEAEA] rounded-lg hover:bg-[#F9F9F9] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(0);
            }}
            disabled={currentpage === 0 || total === 0}
          >
            &lt;&lt;
          </button>
          <button
            className="w-8 h-8 border-[1px] border-[#EAEAEA] rounded-lg hover:bg-[#F9F9F9] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              if (currentpage) setCurrentPage(currentpage - 1);
            }}
            disabled={currentpage === 0 || total === 0}
          >
            &lt;
          </button>
          <div className="h-8 p-2 rounded-lg">
            {1 + currentpage * jobcount} to{" "}
            {(currentpage + 1) * jobcount > total
              ? total
              : (currentpage + 1) * jobcount}{" "}
            of {total}
          </div>
          <button
            className="w-8 h-8 border-[1px] border-[#EAEAEA] rounded-lg hover:bg-[#F9F9F9] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              const totalpage = Math.ceil(total / jobcount);
              if (totalpage - 1 > currentpage) setCurrentPage(currentpage + 1);
            }}
            disabled={
              currentpage === Math.ceil(total / jobcount) - 1 || total === 0
            }
          >
            &gt;
          </button>
          <button
            className="w-8 h-8 border-[1px] border-[#EAEAEA] rounded-lg hover:bg-[#F9F9F9] disabled:cursor-not-allowed"
            onClick={(e) => {
              e.preventDefault();
              const totalpage = Math.ceil(total / jobcount);

              setCurrentPage(totalpage - 1);
            }}
            disabled={
              currentpage === Math.ceil(total / jobcount) - 1 || total === 0
            }
          >
            &gt;&gt;
          </button>
        </div>
      </div>
      {/* <div className="h-0 border-[1px] border-solid border-gray-300" /> */}
      {jobs && (
        <>
          {/* <div className="flex justify-between items-center mb-[18px]">
                <div className="flex flex-col gap-[4px]">
                  <p className="font-[600] text-[14px]">
                    Showing {jobs?.length} Jobs Results
                  </p>
                  <p className="font-[600] text-[12px] text-gray-600">
                    Showing {jobs?.length} Jobs Results
                  </p>
                </div>
              </div> */}
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-4 gap-[16px] mb-[30px] w-full max-w-[1600px] justify-items-center">
              {jobs?.map((job, index) => (
                <JobCard job={job} key={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

// const SvgWrapper = styled.div`
//   & path {
//     fill: #fff;
//   }
// `;

export default JobGridView;
