import React from 'react'

const SearchInput = ({ search, setSearch, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='search' />
            <input
                type="search"
                placeholder='Search your List'
                id='search'
                className='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    )
}

export default SearchInput
