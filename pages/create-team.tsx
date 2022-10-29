const CreateTeam = () => {
  return (
    <section className="flex justify-center items-center h-screen bg-[#F7F7F7]">
      <div className="w-2/5 shadow-md p-5 bg-white rounded-md border">
        <h1 className="text-2xl font-semibold">Create Team</h1>

        <form className="mt-10">
            <div className="flex items-center">
              <div className="w-1/2">
                <label htmlFor="teamName" className="block">
                  Team Name
                </label>
              </div>
              <div className="w-1/2">
                <label htmlFor="members" className="block">
                  Members
                </label>
              </div>
            </div>
            
            <div className="flex tems-center mt-4">
              <div className="w-1/2">
                <div className="mr-5">
                  <label htmlFor="description" className="block mb-1">
                    Description
                  </label>
                </div>
              </div>
            </div>
            <div className="flex tems-center justify-end mt-4">
              <button type="submit" className="py-3 bg-blue-500 text-white px-16 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
            </div>
          </form>

      </div>
    </section>
  )
}

export default CreateTeam