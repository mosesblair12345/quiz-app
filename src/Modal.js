import { useGlobalContext } from "./context";

const Modal = () => {
  const { isModal, correct, closeModal, quiz } = useGlobalContext();
  return (
    <div
      className={`${isModal ? "modal-container isOpen" : "modal-container"}`}
    >
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>
          You answered {((correct / quiz.length) * 100).toFixed(0)}% of
          questions correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
