import React, { useState, useEffect } from "react";
import textIcon from "../../assets/images/contentTypes/textIcon.png";
import Heading1 from "../../assets/images/contentTypes/Heading1.png";
import Heading2 from "../../assets/images/contentTypes/Heading2.png";
import Heading3 from "../../assets/images/contentTypes/Heading3.png";
import todoList from "../../assets/images/contentTypes/todoList.png";
import photo from "../../assets/images/contentTypes/photo.png";
import video from "../../assets/images/contentTypes/video.png";
import "./CoursesDash.scss";
import axios from "axios";
import useAuth from "../../hooks/useAuth.js";

const contentTypes = [
  { id: 1, label: "Text", image: textIcon, description: "Write text content." },

  {
    id: 3,
    label: "To-do List",
    image: todoList,
    description: "Create a to-do list.",
  },
  {
    id: 4,
    label: "Heading 1",
    image: Heading1,
    description: "Add a main heading.",
  },
  {
    id: 5,
    label: "Heading 2",
    image: Heading2,
    description: "Add a sub-heading.",
  },
  {
    id: 6,
    label: "Heading 3",
    image: Heading3,
    description: "Add a minor heading.",
  },
  { id: 7, label: "Photo", image: photo, description: "Add a photo." },
  { id: 8, label: "Video", image: video, description: "Add a video." },
];

function Contenu({ id, onContentChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [openMenus, setOpenMenus] = useState({});
  const [toggleMenuId, setToggleMenuId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/") {
        setShowMenu((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          [type]: reader.result,
        }));
        setInputs((prevInputs) =>
          prevInputs.map((input) =>
            input.type === "Photo" ? { ...input, value: reader.result } : input
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileChangeA = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          [type]: reader.result,
        }));
        setInputs((prevInputs) =>
          prevInputs.map((input) =>
            input.type === "Video" ? { ...input, value: reader.result } : input
          )
        );
        onContentChange(inputs);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSelectContent = (content) => {
    setSelectedContent(content);
    setShowMenu(false);

    setInputs((prevInputs) => [
      ...prevInputs,
      { id: Date.now(), type: content.label, value: "" },
    ]);
  };

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
    onContentChange(inputs);
  };

  const addInputBelow = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

    const index = inputs.findIndex((input) => input.id === id);
    if (index !== -1) {
      const newInput = {
        id: Date.now(),
        type: selectedContent.label,
        value: "",
      };
      setInputs((prevInputs) => [
        ...prevInputs.slice(0, index + 1),
        newInput,
        ...prevInputs.slice(index + 1),
      ]);
    }
  };

  const toggleMenu = (id) => {
    setToggleMenuId((prev) => (prev === id ? null : id));
  };

  const handleContentTypeSelection = (content) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === toggleMenuId ? { ...input, type: content.label } : input
      )
    );
    setToggleMenuId(null);
  };
  const handleToDoItemChange = (inputId, itemId, value) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              value: input.value.map((item) =>
                item.id === itemId ? { ...item, value } : item
              ),
            }
          : input
      )
    );
  };
  const addToDoItem = (inputId) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              value: [
                ...(input.value || []),
                { id: Date.now(), value: "", completed: false },
              ],
            }
          : input
      )
    );
  };

  const removeToDoItem = (inputId, itemId) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              value: input.value.filter((item) => item.id !== itemId),
            }
          : input
      )
    );
  };
  const renderInputField = (input) => {
    switch (input.type) {
      case "Text":
        return (
          <textarea
            placeholder="Enter text here..."
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            style={{ width: "100%", padding: "8px", minHeight: "100px" }}
          />
        );
      case "To-do List":
        return (
          <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Completed
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Item
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {(input.value || []).map((item) => (
                  <tr key={item.id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) =>
                          handleToDoItemChange(input.id, item.id, {
                            ...item,
                            completed: e.target.checked,
                          })
                        }
                      />
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                          handleToDoItemChange(input.id, item.id, {
                            ...item,
                            value: e.target.value,
                          })
                        }
                        style={{ width: "100%", padding: "8px" }}
                      />
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <button
                        onClick={() => removeToDoItem(input.id, item.id)}
                        style={{
                          cursor: "pointer",
                          padding: "6px 12px",
                          border: "1px solid #dc3545",
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          borderRadius: "4px",
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() => addToDoItem(input.id)}
              style={{
                marginTop: "10px",
                padding: "6px 12px",
                cursor: "pointer",
                border: "1px solid #007bff",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "4px",
              }}
            >
              Add Item
            </button>
          </div>
        );
      case "Heading 1":
      case "Heading 2":
      case "Heading 3":
        return (
          <input
            type="text"
            placeholder={`Enter ${input.type}...`}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize:
                input.type === "Heading 1"
                  ? "1.5rem"
                  : input.type === "Heading 2"
                  ? "1.2rem"
                  : "1rem",
              fontWeight:
                input.type === "Heading 1"
                  ? "bold"
                  : input.type === "Heading 2"
                  ? "bold"
                  : "normal",
            }}
          />
        );
      case "Photo":
        return (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "ChapterContent")}
              style={{ width: "100%", padding: "8px" }}
            />
            {input.value && (
              <img
                src={input.value}
                alt="Uploaded"
                style={{ width: "100%", marginTop: "10px" }}
              />
            )}
          </div>
        );
      case "Video":
        return (
          <div>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileChangeA(e, "ChapterContent")}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        );
      default:
        return (
          <input
            type="text"
            placeholder={`Input for ${input.type}`}
            value={input.value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        );
    }
  };

  return (
    <div>
      <div className="card-header-contenu">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="content-buttons">
            {contentTypes.map((content) => (
              <button
                key={content.id}
                onClick={() => handleSelectContent(content)}
                className="card-title-contenu"
              >
                + {content.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
        {inputs.map((input) => (
          <div key={input.id} style={{ marginBottom: "15px" }}>
            {renderInputField(input)}
            <div style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={() => addInputBelow(input.id)}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  border: "1px solid #007bff",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              >
                Add Below
              </button>
              <button
                onClick={() => toggleMenu(input.id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              >
                Change Type
              </button>
              {toggleMenuId === input.id && (
                <div
                  className={`popup-menu ${
                    toggleMenuId === input.id ? "show" : ""
                  }`}
                >
                  <div className="popup-menu-content">
                    {contentTypes.map((content) => (
                      <div
                        key={content.id}
                        onClick={() => handleContentTypeSelection(content)}
                        className="popup-menu-item"
                      >
                        <img
                          src={content.image}
                          alt={content.label}
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {toggleMenuId === input.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    marginTop: "10px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                >
                  {contentTypes.map((content) => (
                    <div
                      key={content.id}
                      onClick={() => handleContentTypeSelection(content)}
                      style={{
                        cursor: "pointer",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #ddd",
                        padding: "5px 0",
                      }}
                    >
                      <img
                        src={content.image}
                        alt={content.label}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <span>{content.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contenu;
