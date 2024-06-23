import React, { useState } from "react";

export const LoginForm = () => {
    // two-way-binding
    const [email, setEmail] = useState("");

    const onSubmit = () => {
        console.log("Email",`${email}`)
    }

    console.log(email);

    return (
        <div>
            <input type='text' placeholder='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
            <input type='password' placeholder='password' />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
