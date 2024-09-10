import React, { SetStateAction } from "react";
import {
  GetPaginatedResponseInterface,
  userType,
} from "../../../../utils/Types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface propTypes {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  data?: GetPaginatedResponseInterface<userType[]>;
}

const Pagination = ({ setPage, page, data }: propTypes) => {
  return (
    <div className="flex gap-2 items-center mt-4 pr-5">
      <button
        onClick={() => {
          if (page > 1) {
            setPage((prevPage) => prevPage - 1);
          }
        }}
        disabled={page === 1}
      >
        <MdKeyboardArrowLeft className="text-gray-400 text-xl" />
      </button>
      <button
        onClick={() => {
          if (data?.nextPage) {
            setPage((prevPage) => prevPage + 1);
          }
        }}
        disabled={!data?.nextPage}
      >
        <MdKeyboardArrowRight className="text-gray-400 text-xl" />
      </button>
    </div>
  );
};

export default Pagination;
