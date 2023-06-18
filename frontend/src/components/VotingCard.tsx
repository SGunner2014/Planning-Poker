interface VotingCardProps {
  amount: string;
}

export const VotingCard = ({ amount }: VotingCardProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-24 h-28 bg-slate-600 hover:bg-slate-700 cursor-pointer rounded-xl flex justify-center items-center">
        <span className="text-5xl text-white">{amount}</span>
      </div>
    </div>
  );
};
