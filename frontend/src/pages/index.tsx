import { SunkenInput } from "@/components/input/SunkenInput";
import { useApp } from "@/context/AppContext";
import { socket } from "@/utils/socket";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const router = useRouter();

  const { updateApp } = useApp();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      socket
        .emitWithAck("createRoom", { username: usernameRef.current?.value })
        .then(({ room, userId }) => {
          console.log("username", usernameRef.current?.value);

          updateApp({
            type: "setUsername",
            userId,
            username: usernameRef.current!.value,
          });
          updateApp({
            type: "joinRoom",
            isHost: true,
            roomId: room.id,
          });
          updateApp({
            type: "setPlayers",
            players: room.users,
          });

          router.push(`/room/${room.id}`);
        });
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  const onSubmit = () => {
    socket.connect();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-poker-gray">
      <SunkenInput
        required
        label="Enter your name"
        fieldRef={usernameRef}
        onFinish={() => onSubmit()}
      />
    </div>
  );
};

export default Home;
