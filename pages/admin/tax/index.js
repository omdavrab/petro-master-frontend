import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddTax from "@/components/admin/AddTax";
import { useDispatch, useSelector } from "react-redux";
import { HandleDeleteTax, HandleGetTax } from "@/redux/action/tax";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { toast } from "react-toastify";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Tax = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [enabled, setEnabled] = useState(false);
    const [taxDataTable, setTaxDataTable] = useState();
    const [taxEdit, setTaxEdit] = useState()
    const taxData = useSelector((state) => state.Tax.taxlist)

    useEffect(() => {
        setTaxDataTable(taxData);
    }, [taxData])

    useEffect(() => {
        dispatch(HandleGetTax())
    }, [])

    const HandleDelete = (id) => {
        dispatch(OpenLoader(true));
        dispatch(HandleDeleteTax(id)).then((result) => {
            if (result.payload.status === 200) {
                toast(result?.payload?.data.message, {
                    hideProgressBar: true,
                    autoClose: 3000,
                    type: "success",
                });
                dispatch(HandleGetTax())
                dispatch(CloseLoader(false));
            } else {
                dispatch(CloseLoader(false));
                toast(result?.payload?.data.message, {
                    hideProgressBar: true,
                    autoClose: 3000,
                    type: "error",
                });
            }
        })
            .catch((err) => {
                console.log(err);
            });
        setOpen(false)
    }


    return (
        <>
            <div className="px-6 sm:px-10">
                <div className="flex justify-between">
                    <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
                        All Tex
                    </h4>
                    <button onClick={() => setOpen(true)} className="text-white bg-gray-800  hover:bg-dark700 transition duration-300 py-1.5 px-5 rounded">
                        Add New Tex
                    </button>
                </div>
                <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
                    <div className=" overflow-x-auto ">
                        <div className="inline-block min-w-full pt-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y dark:divide-gray-600 divide-gray-300">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 dark:text-white pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                                        >
                                            Tax Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                                        >
                                            Tax Value
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 dark:text-white max-w-[80px] text-right text-sm font-semibold text-gray-900"
                                        >
                                            Option
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="dark:bg-[#0c1a32] bg-white">
                                    {
                                        taxDataTable?.map((item, index) => {
                                            console.log("🚀 ~ file: index.js:79 ~ taxDataTable.map ~ item:", item)
                                            return (

                                                <tr
                                                    key={index}
                                                    className={
                                                        index % 2 === 0
                                                            ? undefined
                                                            : "bg-gray-50  dark:bg-[#20304c]"
                                                    }
                                                >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-300 sm:pl-3">
                                                        {index + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                        {item.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                        {item.value}%
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                        <Switch
                                                            id={item._id}
                                                            checked={item.status}
                                                            // onChange={(e) => {
                                                            //     console.log(e, "-===-=-=-=-");
                                                            // }}
                                                            className={classNames(
                                                                item.status ? "bg-green-500" : "bg-gray-200", "relative inline-flex  h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
                                                            )}
                                                        >
                                                            <span
                                                                aria-hidden="true"
                                                                className={classNames(
                                                                    item.status ? "translate-x-5  bg-green-500" : "translate-x-0",
                                                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                                                )}
                                                            />
                                                        </Switch>
                                                    </td>

                                                    <td className="relative whitespace-nowrap max-w-[80px] pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                        <button
                                                            onClick={() => {
                                                                setOpen(true)
                                                                setTaxEdit(item)
                                                            }}
                                                            className="hover:text-red-700 mr-2.5 text-orange trnasition duration-200 ease-in outline-none focus:outline-none"
                                                        >
                                                            <FaRegEdit className="text-[18px]" />
                                                        </button>
                                                        <button
                                                            className="hover:text-red-700  text-red-400 trnasition duration-200 ease-in outline-none focus:outline-none"
                                                            onClick={() => HandleDelete(item._id)}
                                                        >
                                                            <RiDeleteBin5Line className="text-[18px]" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <AddTax setOpen={setOpen} open={open} taxEdit={taxEdit} setTaxEdit={setTaxEdit} />
        </>
    );
}


export async function getServerSideProps(ctx) {
    const myCookie = ctx.req?.cookies || "";

    if (!myCookie.authorization) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}

export default Tax
