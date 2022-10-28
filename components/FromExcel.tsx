import { useDispatch } from "react-redux";
import { GuidGenerator } from "../hooks";
import { addItem } from "../redux/supply/supply.slice";
import { AppButton } from "./ui/Button";
import * as XLSX from "xlsx";

export const FromExcel = () => {
    const dispatch = useDispatch();

    const storeJson = (list = []) => {
        list.forEach(row => {
            const record = {
                id: GuidGenerator(),
                itemName: row["Name"],
                quantity: row['Quantity'],
                normalCost: row["Normal Cost"],
                wholesaleCost: row["Whole Sale Cost"],
                retailCost: row["Retail Cost"],
                Discount: row["Discount"],
                expiryDate: row["Expiry Date"] ? new Date(row["Expiry Date"]) : new Date(),
                isExpiry: row["Expiry Date"] ? true : false,
                description: row["Description"]
            }

            dispatch(addItem(record));
        });
    }

    const select = () => {
        const file = document.getElementById("excel");
        file?.click();
    }

    const onChange = ({ target }) => {
        const file = target.files[0];

        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = function ({ target }) {
            if (target) {
                var data = target.result;
                var xl = XLSX.read(data, { type: 'binary' });

                xl.SheetNames.forEach(function (sheetName) {
                    const record: any = XLSX.utils.sheet_to_json(xl.Sheets[sheetName]);
                    storeJson(record);
                });

            }
        };

    }

    return (
        <div>
            <input onChange={onChange} accept=".xlsx,.xls" id="excel" type="file" className="hidden" />
            <AppButton onClick={select}>Excel</AppButton>
        </div>
    )
}