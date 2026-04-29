function ListButton({ text, isDisabled, handleClick }) {
  return (
    <button
      className={`rounded-lg px-6 py-4 font-semibold transition-all ${isDisabled ? "bg-mute text-dark-blue-400" : "bg-dark-blue-600 hover:bg-dark-blue-400 cursor-pointer hover:-translate-y-1"} `}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

export default ListButton;
