import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useToken from "../../../hooks/useToken";
import DisplayLoading from "../../Shared/DisplayLoading/DisplayLoading";


export default function Register() {
  
  const [userEmail, setUserEmail] = useState('')
  const [token] = useToken(userEmail)
  const navigate = useNavigate()
  
  if(token){
    navigate('/');
  }
  
  const {
    signInUsingGoogle,
    loading,
    registerUserUsingEmailPassword,
    setUser,
    setError,
    error,
    handleUpdateProfile,
  } = useContext(AuthContext);

  
   
  
 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <DisplayLoading></DisplayLoading>;
  }

  const handleRegister = (data) => {
    const { firstName, lastName } = data;
    const fullName = firstName + " " + lastName;
    console.log(fullName);

    registerUserUsingEmailPassword(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        handleUpdateProfile(fullName)
          .then(() => {
            toast.success("Congratulations! your registration is complete.");
            saveUser(fullName, user.email)
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });

    reset();
  };

  const logInUsingGoogle = () => {
    signInUsingGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        saveUser(user.displayName, user.email)
        
      })
      .catch((error) => {
        setError(error.message);
      });
  };


  const saveUser = (name, email) => {
    const user = {name, email}
    fetch(`https://the-look-server.vercel.app/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      
      setUserEmail(email)
      
    })
  }


 

  
 

  return (
    <div className="h-[900px] flex justify-center items-center">
      <div className="w-96 border border-2 border-secondary mx-auto p-10 rounded-lg">
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              {...register("firstName", { required: "First Name is required" })}
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full border-secondary"
            />
            <label className="label">
              {errors.firstName && (
                <span className="text-red-500">
                  {errors?.firstName?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              {...register("lastName", { required: "Last Name is required" })}
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full border-secondary"
            />
            <label className="label">
              {errors.lastName && (
                <span className="text-red-500">
                  {errors?.lastName?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full border-secondary"
            />
            <label className="label">
              {errors.email && (
                <span className="text-red-500">{errors?.email?.message}</span>
              )}
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be six character or longer",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                  message:
                    "Password must be contain at least a upper case letter, a lower case letter, a number, and a special character.",
                },
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full border-secondary"
            />
            <label className="label">
              {errors.password && (
                <span className="text-red-500">
                  {errors?.password?.message}
                </span>
              )}
            </label>
          </div>

          {error && <span className="text-red-500">{error}</span>}

          <input
            type="submit"
            value="Create an account"
            className="btn btn-secondary w-full"
          />
        </form>
        <div className="text-center">
          <p className="mt-2">
            Already have an account?{" "}
            <span className="text-secondary">
              <Link to="/login">Please Login</Link>{" "}
            </span>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={logInUsingGoogle}
            className="btn btn-secondary w-full"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
