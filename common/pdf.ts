import jsPDF from "jspdf";
import 'jspdf-autotable';

class Pdf {
    public doc;

    constructor() {
        this.doc = new jsPDF();
        this.doc.autoTable({ html: '#my-table' });
    }
}

export const pdf = new Pdf();