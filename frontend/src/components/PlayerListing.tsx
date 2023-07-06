import { useApp } from "@/context/AppContext";
import { socket } from "@/utils/socket";
import { Player } from "@/utils/types";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const PlayerListingDropdown = () => {
  return <></>;
};

interface PlayerListingProps {
  player: Player;
}

export const PlayerListing = ({ player }: PlayerListingProps) => {
  const { state } = useApp();

  return (
    <div className="w-full hover:bg-poker-gray-2">
      <div className="pl-6 flex items-center">
        <p className="flex-1 font-normal text-xl m-0">{player.username}</p>
        {state.isHost && (
          <div className="w-10 h-10 cursor-pointer flex justify-center items-center">
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-xl" />
          </div>
        )}
      </div>
    </div>
  );
};
