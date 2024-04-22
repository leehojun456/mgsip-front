import React, { useEffect } from "react";
import { useRef, useState } from "react";
import ModalExample from "../components/servers/AddModal";
import axios from "axios";
import Server from "../components/servers/Server";

const MainPage: React.FC = () => {
  const modalRef = useRef<any>(); // ModalExample 컴포넌트의 ref
  const [servers, setServers] = useState<any[]>([]);

  const handleOpenModal = () => {
    modalRef.current.openModal(); // ModalExample 컴포넌트의 openModal 함수 호출
  };

  // 서버 리스트를 가져옴

  const fetchServers = () => {
    axios
      .post("http://localhost:8080/api/server")
      .then((response) => {
        setServers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchServers();
  }, []);

  return (
    <div className="h-full p-12 flex flex-col gap-12 w-full">
      <div className="font-bold text-5xl">Select Server</div>
      <div className="grid grid-cols-auto-fill-300 w-full gap-4">
        {servers.map((server, index) => (
          <Server
            key={index}
            server={server}
            onServerDelete={fetchServers}
          ></Server>
        ))}
        <ModalExample></ModalExample>
      </div>
    </div>
  );
};

export default MainPage;
