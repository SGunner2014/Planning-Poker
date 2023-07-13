import { chunk } from "lodash-es";
import { VotingCard } from "@/components/VotingCard";
import { socket } from "@/utils/socket";
import { useMemo, useState } from "react";
import { useApp } from "@/context/AppContext";

const votingOptions = [0, 1, 2, 3, 5, 8, 13, "?"];

export const VotingRoom = () => {
  const { state } = useApp();

  const allPlayersVoted = state.votedPlayers?.size === state.players?.length;

  const handleRevealCardsClick = () => {
    socket.emit("revealCards");
  };

  const [votingCardSelected, setVotingCardSelected] = useState<
    number | string
  >();

  /**
   * Handle voting card click
   */
  const handleVotingCardClick = (point: number | string) => {
    socket
      .emitWithAck("vote", {
        point,
      })
      .then(({ point: sentPoint }) => {
        setVotingCardSelected(sentPoint);
      });
  };

  return (
    <div className="flex-1 flex h-screen items-center">
      <div className="flex flex-col justify-center items-center gap-12 w-full">
        <h1 className="text-5xl text-primary-content font-semibold text-center">
          Select an estimate
        </h1>
        {chunk(votingOptions, 5).map((options, index) => (
          <div
            key={`options-${index}`}
            className="flex w-full justify-center items-center px-32 first-of-type:pt-5 last-of-type:pb-5 flex-wrap gap-10"
          >
            {options.map((option) => (
              <VotingCard
                key={option}
                points={option.toString()}
                selected={votingCardSelected === option}
                onClick={() => handleVotingCardClick(option)}
              />
            ))}
          </div>
        ))}
        {state.isHost && (
          <button
            className="btn btn-success"
            onClick={() => handleRevealCardsClick()}
          >
            Reveal Cards{!allPlayersVoted && "*"}
          </button>
        )}
      </div>
    </div>
  );
};
