import { FaCashRegister, FaRegIdBadge } from "react-icons/fa";
import { BiCollection } from "react-icons/bi";
import { MdBatchPrediction } from "react-icons/md";
import { Card } from "../AppLayout";
import Router from "next/router";

export const CountChat = ({ record }) => {
    return (
        <>
            {
                record ? <div className='flex flex-col md:flex-wrap md:mb-2 mb-3 md:flex-row -mx-2'>
                    <div className="lg:w-1/4 w-full md:w-1/2 md:p-2 p-2">
                        <Card onClick={() => Router.push('/product')} className="lg:p-10 md:px-8 pc:p-4 p-6 flex justify-between items-center">
                            <div>
                                <p className='text-3xl font-bold mb-2'>{record.sales}</p>
                                <p className='text-base'>Total Sales</p>
                            </div>
                            <div>
                                <FaCashRegister className="md:text-5xl text-3xl text-green-500" />
                            </div>
                        </Card>
                    </div>
                    <div className="lg:w-1/4 w-full md:w-1/2 md:p-2 p-2">
                        <Card onClick={() => Router.push('/product')} className="lg:p-10 md:px-8 pc:p-4 p-6 flex justify-between items-center">
                            <div>
                                <p className='text-3xl font-bold mb-2'>{record.products}</p>
                                <p className='text-base'>Total Products</p>
                            </div>
                            <div>
                                <BiCollection className="md:text-5xl text-4xl text-yellow-500" />
                            </div>
                        </Card>
                    </div>
                    <div className="lg:w-1/4 w-full md:w-1/2 md:p-2 p-2">
                        <Card onClick={() => Router.push('/service')} className="lg:p-10 md:px-8 pc:p-4 p-6 flex justify-between items-center">
                            <div>
                                <p className='text-3xl font-bold mb-2'>{record.services}</p>
                                <p className='text-base'>Total Services</p>
                            </div>
                            <div>
                                <MdBatchPrediction className="md:text-5xl text-4xl text-indigo-500" />
                            </div>
                        </Card>
                    </div>
                    <div className="lg:w-1/4 w-full md:w-1/2 md:p-2 p-2">
                        <Card onClick={() => Router.push('/staff')} className="lg:p-10 md:px-8 pc:p-4 p-6 flex justify-between items-center">
                            <div>
                                <p className='text-3xl font-bold mb-2'>{record.staffs}</p>
                                <p className='text-base'>Total Staff</p>
                            </div>
                            <div>
                                <FaRegIdBadge className="md:text-5xl text-3xl text-cyan-500" />
                            </div>
                        </Card>
                    </div>
                </div> : null
            }
        </>
    );
}