import { useState } from "react";

const EventRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lasstName, setLastName] = useState("");

  return (
    <section className="event-reg-bg flex items-center">
      <div className="flex container mx-auto">
        <div className="w-3/5"></div>
        <div className="w-2/5">
          <h1 className="text-3xl font-semibold">Start your business registration today</h1>
          <p className="mt-6">
            Create your account and start keeping track of your business
          </p>
          <form className="mt-10">
            <div className="flex -tems-center">
              <div>
                <label htmlFor="firstName" className="block">First Name</label>
                <input type="text" id="firstName" value={firstName} className="p-3 border border-gray-300 bg-transparent rounded-md mr-5 focus:outline-cyan-500" />
              </div>
              <div>
                <label htmlFor="lastName" className="block">Last Name</label>
                <input type="text" id="lastName" value={lasstName} className="p-3 border border-gray-300 bg-transparent rounded-md focus:outline-cyan-500" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventRegistration;
