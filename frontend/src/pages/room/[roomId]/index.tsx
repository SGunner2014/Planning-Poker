import { VotingOptions } from "@/components/VotingOptions";

const Room = () => {
  return (
    <div className="w-screen h-full flex">
      <div className="w-4/5">
        <div className="h-3/5"></div>
        <div className="h-2/5 border-2 border-solid border-green-500">
          <VotingOptions />
        </div>
      </div>
      <div className="w-1/5 border-2 border-solid border-red-500"></div>
    </div>
  );
};

export default Room;
