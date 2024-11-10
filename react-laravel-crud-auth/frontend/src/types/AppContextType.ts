import UsersType from "./UsersType";

export default interface AppContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    user: UsersType | null;
    setUser: React.Dispatch<React.SetStateAction<UsersType | null>>;
}
