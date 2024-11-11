import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Home() {
    const context = useContext(AppContext);

    // Check if context is null
    if (!context) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1 className="title">Latest Tasks {context.token}</h1>
        </>
    );
}
