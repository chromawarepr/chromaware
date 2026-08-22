import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";


function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();



  async function login(e) {

    e.preventDefault();


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      navigate("/admin");


    } catch (error) {

      setError("Invalid email or password");

    }

  }



  return (

    <div className="login-page">

      <div className="login-card">

        <h1>
          Researcher Login
        </h1>


        <p>
          ChromAware Admin Dashboard
        </p>



        <form onSubmit={login}>


          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

          />



          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

          />



          <button type="submit">

            Login

          </button>


        </form>



        {error && (

          <p className="error">

            {error}

          </p>

        )}


      </div>

    </div>

  );

}


export default AdminLogin;