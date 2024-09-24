import React, { useState } from "react";
import classnames from "classnames";

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
const Chapters = ({ chapters, setSelectedChapter }) => {
  const [customActiveTab, setcustomActiveTab] = useState("Chapters");
  const tabid = ["Chapters", "Resources"];

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  return (
    <div>
      <div
        className="page-content"
        style={{ marginBottom: "2rem", marginTop: "1rem" }}
      >
        <>
          <Col xl={9}>
            <Card className="mb-0">
              <CardBody>
                <Nav tabs className="nav-tabs-custom nav-justified">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "Chapters",
                      })}
                      onClick={() => {
                        toggleCustom("Chapters");
                      }}
                    >
                      <i className="mdi mdi-inbox me-2 align-middle font-size-18">
                        {" "}
                      </i>
                      <span className="d-none d-md-inline-block">
                        {" "}
                        Chapters{" "}
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "Resources",
                      })}
                      onClick={() => {
                        toggleCustom("Resources");
                      }}
                    >
                      <i className="mdi mdi-alpha-x-circle-outline me-2 align-middle font-size-18"></i>{" "}
                      <span className="d-none d-md-inline-block">
                        Resources
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  activeTab={customActiveTab}
                  className="pt-3 text-muted"
                >
                  {tabid.map((chapter, index) => (
                    <TabPane key={index} tabId={chapter}>
                      <Row>
                        <Col sm="12">
                          <div className="card-text mb-0">
                            <div
                              className="tab-pane active"
                              id="custom-primary"
                              role="tabpanel"
                            >
                              <ul
                                className="message-list mb-0"
                                style={{ minHeight: "75vh" }}
                              >
                                {Object.keys(chapters).length !== 0 &&
                                  customActiveTab === "Chapters" &&
                                  chapters.map((x, index) => (
                                    <li
                                      key={index}
                                      className="unread chapter-item"
                                      onClick={() => {
                                        setSelectedChapter(x);
                                      }}
                                    >
                                      <span className="col-mail col-mail-1">
                                        <a to="#" className="title">
                                          {x.ChapterTitle}
                                        </a>
                                      </span>

                                      <div className="scroll-progress">
                                        <div
                                          className="scroll-progress-bar"
                                          style={{
                                            width: `${x.scrollProgress}%`,
                                          }}
                                        ></div>
                                      </div>

                                      {/* <div className="circular-progress">
                                        <svg
                                          viewBox="0 0 36 36"
                                          className="circular-chart"
                                        >
                                          <path
                                            className="circle-bg"
                                            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                                          />
                                          <path
                                            className="circle"
                                            strokeDasharray={`${x.scrollProgress}, 100`}
                                            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                                          />
                                        </svg>
                                        <span className="circular-progress-text">
                                          {Math.round(x.scrollProgress)}%
                                        </span>
                                      </div> */}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                  ))}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </>
      </div>
    </div>
  );
};

export default Chapters;
