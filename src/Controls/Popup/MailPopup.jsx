import { useEffect, useState, useRef } from 'react'
import Input from '../Input/Input';
import InputComment from '../Input/InputComment';
import { TbSend } from "react-icons/tb";

export default function MailPopup({ body, setBody, subject, setSubject, toMail, setToMail, setShowMailModal, showMailModal, sendEmail }) {

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const emailInputRef = useRef(null);

    useEffect(() => {
        if (!showMailModal) {
            setIsButtonDisabled(true);
            setIsEmailValid(false);
        } else {
            // Focus on email field when modal opens
            setTimeout(() => {
                if (emailInputRef.current) {
                    emailInputRef.current.focus();
                }
            }, 100);
        }
    }, [showMailModal]);

    // Email validation function
    const validateEmail = (email) => {
        if (!email || email.trim() === "") {
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle email change with validation
    const handleEmailChange = (newEmail) => {
        setToMail(newEmail);
        const isValid = validateEmail(newEmail);
        setIsEmailValid(isValid);
        
        // Enable/disable send button based on validation
        if (isValid && subject && subject.trim() !== "") {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }

        // Focus on email field after validation passes
        if (isValid && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    };

    // Handle subject change
    const handleSubjectChange = (newSubject) => {
        setSubject(newSubject);
        // Enable/disable send button based on both email and subject
        if (isEmailValid && newSubject && newSubject.trim() !== "") {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const handleSendEmail = async () => {
        // Final validation before sending
        if (!validateEmail(toMail)) {
            if (emailInputRef.current) {
                emailInputRef.current.focus();
            }
            return;
        }
        
        setIsButtonDisabled(true);
        try {
            await sendEmail();
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
                            <div style={{ position: 'relative', width: '80%' }}>
                                <Input
                                    label=""
                                    inputVal={toMail}
                                    setInputVal={handleEmailChange}
                                    customClass={"mailInput"}
                                    customInputClass={"rounded"}
                                    important={"true"}
                                    inputRef={emailInputRef}
                                />
                                {toMail && (
                                    <div className={`email-validation-indicator ${isEmailValid ? 'valid' : 'invalid'}`}>
                                        {isEmailValid ? '✓' : '✗'}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='mailInputContainer'>
                            <span>
                                Subject :
                            </span>
                            <Input
                                label=""
                                inputVal={subject}
                                setInputVal={handleSubjectChange}
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