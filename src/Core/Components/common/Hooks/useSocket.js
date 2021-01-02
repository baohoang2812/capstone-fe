import { useEffect, useState } from "react";
import io from "socket.io-client";

/* Configs */
import { currentEnv } from "~/Configs"

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io(currentEnv.END_POINT_SOCKET, {
      query: { token },
      transports: ["polling"]
    });

    socket.on("connect", () => {
      console.log("Websocket connection established!");
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    }
  }, []);

  return socket;
}

export default useSocket;
