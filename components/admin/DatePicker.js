import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
const DatePicker = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null 
    });
    console.log("🚀 ~ file: DatePicker.js:8 ~ DatePicker ~ value:", value)

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
    return (
        <div>
            <Datepicker
            primaryColor="amber"
            popoverDirection="up" 
            useRange={false}    
            displayFormat={"DD-MM-YYYY"} 
            inputClassName=" relative transition-all duration-300 py-1.5 pl-4 pr-14 w-full tracking-wide placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed text-[14px] text-[#6e6e6e] rounded-md border border-[#f0f1f5] focus:border-orange transition duration-300 focus:outline-none focus:ring-0 shadow-none rounded-md bg-white dark:text-gray-300 dark:bg-[#20304c]"
                value={value}
                onChange={handleValueChange}
            />
        </div>
    )
}

export default DatePicker
