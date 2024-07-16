import React, { useEffect, useState, useRef } from 'react';
import { approveInstitute, getAllInstitutes, rejectInstitute } from '../../utils/api';
import { Button, Col, Container, Row, Modal, Form } from 'react-bootstrap';

const ViewAllInstitutes = () => {
    const [institutes, setInstitutes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        getInstitutes();
    }, []);

    const getInstitutes = async () => {
        try {
            const response = await getAllInstitutes();
            if (response.ok) {
                const data = await response.json();
                setInstitutes(data);
            } else {
                console.error('Failed to fetch applications');
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const viewApplication = (institute) => {
        setSelectedApplication(institute);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleApprove = async (institute) => {
        try {
            const response = await approveInstitute(institute._id);
            if (response.ok) {
                alert("Status updated successfully");
                getInstitutes();
                handleClose();
            } else {
                console.error('Failed to approve institute');
            }
        } catch (error) {
            console.error('Error approving institute:', error);
        }
    };

    const handleReject = async (institute) => {
        try {
            const response = await rejectInstitute(institute._id);
            if (response.ok) {
                alert("Status updated successfully");
                getInstitutes();
                handleClose();
            } else {
                console.error('Failed to reject institute');
            }
        } catch (error) {
            console.error('Error rejecting institute:', error);
        }
    };

    return (
        <div>
            <Container className="container-1">
                <div className="list-container scrollable-list">
                    <Row>
                        <Col xs={12} sm={8}>
                            <h2 className="mb-4">Applications</h2>
                        </Col>
                    </Row>

                    <Row className="table-header pb-2 pt-2 GuestHeader">
                        <Col xs={12} sm={1} className="text-center">Sl. No.</Col>
                        <Col xs={12} sm={4} className="text-center">Name</Col>
                        <Col xs={12} sm={2} className="text-center">Code</Col>
                        <Col xs={12} sm={2} className="text-center">Status</Col>
                        <Col xs={12} sm={3} className="text-center">Actions</Col>
                    </Row>

                    {institutes.map((institute, index) => (
                        <Row key={index} className="table-row">
                            <Col xs={12} sm={1} className="text-center">{index + 1}</Col>
                            <Col xs={12} sm={4} className="text-center">{institute.collegeName}</Col>
                            <Col xs={12} sm={2} className="text-center">{institute.collegeCode}</Col>
                            {institute.rejected === true &&
                                <Col xs={12} sm={2} className="text-center">Rejected</Col>
                            }

                            {institute.approved === true &&
                                <Col xs={12} sm={2} className="text-center">Approved</Col>
                            }

                            {institute.approved === false && institute.rejected === false &&
                                <Col xs={12} sm={2} className="text-center">Pending</Col>
                            }
                            <Col xs={12} sm={1} className="text-center">
                                <Button variant="primary" onClick={() => viewApplication(institute)}>View</Button>
                            </Col>
                            {
                                institute.approved !== true &&
                                <Col xs={12} sm={1} className="text-center">
                                    <Button variant="success" onClick={() => handleApprove(institute)}>Approve</Button>
                                </Col>
                            }


                            {
                                institute.approved !== true && institute.rejected !== true &&
                                <Col xs={12} sm={1} className="text-center">
                                    <Button variant="danger" onClick={() => handleReject(institute)}>Reject</Button>
                                </Col>
                            }
                        </Row>
                    ))}
                </div>
            </Container>

            {selectedApplication && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Institute Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="firstName" className="pb-4">
                                        <Form.Control
                                            className="large-input"
                                            type="text"
                                            name="firstName"
                                            value={selectedApplication.firstName}
                                            readOnly
                                            placeholder="First Name"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="lastName" className="pb-4">
                                        <Form.Control
                                            className="large-input"
                                            type="text"
                                            name="lastName"
                                            value={selectedApplication.lastName}
                                            readOnly
                                            placeholder="Last Name"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="address" className="pb-4">
                                <Form.Control
                                    className="large-input"
                                    type="text"
                                    name="address"
                                    value={selectedApplication.address}
                                    readOnly
                                    placeholder="Address"
                                />
                            </Form.Group>

                            <Row>
                                <Col xs={12} sm={4}>
                                    <Form.Group controlId="course" className="pb-4">
                                        <Form.Control
                                            className="large-input"
                                            type="text"
                                            name="course"
                                            value={selectedApplication.course}
                                            readOnly
                                            placeholder="Course"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} sm={4}>
                                    <Form.Group controlId="from" className="pb-4">
                                        <Form.Control
                                            className="large-input"
                                            type="text"
                                            name="from"
                                            value={selectedApplication.from}
                                            readOnly
                                            placeholder="From"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} sm={4}>
                                    <Form.Group controlId="to" className="pb-4">
                                        <Form.Control
                                            className="large-input"
                                            type="text"
                                            name="to"
                                            value={selectedApplication.to}
                                            readOnly
                                            placeholder="To"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col xs={12} sm={3}>
                                    Photo:
                                </Col>
                                <Col xs={12} sm={9}>

                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col xs={12} sm={3}>
                                    Aadhar Card:
                                </Col>
                                <Col xs={12} sm={9}>

                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col xs={12} sm={3}>
                                    Fee Receipt:
                                </Col>
                                <Col xs={12} sm={9}>


                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ViewAllInstitutes;
