import React, { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";

const Content = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: true,
            item: "Excercise"
        },
        {
            id: 2,
            checked: false,
            item: "Do meditation"
        },
        {
            id: 3,
            checked: true,
            item: "Learn Cording"
        },
    ]
    )

    const handleChecked = (id) => {
        const newChecked = items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item)
        setItems(newChecked)
    }

    const handleDelete = (id) => {
        const deleteItem = items.filter(item => item.id !== id)
        setItems(deleteItem)
    }
    return (

        <main>{
            items.length >= 1
                ? <ul>
                    {
                        items.map(item =>

                            <li key={item.id} className='item'>
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

                </ul> : <p>No List is Found Here</p>}



        </main>
    )
}

export default Content
