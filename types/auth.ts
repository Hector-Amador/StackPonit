export type CurrentUser = {
    id: string;
    email?: string;
    full_name: string;
    avatar_url: string | null;
    roleId: number;
    role: string;
    isAdmin?: boolean;
    isEmployee?: boolean;
};