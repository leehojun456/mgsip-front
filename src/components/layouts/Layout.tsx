import LeftSideUi from "./LeftSideUi";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="w-full flex">
      <LeftSideUi></LeftSideUi>
      <Outlet />
    </div>
  );
};

export default Layout;
