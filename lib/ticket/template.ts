import { TicketData } from "@/lib/ticket/types";
import { formatDate, formatMoney } from "@/lib/ticket/formatter";
import { ticketStyles } from "@/lib/ticket/style";

export function generateTicket(data: TicketData) {

    const logo = `${window.location.origin}/images/logo.webp`;

    const items = data.cart
        .map(
            ({ product, quantity }) => `
            <tr>
                <td>${product.name}</td>
                <td style="text-align:center">${quantity}</td>
                <td style="text-align:right">${formatMoney(product.sale_price)}</td>
                <td style="text-align:right">
                    ${formatMoney(product.sale_price * quantity)}
                </td>
            </tr>
        `
        )
        .join("");

    return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">
<title>Ticket</title>

<style>

${ticketStyles}

</style>

</head>

<body>

<img class="logo" src="${logo}" />

<h2>STACKPOINT</h2>

<p>Boulevard San Miguel</p>

<p>Tel. 2464576803</p>

<hr>

<p>${formatDate()}</p>

<p>Cajero: ${data.seller}</p>

<p>Pago: ${data.paymentMethod.toUpperCase()}</p>

<hr>

<table>

<thead>

<tr>

<th>Producto</th>
<th>Cant</th>
<th>P.U.</th>
<th>Total</th>

</tr>

</thead>

<tbody>

${items}

</tbody>

</table>

<hr>

<table>

<tr>

<td>Total</td>

<td class="right bold">
${formatMoney(data.total)}
</td>

</tr>

<tr>

<td>Recibido</td>

<td class="right">
${formatMoney(data.receivedAmount)}
</td>

</tr>

<tr>

<td>Cambio</td>

<td class="right">
${formatMoney(data.change)}
</td>

</tr>

</table>

<hr>

<p class="small">
Gracias por su compra
</p>

<p class="small">
Conserve este comprobante
</p>

</body>

</html>
`;
}