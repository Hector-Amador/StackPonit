import { PERMISSIONS } from "@/lib/auth/permissions";

export const SIDEBAR_ITEMS = [
    {
        label: "Market",
        href: "/market",
        icon: "point_of_sale",
        permission: PERMISSIONS.MARKET_VIEW,
    },

    {
        label: "Products",
        href: "/products",
        icon: "inventory_2",
        permission: PERMISSIONS.PRODUCTS_VIEW,
    },

    {
        label: "Customers",
        href: "/customers",
        icon: "groups",
        permission: PERMISSIONS.CUSTOMERS_VIEW,
    },

    {
        label: "Sales",
        href: "/sales",
        icon: "receipt_long",
        permission: PERMISSIONS.SALES_VIEW,
    },

    {
        label: "Users",
        href: "/users",
        icon: "group",
        permission: PERMISSIONS.USERS_VIEW,
    },

    {
        label: "Reports",
        href: "/reports",
        icon: "analytics",
        permission: PERMISSIONS.REPORTS_VIEW,
    },

    {
        label: "Settings",
        href: "/settings",
        icon: "settings",
        permission: PERMISSIONS.SETTINGS_VIEW,
    },
];