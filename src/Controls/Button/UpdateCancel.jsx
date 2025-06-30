export default function UpdateCancelBtn({handleReset,handleUpdate}) {
  return (
    <div className="btnMainContainer saveCancel col-md-10 col-sm-10 form-group print_box_bg low_margin">
      <div>
        <button
          type="button"
          className="btn-style blue-btn"
          onClick={handleReset}
        >
          Cancel
        </button>
        <button
            type="button"
            className="btn-style btn-green"
            onClick={handleUpdate}
          >
            Update
          </button>
      </div>
    </div>
  );
}
