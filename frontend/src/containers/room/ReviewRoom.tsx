import { ReviewCard } from "@/components/ReviewCard";
import { useApp } from "@/context/AppContext";
import { socket } from "@/utils/socket";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import ReactConfetti from "react-confetti";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ReviewRoom = () => {
  const { state } = useApp();
  const [isConfettiFinished, setIsConfettiFinished] = useState(false);

  const dataset = useMemo(() => {
    const values = Object.values(state.playerVotes!).reduce(
      (acc, curr) => {
        if (acc.data[curr]) {
          acc.data[curr] += 1;
        } else {
          acc.data[curr] = 1;
          acc.labels.push(String(curr));
        }

        return acc;
      },
      {
        data: {} as Record<string, number>,
        labels: [] as string[],
      }
    );

    return {
      labels: values.labels,
      datasets: [
        {
          data: values.labels.map((label) => values.data[label]),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
          ],
          borderWidth: 0,
        },
      ],
    };
  }, [state.playerVotes]);

  const averageScore = useMemo(() => {
    const numberVals = Object.values(state.playerVotes!)
      .filter((val) => typeof val === "number")
      .map((val) => val as number);

    if (numberVals.length === 0) {
      return -1;
    }

    return (
      numberVals.reduce((acc, curr) => acc + curr, 0) / numberVals.length
    ).toFixed(2);
  }, [state.playerVotes]);

  const allAgreed = useMemo(() => {
    const values = Object.values(state.playerVotes!);

    if (values.length === 0) {
      return false;
    }

    const first = values[0];

    return values.every((val) => val === first);
  }, [state.playerVotes]);

  const handleNextRoundClick = () => {
    socket.emit("startVoting", { roomId: state.roomId });
  };

  return (
    <>
      <div className="flex-1 flex justify-center items-center py-32">
        <div className="h-full flex flex-col justify-between">
          <div>
            {dataset.labels.length > 0 && (
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center mb-4">
                  <Pie data={dataset} />
                </div>
                {averageScore !== -1 && (
                  <h3 className="text-primary-content text-2xl font-semibold">
                    Average Score: {averageScore}
                  </h3>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-row gap-8 overflow-x-auto justify-center">
            {state
              .players!.filter((player) => !!state.playerVotes![player.id])
              .map((player) => (
                <ReviewCard
                  key={`review-card-${player.id}`}
                  player={player}
                  point={state.playerVotes![player.id]}
                />
              ))}
          </div>
          {state.isHost && (
            <div className="flex flex-col justify-center items-center">
              <button
                className="btn btn-primary"
                onClick={() => handleNextRoundClick()}
              >
                Next Round
              </button>
            </div>
          )}
        </div>
      </div>
      {allAgreed && (
        <ReactConfetti
          recycle={false}
          width={window.innerWidth}
          height={window.innerHeight}
          onConfettiComplete={() => setIsConfettiFinished(true)}
          run={!isConfettiFinished}
        />
      )}
    </>
  );
};
