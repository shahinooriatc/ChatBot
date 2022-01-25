import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import registerImg from "../../Assets/Images/register.png";
import { BsPersonPlus, BsFilePerson, BsEnvelopeFill, BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import {
    auth, getAuth, signInWithPopup, GoogleAuthProvider,
    createUserWithEmailAndPassword, updateProfile,
    db, ref, set
} from "../../firebaseCon";




class Register extends Component {


    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMsg: '',
        successMsg: '',
        loading: false,
        phone: '01731023633'

    }
    // [userName,email,password,confirmPassword]=this.state;

    //Catch Input Value using ...Input function.. & set input value to state.
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    isFormValid = ({ userName, email, password, confirmPassword }) => {
        if (!userName.length || !email.length || !password.length || !confirmPassword.length) {
            this.setState({ errorMsg: "All Field Are Required" })
            this.setState({ successMsg: '' })
        } else if (this.state.password.length < 6 || this.state.confirmPassword.length < 6) {
            this.setState({ errorMsg: 'Please Password must be at least 6 characters' })
            this.setState({ successMsg: '' })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ errorMsg: 'Please make sure your Password match' })
            this.setState({ successMsg: '' })

        } else {
            return true
        }
    }


    handleEmailSignup = (e) => {
        e.preventDefault();

        if (this.isFormValid(this.state)) {
            this.setState({ loading: true })
            createUserWithEmailAndPassword(auth, this.state.email, this.state.password, this.state.userName)

                .then((loggedInUser) => {
                    // this.writeUserData(loggedInUser)
                    console.log(loggedInUser);
                    this.setState({ successMsg: "You Are logged in successfully" })
                    this.setState({ loading: false })

                    updateProfile(auth.currentUser, {
                        displayName: this.state.userName,
                        photoURL: this.state.phone,

                    }).then(() => {
                        this.writeUserData(loggedInUser)
                    }).then(() => {

                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    if (errorMessage.includes('email-already-in-use')) {
                        this.setState({ errorMsg: "This Email Account Already Used!" });
                    }
                    this.setState({ loading: false });
                });
        }

    }

    //send Logged In information to realtime database....
    writeUserData = (loggedInUser) => {
        set(ref(db, 'users/' + loggedInUser.user.uid), {
            id: loggedInUser.user.uid,
            username: this.state.userName,
            email: this.state.email,
            phone: loggedInUser.user.uid,
        });
    }


    handleGoogleLogin = (e) => {
        e.preventDefault();

        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                console.log(email, errorCode, errorMessage);
            });

    }

    render() {

        return (
            <div style={{ height: '100vh', marginTop: '25px' }}>

                <Container className="shadow" style={{ padding: "15px" }}>
                    <Row>
                        <Col xs={6}>
                            <img src={registerImg} alt="Register Images" style={{ width: '100%' }} />
                        </Col>

                        <Col xs={6}>
                            <div style={{ textAlign: 'center' }}>
                                <BsPersonPlus color="blue" fontSize="4em" />
                                <h1 style={{ textAlign: 'center', marginTop: '25px' }}>User Registration</h1>
                            </div>
                            {this.state.errorMsg ?
                                <div className="alert alert-danger text-center" role="alert">
                                    {this.state.errorMsg}
                                </div>
                                :
                                ''
                            }
                            {this.state.successMsg ?
                                <div className="alert alert-success text-center" role="alert">
                                    {this.state.successMsg}
                                </div>
                                :
                                ''
                            }


                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <BsFilePerson />
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="text" placeholder="Enter User Name" name="userName" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <BsEnvelopeFill />
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="email" placeholder='Enter Email' name="email" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <BsFillUnlockFill />
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="password" placeholder='Enter Password' name="password" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">

                                    <BsFillLockFill />
                                    <Form.Label>Confirm Password</Form.Label>

                                    <Form.Control onChange={this.handleChange} type="password" placeholder="Confirm Password" name="confirmPassword" />
                                </Form.Group>

                                <Button onClick={this.handleEmailSignup} style={{ width: "100%", padding: '10px' }} type="submit">

                                    {this.state.loading ?
                                        <Spinner animation="border" variant="warning" /> :
                                        "SignUp"
                                    }
                                </Button>

                                <Button onClick={this.handleGoogleLogin} style={{ width: "49%", backgroundColor: '#11648C', padding: '10px' }} variant="outline-warning" type="submit">
                                    Login with Google
                                </Button>

                                <Button style={{ width: "49%", margin: '15px 0', padding: '10px' }} variant="outline-info" type="submit">
                                    Login with Facebook
                                </Button>
                                <div className="text-center border border-info alert alert-success" style={{ margin: '10px', padding: '10px' }}>

                                    <h6>
                                        Already have an account !
                                        <Link to="/login">Login</Link>

                                    </h6>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default Register;