import React from "react";

const DisplayModal = ({title, message, closeModal, successModal, modalData}) => {
    
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <p className="py-4">
           {message}
          </p>
          <div className="modal-action">
            <label onClick={() => successModal(modalData)} htmlFor="my-modal" className="btn btn-secondary">
             Delete
            </label>

            <label onClick={closeModal} htmlFor="my-modal" className="btn btn-outline">
                Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayModal;
