import React, { useEffect, useState, Fragment } from "react";
import Table from "react-bootstrap/Table";

export default function Home() {
  const [username, setUsername] = useState("");
  const [lists, setLists] = useState([]);
  const [edit, setEdit] = useState(0);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user"));
    var tmp = JSON.parse(localStorage.getItem("users"));
    var users = Array.from(tmp ? tmp : []);
    for (let i = 0; i < users.length; i++) {
      const item = users[i];
      if (item.email == user.email) {
        setUsername(item.username);
        break;
      }
    }

    // to-do list
    var all = JSON.parse(localStorage.getItem("users"));
    setLists(all[user.email]);
  });

  const itemDelete = (index) => {
    var tmp = lists;
    tmp.splice(index, 1);
    setLists(tmp);
  };

  const itemEdit = (index) => {
    setEdit(true);
    setCurrent(index);
  };

  return (
    <div className="container">
      <div className="row my-4">
        <marquee>Welcome {username}</marquee>
      </div>
        {edit ? 
            <Fragment>
                  <div className="row mb-2">
                  <label htmlFor="title" className="col-sm-4 col-form-label">
                    Title:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      value={email}
                      name="email"
                      onChange={(e) => {
                        this.inputChange(e);
                      }}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                    {submitted && errors.email.length > 0 && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                </div>
                <div className="row mb-2">
                  <label htmlFor="password" className="col-sm-4 col-form-label">
                    Password:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      value={password}
                      autoComplete="on"
                      name="password"
                      onChange={(e) => {
                        this.inputChange(e);
                      }}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  </div>
            </Fragment>
         : (
          <div className="row">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {lists?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          <button className="btn btn-success">edit</button>
                          <button
                            className="btn btn-danger"
                            onClick={() => itemDelete(index)}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
          </div>
        )}
    </div>
  );
}
