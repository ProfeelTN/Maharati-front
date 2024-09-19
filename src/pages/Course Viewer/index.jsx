import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Chapters from "./Chapters";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import useAuth from "../../hooks/useAuth";
const index = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [course, setCourse] = useState({});
  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);
  return (
    <div>
      <Header title={course.CourseName} />
      <Container fluid={true}>
        <Row>
          <Col>
            <Chapters chapters={course.Chapters || []} />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default index;
