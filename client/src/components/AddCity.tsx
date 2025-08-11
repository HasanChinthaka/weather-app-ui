const AddCity = () => {
    return (
        <div className="flex justify-center mt-14">
            <form action="" >
                <div className="flex bg-[#1f2128] rounded-md h-12 w-[280px] md:w-lg justify-between">
                    <input
                        type="text"
                        placeholder="Enter a city"
                        className="bg-[#1f2128] placeholder-[#55565b] text-lg ps-4 py-1 rounded-md md:w-md focus:outline-none focus:ring-2 focus:ring-blue-500
"
                    />
                    <button
                        type="submit"
                        className="flex justify-center items-center bg-[#6c5dd3] hover:bg-[#5448a3] hover:cursor-pointer text-white rounded-md md:w-32 md:text-lg text-base"
                    >
                        Add City
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCity