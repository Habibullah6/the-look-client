import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const {
    user,
    setUser,
    setError,
    error,
    loginUserUsingEmailPassword,
    signInUsingGoogle,
  } = useContext(AuthContext);

  const [userEmail, setUserEmail] = useState("");
  const [token] = useToken(userEmail);


  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  
  if(token){
    navigate(from, { replace: true })
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    loginUserUsingEmailPassword(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setUserEmail(user.email)
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const logInUsingGoogle = () => {
    signInUsingGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        saveUser(user.displayName, user.email);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch(`https://the-look-server.vercel.app/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserEmail(email);
          
        }
      });
  };

  return (
    <div className="h-[600px] flex justify-center items-center">
      <div className="w-96 border border-2 border-secondary mx-auto p-10 rounded-lg">
        <h1>Please Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
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
                  message: "Password should be six character or longer.",
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
            value="Login"
            className="btn btn-secondary w-full"
          />
        </form>
        <div className="text-center">
          <p className="mt-2">
            Are you new here?
            <span className="text-secondary">
              <Link to="/register"> Please Register</Link>
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
};

export default Login;
