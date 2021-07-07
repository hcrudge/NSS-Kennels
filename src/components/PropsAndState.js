import React, { useState } from "react" 

export const PropsAndState = ({ yourName }) => {

    //  Display how many times a button has been clicked   
    let [countClicks, setCountClicks] = useState(0)

    const handleClick = () => {
        //good practice:
        //make a copy of state, modify it, and then setState to the copy

        const newCountClicks = ++ countClicks
        setCountClicks(newCountClicks)
    }
    
    return (
        <>
        <h3>Welcome, {yourName} </h3>
        {/* display the nubmer of times the button is clicked */}
        <p>{countClicks}</p>
        {/* button to click */}
        <button onClick={(handleClick)}>Click Me</button>
        </>
    )
}