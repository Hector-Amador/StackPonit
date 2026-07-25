import { TicketData } from "@/lib/ticket/types";
import { generateTicket } from "@/lib/ticket/template";

export function printTicket(data: TicketData) {

    const html = generateTicket(data);

    const win = window.open("ticket", "stackpoint-ticket");

    if (!win) return;

    win.document.write(html);

    win.document.close();

    win.onload = () => {
        win.focus();
        win.print();
        win.close();
    };
}