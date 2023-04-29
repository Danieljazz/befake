import UserSearchInput from "../../components/UserSearchInput/UserSearchInput";
import "./newChatModal.scss";
import { v4 as uuidv4 } from "uuid";
const NewChatModal = ({ setOpenNewMessageModal }) => {
  return (
    <div className="overlay">
      <div className="new-chat-modal-content">
        <span>To start the new chat search for users below</span>
        <button className="close" onClick={() => setOpenNewMessageModal(false)}>
          X
        </button>
        <div className="suggested-friends">
          <UserSearchInput
            placeholder="Search friends here"
            linkTo="/chat/"
            key={uuidv4()}
            setModalOpen={setOpenNewMessageModal}
          />
        </div>
      </div>
    </div>
  );
};
export default NewChatModal;
