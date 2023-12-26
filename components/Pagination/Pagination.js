import React from "react";
import { DOTS, usePagination } from "./usePagination";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { BsFillCaretRightFill, BsThreeDots } from "react-icons/bs";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <>
      <div className="flex justify-end items-center pt-5">
        <div className="flex items-center space-x-[19px]">
          <button
            disabled={currentPage === 1}
            onClick={onPrevious}
            className="w-6 h-6 hover:bg-orange rounded hover:text-white transition duration-300 bg-white text-gray-600 shadow-md h-6 flex items-center justify-center"
          >
            <HiChevronLeft />
          </button>

          {paginationRange?.map((pageNumber , index) => {
            if (pageNumber === DOTS) {
              return (
                <>
                  <button key={index} className=" relative border rounded overflow-hidden justify-center w-6 h-6 font-medium flex items-center shadow-md hover:text-orange transition duration-300 justify-center text-gray-600">
                    <BsThreeDots />
                    
                    <BsFillCaretRightFill  className="absolute -bottom-[4px] rotate-45 text-xs -right-[4px]" />
                    {/* <img
                      src="/assets/icons/select.svg"
                      className="absolute bottom-0 right-0"
                    /> */}
                  </button>
                </>
              );
            }

            return (
              <>
                <button
                  onClick={() => onPageChange(pageNumber)}
                  className={
                    pageNumber === currentPage
                      ? "w-6 h-6 font-medium flex rounded items-center shadow-md justify-center hover:text-gray-600 transition duration-300 text-white bg-orange rounded"
                      : "w-6 h-6 font-medium flex rounded items-center shadow-md hover:text-orange transition duration-300 justify-center text-gray-600"
                  }
                >
                  {pageNumber}
                </button>
              </>
            );
          })}

          <button
            disabled={currentPage === lastPage}
            onClick={onNext}
            className='w-6 font-medium h-6 hover:bg-orange rounded hover:text-white transition duration-300 bg-white text-gray-600 shadow-md h-6 flex items-center justify-center'>
            <HiChevronRight />

          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
