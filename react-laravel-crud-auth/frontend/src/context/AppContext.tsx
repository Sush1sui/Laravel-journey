import { createContext, useEffect, useState } from "react";
import getCookie from "../utils/getCookie";
import AppContextType from "../types/AppContextType";
import UsersType from "../types/UsersType";

export const AppContext = createContext<AppContextType | null>(null);

type ParamType = {
    children: React.ReactNode;
};

export default function AppProvider({ children }: ParamType) {
    const [token, setToken] = useState(getCookie("authToken"));
    const [user, setUser] = useState<UsersType | null>(null);

    useEffect(() => {
        if (token) getUser();
    }, [token]);

    async function getUser() {
        try {
            const res = await fetch("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            console.log(data);
            if (res.ok) setUser(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AppContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}
