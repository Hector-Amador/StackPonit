export interface User {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
    role_id?: number;
    roles: {
        id: number;
        name: string;
    } | null;
}

export interface ButtonEditUserProps {
    user: UserListItem;
}

export type UserListItem = {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
    created_at: string;
    role_id: number;
    roles: {
        id: number;
        name: string;
    } | null;
};
