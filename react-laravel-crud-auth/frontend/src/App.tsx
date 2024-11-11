import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import "./App.css";

import Layout from "./pages/Layout";

// pages
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Create from "./pages/tasks/Create";

function App() {
    const context = useContext(AppContext);
    if (!context) return <p>Loading...</p>;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    {!context.token && (
                        <>
                            <Route path="register" element={<Register />} />
                            <Route path="login" element={<Login />} />
                        </>
                    )}
                    {context.token && context.user?.user.user_type === "T" && (
                        <Route path="tasks/create" element={<Create />} />
                    )}
                </Route>

                <Route path="*" element={<p>Not found</p>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
