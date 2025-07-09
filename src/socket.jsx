import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constant/config";

const SocketContext = createContext();

let socket = null;

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {

   if(!socket){
    socket = io(server,{
      transports: ["websocket", "polling"],
      withCredentials:true});
    socket.on("connection",()=>{
        console.log("socket connected".socket.id);
    })
   } 
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };