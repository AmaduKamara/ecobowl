import { useFormik } from 'formik';
import * as Yup from "yup";
import { Drawer } from 'antd';
import { SelectField } from '../ui/SelectField';
import { NumberField } from '../ui/NumberField';
import { useDispatch } from 'react-redux';
import { Select } from "antd";
import { blockItem } from '../../redux/sale/slice';
import { AppButton } from '../ui/Button';
import { size } from '../../common';
import { useWindowSize } from '../../hooks/useWindowSize';

const { Option } = Select;

export const SalesItemsDrawer = ({ visible, onClose, salesType, products }) => {
    const dispatch = useDispatch();
    const { width } = useWindowSize();

    const getItem = (id) => {
        const item = products.find((e: any) => (e.id === id))
        return {
            id: item.id,
            wholesaleCost: item.wholesaleCost,
            retailCost: item.retailCost,
            name: item.itemName,
            sales: salesType
        };
    }

    const handleChange = (name, value) => {
        formik.setFieldValue(name, value);
    }

    const handleClose = () => {
        formik.resetForm();
        onClose();
    }

    const validationSchema = Yup.object({
        items: Yup.array().of(
            Yup.object().shape({
                productId: Yup.string().required("Product is required"),
                quantity: Yup.number().required("Quantity is required"),
                discount: Yup.number()
            })
        )
    });

    const formik = useFormik({
        initialValues: {
            productId: "",
            quantity: "",
            cost: 0,
            discount: 0,
            name: ""
        },
        validationSchema,
        onSubmit: (values) => {
            const product = getItem(values.productId);
            
            const item = {
                ...values,
                ...product
            }

            dispatch(blockItem([item]));
            handleClose();
        },
    });

    return (
        <Drawer width={size(width)} title="Select Items" placement="right" onClose={onClose} visible={visible}>
            <div >
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='flex space-y-5 flex-col'>
                            <div className='flex-1'>
                                <SelectField
                                    required
                                    label='Product'
                                    value={formik.values.productId}
                                    onChange={(e) => handleChange("productId", e)}
                                    error={formik.touched.productId && formik.errors.productId ? formik.errors.productId : ""}
                                    placeholder="Product">
                                    {
                                        products.map(e => (<Option key={e.id} value={e.id}>{e.itemName}</Option>))
                                    }
                                </SelectField>
                            </div>
                            <div className='flex-1'>
                                <NumberField
                                    required
                                    label='Quantity'
                                    value={formik.values.quantity}
                                    onChange={(e) => handleChange("quantity", e)}
                                    error={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
                                    placeholder="Quantity" />
                            </div>
                            <div className='flex-1'>
                                <NumberField
                                    required
                                    label='Discount'
                                    placeholder="Discount"
                                    max={100}
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => handleChange("discount", e)}
                                    error={formik.touched.discount && formik.errors.discount ? formik.errors.discount : ""} />
                            </div>
                        </div>
                        <div className='border-t mt-10 pt-3 flex space-x-3'>
                            <AppButton
                                outline
                                onClick={handleClose}
                                style={{ width: "100%" }}>Cancel</AppButton>
                            <AppButton
                                style={{ width: "100%" }}
                                type="submit">Save</AppButton>
                        </div>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}