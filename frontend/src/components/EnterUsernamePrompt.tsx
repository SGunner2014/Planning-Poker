import { useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { SunkenInput } from "./input/SunkenInput";
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
          });
        });
    });

    return () => {
      socket.off("connect");
    };
  }, [roomId]);

  const handleUsernameEntryFinish = () => {
    socket.connect();
  };

  return (
    <Modal>
      <h1 className="text-xl font-semibold">Enter a username</h1>
      <p>To enter this room, you must choose a username:</p>
      <div className="flex flex-col gap-2 mt-5">
        <SunkenInput
          label="Username"
          fieldRef={usernameRef}
          onFinish={() => handleUsernameEntryFinish()}
        />
      </div>
    </Modal>
  );
};
