import { PlayerListing } from "@/components/PlayerListing";
import { Player } from "@/utils/types";

interface SidebarProps {
  players: Player[];
}

export const Sidebar = ({ players }: SidebarProps) => {
  return (
    <div className="w-80 h-screen bg-poker-gray">
      <div className="py-10">
        <h1 className="text-xl font-semibold text-center mb-[50px]">Players</h1>
        <div className="h-max-[300px] overflow-y-auto">
          {players.map((player) => (
            <PlayerListing key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
};
