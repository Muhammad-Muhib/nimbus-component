import { useEffect, useState } from 'react'
import Input from '../Input/Input';
import InputComment from '../Input/InputComment';
import { TbSend } from "react-icons/tb";

export default function MailPopup({ body, setBody, subject, setSubject, toMail, setToMail, setShowMailModal, showMailModal, sendEmail }) {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    useEffect(() => {
        if (!showMailModal) {
            setIsButtonDisabled(false);
        }
    }, [showMailModal]);

    const handleSendEmail = async () => {
        setIsButtonDisabled(true);
        try {
            const result = await sendEmail();
            // If validation failed (result is false), re-enable the button
            if (result === false) {
                setIsButtonDisabled(false);
            }
        } catch (error) {
            setIsButtonDisabled(false);
        }
    };


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key == "Escape") {
                setShowMailModal(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showMailModal]);

    return (
        <div
            className="modal fade show confirmationModal"
            tabIndex="-1"
        >
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Email</h5>
                        <div className="closeBtnContainer">
                            <button
                                type="button"
                                onClick={() => setShowMailModal(false)}
                                className="btn-close modalCloseBtn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                    </div>
                    <div className="modal-body mail-modal-body">
                        <div className='mailInputContainer'>
                            <span>
                                To :
                            </span>
                            <Input
                                label=""
                                inputVal={toMail}
                                setInputVal={setToMail}
                                customClass={"mailInput"}
                                customInputClass={"rounded"}
                                important={"true"}
                            />
                        </div>
                        <div className='mailInputContainer'>
                            <span>
                                Subject :
                            </span>
                            <Input
                                label=""
                                inputVal={subject}
                                setInputVal={setSubject}
                                customClass={"mailInput"}
                                customInputClass={"rounded"}
                                important={"true"}
                            />
                        </div>
                        <div className='mailInputContainer'>
                            <span>
                                Body :
                            </span>
                            <InputComment
                                label=""
                                inputVal={body}
                                setInputVal={setBody}
                                customClass={"mailBody"}
                                customInputClass={"mailBodyInput rounded"}
                            />
                        </div>
                        <button
                            className={`btn-popupPrint btn-email-send ${isButtonDisabled ? "disable" : "btn-green"}`}
                            onClick={handleSendEmail}
                            disabled={isButtonDisabled}
                        >
                            <span>
                                {isButtonDisabled ? <span className="loader"></span> : <TbSend size={17} />}
                            </span>
                            <span>Send</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}