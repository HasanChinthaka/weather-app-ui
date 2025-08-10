const AddCity = () => {
    return (
        <div className="flex justify-center mt-14">
            <form action="" >
                <div className="flex bg-[#1f2128] rounded-md h-12 w-lg justify-between">
                    <input
                        type="text"
                        placeholder="Enter a city"
                        className="bg-[#1f2128] placeholder-[#55565b] text-lg ps-4 py-1 rounded-md w-sm"
                    />
                    <button
                        type="submit"
                        className="flex justify-center items-center bg-[#6c5dd3] text-white rounded-md w-32 text-lg"
                    >
                        Add City
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCity