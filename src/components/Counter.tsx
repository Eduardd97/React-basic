import React, { useState, useEffect } from "react";

export const Counter = () => {
    // let count: number = 0;

    // const increase = () => {
    //     count = count + 1

    //     console.log(count)
    // }

    // Завдання:
    // - Додати кнопку Reset Count для компоненту Count.tsx

    const [count, setCount] = useState(0);
    const counterOptions = [10, 20, 30, 40, 50, -50, -40, -30, -20, -10];

    const increase = () => {
        setCount(count + 1);
    };

    const decrease = () => {
        setCount(count - 1);
    };

    const changeCounter = (newCount: number) => setCount(newCount);

    const resetCount = () => {
        setCount(0);
    };

    useEffect(() => {
        if (count > 10) {
            setCount(0);
        }
        console.log(`Count has been changed: ${count}`);
    }, [count]);

    //  Завдання:
    //  Відсідковувати, коли count буде менше за 0
    //  У такому випадку - поверати його до значення 5

    useEffect(() => {
        if(count < 0) setCount(5);
    }, [count])

    return (
        <div>
            <h2> Counter {count} </h2>
            <button onClick={increase}>increase</button>
            <button onClick={decrease}>decrease</button>

            <button onClick={resetCount}>Reset Count</button>

            {counterOptions.map((countOption) => (
                <button
                    key={countOption}
                    onClick={() => changeCounter(countOption)}
                >
                    {countOption}
                </button>
            ))}
        </div>
    );
};
