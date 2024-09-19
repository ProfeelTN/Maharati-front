import React, { useState } from "react";
import { Tooltip } from "react-tooltip";  // Updated import

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Row, Col, Card, CardBody, Container } from "reactstrap";

// Rating Plugin
import Rating from "react-rating";

const UiRating = () => {
  document.title = "Rating | Upzet - React Admin & Dashboard Template";

  const [def, setdef] = useState("");
  const [stopRate, setStopRate] = useState("");
  const [secondRate, setSecondRate] = useState("");
  const [startrate, setStartrate] = useState("");
  const [customize, setCustomize] = useState("");

  const tooltipContent = ["Rate 1", "Rate 2", "Rate 3", "Rate 4", "Rate 5"];
  const tooltipContentMore = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const tooltipContentHalf = ["6", "7", "8", "9", "10"];
  const tooltipContentMiddle = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
  ];
  const tooltipContentStep = ["2", "4", "6", "8", "10"];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Rating" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Row>
                    {/* Default rating */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Default rating</h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-muted fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            onChange={(rate) => setdef(rate)}
                          />
                          <span>{def}</span>
                        </div>
                      </div>
                    </Col>

                    {/* Half rating */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Half rating</h5>
                        <div className="rating-star">
                          <Rating
                            emptySymbol="mdi mdi-star-outline text-primary fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            fractions={2}
                          />
                        </div>
                      </div>
                    </Col>

                    {/* Disabled rating */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Disabled rating</h5>
                        <div className="rating-star">
                          <Rating
                            emptySymbol="mdi mdi-star-outline fa-2x"
                            fullSymbol="mdi mdi-star fa-2x"
                            readonly
                          />
                        </div>
                      </div>
                    </Col>

                    {/* Readonly rating with a value */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Readonly rating with a value
                        </h5>
                        <div className="rating-star">
                          <Rating
                            emptySymbol="mdi mdi-star-outline text-primary fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            initialRating={3}
                            readonly
                          />
                          <span className="badge bg-info">3</span>
                        </div>
                      </div>
                    </Col>

                    {/* Customized heart rating */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Customized heart rating
                        </h5>
                        <div className="rating-star">
                          <Rating
                            stop={5}
                            emptySymbol="mdi mdi-heart-outline fa-2x text-danger"
                            fullSymbol={[
                              "mdi mdi-heart text-danger fa-2x",
                              "mdi mdi-heart text-danger fa-2x",
                              "mdi mdi-heart text-danger fa-2x",
                              "mdi mdi-heart text-danger fa-2x",
                              "mdi mdi-heart text-danger fa-2x"
                            ]}
                            onChange={(rate) => setCustomize(rate)}
                          />
                          <span className="badge bg-info mr-2">{customize}</span>
                        </div>
                      </div>
                    </Col>

                    {/* Only fill selected */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Only fill selected</h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-primary fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                          />
                        </div>
                      </div>
                    </Col>

                    {/* Handle events */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Handle events</h5>
                        <div className="rating-star">
                          <Rating
                            stop={5}
                            emptySymbol="mdi mdi-checkbox-blank-outline text-muted fa-2x"
                            fullSymbol={[
                              "mdi mdi-checkbox-marked-outline text-primary fa-2x",
                              "mdi mdi-checkbox-marked-outline text-primary fa-2x",
                              "mdi mdi-checkbox-marked-outline text-primary fa-2x",
                              "mdi mdi-checkbox-marked-outline text-primary fa-2x"
                            ]}
                            onChange={(rate) => setCustomize(rate)}
                          />
                        </div>
                      </div>
                    </Col>

                    {/* Customize tooltips */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Customize tooltips</h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-muted fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            onChange={(rate) => setdef(rate)}
                            data-tip
                            data-for="rating-tooltip"
                          />
                          <Tooltip id="rating-tooltip" getContent={(dataTip) => tooltipContent[dataTip - 1]} />
                        </div>
                      </div>
                    </Col>

                    {/* Default rating with more options */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Default rating</h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-muted fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            onChange={(rate) => setdef(rate)}
                            data-tip
                            data-for="rating-tooltip-more"
                          />
                          <Tooltip id="rating-tooltip-more" getContent={(dataTip) => tooltipContentMore[dataTip - 1]} />
                        </div>
                      </div>
                    </Col>

                    {/* Set start rate to 5[6..10] */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Set start rate to 5[6..10]
                        </h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-muted fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            onChange={() => setStartrate(!startrate)}
                            data-tip
                            data-for="rating-tooltip-half"
                          />
                          <Tooltip id="rating-tooltip-half" getContent={(dataTip) => tooltipContentHalf[dataTip - 1]} />
                        </div>
                      </div>
                    </Col>

                    {/* Set start and stop rate [2..10] */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Set start and stop rate [2..10]
                        </h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-muted fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            onChange={() => setSecondRate(!secondRate)}
                            data-tip
                            data-for="rating-tooltip-middle"
                          />
                          <Tooltip id="rating-tooltip-middle" getContent={(dataTip) => tooltipContentMiddle[dataTip - 1]} />
                        </div>
                      </div>
                    </Col>

                    {/* Set start and stop rate [2..10] with step 2 */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">
                          Set start and stop rate [2..10] with step 2
                        </h5>
                        <div className="rating-star">
                          <Rating
                            className="rating"
                            emptySymbol="mdi mdi-star-outline text-muted fa-2x"
                            fullSymbol="mdi mdi-star text-primary fa-2x"
                            onChange={() => setStopRate(!stopRate)}
                            data-tip
                            data-for="rating-tooltip-step"
                          />
                          <Tooltip id="rating-tooltip-step" getContent={(dataTip) => tooltipContentStep[dataTip - 1]} />
                        </div>
                      </div>
                    </Col>

                    {/* Custom icons */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Custom icons</h5>
                        <div className="rating-star">
                          <Rating
                            stop={5}
                            emptySymbol="mdi mdi-bell-outline fa-2x text-muted"
                            fullSymbol={[
                              "mdi mdi-bell-ring-outline fa-2x text-primary",
                              "mdi mdi-bell-ring-outline fa-2x text-primary",
                              "mdi mdi-bell-ring-outline fa-2x text-primary",
                              "mdi mdi-bell-ring-outline fa-2x text-primary"
                            ]}
                          />
                        </div>
                      </div>
                    </Col>

                    {/* Fractional rating */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Fractional rating</h5>
                        <div className="rating-star">
                          <Rating
                            emptySymbol="mdi mdi-star-outline fa-2x"
                            fullSymbol="mdi mdi-star fa-2x"
                            fractions={3}
                          />
                        </div>
                      </div>
                    </Col>

                    {/* Custom CSS icons */}
                    <Col xl="3" md="4" sm="6">
                      <div className="p-4 text-center">
                        <h5 className="font-size-15 mb-3">Custom CSS icons</h5>
                        <div className="rating-star">
                          <Rating
                            onChange={(rate) => setdef(rate)}
                            fractions={2}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UiRating;
