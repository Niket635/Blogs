import React, { useState } from "react";
import "./style.css";
import Button from "./Button";

function FormDemo() {
  const [userForm, setUserForm] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    id: ""
  });

  const handleInput = (event) => {
    const { value, name } = event.target;

    setForm((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(form.id || form.id === 0){

      let users = userForm.map((item,index) => {

          if(index === form.id){
            item = {
              name: form.name,
              email: form.email,
              password: form.password,
              country: form.country,
            };
          }
          return item;
      });
      setUserForm(users);
    }else{
      setUserForm((oldValue) => {
        return [...oldValue, form];
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      country: "",
      id:'',
    });
  };

  const handleDelete = (id) => {
    setUserForm((oldData) => {
      return oldData.filter((Arra, key) => {
        return key !== id;
      });
    });
  };

  function handleEdit(id) {
    const user = userForm.find((item, key) => key === id);
    setForm({
        name: user.name,
        email: user.email,
        password: user.password,
        country: user.country,
        id: id
      });
  }
  return (
    <>
      <div className="formMain">
        <form onSubmit={handleSubmit}>
          <label> User Name : </label>
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="User Name"
            onChange={handleInput}
          ></input>
          <br />
          <label> Email : </label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleInput}
          ></input>
          <br />
          <label> password : </label>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="password"
            onChange={handleInput}
          ></input>

          <select name="country" value={form.country} onChange={handleInput}>
            <option value="American">American</option>
            <option value="India">India</option>
            <option name="select" value="China">
              China
            </option>
          </select>
          
          <br />
          <button type="submit" id="FormEdit">
            {form.id || form.id === 0  ? 'Edit' : 'Save'}
          </button>
        </form>
      </div>
      <table className="table table-main">
        <thead>
          <tr>
            <th> # </th>
            <th> User Name </th>
            <th> Email </th>
            <th> password </th>
            <th> Conntry </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {userForm.map((item, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.country}</td>
                <td style={{display:'flex', gap:'10px'}}>
                  <Button className="btnEdit btn btn-danger" text="Edit" onClick={() => handleEdit(index)} />
                  <Button text="Delete" className="btn "  onClick={() => handleDelete(index)}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default FormDemo;
