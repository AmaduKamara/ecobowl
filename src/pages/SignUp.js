import React from "react";

const SignUp = () => {
  return (
    <section className="login-signup flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-3/5"></div>
        <div className="w-2/5">
          <h1 className="text-3xl font-semibold text-gray-800">
            Start Entrepreneurship <br /> Today{" "}
          </h1>
          <p className="mt-8">
            Create your account and start keepting track of your business
            operations
          </p>
          <form className="mt-12">
            <div className="flex">
              <div className="w-1/2 mr-5">
                <label for="firstName" className="block">
                  First Name
                </label>
                <input
                  type=""
                  name="firstName"
                  id="firstName"
                  value=""
                  className="p-3 w-full border mt-1 border-gray-300 rounded-md bg-transparent focus:outline-blue-500 font-semibold"
                />
              </div>
              <div className="w-1/2">
                <label for="lastName" className="block">
                  Last Name
                </label>
                <input
                  type=""
                  name="lastName"
                  id="lastName"
                  value=""
                  className="p-3 w-full outline mt-1 border-gray-300 rounded-md bg-transparent focus:outline-blue-500 font-semibold"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
