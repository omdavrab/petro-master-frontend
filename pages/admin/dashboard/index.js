import { GetDateReport } from "@/redux/action/dailyReport";
import { CloseLoader, OpenLoader } from "@/redux/action/loader";
import { HandleDateRate } from "@/redux/action/rate";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const DateWishReport = useSelector(
    (state) => state?.Report?.datewishreportlist
  );
  const [inputDate, setInputDate] = useState();
  const [report, setReport] = useState({});
  const [Rate, setRate] = useState({});

  useEffect(() => {
    dispatch(HandleDateRate(inputDate)).then((result) => {
      if (result.payload) {
        setRate(result?.payload?.data?.result);
      }
    });
  }, [inputDate]);

  useEffect(() => {
    setReport(DateWishReport);
  }, [DateWishReport]);
  const HandleSearch = async () => {
    try {
      dispatch(OpenLoader(true));
      await dispatch(GetDateReport(inputDate));
      dispatch(CloseLoader(false));
    } catch (err) {
      dispatch(CloseLoader(false));
      console.log("Error", err);
    }
  };

  return (
    <div>
      <h4 className="px-6 sm:px-10 text-[24px] dark:text-white font-medium text-gray-900">
        Search Daily Report
      </h4>
      <div className="flex item-center justify-center gap-3">
        <input
          id="date"
          name="date"
          type="date"
          required
          onChange={(e) => setInputDate(e.target.value)}
          className="block px-6 text-[#6e6e6e] dark:text-gray-300 dark:bg-[#20304c] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0  shadow-none rounded-md bg-white"
        />
        <button
          type="submit"
          disabled={!inputDate}
          className="rounded outline-none shadow-sm bg-green-700 hover:bg-green-800 trnasition duration-200  ease-in text-white px-6"
          onClick={HandleSearch}
        >
          Search
        </button>
      </div>
      <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full pt-2 align-middle sm:px-6 lg:px-8">
            {Object.keys(report) &&
              Object.keys(report)?.map((shiftName) => {
                return (
                  <div>
                    <div className="flex justify-between p-3">
                      <h3>Date: {inputDate}</h3>
                      <h3>Shift: {shiftName}</h3>
                      <h3>MS Rate : {Rate?.msRate}</h3>
                      <h3>HSD Rate: {Rate?.hsdRate}</h3>
                    </div>
                    <table className="min-w-full divide-y border dark:border-gray-600 border-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Nozzle
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Opening
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Test
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Closing
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            T Sale
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Rate
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Amount
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            PayTm
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            ICIC
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Cash
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Coine
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-sm font-semibold text-gray-900 border"
                          >
                            Credit
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Different
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                          >
                            Oil
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 dark:text-white text-right text-sm font-semibold text-gray-900 border"
                          >
                            Upda
                          </th>
                        </tr>
                      </thead>
                      <tbody className="dark:bg-[#0c1a32] bg-white">
                        {report[shiftName].map((row, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle1.nozzle}
                              </td>
                              <td
                                className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border"
                                rowSpan={2}
                              >
                                {row.employee.name}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle1.opening}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle1.testing}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle1.closing}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle1.totalSale}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle1.rate}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle1.amount}
                              </td>
                              <td
                                rowSpan={2}
                                className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border"
                              >
                                {row.totalOnlinePayment}
                              </td>
                              <td
                                rowSpan={2}
                                className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                              >
                                {row.icic}
                              </td>
                              <td
                                rowSpan={2}
                                className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                              >
                                {row.totalcash}
                              </td>
                              <td
                                rowSpan={2}
                                className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                              >
                                {row.coine}
                              </td>
                              <td
                                rowSpan={2}
                                className="px-3 py-3.5 dark:text-white text-sm font-semibold text-gray-900 border"
                              >
                                {row.totalCreditSale}
                              </td>
                              <td
                                rowSpan={2}
                                className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                              >
                                {row.totalDifferent}
                              </td>
                              <td
                                rowSpan={2}
                                className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900 border"
                              >
                                {row.totalProductSale}
                              </td>
                              <td
                                rowSpan={2}
                                className="px-3 py-3.5 dark:text-white text-right text-sm font-semibold text-gray-900 border"
                              >
                                {row.upda}
                              </td>
                            </tr>
                            <tr>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle2.nozzle}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle2.opening}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle2.testing}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle2.closing}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle2.totalSale}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle2.rate}
                              </td>
                              <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 dark:text-gray-300 border">
                                {row.nozzle2.amount}
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
          </div>
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

export default Dashboard;
