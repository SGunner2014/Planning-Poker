import { Player } from "@/utils/types";
import { VotingCard } from "./VotingCard";
import { useApp } from "@/context/AppContext";

interface ReviewCardProps {
  player: Player;
  point: string | number;
}

export const ReviewCard = ({ player, point }: ReviewCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <VotingCard points={String(point)} />
      <div className="max-w-[136px] w-full overflow-x-hidden">
        <h1 className="text-primary-content text-center text-xl font-semibold whitespace-break-spaces">
          {player.username}
        </h1>
      </div>
    </div>
  );
};
