import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <HashLoader color="blue" size={120}/>
    </div>
  );
};

export default Loading;
