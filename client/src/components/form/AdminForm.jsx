import React from 'react';

function AdminForm({ handleSubmit, value, setValue, textButton = "Submit", handleDelete }) {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    className='form-control p-2'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter category name"
                />
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-outline-primary mt-3' >{textButton}</button>
                    {
                        handleDelete &&
                        <button className='btn btn-outline-danger mt-3' onClick={handleDelete}>Delete</button>
                    }
                </div>
            </form>
        </>
    );
}

export default AdminForm;