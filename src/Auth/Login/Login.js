import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import login from '../../Assets/Images/login.png';
import { BsBoxArrowInRight } from "react-icons/bs";
import { auth, getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "../../firebaseCon";

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    //Catch Input Value using ...Input function.. & set input value to state.
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }



    isFormValid = ({ email, password }) => {
        if (!email.length || !password.length) {
            this.setState({ errorMsg: "All Field Are Required" })
        } else if (this.state.password.length < 6) {
            this.setState({ errorMsg: 'Please Password must be at least 6 characters' })
        } else {
            return true
        }
    }

    //Login Using Email & Password
    handleEmailSignIn = (e) => {
        e.preventDefault();

        if (this.isFormValid(this.state)) {
            signInWithEmailAndPassword(auth, this.state.email, this.state.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    localStorage.setItem('email', user.email);
                    // ...
                })
                .catch((error) => {
                    this.setState({ errorMsg: error.message })
                    this.setState({ loader: false })
                    if (this.state.errorMsg.includes('not-found')) {
                        this.setState({ errorMsg: "This User Email Not Yet Registered" })
                    }
                    else if (error.code.includes('wrong-password')) {
                        this.setState({ errorMsg: "Wrong Password!" })
                    }
                    else if (error.code.includes('invalid-email')) {
                        this.setState({ errorMsg: "Invalid Email ! Please Write Valid Email" })
                    }
                });
        }

    }

    //Login Using  Google Account.
    handleGoogleLogin = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                console.log(email, errorCode, errorMessage);
            });

    }






    render() {
        return (
            <div style={{ height: '100vh', marginTop: '25px' }} >

                <Container className="shadow" style={{ padding: '20px' }}>
                    <Row>
                        <Col xs={6}>
                            <div style={{ textAlign: 'center' }}>
                                <BsBoxArrowInRight color="blue" fontSize="4em" />
                                <h1 style={{ textAlign: 'center', marginTop: '25px' }}>User Login</h1>
                            </div>
                            <Form>
                                {this.state.errorMsg ?
                                    <div className="alert alert-danger text-center" role="alert">
                                        {this.state.errorMsg}
                                    </div>

                                    : ''}

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" name='email' />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="password" placeholder="Password" name="password" />
                                </Form.Group>
                                <Button onClick={this.handleEmailSignIn} style={{ width: "100%", padding: '10px' }} type="submit">
                                    Sign In
                                </Button>


                                <Button onClick={this.handleGoogleLogin} style={{ width: "49%", backgroundColor: '#11648C', padding: '10px' }} variant="outline-warning" type="submit">
                                    Login with Google
                                </Button>

                                <Button style={{ width: "49%", margin: '15px 0', padding: '10px' }} variant="outline-info" type="submit">
                                    Login with Facebook
                                </Button>

                                <div className="text-center border border-info alert alert-success" >
                                    <h6>
                                        Don't have any Account!
                                        <Link to="/register" style={{textDecoration: 'none'}}> Register</Link>

                                    </h6>
                                </div>

                            </Form>
                        </Col>

                        <Col xs={6}>
                            <img style={{ width: '100%', height: '100%', borderRadius: '0 10px 10px 0' }} src={login} alt="Login Images" />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Login;