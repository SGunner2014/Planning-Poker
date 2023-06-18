export const SignupForm = () => {
  return (
    <div className="flex flex-row gap-4">
      <div className="w-1/2 border-2 border-solid border-secondary rounded-xl bg-slate-200 p-4">
        <h3 className="text-center text-xl font-semibold">Create a new room</h3>
        <p className="text-center">
          To create a new room, choose a username and press &apos;Confirm&apos;
          on the right.
        </p>
      </div>
      <div className="w-1/2 border-2 border-solid border-secondary rounded-xl bg-slate-200 p-4 flex flex-col items-center justify-center"></div>
    </div>
  );
};
