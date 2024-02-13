import { formatCurrency } from "@/utils/formatCurrency";
import React, { useEffect, useState } from "react";
import Coine from "./Coine";
import PaymentList from "./PaymentList";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { GetUpi } from "@/redux/action/upi";
import { useDispatch, useSelector } from "react-redux";

export default function CollectionSummary({
  CreditSum,
  productSum,
  TotalCollection,
  setCollection,
  collection,
}) {
  const dispatch = useDispatch()
  const UpiList = useSelector((state) => state?.Upi?.upilist?.data);
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [upiList, setUpiList] = useState()
  
  useEffect(() => {
    dispatch(GetUpi('all'));
  }, []);

  useEffect(() => {
    setUpiList(UpiList);
  }, [UpiList]);

  useEffect(() => {
    const TotalDifferent =
      TotalCollection - collection.totalCash - collection.online - CreditSum;
    setCollection({
      ...collection,
      TotalCollection,
      productSum,
      CreditSum,
      TotalDifferent,
    });
  }, [
    TotalCollection,
    productSum,
    CreditSum,
    collection.totalCash,
    collection.online,
  ]);

  return (
    <div>
      <Coine
        open={open}
        setOpen={setOpen}
        collection={collection}
        setCollection={setCollection}
      />
      <PaymentList
        open={openPayment}
        setOpen={setOpenPayment}
        collection={collection}
        setCollection={setCollection}
        upiList={upiList}
      />
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
            <div onClick={() => setOpen(true)}>
              <label
                className="dark:text-white/[60%] text-black/[60%]"
                htmlFor="totalCollection"
              >
                Cash
              </label>
              <h2 className="dark:text-white text-black/[85%] font-bold text-[21px]">
                {formatCurrency(collection.totalCash) || 0}
              </h2>
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
            <div onClick={()=>setOpenPayment(true)}>
              <label
                className="dark:text-white/[60%] text-black/[60%]"
                htmlFor="onlinepayment"
              >
                Online Payment
              </label>
              <h2 className="dark:text-white text-black/[85%] font-bold text-[21px]">
                {formatCurrency(collection.online) || 0}
              </h2>
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
