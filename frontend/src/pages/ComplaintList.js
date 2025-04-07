import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function ComplaintList() {
  const [cmplnts, setCmplnts] = useState([])
  const [searchKey, setsearchKey] = useState("")
  const [categories, setCategories] = useState(["All", "Cybercrime", "Fraud", "Theft"])
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const navigate = useNavigate();
  useEffect(() => {
    getAllCmplnts()
    fetchCategories();
  }, [])
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://complaint-register-system-backend.onrender.com/complaints/categories");
      setCategories(["All", "Cybercrime", "Fraud", "Theft"]);
      // Add "All" and category names
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const goToCreateCmplnt = () => {
    navigate("/user/createcomplaint")
  }
  const goToEditCmplnt = (e, cmplnt) => {
    navigate("/user/editcomplaint/" + cmplnt._id)
  }
  const getAllCmplnts = () => {
    // axios.get("https://complaint-register-system-backend.onrender.com/complaints/all").then(function (res) {
    //   setCmplnts(res.data)
    // }).catch(function (err) {
    //   console.log(err)
    // })
    const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage

    if (!userId) {
      console.log("User ID not found in localStorage");
      return;
    }
    console.log(userId)

    axios.get(`https://complaint-register-system-backend.onrender.com/complaints/user/${userId}`)
      .then((res) => {
        console.log("Complaints received:", res.data);
        setCmplnts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err.response ? err.response.data : err.message);
      });

  }
  // const goToLogout = () => {
  //   navigate("/login")
  // }
  // const deleteCmplnt = (e, cmplnt) => {
  //   axios.delete(`http://localhost:8000/complaints/deleteCmplnt/${cmplnt._id}`).then(function (res) {
  //     getAllCmplnts()
  //   }).catch(function (err) {
  //     console.log(err)
  //   })
  // }
  const deleteCmplnt = async (e, cmplnt) => {
    e.preventDefault(); // Prevents default action (if any)
  
    try {
      await axios.delete(`https://complaint-register-system-backend.onrender.com/complaints/deleteCmplnt/${cmplnt._id}`);
      
      // Update state by filtering out deleted complaint
      setCmplnts(prevCmplnts => prevCmplnts.filter(item => item._id !== cmplnt._id));
      
      console.log("Complaint deleted successfully!");
    } catch (err) {
      console.error("Error deleting complaint:", err.response ? err.response.data : err.message);
    }
  };
  
  const changeSearchKey = (e) => {
    setsearchKey(e.target.value)
  }
  const searchCmplnts = (e) => {
    e.preventDefault();
    if (searchKey !== "") {
      axios.get(`https://complaint-register-system-backend.onrender.com/complaints/searchByTitle/${searchKey}`).then(function (res) {
        setCmplnts(res.data)
      }).catch(function (err) {
        console.log(err)
      })
    } else {
      getAllCmplnts()
    }
  }
  // const getByCategory = (e, category, index) => {
  //   setSelectedCategoryIndex(index)
  //   console.log(category)
  //   axios.get(`http://localhost:8000/complaints/searchByCategory/${category}`).then(function (res) {
  //     setCmplnts(res.data)
  //   }).catch(function (err) {
  //     console.log(err)
  //   })
  // }
  // frontend/src/pages/complaintlist.js
  const getByCategory = (e, category, index) => {
    setSelectedCategoryIndex(index);
    console.log(`Selected Category: ${category}`);
  
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.log("User ID not found in localStorage");
        return;
    }
  
    if (category === "All") {
        getAllCmplnts();
    } else {
        axios
            .get(`https://complaint-register-system-backend.onrender.com/complaints/user/${userId}/category/${category.toLowerCase()}`)
            .then((res) => {
                console.log("Filtered Complaints:", res.data);
                setCmplnts(res.data);
            })
            .catch((err) => {
                console.error(
                    "Error fetching filtered complaints:",
                    err.response ? err.response.data : err.message
                );
            });
    }
  };
  



  return (

    <div className="container-fluid" style={{ backgroundColor: "#05152b", height: "100vh" }} >
      <div className="row">
        <div className="col-md-9" style={{ color: "#f0f2f5" }}>
          <h3>My Complaints</h3>
        </div>
        <div className="col-md-3" style={{ textAlign: "right" }}>
          <button className="btn btn-success btn-sm" onClick={() => goToCreateCmplnt()}>
            +Create
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search By Title"
              aria-label="Search"
              onChange={(e) => changeSearchKey(e)}
              value={searchKey}
            />
            <button className="btn btn-outline-success" type="submit" onClick={(e) => searchCmplnts(e)}>
              Search
            </button>
          </form>
        </div>
        <div
          className="col-md-6"
          style={{ display: "flex", flexWrap: "wrap", gap: "5px", alignItems: "center" }}
        >
          {categories.map((category, index) => (
            <span
              key={index}
              className={
                selectedCategoryIndex === index
                  ? "badge rounded-pill bg-success"
                  : "badge rounded-pill bg-secondary"
              }
              style={{
                cursor: "pointer",
                margin: "2px 0", // Small vertical margin to avoid overlap
              }}
              onClick={(e) => getByCategory(e, category, index)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="row mt-4">
        {cmplnts &&
          cmplnts.map((cmplnt, index) => {
            return (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card shadow-lg rounded-3 position-relative">
                  {/* Status Badge */}
                  <span
                    className={`badge ${cmplnt.status.toLowerCase() === "open" ? "bg-success" : "bg-danger"
                      } position-absolute top-0 end-0 m-2`}
                  >
                    {cmplnt.status}
                  </span>

                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`https://complaint-register-system-backend.onrender.com/uploads/${cmplnt.image}`}
                        alt="Description"
                        className="img-fluid rounded-start"
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{cmplnt.title}</h5>
                        <p className="card-text text-truncate">{cmplnt.content}</p>
                        <p className="mb-1">
                          <strong>Address:</strong>{" "}
                          <span className="badge text-bg-warning">{cmplnt.author}</span>
                        </p>
                        <p>
                          <strong>Category:</strong>{" "}
                          <span className="badge text-bg-danger">{cmplnt.category}</span>
                        </p>
                      </div>
                      {/* Buttons */}
                      <div className="d-flex justify-content-end align-items-center p-2">
                        <button
                          className="btn btn-sm btn-danger me-2"
                          onClick={(e) => deleteCmplnt(e, cmplnt)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={(e) => goToEditCmplnt(e, cmplnt)}
                        >
                          Edit
                        </button>
                        <a href="#" className="btn btn-sm btn-primary">
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>



  )
}
export default ComplaintList
