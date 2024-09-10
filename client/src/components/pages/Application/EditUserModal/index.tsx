import React, { SetStateAction, useState } from "react";
import Button from "../../../button";
import LoaderSpinner from "../../../LoaderSpinner";
import { API_ENDPOINTS } from "../../../../constant/api-endpoints";
import { editUserForm, userType } from "../../../../utils/Types";
import { fetchRequest } from "../../../../utils/axios/fetch";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { editUserSchema } from "../../../../utils/FormSchema";
import Input from "../../../input";

interface propTypes {
  item: userType;
  refetch: () => void;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}

const EditUserModal = ({ item, refetch, setShowModal }: propTypes) => {
  const [editLoading, setEditLoading] = useState(false);
  const {
    register,
    handleSubmit: fromSubmit,
    formState: { errors },
    setError,
  } = useForm<editUserForm>({ resolver: editUserSchema });

  const handleSubmit = (body: editUserForm) => {
    setEditLoading(true);
    fetchRequest({
      url: `${API_ENDPOINTS.USER}/${item?._id}`,
      type: "patch",
      body,
    })
      .then(() => {
        refetch();
        toast.success("User Updated Successfully");
        setShowModal(false);
      })
      .catch((err) => {
        setError("name", {
          type: "custom",
          message: err.response.data.message,
        });
        setError("email", {
          type: "custom",
          message: err.response.data.message,
        });
        setShowModal(false);
      })
      .finally(() => setEditLoading(false));
  };

  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed top-0 left-0 bg-black/20 grid place-items-center h-screen w-screen z-[999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-4/12 mx-auto bg-white rounded-md p-5 flex flex-col gap-5"
      >
        <h1 className="text-2xl">Edit Users</h1>
        <form
          onSubmit={fromSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
            className={errors.name?.message ? "" : "my-0"}
            autoComplete="name"
            error={errors.name?.message}
            defaultValue={item?.name}
          />
          <Input
            {...register("email", { required: true })}
            type="text"
            placeholder="Email"
            className={errors.email?.message ? "" : "my-0"}
            autoComplete="email"
            error={errors.email?.message}
            defaultValue={item?.email}
          />
          {editLoading ? (
            <div className="flex justify-center w-full">
              <LoaderSpinner color="text-mainColor" />
            </div>
          ) : (
            <Button type="submit" text="submit" />
          )}
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
