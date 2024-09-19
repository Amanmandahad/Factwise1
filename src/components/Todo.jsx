/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Todo.css";
import { IoLockOpenSharp, IoLockClosed } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const Todo = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    // Sample data
    {
      id: 1,
      title: "John Doe",
      age: 19,
      Gender: "Rather not to say",
      country: "India",
      description: "Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, aspernatur architecto quo neque veritatis unde.",
    },
    {
      id: 2,
      title: "Harry Baiden",
      age: 19,
      Gender: "Rather not to say",
      country: "India",
      description: "Consectetur adipisicing elit...Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, aspernatur architecto quo neque veritatis unde.",
    },
    {
      id: 3,
      title: "Michael James",
      age: 19,
      Gender: "Rather not to say",
      country: "India",
      description: "In, officia, quae! Lorem ipsum...Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, aspernatur architecto quo neque veritatis unde.",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null); 


  const openModal = (index) => {
    setDeleteIndex(index); 
    setIsOpen(true); 
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteItem = () => {
    setData(data.filter((_, index) => index !== deleteIndex)); 
    closeModal();
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditChange = (e, index, field) => {
    const updatedData = [...data]; // Copy data array
    updatedData[index][field] = e.target.value; 
    setData(updatedData); 
  };

  const startEditing = (index) => {
    setIsEditing(index); 
  };



  return (
    <div className="container">
      <div className="accordian">
        {/* Search input */}
        <div className="input">
          <input
            type="text"
            placeholder="Search user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={item.id} className="item">
              <div
                className="title"
                onClick={() =>
                  setActiveIndex(index === activeIndex ? null : index)
                }
              >
                <h3> <BsFillPersonFill  /> {item.title}</h3>
                {activeIndex === index ? (
                  <IoLockOpenSharp style={{ fontSize: "20px" }} />
                ) : (
                  <IoLockClosed style={{ fontSize: "20px" }} />
                )}
              </div>

     
              {activeIndex === index && (
                <div className="description">
                  <div className="box">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {isEditing === index ? (
                        <>
                          <input
                            style={{ width: "75px", height: "20px" }}
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              handleEditChange(e, index, "title")
                            }
                          />
                          <input
                            style={{ width: "35px", height: "20px" }}
                            type="number"
                            value={item.age}
                            onChange={(e) => handleEditChange(e, index, "age")}
                          />
                          <input
                            style={{ width: "120px", height: "20px" }}
                            type="text"
                            value={item.Gender}
                            onChange={(e) =>
                              handleEditChange(e, index, "Gender")
                            }
                          />
                          <input
                            style={{ width: "45px", height: "20px" }}
                            type="text"
                            value={item.country}
                            onChange={(e) =>
                              handleEditChange(e, index, "country")
                            }
                          />
                        </>
                      ) : (
                        <>
                          <span>
                            <h4>Age</h4> {item.age}
                          </span>
                          <span>
                            <h4>Gender</h4> {item.Gender}
                          </span>
                          <span>
                            <h4>Country</h4> {item.country}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Description field */}
                    <div style={{ marginTop: "30px" }}>
                      <h4>Description</h4>
                      {isEditing === index ? (
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            handleEditChange(e, index, "description")
                          }
                        />
                      ) : (
                        <p>{item.description}</p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="icon">
                      <MdDelete onClick={() => openModal(index)} />
                      {isEditing === index ? (
                        <>
                          <FaCheck onClick={() => setIsEditing(null)} />
                          
                        </>
                      ) : (
                        <MdEdit onClick={() => startEditing(index)} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">No results found.</div>
        )}

        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Are you sure you want to delete?</h2>
              <button onClick={deleteItem} className="confirm-button">
                Yes
              </button>
              <button onClick={closeModal} className="cancel-button">
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;


















