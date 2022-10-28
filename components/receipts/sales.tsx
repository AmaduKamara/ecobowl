import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { newPrinter } from ".";

export const SalesReceipt = (props: any) => {
    const { record, app, date, children, className = "" } = props;

    const { items = [], invoiceNumber, salesType, discount, totalCost, customer, paymentType } = record;
    let subTotal = 0;
    
    const download = () => {
        const receiptDate = dayjs(date).format("D MMM YYYY");
        let tableHeight = 0;

        const body = (doc: jsPDF, pageWidth: number) => {
            // from sender
            doc.setFontSize(10);
            doc.text('From:', 16, 42);
            doc.text(app.name, 16, 47);
            doc.text(app.contact.country, 16, 52);
            doc.text(app.contact.address, 16, 57);
            doc.text(app.contact.email, 16, 62);
            doc.text(app.contact.telephone, 16, 67);

            // To Receiver
            if (customer.givenNames) {
                doc.text('To:', pageWidth / 2.2, 42);
                doc.text(`${customer.givenNames} ${customer.familyName}`, pageWidth / 2.2, 47);
                doc.text(customer.company, pageWidth / 2.2, 52);
                doc.text(customer.address, pageWidth / 2.2, 57);
                doc.text(customer.phone, pageWidth / 2.2, 62);
            }

            // Sales Details
            doc.text(`Sales Type: ${salesType}`, pageWidth - 15, 42, { align: "right" });
            doc.text(`Payment Type: ${paymentType}`, pageWidth - 15, 47, { align: "right" });

            // Table
            autoTable(doc, {
                head: [['Item', 'Qty', "Price", 'Discount', 'Total']],
                body: formateData(items),
                startY: 75,
                columns: [
                    {
                        header: "#",
                        dataKey: "index"
                    },
                    {
                        header: "Item",
                        dataKey: "name"
                    },
                    {
                        header: "QTY",
                        dataKey: "qty"
                    },
                    {
                        header: "Price",
                        dataKey: "unitCost"
                    },
                    {
                        header: "Discount",
                        dataKey: "discount"
                    },
                    {
                        header: "Total",
                        dataKey: "cost"
                    }
                ],
                didDrawCell: (data) => {
                    tableHeight = data.cursor?.y ? data.cursor?.y : 0;
                    tableHeight += 15;
                },
            });

            doc.setFontSize(10);
            doc.text("Subtotal: ", pageWidth / 1.6, tableHeight + 8, { align: "right" });
            doc.text(`SLE ${subTotal}`, pageWidth - 15, tableHeight + 8, { align: "right" });
            doc.text("Discount: ", pageWidth / 1.6, tableHeight + 16, { align: "right" });
            doc.text(discount ? `${discount}%` : '0', pageWidth - 15, tableHeight + 16, { align: "right" });
            doc.line(pageWidth - 15, tableHeight + 19, pageWidth / 1.55, tableHeight + 19);
            doc.text("Subtotal Less Discount: ", pageWidth / 1.6, tableHeight + 24, { align: "right" });
            doc.text(`SLE ${totalCost}`, pageWidth - 15, tableHeight + 24, { align: "right" });
            doc.line(pageWidth - 15, tableHeight + 27, pageWidth / 1.55, tableHeight + 27);
        }

        const printer = newPrinter(app, `Receipt: #${invoiceNumber}`, receiptDate);
        printer.Body(body);
        printer.Print(invoiceNumber);
    }

    const formateData = (items: Array<any>) => {
        const list: Array<any> = [];

        items.forEach((item, index) => {
            const total = item.quantity * item.sellingCost;
            subTotal += total;

            const object = {
                index: index + 1,
                name: item.productName,
                qty: item.quantity,
                unitCost: `SLE ${item.sellingCost}`,
                discount: item.discount ? `${item.discount}%` : 0,
                cost: `SLE ${total}`
            }

            list.push(object);
        });

        return list;
    }

    return <button className={`${className}`} type="button" onClick={download}>{children}</button>
}