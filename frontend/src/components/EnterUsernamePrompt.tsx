import { FormEvent, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { socket } from "@/utils/socket";
import { useRouter } from "next/router";

export const EnterUsernamePrompt = () => {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const { updateApp } = useApp();

  const { roomId } = router.query;

  useEffect(() => {
    socket.on("connect", () => {
      socket
        .emitWithAck("joinRoom", {
          username: usernameRef.current?.value,
          roomId,
        })
        .then(({ room, userId }) => {
          updateApp({
            type: "setUsername",
            userId,
            username: usernameRef.current!.value,
          });
          updateApp({
            type: "joinRoom",
            isHost: false,
            roomId: room.id,
          });
          updateApp({
            type: "setPlayers",
            players: room.users,
            hostId: room.ownerId,
          });
        });
    });

    return () => {
      socket.off("connect");
    };
  }, [roomId]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.connect();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">Enter your name</h1>
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
