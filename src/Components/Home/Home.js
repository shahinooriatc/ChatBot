import React, { Component } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import homeImg from '../../Assets/Images/home.jpg'


class Home extends Component {

    render() {
        return (
            <>

                <Row>
                    <Col xs={6}>
                        <img src={homeImg} alt="homeImg" style={{ width: '100%' }} />
                    </Col>
                    <Col xs={6} style={{ textAlign: 'center', marginTop: '10%' }}>
                        <h1>Chat Bot</h1>
                        <p style={{ padding: "23px" }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aut magni beatae earum, pariatur dicta culpa, dignissimos totam distinctio est rerum. Eos aliquam perferendis officiis porro aut, adipisci perspiciatis animi ipsa in pariatur saepe mollitia sit ad vero laudantium iusto alias dolore corporis illo obcaecati vel. Quasi fugit quibusdam in!</p>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button className="btn btn-warning" size="lg">
                                <h3>Join Now</h3>
                            </Button>
                        </Link>
                    </Col>
                </Row>

            </>
        );
    }
}

export default Home;