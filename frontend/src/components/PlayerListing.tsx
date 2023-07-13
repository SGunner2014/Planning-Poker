import { RoomState, useApp } from "@/context/AppContext";
import { socket } from "@/utils/socket";
import { Player } from "@/utils/types";
import {
  faCheck,
  faEllipsisVertical,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
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
    <div className="w-full">
      <div className="px-6 flex items-center">
        <p className="flex-1 font-normal text-xl m-0">{player.username}</p>
        {state.state === RoomState.Voting &&
          state.votedPlayers?.has(player.id) && (
            <div className="w-10 h-10 flex justify-center items-center text-green-600">
              <FontAwesomeIcon icon={faCheck} className="text-xl" />
            </div>
          )}
        {state.isHost && player.id !== state.userId && (
          <div className="w-10 h-10 cursor-pointer flex justify-center items-center hover:bg-neutral-focus">
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-xl" />
          </div>
        )}
        {player.id === state.hostId && (
          <div className="w-10 h-10 cursor-pointer flex justify-center items-center text-amber-600">
            <FontAwesomeIcon icon={faStar} className="text-xl" />
          </div>
        )}
        {!state.isHost && player.id !== state.hostId && (
          <div className="w-10 h-10" />
        )}
      </div>
    </div>
  );
};
