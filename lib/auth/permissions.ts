export const PERMISSIONS = {
    MARKET_VIEW: "market:view",
    PRODUCTS_VIEW: "products:view",
    CUSTOMERS_VIEW: "customers:view",
    SALES_VIEW: "sales:view",
    USERS_VIEW: "users:view",
    REPORTS_VIEW: "reports:view",
    SETTINGS_VIEW: "settings:view",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
