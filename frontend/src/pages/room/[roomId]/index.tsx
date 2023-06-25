import { VotingCard } from "@/components/VotingCard";
import { RootLayout } from "@/layout/RootLayout";
import { Sidebar } from "@/layout/Sidebar";
import _, { chunk } from "lodash-es";

const players = [
  {
    id: "1",
    name: "Player 1",
  },
];

const votingOptions = [0, 1, 2, 3, 5, 8, 13, "?"];

const Room = () => {
  return (
    <RootLayout>
      <div className="flex-1 flex h-screen items-center">
        <div className="flex flex-col justify-center items-center gap-12 w-full">
          <h1 className="text-5xl font-semibold text-center">
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
                  onClick={() => {}}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Sidebar players={players} />
    </RootLayout>
  );
};

export default Room;
