import React, { useEffect, useState, Fragment } from "react";
import { Table, Button } from "react-bootstrap";
import { isValidTitle } from "../../utils";

export default function Home() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")).email);

  var tmp = JSON.parse(localStorage.getItem("users"));
  var users = Array.from(tmp ? tmp : []);
  const [username] = useState(
    users.filter((item) => item.email == user).username
  );

  var allData = JSON.parse(
    localStorage.getItem("all") ? localStorage.getItem("all") : "{}"
  );
  var myTodo = allData[user] ? allData[user] : [];
  const [lists, setLists] = useState(myTodo);

  const [edit, setEdit] = useState(0);
  const [current, setCurrent] = useState(-1);
  const [titleError, setTitleError] = useState(0);

  useEffect(() => {}, [lists]);

  const itemUpdate = (data) => {
    console.log(lists);
    setLists(data);
    setTimeout(() => {
      console.log("ddd", lists);
    }, 10);
    console.log("Data:", data);
    var tmp = JSON.parse(
      localStorage.getItem("all") ? localStorage.getItem("all") : "{}"
    );
    var all = tmp ? tmp : {};
    all[user] = data;
    localStorage.setItem("all", JSON.stringify(all));
  };

  const itemDelete = (index) => {
    console.log("delete", index);

    itemUpdate(lists.filter((item, xindex) => xindex != index));
  };

  const itemEdit = (index, title, description) => {
    setEdit(true);
    setCurrent(index);
    setTitle(title);
    setDescription(description);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const itemSave = () => {
    console.log("save", current);
    if (isValidTitle(title)) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    setEdit(false);
    if (current != -1) {
      itemUpdate(
        lists.map((item, index) =>
          index == current ? { title: title, description: description } : item
        )
      );
    } else {
      itemUpdate(lists.concat({ title: title, description: description }));
    }
  };
  return (
    <div className="container">
      <div className="row my-4">
        <marquee>Welcome {username}</marquee>
      </div>
      {edit ? (
        <Fragment>
          <div className="row mb-2">
            <div className="col-sm-2"></div>
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Title:
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                value={title}
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="form-control"
                id="title"
                placeholder="Title"
              />
            </div>
            <div className="col-sm-2"></div>
          </div>
          {titleError && (
            <div className="row mb-2">
              <div className="col-sm-4"></div>
              <div className="col-sm-6">
                <span className="error">Limit 125 characters</span>
              </div>
              <div className="col-sm-2"></div>
            </div>
          )}
          <div className="row mb-2">
            <div className="col-sm-2"></div>
            <label htmlFor="description" className="col-sm-2 col-form-label">
              Description:
            </label>
            <div className="col-sm-6">
              <textarea
                name="description"
                rows={10}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="form-control"
                id="description"
                placeholder="Enter description"
                value={description}
              >
                {description}
              </textarea>
            </div>
            <div className="col-sm-2"></div>
          </div>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-2">
              <Button
                className="w-100"
                variant="danger"
                onClick={() => setEdit(false)}
              >
                CANCEL
              </Button>
            </div>
            <div className="col-sm-4"></div>
            <div className="col-sm-2">
              <Button className="w-100" variant="success" onClick={itemSave}>
                SAVE
              </Button>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="row">
            <Button
              variant="outline-primary"
              className="mb-2"
              onClick={() => {
                setEdit(true);
                setCurrent(-1);
                setTitle("");
                setDescription("");
              }}
            >
              Add
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody onClick={() => console.log(lists)}>
                {lists.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          itemEdit(index, item.title, item.description)
                        }
                      >
                        edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => itemDelete(index)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
                {!lists.length && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      empty
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Fragment>
      )}
    </div>
  );
}
