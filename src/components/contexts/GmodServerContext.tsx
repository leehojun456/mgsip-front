import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// 서버의 상태를 설명하는 인터페이스
interface ServerStatus {
  serverAddress: { ip: string; port: number };
  serverName: string;
  totalPlayer: number;
  cpuUsage: number;
  totalMemory: number;
  freeMemory: number;
}

// 초기 상태
export const initialStatus: ServerStatus = {
  serverAddress: { ip: "", port: 0 },
  serverName: "",
  totalPlayer: 0,
  cpuUsage: 0,
  totalMemory: 0,
  freeMemory: 0,
};

// 컨텍스트 생성
export const GmodServerContext = createContext<{
  status: ServerStatus;
  error: string | null;
  loading: boolean;
}>({
  status: initialStatus,
  error: null,
  loading: true,
});

// GmodServerProviderProps 인터페이스
export interface GmodServerProviderProps {
  children: React.ReactNode;
}

// GmodServerProvider 컴포넌트
const GmodServerProvider: React.FC<GmodServerProviderProps> = ({
  children,
}) => {
  const [status, setStatus] = useState<ServerStatus>(initialStatus);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://mgsip.xyz:80/status")
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          const {
            serverAddress,
            serverName,
            cpuUsage,
            totalMemory,
            freeMemory,
          } = response.data;
          setStatus((prevStatus) => ({
            ...prevStatus,
            serverAddress,
            serverName,
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
      });
  }, []);

  return (
    <GmodServerContext.Provider value={{ error, loading, status }}>
      {children}
    </GmodServerContext.Provider>
  );
};

export default GmodServerProvider;
