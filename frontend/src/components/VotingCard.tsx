interface VotingCardProps {
  points: string;
  onClick: () => void;
}

export const VotingCard = ({ points, onClick }: VotingCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex w-[120px] h-[160px] p-2 justify-center items-center bg-poker-gray cursor-pointer rounded-xl shadow-poker-card hover:shadow-poker-card-2 transition-all"
    >
      <h1 className="text-5xl font-semibold">{points}</h1>
    </div>
  );
};
