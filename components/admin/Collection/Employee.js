import React from "react";

export default function Employee({handleData, EmployeeList}) {
  return (
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
  );
}
