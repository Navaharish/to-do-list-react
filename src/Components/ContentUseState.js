import React, { useState } from 'react'

const ContentUseState = () => {
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

}

export default ContentUseState
