import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Login() {
    const context = useContext(AppContext);
    if (!context) return <p>Loading...</p>;
    const { setToken } = context;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<string[]>([]);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        setErrors([]);
        try {
            e.preventDefault();

            const res = await fetch("/api/login", {
                method: "post",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    // Type casting the value of data.errors to string[]
                    Object.values(data.errors).forEach((errorMessages) => {
                        // Type casting errorMessages to string[] explicitly
                        (errorMessages as string[]).forEach((message) => {
                            setErrors((prevErrors) => [...prevErrors, message]);
                        });
                    });
                } else {
                    setErrors((prevErrors) => [
                        ...prevErrors,
                        "Something went wrong with logging in",
                    ]);
                }
            }

            // Assuming `data.token` contains the token
            if (data.token) {
                // Set the token in a cookie with an expiration of 7 days
                const expires = new Date();
                expires.setDate(expires.getDate() + 14); // 14 days from now
                document.cookie = `authToken=${
                    data.token.plainTextToken
                }; expires=${expires.toUTCString()}; path=/; secure; SameSite=Strict`;
                setToken(data.token.plainTextToken);
                console.log(data);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function onChangeInput(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <>
            <h1 className="title">Register a new account</h1>

            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
                {errors.length > 0 &&
                    errors.map((errorMsg, i) => (
                        <p key={i} className="error">
                            {errorMsg}
                        </p>
                    ))}
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

                <button className="primary-btn">Login</button>
            </form>
        </>
    );
}
