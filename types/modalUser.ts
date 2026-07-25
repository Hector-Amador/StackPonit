import { UserListItem} from "@/types/buttonEditModalTypes";

export interface ModalUserProps {
    user?: UserListItem;
    mode: "create" | "edit";
    onClick: () => void;
    onClick1: () => void;
}