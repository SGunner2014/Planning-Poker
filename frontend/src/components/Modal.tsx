interface ModalProps {
  children: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-poker-gray-2 bg-opacity-50 flex justify-center items-center">
      <div className="bg-poker-gray rounded-lg shadow-xl p-5">
        {props.children}
      </div>
    </div>
  );
};
