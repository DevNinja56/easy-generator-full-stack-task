import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserAuth } from "../../hooks/auth-hook";
import { signInForm } from "../../utils/Types";
import { signInFormSchema } from "../../utils/FormSchema";
import { useForm } from "react-hook-form";
import { API_ENDPOINTS } from "../../constant/api-endpoints";
import { fetchRequest } from "../../utils/axios/fetch";
import { ROUTES } from "../../routes/constants.route";
import Input from "../../components/input";
import Button from "../../components/button";

const SignIn = () => {
  const { updateUserDetails, loggedInUser } = useUserAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit: fromSubmit,
    formState: { errors },
    setError,
  } = useForm<signInForm>({ resolver: signInFormSchema });

  const handleSubmit = (body: signInForm) => {
    setIsLoading(true);
    fetchRequest({
      url: API_ENDPOINTS.AUTH.SIGNIN,
      type: "post",
      body,
    })
      .then((res) => {
        updateUserDetails(res?.data?.user);
        loggedInUser({
          access: res?.data?.accessToken,
        });
        navigate(ROUTES.APPLICATION);
        toast.success("User Logged In Success");
      })
      .catch((err) => {
        setError("password", {
          type: "custom",
          message: err?.response?.data?.message,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex min-h-full flex-col justify-center items-center py-12 md:px-8 bg-grayBg w-full h-screen">
      <div className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12 bg-white py-5 px-3 sm:px-10 grid place-items-center rounded-md">
        <h2 className="text-center text-3xl mb-10 font-light ">Log in</h2>
        <form className="space-y-10 w-full" onSubmit={fromSubmit(handleSubmit)}>
          <div>
            <Input
              {...register("email", { required: true })}
              type="text"
              placeholder="Email"
              className={errors.email?.message ? "" : "mt-4 mb-5"}
              autoComplete="email"
              error={errors.email?.message}
            />
            <Input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className=""
              autoComplete="password"
              error={errors.password?.message}
            />
          </div>
          <div className="w-full">
            <Button
              type="submit"
              text="Log in"
              className="w-4/5"
              disabled={isLoading}
            />
            <p className="text-sm text-center mt-5 text-[#87A1C8] ">
              Don't have an account?{" "}
              <Link
                to={ROUTES.SIGN_UP}
                className="text-mainColor font-medium  "
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
