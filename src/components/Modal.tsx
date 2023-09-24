import ModalBackground from "./ModalBackground";
import ModalPortal from "./ModalPortal";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setClose: (value: boolean) => void;
}

export default function Modal({ children, isOpen, setClose }: Props) {
  return (
    <>
      {isOpen && (
        <ModalPortal>
          <ModalBackground
            onClose={() => {
              setClose(false);
            }}
          >
            {children}
          </ModalBackground>
        </ModalPortal>
      )}
    </>
  );
}
