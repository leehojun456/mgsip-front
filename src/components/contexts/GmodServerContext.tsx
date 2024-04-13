import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// 서버의 상태를 설명하는 인터페이스
interface ServerStatus {
  serverAddress: { ip: string; port: number };
  onlineUser: any[];
  totalPlayer: number;
  cpuUsage: number;
  totalMemory: number;
  freeMemory: number;
}

// 초기 상태
export const initialStatus: ServerStatus = {
  serverAddress: { ip: "", port: 0 },
  onlineUser: [],
  totalPlayer: 0,
  cpuUsage: 0,
  totalMemory: 0,
  freeMemory: 0,
};

// 컨텍스트 생성
export const GmodServerContext = createContext<{
  status: ServerStatus;
  setStatus: React.Dispatch<React.SetStateAction<ServerStatus>>;
}>({
  status: initialStatus,
  setStatus: () => {},
});

// GmodServerProviderProps 인터페이스
export interface GmodServerProviderProps {
  children: React.ReactNode;
}

// GmodServerProvider 컴포넌트
const GmodServerProvider: React.FC<GmodServerProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<ServerStatus>(initialStatus);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:80/status")
      .then((response) => {
        if (response.status === 200) {
          const {serverAddress, cpuUsage, totalMemory, freeMemory } = response.data;
          setStatus((prevStatus) => ({
            ...prevStatus,
            serverAddress,
            cpuUsage,
            totalMemory,
            freeMemory,
          }));
          setLoading(false);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch server status:", error);
        setError("Failed to fetch server status");
        setLoading(false);
      });
  }, []);

  return (
    <GmodServerContext.Provider value={{ status, setStatus }}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        children
      )}
    </GmodServerContext.Provider>
  );
};

export default GmodServerProvider;