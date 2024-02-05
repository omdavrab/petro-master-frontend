import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { useRouter } from "next/router";
import { GetShift } from "@/redux/action/shift";
import { GetMachine } from "@/redux/action/machine";
import { GetRate, HandleDateRate } from "@/redux/action/rate";
import { GetEmployee } from "@/redux/action/employee";
import { GetReport, HandleCreateReport } from "@/redux/action/dailyReport";
import { toast } from "react-toastify";
import { GetTank } from "@/redux/action/tank";
import { formatCurrency } from "@/utils/formatCurrency";
import { GetCreditParty } from "@/redux/action/credit";
import { GetProduct } from "@/redux/action/product";
import { MdAddCircleOutline } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import { RiErrorWarningFill } from "react-icons/ri";
import { HandleTotalSum } from "@/utils/handleTotal";
import Image from "next/image";
import CollectionSummary from "@/components/admin/CollectionSummary";

const generateDummyData = () => {
  return [
    {
      nozzle: "1-A-MS",
      name: "Jaydeep",
      opening: 15240,
      test: 5,
      closing: 154289,
      tSale: 587894654,
      rate: 54.23,
      amount: 1254585,
      payTm: 4561,
      icic: 54.23,
      cash: 54.23,
      coine: 54.23,
      credit: 54.23,
      different: 54.23,
      oil: 54.23,
      upda: "54.23",
    },
  ];
};

const Collection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const EmployeeList = useSelector(
    (state) => state?.Employee?.employeelist.data
  );
  const MachineList = useSelector((state) => state?.Machine?.machinelist.data);
  const ShiftList = useSelector((state) => state?.Shift?.shiftlist.data);
  const Report = useSelector((state) => state?.Report?.reportlist.data);
  const TankList = useSelector((state) => state?.Tank?.tanklist.data);
  const ProductList = useSelector((state) => state?.Product?.productlist.data);
  const PartyList = useSelector((state) => state?.Party?.partylist.data);

  const [selectedMachines, setSelectedMachines] = useState([]);
  const [inputFields, setInputFields] = useState([{}]);
  const [input, setInput] = useState({});
  const idRef = useRef([]);
  const [Rate, setRate] = useState({});
  const [creditInput, setCreditInput] = useState([]);
  const [productInput, setProductInput] = useState([]);
  const [data, setData] = useState(generateDummyData());
  const [collection, setCollection] = useState({ cash: "", online: "" });

  useEffect(() => {
    dispatch(HandleDateRate(input.date)).then((result) => {
      if (result.payload) {
        setRate(result?.payload?.data?.result);
      }
    });
  }, [input.date]);

  useEffect(() => {
    if (selectedMachines.length > 0) {
      const updatedSelectedMachines = selectedMachines.map((machine) => {
        const tank = TankList.find(
          (T) => T._id.toString() === machine.tankId.toString()
        );
        if (tank) {
          let rate;
          if (tank.type === "MS") {
            rate = Rate?.msRate || 0;
          } else {
            rate = Rate?.hsdRate || 0;
          }
          return {
            ...machine,
            rate: rate,
          };
        }
        return machine;
      });

      setSelectedMachines(updatedSelectedMachines);
    }
    if (creditInput.length > 0) {
      const updatedcredit = creditInput.map((credit) => {
        if (credit.product === "MS") {
          credit.rate = Rate?.msRate || 0;
        } else {
          credit.rate = Rate?.hsdRate || 0;
        }
        return credit;
      });
      setCreditInput(updatedcredit);
    }
  }, [Rate]);

  const handleCheckboxChange = async (machine) => {
    let id = [];
    const isSelected = selectedMachines.some(
      (selectedMachine) => selectedMachine.machineId === machine._id
    );

    if (isSelected) {
      setSelectedMachines((prevSelected) =>
        prevSelected.filter(
          (selectedMachine) => selectedMachine.machineId !== machine._id
        )
      );
      idRef.current = idRef.current.filter(
        (selectedMachine) => selectedMachine !== machine._id
      );
    } else {
      idRef.current = idRef.current.concat(machine._id);
      const updatedMachine = machine.nozzles.map((item) => {
        const sumdata = CountSum(item);
        item.totalSale = sumdata.totalSale;
        item.amount = sumdata.amount;
        const tank = TankList.find(
          (T) => T._id.toString() === item.tankId.toString()
        );
        if (tank) {
          let rate;
          if (tank.type === "MS") {
            rate = Rate?.msRate || 0;
          } else {
            rate = Rate?.hsdRate || 0;
          }
          return {
            machineId: machine._id,
            machineName: machine.name,
            machineType: machine.type,
            tankType: tank.type,
            rate: rate,
            ...item,
          };
        }

        return null; // Handle the case where tank is not found
      });

      await setSelectedMachines((prevSelected) => {
        const newSelected = prevSelected.concat(updatedMachine);
        dispatch(GetReport({ id: idRef.current })).then((x) => {
          newSelected.forEach((item) => {
            x?.payload &&
              x?.payload?.data?.forEach((data) => {
                data.machine.forEach((d) => {
                  if (
                    d.machineId === item.machineId &&
                    d.nozzleId === item._id
                  ) {
                    item.opening = d?.closing;
                    // item.testing = 1;
                  }
                });
              });
          });
        });
        return newSelected;
      });
    }
  };

  useEffect(() => {
    dispatch(GetShift("all"));
    dispatch(GetMachine("all"));
    dispatch(GetRate("all"));
    dispatch(GetEmployee("all"));
    dispatch(GetTank("all"));
    dispatch(GetCreditParty("all"));
    dispatch(GetProduct("all"));
  }, []);

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = async (index, evnt, data) => {
    const { name, value } = evnt.target;
    const list = [...selectedMachines];
    list[index][name] = value;
    list[index]["machineId"] = data.machineId;
    list[index]["nozzleId"] = data._id;
    list[index]["nozzle"] = data.nozzle;
    const sumdata = await CountSum(list[index]);
    list[index]["totalSale"] = sumdata.totalSale;
    list[index]["amount"] = sumdata.amount;
    setSelectedMachines(list);
  };

  const CountSum = (data) => {
    let totalSale = 0;
    let amount = 0;
    let testing = 0;
    totalSale = parseInt(data.closing || 0) - parseInt(data.opening || 0);
    totalSale = totalSale - parseInt(data.testing || 0);
    amount = parseFloat(data.rate || 0) * totalSale;
    return { totalSale, amount };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(OpenLoader(true));
    const [employeeId, employeeName] = input?.employeeId?.split(",");
    const [shiftId, shiftName] = input?.shiftId?.split(",");

    const data = {
      date: input.date,
      shiftId: shiftId,
      shiftName: shiftName,
      employeeId: employeeId,
      machine: selectedMachines,
      productSale: productInput,
      creditSale: creditInput,
      totalCollection : collection.TotalCollection,
      totalcash : collection.cash,
      totalCreditSale : collection.CreditSum,
      totalOnlinePayment : collection.online,
      totalProductSale : collection.productSum,
      totalDifferent : collection.TotalDifferent
    };
    await dispatch(HandleCreateReport(data))
      .then(async (result) => {
        if (
          result?.payload?.status === 201 ||
          result?.payload?.status === 200
        ) {
          toast(result?.payload?.data.message, {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
          });
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
        dispatch(CloseLoader(false));
        console.log(err, "Edit ERROR");
      });
  };
  const handleData = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleCedit = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...creditInput];
    list[index][name] = value;
    if (name === "name") {
      const [id, name] = value.split(",");
      const data = PartyList.find((ids) => ids._id === id);
      list[index]["vehicleList"] = data.vehicle;
      list[index]["name"] = name;
      list[index]["partyId"] = id;
    }
    if (name === "vnumber") {
      const [id, name] = value.split(",");
      list[index]["vname"] = name;
      list[index]["vnumber"] = id;
    }
    if (name === "product") {
      list[index]["rate"] = value === "MS" ? Rate?.msRate : Rate?.hsdRate;
      list[index]["amount"] = list[index].rate * list[index].qty;
    }
    if (name === "qty") {
      list[index]["amount"] = list[index].rate * list[index].qty;
    }
    setCreditInput(list);
  };
  const handleProduct = (index, event) => {
    const { name, value } = event.target;
    const list = [...productInput];
    list[index][name] = value;
    if (name === "name") {
      const [id, name] = value.split(",");
      const data = ProductList.find((ids) => ids._id === id);
      list[index]["price"] = data.price;
      list[index]["name"] = name;
      list[index]["productId"] = id;
    }
    if (name === "qty") {
      list[index]["amount"] = list[index].price* list[index].qty;
    }
    setProductInput(list);
  };
  const productSum = HandleTotalSum(productInput, "product");
  const credittSum = HandleTotalSum(creditInput, "creditparty");
  const nozzleSum = HandleTotalSum(selectedMachines, "nozzle");
// TotalCollection
  const TotalCollection =
    productSum.product.ProductSaleAmount +
    credittSum.creditParty.TotalCreditPartyAmount +
    nozzleSum.nozzle.TotalNozzleAmount;

  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
        Employee Collection
      </h4>
      <div className="bg-white dark:bg-[#0c1a32] inline-block min-w-full mt-8 rounded-md shadow-sm align-middle p-4 sm:p-6 lg:p-8">
        <div>
          {!Rate && (
            <div className="flex gap-4 mb-4">
              <button className="hover:text-red-700  text-red-400 trnasition duration-200 ease-in outline-none focus:outline-none">
                <RiErrorWarningFill className="text-[18px]" />
              </button>
              <h1 className="text-red-600">
                Rate is not available please Select new Date.
              </h1>
            </div>
          )}
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="gap-36 flex w-full">
              <div>
                <div className="mb-2 min-w-[400px]">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </label>
                  <div className="mt-2">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      // defaultValue={moment().format("YYYY-MM-DD")}
                      onChange={(e) => handleData(e)}
                      className="block w-full px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Shift
                  </label>
                  <div className="mt-2">
                    <select
                      id="Shift"
                      name="shiftId"
                      required
                      className="block w-full px-6 text-[#6e6e6e] rounded-md dark:text-gray-300 border border-[#f0f1f5] dark:bg-[#20304c] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                      onChange={(e) => {
                        handleData(e);
                      }}
                    >
                      <option name="Shift">Please select Shift</option>
                      {ShiftList?.length > 0 &&
                        ShiftList?.map((item) => {
                          const value = `${item._id},${item.name}`;
                          return (
                            <option name="Shift" value={value}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="Employee"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Employee
                  </label>
                  <div className="mt-2">
                    <select
                      id="Employee"
                      name="employeeId"
                      required
                      className="block w-full px-6 text-[#6e6e6e] rounded-md dark:text-gray-300 border border-[#f0f1f5] dark:bg-[#20304c] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                      onChange={(e) => {
                        handleData(e);
                      }}
                    >
                      <option name="Employee">Please select Employee</option>
                      {EmployeeList?.length > 0 &&
                        EmployeeList?.map((item) => {
                          const value = `${item._id},${item.name}`;
                          return (
                            <option name="Employee" value={value}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              {/* Machine */}
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Machine
                </label>
                <div className="mt-2 overflow-y-scroll custom-scroll w-[500px] max-h-[205px] flex rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
                  <div className="">
                    {MachineList?.length > 0 &&
                      MachineList.map((item, index) => (
                        <div className="flex items-center pb-2">
                          <input
                            id={index}
                            name={`remember-me${index}`}
                            type="checkbox"
                            className="h-4 bg-white w-4  rounded-[2.8px] accent-violet600 border-gray-300 text-orange focus:ring-0"
                            onChange={() => handleCheckboxChange(item)}
                          />
                          <label
                            htmlFor={`remember-me${index}`}
                            className="ml-2 block font-medium text-sm text-gray800"
                          >
                            {item.name}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Nozzle Table */}
            {selectedMachines?.length > 0 && (
              <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
                <label className="block leading-6 text-lg font-bold text-gray-900">
                  Nozzle Wise sale Details
                </label>
                <div className="overflow-x-auto ">
                  <div className="inline-block min-w-full pt-2 align-middle">
                    <table className="min-w-full divide-y dark:divide-gray-600 divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Nozzle Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Opening
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Testing
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Closing
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            TotalSale
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Rate
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="dark:bg-[#0c1a32] bg-white">
                        {selectedMachines?.map((nozzle, index) => {
                          return (
                            <tr className={"bg-gray-50  dark:bg-[#20304c]"}>
                              <td className="whitespace-nowrap text-center text-sm font-medium text-gray-900 dark:text-gray-300">
                                {nozzle.nozzle}
                              </td>
                              <td className="whitespace-nowrap py-1.5 w-40 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <input
                                  name="opening"
                                  type="number"
                                  required
                                  className="block w-40 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] border border-[#f0f1f5] focus:border-orange transition focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                  value={nozzle?.opening || ""}
                                  onChange={(e) => {
                                    handleChange(index, e, nozzle);
                                  }}
                                />
                              </td>
                              <td className="whitespace-nowrap py-1.5 w-20 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <input
                                  name="testing"
                                  type="number"
                                  // required
                                  className="block w-20 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] border border-[#f0f1f5] focus:border-orange transition focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                                  value={nozzle?.testing}
                                  onChange={(e) => {
                                    handleChange(index, e, nozzle);
                                  }}
                                />
                              </td>
                              <td className="whitespace-nowrap py-1.5 w-40 text-sm font-medium text-gray-900 dark:text-gray-300">
                                <input
                                  name="closing"
                                  type="number"
                                  required
                                  className="block w-40 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] border border-[#f0f1f5] focus:border-orange transition focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                  onChange={(e) => {
                                    handleChange(index, e, nozzle);
                                  }}
                                />
                              </td>
                              <td className="whitespace-nowrap text-center w-40 py-1.5 pl-4 pr-3 text-sm font-bold text-gray-900 dark:text-gray-300 sm:pl-3">
                                {formatCurrency(nozzle?.totalSale, "INR")}
                              </td>
                              <td className="whitespace-nowrap text-center py-1.5 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-300 sm:pl-3">
                                {nozzle?.rate}
                              </td>
                              <td className="whitespace-nowrap text-center py-1.5 pl-4 pr-3 text-sm font-bold text-gray-900 dark:text-gray-300 sm:pl-3">
                                {formatCurrency(nozzle?.amount, "INR")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* Inventory Product Sale Details */}
            <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
              <div className="flex gap-3">
                <label className="block leading-6 text-lg font-bold text-gray-900">
                  Inventory Product Sale Details
                </label>
                <button
                  type="button"
                  onClick={() => setProductInput([])}
                  className="text-[20px]  text-red-500 hover:text-red-700 trnasition ease-in duration-300 "
                >
                  <TbTrash />
                </button>
                <button
                  type="button"
                  onClick={() => setProductInput([...productInput, {amount: '0'}])}
                  className="text-[20px] text-blue-500 hover:text-blue-700 trnasition ease-in duration-300  outline-none"
                >
                  <MdAddCircleOutline />
                </button>
              </div>
              {productInput?.length > 0 && (
                <div className="overflow-x-auto ">
                  <div className="inline-block min-w-full pt-2 align-middle">
                    <table className="min-w-[50%] divide-y dark:divide-gray-600 divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 w-40 dark:text-white text-right text-sm font-semibold text-gray-900"
                          >
                            Qty
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-right text-sm font-semibold text-gray-900"
                          >
                            Rate
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-right text-sm font-semibold text-gray-900"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="dark:bg-[#0c1a32] bg-white">
                        {productInput &&
                          productInput.map((item, index) => {
                            return (
                              <tr className={"bg-gray-50  dark:bg-[#20304c]"}>
                                <td className="whitespace-nowrap pl-4 text-sm py-2 font-medium text-gray-900 dark:text-gray-300">
                                  <select
                                    id="name"
                                    name="name"
                                    required
                                    className="block w-full px-6 text-[#6e6e6e] rounded-md dark:text-gray-300 border border-[#f0f1f5] dark:bg-[#20304c] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                    onChange={(e) => {
                                      handleProduct(index, e);
                                    }}
                                  >
                                    <option selected disabled>
                                      Select..
                                    </option>
                                    {ProductList?.length > 0 &&
                                      ProductList?.map((item) => {
                                        const value = `${item._id},${item.name}`;
                                        return (
                                          <option name="name" value={value}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </td>
                                <td className="whitespace-nowrap w-full flex justify-end text-right py-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  <input
                                    id="qty"
                                    name="qty"
                                    type="number"
                                    required
                                    className="block text-[#6e6e6e] w-20 dark:text-gray-300 dark:bg-[#20304c] border border-[#f0f1f5] focus:border-orange transition focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                    onChange={(e) => {
                                      handleProduct(index, e);
                                    }}
                                  />
                                </td>
                                <td className="whitespace-nowrap text-right py-2 pr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  {item.price}
                                </td>
                                <td className="whitespace-nowrap text-right py-2 pr-4 text-sm font-bold text-gray-900 dark:text-gray-300">
                                  {formatCurrency(item?.amount, "INR")}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            {/* Credit Sale */}
            <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
              <div className="flex gap-3">
                <label className="block leading-6 text-lg font-bold text-gray-900">
                  Credit Sale
                </label>
                <button
                  type="button"
                  onClick={() => setCreditInput([])}
                  className="text-[20px]  text-red-500 hover:text-red-700 trnasition ease-in duration-300 "
                >
                  <TbTrash />
                </button>
                <button
                  type="button"
                  onClick={() => setCreditInput([...creditInput, {amount :'0'}])}
                  className="text-[20px] text-blue-500 hover:text-blue-700 trnasition ease-in duration-300  outline-none"
                >
                  <MdAddCircleOutline />
                </button>
              </div>
              {creditInput.length > 0 && (
                <div className="overflow-x-auto ">
                  <div className="inline-block min-w-full pt-2 align-middle">
                    <table className="min-w-full divide-y dark:divide-gray-600 divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Party
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Vehicle No.
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Product
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Qty
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Rate
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-center text-sm font-semibold text-gray-900"
                          >
                            Ch. No.
                          </th>
                        </tr>
                      </thead>
                      <tbody className="dark:bg-[#0c1a32] bg-white">
                        {creditInput &&
                          creditInput.map((party, index) => {
                            return (
                              <tr className={"bg-gray-50  dark:bg-[#20304c]"}>
                                <td className="whitespace-nowrap text-left pl-4 text-sm py-2 font-medium text-gray-900 dark:text-gray-300">
                                  <select
                                    id="name"
                                    name="name"
                                    required
                                    className="block w-full px-6 text-[#6e6e6e] rounded-md dark:text-gray-300 border border-[#f0f1f5] dark:bg-[#20304c] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                    onChange={(e) => {
                                      handleCedit(index, e);
                                    }}
                                  >
                                    <option selected disabled>
                                      Select..
                                    </option>
                                    {PartyList?.length > 0 &&
                                      PartyList?.map((item) => {
                                        const value = `${item._id},${item.name}`;
                                        return (
                                          <option name="Shift" value={value}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </td>
                                <td className="whitespace-nowrap w-[19%] text-left pl-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  <select
                                    id="vnumber"
                                    name="vnumber"
                                    required
                                    className="block w-full px-6 text-[#6e6e6e] rounded-md dark:text-gray-300 border border-[#f0f1f5] dark:bg-[#20304c] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                    onChange={(e) => {
                                      handleCedit(index, e);
                                    }}
                                  >
                                    <option selected disabled>
                                      Select..
                                    </option>
                                    {party?.vehicleList?.length > 0 &&
                                      party?.vehicleList?.map((item) => {
                                        const value = `${item.vnumber},${item.type}`;
                                        return (
                                          <option name="Shift" value={value}>
                                            {item.type} {item.vnumber}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </td>
                                <td className="whitespace-nowrap w-[12%] text-left pl-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  <select
                                    id="product"
                                    name="product"
                                    required
                                    className="block w-full px-6 text-[#6e6e6e] rounded-md dark:text-gray-300 border border-[#f0f1f5] dark:bg-[#20304c] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                    onChange={(e) => {
                                      handleCedit(index, e);
                                    }}
                                  >
                                    <option selected disabled>
                                      Select..
                                    </option>
                                    <option value="MS">MS</option>
                                    <option value="HSD">HSD</option>
                                  </select>
                                </td>
                                <td className="whitespace-nowrap w-32 text-center pl-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  <input
                                    id="qty"
                                    name="qty"
                                    type="number"
                                    required
                                    onChange={(e) => {
                                      handleCedit(index, e);
                                    }}
                                    className="block text-[#6e6e6e] w-32 dark:text-gray-300 dark:bg-[#20304c] border border-[#f0f1f5] focus:border-orange transition focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                  />
                                </td>
                                <td className="whitespace-nowrap text-center py-2 pr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  {party.rate || 0}
                                </td>
                                <td className="whitespace-nowrap py-2 text-center pr-4 text-sm font-bold text-gray-900 dark:text-gray-300">
                                  {formatCurrency(party?.amount, "INR") || 0}
                                </td>
                                <td className="whitespace-nowrap w-32 pr-3 text-center pl-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  <input
                                    id="chno"
                                    name="chno"
                                    type="text"
                                    required
                                    onChange={(e) => {
                                      handleCedit(index, e);
                                    }}
                                    className="block text-[#6e6e6e] w-32 dark:text-gray-300 dark:bg-[#20304c] border border-[#f0f1f5] focus:border-orange transition focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            {/* Collection Summary */}
            <CollectionSummary
              TotalCollection={TotalCollection}
              CreditSum={credittSum.creditParty.TotalCreditPartyAmount}
              productSum={productSum.product.ProductSaleAmount}
              collection={collection}
              setCollection={setCollection}
            />
            {/* Save Button */}
            <div className="w-full mt-12 flex gap-4">
              <button
                type="submit"
                className="rounded outline-none shadow-sm bg-green-700 hover:bg-green-800 trnasition duration-200  ease-in text-white px-6 py-2"
              >
                Save
              </button>
              <button
                type="button"
                className="outline-none trnasition duration-200 hover:text-red-600 ease-in"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

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
export default Collection;
