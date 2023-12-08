export default function Modal({ children, show, setShow }) {
  return (
    <>
      <div
        onClick={() => setShow(false)}
        className={`modal__overlay ${show ? "active" : "unactive"}`}
      ></div>
      <div className={`modal__content ${show ? "active" : "unactive"}`}>
        {children}
      </div>
    </>
  );
}
