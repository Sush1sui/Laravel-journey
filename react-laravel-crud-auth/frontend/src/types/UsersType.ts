export default interface UsersType {
    user: {
        created_at: string;
        email: string;
        email_verified_at: string | null;
        id: number;
        updated_at: string;
        user_type: "S" | "T";
    };
    user_creds: {
        created_at: string;
        email: string;
        fn: string;
        ln: string;
        isAdmin: 0 | 1;
        subjects: string[];
        updated_at: string;
    };
}
