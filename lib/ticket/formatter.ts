export const formatMoney = (value: number) =>
    value.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
    });

export const formatDate = () =>
    new Date().toLocaleString("es-MX");