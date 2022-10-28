import { Button } from "antd";
import { useDispatch } from "react-redux";
import { DateFormater, GuidGenerator } from "../hooks";
import { addItem } from "../redux/supply/supply.slice";
import { AppButton } from "./ui/Button";

export const FromCSV = () => {
    const dispatch = useDispatch();

    const csvFileToJSON = (data) => {
        const headers: Array<string> = [];

        try {
            var rows = data.split("\r\n");
            for (var i = 0; i < rows.length; i++) {
                var cells = rows[i].split(",");
                var rowData = {
                    id: GuidGenerator(),
                    quantity: "",
                    wholesaleCost: "",
                    retailCost: "",
                    normalCost: "",
                    expiryDate: DateFormater(new Date()),
                    isExpiry: false
                };
                for (var j = 0; j < cells.length; j++) {
                    if (i == 0) {
                        var headerName = cells[j].trim();
                        headers.push(headerName);
                    } else {
                        var key = headers[j];

                        if (key) {
                            if (key === 'isExpiry') rowData[key] = (cells[j].trim() === 'true')
                            else rowData[key] = cells[j].trim();
                        }
                    }
                }
                //skip the first row (header) data
                if (i != 0) {
                    let values = rowData;

                    dispatch(addItem({
                        ...values,
                        quantity: Number.parseInt(values.quantity),
                        wholesaleCost: Number.parseInt(values.wholesaleCost),
                        retailCost: Number.parseInt(values.retailCost),
                        normalCost: Number.parseInt(values.normalCost),
                        isExpiry: values.isExpiry,
                        expiryDate: values.isExpiry ? new Date(values.expiryDate) : new Date()
                    }));
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    const select = () => {
        const file = document.getElementById("file");
        file?.click();
    }

    const onChange = ({ target }) => {
        const file = target.files[0];

        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = function ({ target }) {
            if (target) {
                csvFileToJSON(target.result)
            }
        };

    }

    return (
        <div>
            <input onChange={onChange} accept=".csv" id="file" type="file" className="hidden" />
            <AppButton onClick={select}>CSV</AppButton>
        </div>
    )
}