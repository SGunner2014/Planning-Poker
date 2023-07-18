import { useApp } from "@/context/AppContext";
import { socket } from "@/utils/socket";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef } from "react";

const Home = () => {
  const router = useRouter();

  const { updateApp } = useApp();
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on("connect", () => {
      socket
        .emitWithAck("createRoom", { username: usernameRef.current?.value })
        .then(({ room, userId }) => {
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.connect();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col">
        <h2 className="font-medium text-[20px] mb-2">Enter your name</h2>
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col">
          <input
            type="text"
            ref={usernameRef}
            placeholder="Type here"
            className="input input-bordered max-w-xs w-72"
          />
          <button className="btn btn-primary mt-4" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
