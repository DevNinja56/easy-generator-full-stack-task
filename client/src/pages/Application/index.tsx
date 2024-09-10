import React from "react";
import Table from "../../components/pages/Application/Table";

const Application = () => {
  return (
    <div className="flex flex-col gap-8 items-center pb-10 mx-auto px-2 text-2xl md:text-3xl text-center w-full">
      Welcome to the application
      <Table />
    </div>
  );
};

export default Application;
