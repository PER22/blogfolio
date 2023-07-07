
import { useNavigate } from "react-router-dom";
export default function ConfirmationModal({closeFunction, deleteFunction, confirmationText, contentId}){
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        await deleteFunction(id);
      };
    return (
        <div className="confirmation-modal-background">
            <div className="confirmation-modal-container">
                <button onClick={closeFunction}> X </button>
                <div className="confirmation-modal-title">
                    <h1>Confirm Delete?</h1>
                </div>
                <div className="confirmation-modal-body">
                    <p>{confirmationText}</p>
                </div>
                <div className="confirmation-modal-footer">
                    <button onClick={closeFunction}>Cancel</button>
                    <button onClick={()=> handleDelete(contentId)}>Delete</button>
                </div>
            </div>
        </div>
    );

}