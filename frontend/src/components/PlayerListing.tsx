import { Player } from "@/utils/types";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlayerListingProps {
  player: Player;
}

export const PlayerListing = ({ player }: PlayerListingProps) => {
  return (
    <div className="w-full hover:bg-poker-gray-2">
      <div className="pl-6 flex items-center">
        <p className="flex-1 font-semibold text-xl m-0">{player.name}</p>
        <div className="w-10 h-10 cursor-pointer flex justify-center items-center">
          <FontAwesomeIcon icon={faEllipsisVertical} className="text-xl" />
        </div>
      </div>
    </div>
  );
};
