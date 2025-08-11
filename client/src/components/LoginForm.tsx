import { useNavigate } from "react-router-dom";
import Loading from "./LOading";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";


const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );
      const result = await response.json()
      if (result.success) {
        localStorage.setItem("token", result.token);
        navigate('/weather')
        toast.success("Login Successfull")
        reset();
      } else {
        console.error(result?.message)
        toast.error(result?.message)
        return
      }

    }
    catch {
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <>
      {loading ?
        <Loading />
        :
        <div className="w-xl p-2 md:p-0">
          <div
            className="bg-[#1c60aa] p-8 rounded-lg shadow-md shadow-gray-400 text-white  mx-auto bg-cover bg-no-repeat"
          >
            <div className="flex justify-center text-4xl font-semibold">
              <h2 className="text-shadow-lg text-shadow-gray-600">Login</h2>
            </div>
            <div className="flex justify-center items-center mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {
                  ...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })
                  }
                  type="text"
                  placeholder="Email"
                  className={`rounded-lg p-2 w-sm ${errors.email ? 'border-2 border-red-500 shadow-sm shadow-red-500 focus:ring-0 focus:outline-none' : "border-2 focus:outline-0 focus:ring-0 my-6"}`} />
                {typeof errors.email?.message === 'string' && (
                  <p className="text-red-400 text-sm my-1">{errors.email.message}</p>
                )}
                <div className={`flex justify-between items-center rounded-lg w-sm  ${errors.password ? 'border-2 border-red-500 shadow-sm shadow-red-500 focus:ring-0 focus:outline-none' : "border-2"}`}>
                  <input
                    {
                    ...register('password', {
                      required: "Password is required",
                    })
                    }
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="p-2 rounded-lg w-full focus:outline-0 focus:ring-0 focus:border-none"
                  />
                  {
                    showPassword ?
                      <LuEye className='text-2xl mr-2' onClick={() => setShowPassword(false)} /> : <LuEyeClosed className='text-2xl mr-2' onClick={() => setShowPassword(true)} />
                  }
                </div>
                {typeof errors.password?.message === 'string' && (
                  <p className="text-red-400 text-sm my-1">{errors.password.message}</p>
                )}
                <div className="flex justify-center">
                  <button
                    className="bg-blue-600 rounded-full p-2 mt-8 text-xl w-80 hover:bg-blue-400 hover:shadow-lg hover:shadow-indigo-800 hover:cursor-pointer hover:font-semibold">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default LoginForm;
