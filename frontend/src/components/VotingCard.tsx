interface VotingCardProps {
  points: string;
  selected?: boolean;
  onClick?: () => void;
}

export const VotingCard = ({ points, selected, onClick }: VotingCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-[120px] h-[160px] p-2 justify-center items-center bg-neutral-content cursor-pointer rounded-xl ${
        selected ? "ring-4 ring-secondary" : ""
      }`}
    >
      <h1 className="text-primary-content text-5xl font-semibold">{points}</h1>
    </div>
  );
};
