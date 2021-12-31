import { useEffect, useRef, useState } from "react";

import { Table } from "./Table";
// import { MainTable } from "./MainTable";
import "./Form.css";

export const Form = () => {
  const [formData, setformData] = useState({
    name: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    status: "",
    profile_pic: ""
  });

  const [page, setPage] = useState(0);
  const [getform, getFormdata] = useState([]);
  const [img, setImgUrl] = useState();
  const fileRef = useRef();

  const handleChange = (e) => {
    let { name, value, checked, type } = e.target;
    value = type === "checkbox" ? checked : value;
    if (name === "profile_pic") {
      value = URL.createObjectURL(fileRef.current.files[0]);
      // console.log("value", value);
      // console.log("Enter");
      // setImgUrl(value);
    }
    setformData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    // console.log("used");
    getForm();
  }, [page]);

  const getForm = () => {
    fetch(`http://localhost:8000/profile?_page=${page}&_limit=1`)
      .then((d) => d.json())
      .then((res) => {
        // console.log(res)
        getFormdata(res);
        // setImgUrl(getForm.profile_pic);
        // setImgUrl(e.profile_pic)

        getform.map((e) => setImgUrl(e.profile_pic));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/profile", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json"
      }
    }).then(() => {
      getForm();
      // setformData("")
    });

    // setForm([formData]);
    // console.log(formData);
    // setPic([fileRef.current.files[0]]);
  };
  // var a = (pic[0].name)
  // console.log("img", img);
  console.log(page);
  // console.log("get", getform);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/profile/${id}`, {
      method: "DELETE",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json"
      }
    }).then(() => {
      getForm();
    });
  };
  console.log(getform);
  return (
    <div className="formdiv">
      <div>
        <h1>Form</h1>
        <div style ={{
          marginLeft:`900px`
        }}>Profile_pic</div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter Name"
          />

          <br />
          <br />

          <input
            onChange={handleChange}
            type="Number"
            name="age"
            placeholder="Enter Age"
          />

          <br />
          <br />

          <input
            onChange={handleChange}
            type="text"
            name="address"
            placeholder="Enter Address"
          />

          <br />
          <br />

          <select onChange={handleChange} name="department">
            <option value="select">Department</option>
            <option value="BackEnd">BackEnd</option>
            <option value="Garage">Garage</option>
            <option value="FrontEnd">FrontEnd</option>
          </select>

          <br />
          <br />

          <input
            onChange={handleChange}
            type="number"
            name="salary"
            placeholder="Enter salary"
          />

          <br />
          <br />
          <label>
            Married:
            <input onChange={handleChange} type="checkbox" name="status" />
          </label>
          <br />
          <br />
          <label>
            Your Profile Pic:
            <input
              onChange={handleChange}
              type="file"
              name="profile_pic"
              ref={fileRef}
            />
          </label>
          <br />
          <br />
          <input type="submit" value="submit" />
        </form>

        <div>
          <button
            disabled={page === 0}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            prev
          </button>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            next
          </button>
        </div>
      </div>
      {getform.map((e) => (
        <div
          style={{
            backgroundImage: `url(${e.profile_pic})`,
            width: `300px`,
            height: `300px`,
            marginLeft: `800px`,
            marginTop: `-300px`
          }}
        ></div>
      ))}

      <table className="customers">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Salary</th>
          <th>Marriage Status</th>
          <th>Department</th>
        </tr>
        <tr>
          {getform.map((e) => (
            <Table key={e.id} {...e} handleDelete={handleDelete} />
          ))}
        </tr>
      </table>
    </div>
  );
};
