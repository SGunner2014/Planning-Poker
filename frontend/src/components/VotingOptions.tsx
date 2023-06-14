import { VotingCard } from "./VotingCard";

const VOTING_CARD_OPTIONS = [1, 2, 3, 5, 8, 13];

export const VotingOptions = () => {
  return (
    <div className="flex h-full justify-center items-center gap-6">
      {VOTING_CARD_OPTIONS.map((option) => (
        <VotingCard amount={option} key={option} />
      ))}
    </div>
  );
};
