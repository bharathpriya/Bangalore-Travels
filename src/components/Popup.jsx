export default function Popup({message,onClose}) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="check">✔</div>
        <h2>{message}</h2>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
