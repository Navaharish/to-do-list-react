import React from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItems = ({ handleSubmit, newItem, handleNewItem, handleAddItem }) => {
    return (
        <form className='form' onSubmit={handleSubmit}>
            <input
                autoFocus
                className='form-input'
                placeholder='Add item'
                value={newItem}
                onChange={handleNewItem}
                required
            />
            <FaPlus
                onClick={handleAddItem}
            />
        </form>
    )
}

export default AddItems
