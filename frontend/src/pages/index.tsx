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
            hostId: userId,
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
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-poker-gray">
      {/* <SunkenInput
        required
        label="Enter your name"
        fieldRef={usernameRef}
        onFinish={() => onSubmit()}
      /> */}
      <div className="flex flex-col">
        <h2 className="font-medium text-[20px] mb-2">Enter your name</h2>
        <input
          type="text"
          ref={usernameRef}
          placeholder="Type here"
          className="input input-bordered max-w-xs w-72"
        />
        <button className="btn btn-primary mt-4" onClick={() => onSubmit()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Home;
