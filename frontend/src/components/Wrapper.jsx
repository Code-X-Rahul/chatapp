import React from 'react'

const Wrapper = ({ children }) => {
    return (
        <div
            className={` login`}
        >
            {children}
        </div>
    )
}

export default Wrapper