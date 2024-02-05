import { formatCurrency } from "@/utils/formatCurrency";
import React, { useEffect } from "react";

export default function CollectionSummary({
  CreditSum,
  productSum,
  TotalCollection,
  setCollection,
  collection,
}) {
  useEffect(() => {
    const TotalDifferent = TotalCollection - collection.cash - collection.online - CreditSum
    setCollection({ ...collection, TotalCollection, productSum, CreditSum , TotalDifferent});
  }, [TotalCollection, productSum, CreditSum , collection.cash, collection.online]);
  return (
    <div>
      <div className="mt-8 bg-white dark:bg-[#0c1a32] rounded-md shadow-sm flow-root">
        <div className="flex gap-3">
          <label className="block leading-6 text-lg font-bold text-gray-900">
            Collection Summary
          </label>
        </div>
        <div className="grid mt-6 md:grid-cols-2 xl:grid-cols-6  gap-2">
          <div className="bg-white dark:bg-[#0c1a32] shadow-lg rounded-md p-5">
            <div>
              <span className="dark:text-white/[60%] text-black/[60%]">
                Total Collection
              </span>
              <h2 className="dark:text-white text-green-600 font-bold text-[21px]">
                {formatCurrency(TotalCollection) || 0}
              </h2>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0c1a32] shadow-lg rounded-md p-5">
            <div>
              <label
                className="dark:text-white/[60%] text-black/[60%]"
                htmlFor="totalCollection"
              >
                Cash
              </label>
              <input
                type="number"
                id="totalCollection"
                style={{ boxShadow: "none" }}
                className="dark:text-white p-0 py-2 text-black/[85%] font-bold text-[21px] border-none outline-none focus:outline-none w-full"
                onChange={(e) =>
                  setCollection({ ...collection, cash: e.target.value })
                }
              />
            </div>
          </div>
          <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-lg rounded-md p-5">
            <div>
              <span className="dark:text-white/[60%] text-black/[60%]">
                Credit Sale
              </span>
              <h2 className="dark:text-white text-black/[85%] font-bold text-[21px]">
                {formatCurrency(CreditSum) || 0}
              </h2>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0c1a32] shadow-lg rounded-md p-5">
            <div>
              <label
                className="dark:text-white/[60%] text-black/[60%]"
                htmlFor="onlinepayment"
              >
                Online Payment
              </label>
              <input
                type="number"
                id="onlinepayment"
                style={{ boxShadow: "none" }}
                className="dark:text-white p-0 py-2 text-black/[85%] font-bold text-[21px] border-none outline-none focus:outline-none w-full"
                onChange={(e) =>
                  setCollection({ ...collection, online: e.target.value })
                }
              />
            </div>
          </div>
          <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-lg rounded-md p-5">
            <div>
              <span className="dark:text-white/[60%] text-black/[60%]">
                Product Sale
              </span>
              <h2 className="dark:text-white text-black/[85%] font-bold text-[21px]">
                {formatCurrency(productSum) || 0}
              </h2>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0c1a32] flex gap-5 items-start shadow-lg rounded-md p-5">
            <div>
              <span className="dark:text-white/[60%] text-black/[60%]">
                Gap of Amount
              </span>
              <h2 className="dark:text-white text-red-500 font-bold text-[21px]">
                {formatCurrency(collection.TotalDifferent) || 0}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
