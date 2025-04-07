import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
function Signup() {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [role,setrole] = useState("")
    const [name,setname]= useState("")

    const onEmailChange = (e) => {
        setemail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setpassword(e.target.value)
    }
    const onRoleChange = (e)=>{
        setrole(e.target.value)
    }
    const onNameChange=(e)=>{
      setname(e.target.value)
    }
    const signup = (e) => {

        e.preventDefault();
        const data = {
            email,password,role,name 
        }
        axios.post("https://complaint-register-system-backend.onrender.com/auth/signup", data).then(function (data) {
            console.log("signup successfull")
            navigate("/login")

        }).catch(function (err) {
            console.log(err)
        })

    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: "#05152b" }}>
        <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Signup</h1>
            <form onSubmit={signup}>
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
              <div className="mb-3">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={onRoleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={onNameChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
              <div className="text-center mt-3">
                <p>
                  Already have an account? Login <Link to="/login">Here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}
export default Signup
