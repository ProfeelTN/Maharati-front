import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Chapters from "./Chapters";
import { Col, Row, Container } from "reactstrap";
import useAuth from "../../hooks/useAuth";

const CourseViewer = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [course, setCourse] = useState({});
  const [selectedChapter, setSelectedChapter] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_HOST}/courses/${id}`,
            {
              headers: {
                Authorization: `Bearer ${auth?.accessToken}`,
              },
            }
          );

          setCourse(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header title={course.CourseName} />
      <Container fluid style={{ flex: 1, display: "flex" }}>
        <Row style={{ flex: 1, width: "100%" }}>
          <Col style={{ flex: "1" }}>
            <Chapters
              chapters={course.Chapters || []}
              setSelectedChapter={setSelectedChapter}
            />
          </Col>
          <Col
            style={{
              flex: "2",
              display: "flex",
              flexDirection: "column",
              backgroundImage: `url(${selectedChapter?.ChapterPhoto || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              color: "white",
              opacity: "0.8",
              padding: "20px",
              margin: "1rem",
              height: "100rvh",
            }}
          >
            <div>
              {selectedChapter?.ChapterContent &&
                selectedChapter.ChapterContent.map((content, index) => (
                  <div
                    key={index}
                    style={{
                      overflowY: "auto",
                      backgroundColor: "white",
                      padding: "1rem",
                      marginBottom: `${
                        content.type === "Heading 1" ||
                        content.type === "Heading 2" ||
                        content.type === "Heading 3"
                          ? "0rem"
                          : "0.4rem"
                      }`,
                    }}
                  >
                    {(() => {
                      switch (content.type) {
                        case "Text":
                          return <p>{content.value}</p>;
                        case "Photo":
                          return (
                            <img
                              src={content.value}
                              alt="Chapter content"
                              style={{ maxWidth: "100%", height: "auto" }} // Ensure image responsiveness
                            />
                          );
                        case "Video":
                          return (
                            <video controls style={{ width: "100%" }}>
                              <source src={content.value} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          );
                        case "Heading 1":
                          return <h1>{content.value}</h1>;
                        case "Heading 2":
                          return <h2>{content.value}</h2>;
                        case "Heading 3":
                          return <h3>{content.value}</h3>;
                        default:
                          return null;
                      }
                    })()}
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CourseViewer;