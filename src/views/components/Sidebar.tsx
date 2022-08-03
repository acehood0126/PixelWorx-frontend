// import path from "path";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import styled from "styled-components";

import { ReactComponent as POST_JOB } from "../../assets/svgs/post_job.svg";
import { ReactComponent as JOB_LIST } from "../../assets/svgs/home.svg";
import { ReactComponent as APPLICATION } from "../../assets/svgs/application.svg";
import { ReactComponent as PROFILE } from "../../assets/svgs/profile.svg";
import { ReactComponent as CONNECT_WALLET } from "../../assets/svgs/connect_wallet.svg";
import LOGO from "../../assets/images/logo.png";

import { useAppSelector, useAppDispatch } from "../../store";
import { logout } from "../../store/reducers/authSlice";

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { connect, disconnect, select } = useWallet();

  const [selected, setSelected] = useState(0);
  const [focusitem, setFocusItem] = useState(0);

  const connectWallet = async () => {
    // @ts-ignore
    select("Phantom");
    connect();
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/") setSelected(1);
    else if (pathname.startsWith("/job")) setSelected(1);
    else if (pathname.startsWith("/applications")) {
      setSelected(2);
    } else if (pathname.startsWith("/profile")) setSelected(3);
    else setSelected(0);
  }, [location]);

  const handleClick = () => {
    if (user) {
      dispatch(logout());
      disconnect();
      navigate("/");
    } else {
      connectWallet();
    }
  };

  return (
    <div className="flex flex-col md:w-[220px] w-full md:h-full h-[70px] font-avenir fixed md:rounded-r-[10px] md:rounded-l-none rounded-t-none rounded-b-[10px] overflow-hidden">
      <div className="flex md:justify-center justify-start px-[30px] items-center w-full h-[70px] bg-[#0464FC] absolute top-0 z-10">
        <button className="flex" onClick={() => navigate("/job/grid")}>
          <img src={LOGO} className="w-[30px] h-[30px] mr-[10px]" alt="" />
          <p className="font-black text-[22px] text-white">PixelWorx</p>
        </button>
      </div>
      <div className="flex flex-col gap-[20px] w-full h-screen bg-[#0464FC] pt-[90px]">
        {user && !user.isDeveloper && (
          <button
            className="transition ease-linear h-[36px] px-[40px] mx-2 bg-slimy-green rounded-full hover:bg-malachite"
            onClick={() => navigate("/job/post")}
          >
            <div className="flex gap-[18px]">
              <SvgWrapper color={"#FFF"}>
                <POST_JOB />
              </SvgWrapper>
              <p className="font-black text-[12px] text-white">Post Job</p>
            </div>
          </button>
        )}
        <button
          className={`h-[36px] px-[40px] w-full transition ease-linear border-l-[3px] hover:border-opacity-100 hover:text-white ${
            selected === 1
              ? "border-slimy-green border-opacity-100 text-white"
              : "border-white border-opacity-0 text-[#494848]"
          }`}
          onClick={(e) => {
            e.preventDefault();
            navigate("/job/grid");
          }}
          onMouseEnter={() => setFocusItem(1)}
          onMouseLeave={() => setFocusItem(0)}
        >
          <div className="flex items-center gap-[18px]">
            <SvgWrapper
              color={focusitem === 1 || selected === 1 ? "#FFF" : "#494848"}
            >
              <JOB_LIST />
            </SvgWrapper>
            <p className="font-black text-[12px]">Job Listings</p>
          </div>
        </button>
        {user ? (
          <>
            <button
              className={`h-[36px] px-[40px] w-full transition ease-linear border-l-[3px] hover:border-opacity-100 hover:text-white ${
                selected === 2
                  ? "border-slimy-green border-opacity-100 text-white"
                  : "border-white border-opacity-0 text-[#494848]"
              }`}
              onClick={() =>
                navigate(
                  user?.isDeveloper ? "/applications/jobs" : "/applications"
                )
              }
              onMouseEnter={() => setFocusItem(2)}
              onMouseLeave={() => setFocusItem(0)}
            >
              <div className="flex items-center gap-[18px]">
                <SvgWrapper
                  color={focusitem === 2 || selected === 2 ? "#FFF" : "#494848"}
                >
                  <APPLICATION />
                </SvgWrapper>
                <p className="font-black text-[12px]">Applications</p>
              </div>
            </button>

            <button
              className={`h-[36px] px-[40px] w-full transition ease-linear border-l-[3px] hover:border-opacity-100 hover:text-white ${
                selected === 3
                  ? "border-slimy-green border-opacity-100 text-white"
                  : "border-white border-opacity-0 text-[#494848]"
              }`}
              onClick={() => navigate("/profile/view")}
              onMouseEnter={() => setFocusItem(3)}
              onMouseLeave={() => setFocusItem(0)}
            >
              <div className="flex items-center gap-[18px]">
                <SvgWrapper
                  color={focusitem === 3 || selected === 3 ? "#FFF" : "#494848"}
                >
                  <PROFILE />
                </SvgWrapper>
                <p className="font-black text-[12px]">Profile</p>
              </div>
            </button>
          </>
        ) : (
          <></>
        )}

        <button
          className={`h-[36px] px-[40px] w-full transition ease-linear border-l-[3px] hover:border-opacity-100 hover:text-white ${
            selected === 4
              ? "border-slimy-green border-opacity-100 text-white"
              : "border-white border-opacity-0 text-[#494848]"
          }`}
          onClick={handleClick}
          onMouseEnter={() => setFocusItem(4)}
          onMouseLeave={() => setFocusItem(0)}
        >
          <div className="flex items-center gap-[18px]">
            <SvgWrapper
              color={focusitem === 4 || selected === 4 ? "#FFF" : "#494848"}
            >
              <CONNECT_WALLET />
            </SvgWrapper>
            <p className="font-black text-[12px]">
              {user ? "Disconnect" : "Connect Wallet"}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

const SvgWrapper = styled.div`
  & path {
    fill: ${(props: any) => props.color || "#494848"};
  }
`;

export default Sidebar;
