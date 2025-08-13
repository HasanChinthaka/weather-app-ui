import Title from '../components/Title'
import LoginForm from '../components/LoginForm';

const Login = () => {

    return (
        <div>
            <div
                className="flex flex-col pt-8 h-128 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/src/assets/bg-2.png')" }}
            >
                <Title />
            </div>
            <div className="-mt-96 flex justify-center">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login