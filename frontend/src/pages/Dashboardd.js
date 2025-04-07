import axios from 'axios'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


function Dashboardd() {

  const [cmplntData, setcmplntData] = useState({ title: "", content: "", author: "", image: "", category: "" })
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://complaint-register-system-backend.onrender.com/complaints/categories'); // Update the API URL as needed
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    const userId = localStorage.getItem("userId"); // Or use a different storage mechanism
    if (userId) {
      setcmplntData((prev) => ({
        ...prev,
        userId: userId, // Assuming the token contains `userID`
      }));
    }
  }

  const onFeildChange = (e) => {
    setcmplntData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const goToCmplntList = (e) => {
    navigate("/complaintlist")
  }

  const saveCmplnt = (e) => {
    axios.post("https://complaint-register-system-backend.onrender.com/complaints/create", cmplntData).then(function (data) {
      console.log("cmplnt created successfully")
      navigate("/user/complaintlist")
    }).catch(function (err) {
      console.log(err)
    })
  }
  const onFileChange = (e) => {
    console.log(e)
    const formData = new FormData()
    formData.append("cmplntimage", e.target.files[0])
    axios.post("https://complaint-register-system-backend.onrender.com/complaints/imageupload", formData).then(function (data) {
      console.log("image uploaded successfully")
      setcmplntData((prev) => {
        return {
          ...prev,
          image: data.data.image
        }
      })

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
                  <h1 className="text-center">Complaint Register Form</h1>
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
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="7"
                    value={cmplntData.content}
                    name="content"
                    onChange={(e) => onFeildChange(e)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
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
                  <select
                    className="form-select"
                    name="category"
                    value={cmplntData.category}
                    onChange={(e) => onFeildChange(e)} // This updates `cmplntData.category`
                  >
                    <option value="">Select a category</option>  {/* Ensure the default value is set */}
                    <option value="all">All</option>
                    <option value="cybercrime">Cybercrime</option>
                    <option value="fraud">Fraud</option>
                    <option value="theft">Theft</option>
                    {Array.isArray(categories) && categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    className="form-control"
                    type="file"
                    name="category"
                    onChange={(e) => onFileChange(e)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mb-3"
                  onClick={(e) => saveCmplnt(e)}
                >
                  Create
                </button>

                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={(e) => goToCmplntList(e)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
export default Dashboardd
