/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import toast from "react-hot-toast";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../store";
import { login, reset, setRole, logout } from "../../store/reducers/authSlice";
import { ImagePath, FullName } from "../../utils";

const Navbar = () => {
  const { user, isSuccess, isError, isLoading, message } = useAppSelector(
    (state) => state.auth
  );
  const [signing, setSigning] = useState(false);
  const dispatch = useAppDispatch();
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(2);
  const { disconnect } = useWallet();
  const location = useLocation();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (!isLoading && isSuccess && signing) {
      if (user.name === "") {
        navigate("/profile/view");
      } else {
        navigate("/job/grid");
        toast.success("Welcome to PixelWorx", {
          duration: 5000,
          icon: "👋🏻",
        });
      }
      setSigning(false);
    }

    dispatch(reset());
  }, [
    isError,
    isSuccess,
    isLoading,
    user,
    message,
    signing,
    setSigning,
    dispatch,
  ]);

  useEffect(() => {
    if (publicKey && !user) {
      const userData = {
        address: publicKey.toString(),
      };
      setSigning(true);
      dispatch(login(userData));
    }
  }, [publicKey]);

  const handleSignOut = useCallback(() => {
    dispatch(logout());
    disconnect();
    navigate("/");
  }, [dispatch, logout]);

  const overflowchars = (designation: string): string => {
    let str = designation.substring(0, 19);
    if (designation.length > 20) str += "...";
    return str;
  };

  return (
    <>
      <div className="flex items-center justify-end h-[70px] bg-[#FFFFFF] absolute top-0 left-0 w-full pl-[30px] pr-[36px]">
        {!user ? (
          <WalletMultiButton />
        ) : (
          <div className="relative flex flex-row items-center">
            <select
              className="text-[14px] bg-theme p-[10px] rounded-[10px] border-[1px] border-gray-300 mr-[20px]"
              onChange={(e) => {
                dispatch(setRole(e.target.value));
                const { pathname } = location;
                if (e.target.value === "true") {
                  if (
                    pathname.startsWith("/applications") &&
                    !pathname.startsWith("/applications/jobs")
                  )
                    navigate("/applications/jobs");
                } else {
                  if (pathname.startsWith("/applications/jobs"))
                    navigate("/applications");
                }
              }}
            >
              <option
                className="hover:bg-green-100 py-2 px-6 text-start"
                value="false"
                selected={!user?.isDeveloper}
              >
                Business
              </option>
              <option
                className="hover:bg-green-100 py-2 px-6 text-start"
                value="true"
                selected={user?.isDeveloper}
              >
                Job Seeker
              </option>
            </select>
            <div>
              <button
                {...buttonProps}
                className="flex flex-row items-center gap-[9px]"
              >
                <img
                  className="w-[36px] h-[36px] object-cover rounded-[10px]"
                  src={ImagePath(user.avatar)}
                  alt=""
                  width={36}
                  height={36}
                />
                <div className="flex flex-col gap-[1px]">
                  <p className="font-black text-[14px] text-black-400 text-start">
                    {FullName(user)}
                  </p>
                  <p className="font-bold text-[12px] text-slimy-green text-start">
                    {overflowchars(user.designation)}
                  </p>
                </div>
              </button>
              <div
                className={`${
                  isOpen
                    ? "visible flex flex-col absolute w-[120px] bg-white shadow text-[13px] rounded-md overflow-hidden"
                    : "invisible flex flex-col absolute"
                } `}
              >
                <button
                  {...itemProps[0]}
                  className="hover:bg-green-100 py-2 px-6 text-start rounded-md"
                  onClick={() => {
                    navigate("/profile/edit");
                  }}
                >
                  Edit Profile
                </button>
                <button
                  {...itemProps[1]}
                  className="hover:bg-green-100 py-2 px-6 text-start rounded-md"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
