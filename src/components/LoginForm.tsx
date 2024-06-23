import React, { useState } from "react";

export const LoginForm = () => {
    // two-way-binding

    // Завдання:
    // Додати state для password input у компоненті LoginForm
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const onSubmit = () => {
        console.log("Email", `${email}`);
        console.log("Paswword", `${password}`);
    };

    // console.log(email);

    return (
        <div>
            <input
                type='text'
                placeholder='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type='password'
                placeholder='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
