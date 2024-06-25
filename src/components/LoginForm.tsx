import React, {FC, useState } from "react";

type Props = {
    email: string;
    password: string;
};

export const LoginForm: FC<Props> = ({ email, password }) => {
    // two-way-binding

    // const [email, setEmail] = useState("");

    // const [password, setPassword] = useState("");

    const [formData, setFormData] = useState({ email, password });

    const onSubmit = () => {
        console.log("Email", `${formData.email}`);
        console.log("Paswword", `${formData.password}`);
    };

    // console.log(email);

    return (
        <div>
            <input
                type='text'
                placeholder='email'
                value={formData.email}
                onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                }
            />
            <input
                type='password'
                placeholder='password'
                value={formData.password}
                onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                }
            />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};
