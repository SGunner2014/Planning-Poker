import { useApp } from "@/context/AppContext";

export const ReviewRoom = () => {
  const { state } = useApp();

  return (
    <div className="flex-1 flex h-screen content-between">
      <div></div>
      <div></div>
    </div>
  );
};
