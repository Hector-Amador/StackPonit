import {
    format,
    isToday,
    isYesterday,
} from "date-fns";
import { es } from "date-fns/locale";

export function formatDate(dateString?: string | null) {
    if (!dateString) return "-";

    const date = new Date(dateString);

    if (isToday(date)) {
        return `Hoy, ${format(date, "hh:mm a", { locale: es })}`;
    }

    if (isYesterday(date)) {
        return `Ayer, ${format(date, "hh:mm a", { locale: es })}`;
    }

    return format(date, "dd MMM yyyy", {
        locale: es,
    });
}

export function formatDateTime(dateString?: string | null) {
    if (!dateString) return "-";

    return format(
        new Date(dateString),
        "dd/MM/yyyy hh:mm a",
        { locale: es }
    );
}

export function formatOnlyDate(dateString?: string | null) {
    if (!dateString) return "-";

    return format(
        new Date(dateString),
        "dd/MM/yyyy",
        { locale: es }
    );
}

export function formatOnlyTime(dateString?: string | null) {
    if (!dateString) return "-";

    return format(
        new Date(dateString),
        "hh:mm a",
        { locale: es }
    );
}