let confirmation
function Confirm()  {
    return (
        <div className="user-confirmation">
            <div className="confirmation">
                <h4>Tulist</h4>
                <p>Are you sure to delete this item?</p>
                <div className="buttons">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export {
    Confirm
}