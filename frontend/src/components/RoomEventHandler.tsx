import { useApp } from "@/context/AppContext";
import { socket } from "@/utils/socket";
import { useEffect } from "react";

export const RoomEventHandler = () => {
  const { updateApp } = useApp();

  useEffect(() => {
    socket.on("userJoined", ({ username, userId }) => {
      updateApp({
        type: "addPlayer",
        player: {
          id: userId,
          username,
        },
      });
    });

    socket.on("userLeft", ({ userId, ownerId }) => {
      updateApp({
        type: "removePlayer",
        userId,
        ownerId
      })
    });

    return () => {
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, []);

  return <></>;
};
