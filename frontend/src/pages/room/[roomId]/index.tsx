import { LoginFormModal } from "@/components/LoginFormModal";
import { VotingOptions } from "@/components/VotingOptions";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/router";

const Room = () => {
  const router = useRouter();
  // const { state } = useApp();

  const { roomId } = router.query;

  return (
    <>
      <div className="w-screen h-full flex">
        <div className="w-4/5">
          <div className="h-3/5"></div>
          <div className="h-2/5 border-2 border-solid border-green-500">
            <VotingOptions />
          </div>
        </div>
        <div className="w-1/5 border-2 border-solid border-red-500"></div>
      </div>
      <LoginFormModal isOpen={true} setIsOpen={() => {}} />
    </>
  );
};

export default Room;
