import { EnterUsernamePrompt } from "@/components/EnterUsernamePrompt";
import { RoomEventHandler } from "@/components/RoomEventHandler";
import { LobbyRoom } from "@/containers/room/LobbyRoom";
import { ReviewRoom } from "@/containers/room/ReviewRoom";
import { VotingRoom } from "@/containers/room/VotingRoom";
import { useApp } from "@/context/AppContext";
import { RootLayout } from "@/layout/RootLayout";
import { Sidebar } from "@/layout/Sidebar";

const Room = () => {
  const { state, updateApp } = useApp();

  if (!state.username) {
    return <EnterUsernamePrompt />;
  }

  return (
    <RootLayout>
      <RoomEventHandler />
      {state.state === "lobby" && <LobbyRoom />}
      {state.state === "voting" && <VotingRoom />}
      {state.state === "review" && <ReviewRoom />}
      <Sidebar players={state.players!} />
    </RootLayout>
  );
};

export default Room;
