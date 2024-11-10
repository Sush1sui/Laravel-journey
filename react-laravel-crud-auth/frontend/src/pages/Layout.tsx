import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Cookies from "js-cookie";

export default function Layout() {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    if (!context) return <p>Loading...</p>;

    const { user, token, setUser, setToken } = context;

    async function handleLogout(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const res = await fetch("/api/logout", {
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                setUser(null);
                setToken(null);
                Cookies.remove("authToken");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const profile = user ? (
        <div className="flex items-center space-x-4">
            <p className="text-slate-400 text-xs">
                Welcome back {user.user_creds.fn}
            </p>
            <form onSubmit={handleLogout}>
                <button className="nav-link">Logout</button>
            </form>
        </div>
    ) : (
        <div className="space-x-4">
            <Link to={"/register"} className="nav-link">
                Register
            </Link>
            <Link to={"/login"} className="nav-link">
                Login
            </Link>
        </div>
    );

    return (
        <>
            <header>
                <nav>
                    <Link to={"/"} className="nav-link">
                        Home
                    </Link>

                    {profile}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
