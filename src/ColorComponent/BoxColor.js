import React from 'react'

const ChangeColor = ({ Color, isItDark }) => {
    return (
        <>
            <div className='box' style={{
                backgroundColor: Color,
                color: isItDark ? 'black' : 'white'
            }}>{Color ? Color : "Empty Value"}
            </div >
        </>
    )
}
ChangeColor.defaultProps = {
    Color: "Empty Value"
}

export default ChangeColor
