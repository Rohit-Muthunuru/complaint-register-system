import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const onEmailChange = (e) => {
    setemail(e.target.value)
  }
  const onPasswordChange = (e) => {
    setpassword(e.target.value)
  }
  const login = (e) => {

    e.preventDefault();
    const data = {
        email, password
    }
    axios.post("http://localhost:8000/auth/login", data).then(function (data) {
        if (data.data.success === true) {
            console.log(data)
            const { token, role,userId,name } = data.data;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("userId", userId);
            localStorage.setItem("name",name)
            
            localStorage.setItem("authData", JSON.stringify({ token: data.data.token, role: data.data.role,userId:data.data.userId, name:data.data.name}))
      
            if (role === "admin") {
              navigate("/admin");
            } else {
              navigate("/user");
            }
            console.log("userId:",userId)
        }

    }).catch(function (err) {
        console.log(err)
    })


  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: "#05152b" }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Login</h1>
          <form onSubmit={login}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={onEmailChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={onPasswordChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
            <div className="text-center mt-3">
              <p>
                Don't have an account? Sign up <Link to="/signup">Here</Link>
              </p>
              <p>Or</p>
              <p>Go to <Link to="/">Dashboard</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login