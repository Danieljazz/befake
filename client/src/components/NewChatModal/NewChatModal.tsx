import "./newChatModal.scss";

const NewChatModal = ({ setOpenNewMessageModal }) => {
  return (
    <div className="overlay">
      <div className="new-chat-modal-content">
        <span>To start the new chat search for your friend below</span>
        <button className="close" onClick={() => setOpenNewMessageModal(false)}>
          X
        </button>
        <div className="suggested-friends">
          <input placeholder="Type here..." />
          <ul>
            <li>First friend</li>
            <li>Second friend</li>
            <li>Third friend</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NewChatModal;
