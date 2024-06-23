import React, { useState } from "react";

export const Counter = () => {
    // let count: number = 0;

    // const increase = () => {
    //     count = count + 1

    //     console.log(count)
    // }

    const [count, setCount] = useState(0);
    const counterOptions = [10, 20, 30, 40, 50, -50, -40, -30, -20, -10];

    const increase = () => {
        setCount(count + 1);
    };

    const decrease = () => {
        setCount(count - 1);
    }

    const changeCounter = (newCount: number) => setCount(newCount);
    
    return (
        <div>
            <h2> Counter {count} </h2>
            <button onClick={increase}>increase</button>
            <button onClick={decrease}>decrease</button>

            {counterOptions.map((countOption) => (
                <button key={countOption} onClick={() => changeCounter(countOption)}>
                    {countOption}
                </button>
      ))}
        </div>
    );
};
