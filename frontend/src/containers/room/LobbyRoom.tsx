import { useApp } from "@/context/AppContext";
import { socket } from "@/utils/socket";

export const LobbyRoom = () => {
  const { state } = useApp();

  const handleStartGame = () => {
    socket.emit("startVoting", { roomId: state.roomId });
  };

  return (
    <div className="flex-1 flex flex-col gap-4 h-screen items-center justify-center">
      <h1>Waiting for players to join...</h1>
      {state.isHost && (
        <button className="btn btn-primary" onClick={() => handleStartGame()}>
          Start Game
        </button>
      )}
    </div>
  );
};
