import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ServerItemProps {
  server: {
    serverId: number;
    serverName: string;
    serverIp: string;
    serverPort: number;
    serverGame: string;
    previewImage: string;
    checkDb: boolean;
  };
  onServerDelete: () => void;
}

const Server: React.FC<ServerItemProps> = ({ server, onServerDelete }) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/server", {
        params: { serverIp: server.serverIp, serverPort: server.serverPort },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {});
    // document click 이벤트 리스너 추가
    window.addEventListener("click", handleDocumentClick);

    // 컴포넌트가 언마운트될 때 document click 이벤트 리스너 제거
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDocumentClick = (event: MouseEvent) => {
    // 메뉴가 열려 있고, 클릭된 요소가 메뉴 영역 내에 없는 경우 메뉴 닫기
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      console.log("sdf");
      setMenu(false);
    }
  };

  const serverDelete = () => {
    axios
      .delete("http://localhost:8080/api/server", {
        params: { serverId: server.serverId },
      })
      .then((response) => {
        console.log(response.data);
        setMenu(false);
        onServerDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenu(!menu);
  };

  return (
    <div className="flex flex-col h-72 relative content-center rounded-md">
      <button
        type="button"
        onClick={toggleMenu}
        className="z-10 absolute right-0 rounded-full bg-black/75 w-7 h-7 content-center text-center text-white m-2 hover:scale-110 transition-all duration-300"
      >
        <FontAwesomeIcon icon={["fas", "bars"]} />
      </button>
      {menu && ( // 메뉴가 열렸을 때만 메뉴 표시
        <div
          className="absolute top-10 right-0 bg-white p-2 rounded-md shadow-md z-10"
          ref={menuRef}
        >
          <button className="block mb-2">수정</button>
          <button className="block" onClick={serverDelete}>
            삭제
          </button>
        </div>
      )}
      <Link to={`${server.serverId}`}>
        <div>
          <img
            src={server.previewImage}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          ></img>
        </div>
        <div className="absolute bottom-0  w-full p-4 rounded-b-md backdrop-blur-2xl bg-white/75">
          <div className="flex justify-between h-full">
            <div>
              <div className="font-bold text-xl">{server.serverName}</div>
              <div>{server.serverGame}</div>
            </div>
            <div className="flex flex-col justify-end items-end">
              <div>
                {server.serverIp}:{server.serverPort}
              </div>
              <div>Online</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Server;
