export default function Modal({ children, show, setShow }) {
  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`modal__overlay ${show ? "active" : "unactive"}`}
      ></div>
      <div className={`modal__content ${show ? "active" : "unactive"}`}>
        {children}
      </div>
    </>
  );
}
