import { useState } from "react";

const EventRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lasstName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [trainingDate, setTraining] = useState("");

  return (
    <section className="event-reg-bg flex items-center">
      <div className="flex container mx-auto">
        <div className="w-3/5"></div>
        <div className="w-2/5">
          <h1 className="text-3xl font-semibold">
            Start your business registration today
          </h1>
          <p className="mt-6">
            Create your account and start keeping track of your business
          </p>
          <form className="mt-10">
            <div className="flex -tems-center">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block">
                  First Name
                </label>
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block">
                  Last Name
                </label>
              </div>
            </div>
            <div className="flex tems-center mt-4">
              <div className="w-1/2">
                <div className="mr-5">
                  <label htmlFor="firstName" className="block mb-1">
                    Gender
                  </label>
                </div>
              </div>
              <div className="w-1/2">
                <label htmlFor="phone" className="block">
                  Phone
                </label>
              </div>
            </div>
            <div className="flex tems-center mt-4">
              <div className="w-1/2">
                <label htmlFor="email" className="block">
                  Email
                </label>
              </div>
              <div className="w-1/2">
                <label htmlFor="trainingDate" className="block">
                  Training Date
                </label>
              </div>
            </div>
            <div className="flex tems-center mt-4">
              <div className="w-1/2">
                <label htmlFor="birthDate" className="block">
                  Birth Date
                </label>
              </div>
              <div className="w-1/2">
                <label htmlFor="qualification" className="block">
                  Qualification
                </label>
              </div>
            </div>
            <div className="flex tems-center mt-4">
              <input type="radio" className="mr-3" id="terms" /> <label htmlFor="terms">I agree to the terms of use</label>
            </div>
            <div className="flex tems-center mt-4">
              <button type="submit" className="py-4 bg-blue-500 text-white px-16 rounded-md hover:bg-blue-600 transition duration-300">Register</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventRegistration;
