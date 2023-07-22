import ListItem from "./ListItem";


const Content = ({ items, handleChecked, handleDelete }) => {

    return (

        <>
            {
                items.length >= 1
                    ? <ul>
                        {
                            items.map(item =>
                                <ListItem item={item} handleChecked={handleChecked} handleDelete={handleDelete}
                                    key={item.id} />

                            )
                        }

                    </ul> : <p>No List is Found Here</p>}
        </>

    )
}

export default Content
