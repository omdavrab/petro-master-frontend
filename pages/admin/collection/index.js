import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { useRouter } from "next/router";
import { GetShift } from "@/redux/action/shift";
import { GetMachine } from "@/redux/action/machine";
import { GetRate } from "@/redux/action/rate";
import { GetEmployee } from "@/redux/action/employee";
import { GetReport, HandleCreateReport } from "@/redux/action/dailyReport";
import { toast } from "react-toastify";
import { GetTank } from "@/redux/action/tank";
import { formatCurrency } from "@/utils/formatCurrency";

const Collection = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const EmployeeList = useSelector(
    (state) => state?.Employee?.employeelist.data
  );
  const RateList = useSelector((state) => state?.Rate?.ratelist?.data);
  const MachineList = useSelector((state) => state?.Machine?.machinelist.data);
  const ShiftList = useSelector((state) => state?.Shift?.shiftlist.data);
  const Report = useSelector((state) => state?.Report?.reportlist.data);
  const TankList = useSelector((state) => state?.Tank?.tanklist.data);

  const [selectedMachines, setSelectedMachines] = useState([]);
  const [inputFields, setInputFields] = useState([{}]);
  const [input, setInput] = useState({});
  const idRef = useRef([]);

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
        const tank = TankList.find(
          (T) => T._id.toString() === item.tankId.toString()
        );
        if (tank) {
          let Rate;
          if (tank.type === "MS") {
            Rate = RateList[0].msRate;
          } else {
            Rate = RateList[0].hsdRate;
          }
          return {
            machineId: machine._id,
            machineName: machine.name,
            machineType: machine.type,
            tankType: tank.type,
            rate: Rate,
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
                    item.testing = 1;
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
    dispatch(GetShift(1));
    dispatch(GetMachine(1));
    dispatch(GetRate(1));
    dispatch(GetEmployee(1));
    dispatch(GetTank(1));
  }, []);

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = (index, evnt, data) => {
    const { name, value } = evnt.target;
    const list = [...selectedMachines];
    list[index][name] = value;
    list[index]["machineId"] = data.machineId;
    list[index]["nozzleId"] = data._id;
    const sumdata = CountSum(list[index]); 
    list[index]['totalSale'] = sumdata.totalSale
    list[index]['amount'] = sumdata.amount
    setSelectedMachines(list);
  };

  const CountSum = (data) => {
    let totalSale = 0;
    let amount = 0;
    let testing = 0;
    totalSale = parseInt(data.closing) - parseInt(data.opening);
    totalSale = totalSale - parseInt(data.testing) 
    amount = parseFloat(data.rate) * totalSale;
    return { totalSale, amount };
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(OpenLoader(true));
    const [employeeId, employeeName] = input.employeeId.split(",");
    const [shiftId, shiftName] = input.shiftId.split(",");

    const data = {
      date: input.date,
      shiftId: shiftId,
      employeeId: employeeId,
      machine: selectedMachines,
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

  return (
    <div className="px-6 sm:px-10">
      <h4 className="text-[24px] dark:text-white font-medium text-gray-900">
        Employee Collection
      </h4>
      <div className="bg-white dark:bg-[#0c1a32] inline-block min-w-full mt-8 rounded-md shadow-sm align-middle p-4 sm:p-6 lg:p-8">
        <div>
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
                        // setCategoryId(e.target.value);
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
                                  required
                                  className="block w-20 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] border border-[#f0f1f5] focus:border-orange transition focus:outline-none focus:ring-0 shadow-none rounded-md bg-white"
                                  value={nozzle?.testing || ""}
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
                                {formatCurrency(nozzle?.totalSale, 'INR')}
                              </td>
                              <td className="whitespace-nowrap text-center py-1.5 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-300 sm:pl-3">
                                {nozzle?.rate}
                              </td>
                              <td className="whitespace-nowrap text-center py-1.5 pl-4 pr-3 text-sm font-bold text-gray-900 dark:text-gray-300 sm:pl-3">
                                {formatCurrency(nozzle?.amount, 'INR')}
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
              <label className="block leading-6 text-lg font-bold text-gray-900">
                Inventory Product Sale Details
              </label>
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
                      <tr className={"bg-gray-50  dark:bg-[#20304c]"}>
                        <td className="whitespace-nowrap text-left pl-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Demo
                        </td>
                        <td className="whitespace-nowrap w-full flex justify-end text-right py-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          <input
                            id="date"
                            name="date"
                            type="number"
                            required
                            className="block text-[#6e6e6e] w-20 dark:text-gray-300 dark:bg-[#20304c] border border-[#f0f1f5] focus:border-orange transition focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
                          />
                        </td>
                        <td className="whitespace-nowrap text-right py-2 pr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                          34
                        </td>
                        <td className="whitespace-nowrap text-right py-2 pr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                          3423
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Credit Sale */}
            <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
              <label className="block leading-6 text-lg font-bold text-gray-900">
                Credit Sale
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
                    <tbody className="dark:bg-[#0c1a32] bg-white"></tbody>
                  </table>
                </div>
              </div>
            </div>
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
