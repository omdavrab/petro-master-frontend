import React from "react";

export default function Machine({ handleCheckboxChange, MachineList }) {
  return (
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
  );
}
