import jsPDF from "jspdf";

export const FOOTER_COLOR = 140;
export const FOOTER_FONT_SIZE = 7;

class Printer {
    private doc = new jsPDF();
    private app;
    private date;
    private receipt;
    private pageWidth = this.doc.internal.pageSize.width || this.doc.internal.pageSize.getWidth();
    
    constructor(app, receipt, date) {
        this.app = app;
        this.receipt = receipt;
        this.date = date;

        this.Header();
    }

    private Footer = () => {
        let pages = this.doc.getNumberOfPages();
    
        for (let index = 0; index < pages; index++) {
            this.doc.setPage(index + 1);
            this.doc.setTextColor(FOOTER_COLOR);
            this.doc.setFontSize(FOOTER_FONT_SIZE);
            this.doc.text("power by eazibiz", this.pageWidth - 15, 290, { align: "right" });
            this.doc.text(`page ${index + 1} of ${pages}`, 15, 290, { align: "left" });
        }
    }
    
    private Header() {
        this.doc.setTextColor(100);
        this.doc.setFontSize(20);
        this.doc.text(this.app.name, 15, 15);
        this.doc.setFontSize(8);
        this.doc.text(`https://${this.app.domain}`, 15, 20);
        this.doc.text(this.app.caption, 15, 25);
        this.doc.line(15, 28, this.pageWidth - 15, 28); // horizontal line

        this.doc.setFontSize(8);
        this.doc.text(`Date: ${this.date}`, this.pageWidth - 15, 17, { align: "right" });
        this.doc.text(this.receipt, this.pageWidth - 15, 23, { align: "right" });
    }

    Body (fn: Function) {
        return fn(this.doc, this.pageWidth);
    }

    public Print(name) {
        this.Footer();
        this.doc.save(`${name}.pdf`);
    }
}

export const newPrinter = (app, receipt, date) => new Printer(app, receipt, date);