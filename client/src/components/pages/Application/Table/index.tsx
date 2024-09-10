import React, { useEffect, useState } from "react";
import { useGetPaginatedUsersQuery } from "../../../../store/slices/fetch-all-queries.slice";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import Pagination from "../Pagination";
import { fetchRequest } from "../../../../utils/axios/fetch";
import { API_ENDPOINTS } from "../../../../constant/api-endpoints";
import toast from "react-hot-toast";
import LoaderSpinner from "../../../LoaderSpinner";
import EditUserModal from "../EditUserModal";
import { useUserAuth } from "../../../../hooks/auth-hook";

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const Table = () => {
  const [page, setPage] = useState(1);
  const { data, refetch } = useGetPaginatedUsersQuery({
    page: page,
    limit: 10,
  });
  const [deleteUserLoading, setDeleteUserLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUserAuth();

  useEffect(() => {
    refetch();
  }, []);

  const deleteUser = async (id: string, refetch: () => void) => {
    setDeleteUserLoading(true);
    try {
      const response = await fetchRequest({
        url: `${API_ENDPOINTS.USER}/${id}`,
        type: "delete",
      });

      if (response && response.status === 200) {
        toast.success(response?.message);
        refetch();
      } else {
        toast.error(response?.message || "Failed to delete user.");
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as ErrorResponse)?.response?.data?.message ||
        (error as ErrorResponse)?.message ||
        "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setDeleteUserLoading(false);
    }
  };

  return (
    <div className="relative overflow-x-auto w-full md:w-9/12 mx-auto rounded-t-lg bg-white flex items-end flex-col pb-2">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-t-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-mainColor dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item) => (
            <tr
              key={"user-date--" + item?._id}
              className="bg-white border-b dark:bg-white dark:border-mainColor text-black"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                {item?.name}
              </th>
              <td className="px-6 py-4">{item?.email}</td>
              <td className="px-6 py-4 flex items-center gap-2">
                <FaPencilAlt
                  onClick={() => setShowModal(!showModal)}
                  className="text-mainColor cursor-pointer text-lg"
                />
                {showModal && (
                  <EditUserModal
                    item={item}
                    refetch={refetch}
                    setShowModal={setShowModal}
                  />
                )}
                {deleteUserLoading ? (
                  <LoaderSpinner color="text-mainColor" />
                ) : (
                  user._id !== item._id && (
                    <MdDelete
                      onClick={() => deleteUser(item?._id, refetch)}
                      className="text-red-500 cursor-pointer text-2xl"
                    />
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination data={data} page={page} setPage={setPage} />
    </div>
  );
};

export default Table;
