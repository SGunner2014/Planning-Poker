import { RoomState, useApp } from "@/context/AppContext";
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
        ownerId,
      });
    });

    socket.on("votingStarted", () => {
      updateApp({
        type: "setRoomState",
        state: RoomState.Voting,
      });
    });

    socket.on("userVoted", ({ userId }) => {
      updateApp({
        type: "setPlayerVoted",
        userId,
      });
    });

    socket.on("cardsRevealed", ({ room }) => {
      updateApp({
        type: "setPlayerVotes",
        playerVotes: room.votes,
      });
      updateApp({
        type: "setRoomState",
        state: RoomState.Review,
      });
    });

    return () => {
      socket.off("userJoined");
      socket.off("userLeft");
      socket.off("votingStarted");
      socket.off("userVoted");
      socket.off("cardsRevealed");
    };
  }, []);

  return <></>;
};
