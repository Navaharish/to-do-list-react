import React from 'react'
import { FaTrashAlt } from "react-icons/fa";

const ListItem = ({ item, handleChecked, handleDelete }) => {
    return (

        <li className='item'>
            <input
                type='checkbox'
                onChange={() => handleChecked(item.id)}
                checked={item.checked}
                aria-checked={item.checked} />
            <label onClick={() => handleChecked(item.id)}
                style={(item.checked) ? { textDecoration: "line-through" } : null}>{item.item}</label>
            <FaTrashAlt onClick={() => handleDelete(item.id)} />
        </li>
    )
}

export default ListItem
