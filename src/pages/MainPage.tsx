import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import ModalExample from "../components/servers/AddModal";

const MainPage: React.FC = () => {
  const modalRef = useRef<any>(); // ModalExample 컴포넌트의 ref

  const handleOpenModal = () => {
    modalRef.current.openModal(); // ModalExample 컴포넌트의 openModal 함수 호출
  };

  return (
    <div className="h-full p-12 flex flex-col gap-12 w-full">
      <div className="font-bold text-5xl">Select Server</div>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        <Link to={"/gmod"}>
          <div className="bg-black min-w-72 h-48 rounded-md">fdfd</div>
        </Link>
        <div className="bg-black min-w-72 h-48 rounded-md">fdfd</div>
        <div className="bg-black min-w-72 h-48 rounded-md">fdfd</div>
        <div className="bg-black min-w-72 h-48 rounded-md">fdfd</div>
        <ModalExample></ModalExample>
      </div>
    </div>
  );
};

export default MainPage;
