import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        id: "",
        fn: "",
        ln: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const res = await fetch("/api/register", {
                method: "post",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <>
            <h1 className="title">Register a new account</h1>

            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        name="id"
                        value={formData.id}
                        onChange={onChangeInput}
                        type="text"
                        placeholder="ID"
                        required
                    />
                </div>
                <div>
                    <input
                        name="fn"
                        value={formData.fn}
                        onChange={onChangeInput}
                        type="text"
                        placeholder="First Name"
                        required
                    />
                </div>
                <div>
                    <input
                        name="ln"
                        value={formData.ln}
                        onChange={onChangeInput}
                        type="text"
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={onChangeInput}
                        type="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={onChangeInput}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div>
                    <input
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={onChangeInput}
                        type="password"
                        placeholder="Password confirmation"
                        required
                    />
                </div>
                <button className="primary-btn">Register</button>
            </form>
        </>
    );
}
