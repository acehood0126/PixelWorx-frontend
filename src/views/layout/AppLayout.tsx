import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileCompatible from "../pages/MobileCompatible";

const AppLayout = () => {
  return (
    <div className="flex md:flex-row flex-col h-screen">
      <Sidebar />
      <div className="hidden relative flex-1 md:flex flex-col h-screen ml-[220px]">
        <Navbar />
        <div className="flex-1 bg-[#f9f9f9] pt-[90px] flex flex-col p-[20px]">
          <Outlet />
        </div>
      </div>
      <div className="mt-[70px] md:hidden flex flex-col h-full">
        <MobileCompatible />
      </div>
    </div>
  );
};

export default AppLayout;
