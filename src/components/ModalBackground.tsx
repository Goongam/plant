interface Props {
  children: React.ReactNode;
  onClose: () => void;
}
export default function ModalBackground({ children, onClose }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-slate-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-8 text-white"
        onClick={() => onClose()}
      >
        {/* <CloseIcon /> */}X
      </button>

      {children}
    </section>
  );
}
