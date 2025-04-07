import axios from 'axios'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


function EditCmplnt() {
    const [cmplntData, setCmplntData] = useState({ title: "", content: "", author: "", image: "" ,category:""})
    const params = useParams()
    const navigate = useNavigate()
    console.log(params)
    useEffect(() => {
        axios.get(`https://complaint-register-system-backend.onrender.com/complaints/cmplntById/${params.id}`).then(function (res) {
            console.log(res)
            setCmplntData((prev) => {
                return {
                    ...prev,
                    title: res.data.title,
                    content: res.data.content,
                    author: res.data.author,
                    category: res.data.category,
                    image: res.data.image
                }
            })
        }).catch(function (err) {
            console.log(err)
        })
    }, [])
    const onFeildChange = (e) => {
        setCmplntData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    const saveEditedCmplnt = (e) => {
        axios.put(`https://complaint-register-system-backend.onrender.com/complaints/edit/${params.id}`, cmplntData).then(function (data) {
            console.log("cmplnt updated successfully")
            navigate("/user/complaintlist")
        }).catch(function (err) {
            console.log(err)
        })
    }
    return (
        <div className="container py-5" style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="row">
              {/* Left Side - Card */}
              <div className="col-md-6 mb-4">
                <div
                  className="card h-100 rounded shadow"
                  style={{ backgroundColor: "#004d40", color: "#fff", borderRadius: "15px" }}
                >
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <h1 className="text-center">Complaint Edit Form</h1>
                  </div>
                </div>
              </div>
      
              {/* Right Side - Card */}
              <div className="col-md-6 mb-4">
                <div
                  className="card h-100 p-4 shadow"
                  style={{ borderRadius: "15px", backgroundColor: "#ffffff" }}
                >
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      name="title"
                      value={cmplntData.title}
                      onChange={(e) => onFeildChange(e)}
                    />
                  </div>
      
                  <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      rows="7"
                      value={cmplntData.content}
                      name="content"
                      onChange={(e) => onFeildChange(e)}
                    ></textarea>
                  </div>
      
                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <textarea
                      className="form-control"
                      rows="1"
                      value={cmplntData.author}
                      name="author"
                      onChange={(e) => onFeildChange(e)}
                    ></textarea>
                  </div>
      
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <textarea
                      className="form-control"
                      rows="1"
                      value={cmplntData.category}
                      name="category"
                      onChange={(e) => onFeildChange(e)}
                    ></textarea>
                  </div>
      
                  <button
                    type="submit"
                    className="btn btn-success w-100 mb-3"
                    onClick={(e) => saveEditedCmplnt(e)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    )
}
export default EditCmplnt
