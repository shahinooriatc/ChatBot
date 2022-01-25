import moment from 'moment';
import React, { Component } from 'react';
import { Alert, Button, Col, Container, Form, Row, Toast } from 'react-bootstrap';
import { BsPeople } from 'react-icons/bs';
import { getDatabase, ref, set, push, child, onValue, onChildAdded, onChildChanged } from "../../../firebaseCon";
// import moment from 'moment';
import Moment from 'react-moment';



class Messages extends Component {
    state = {
        inputMsg: '',
        errorMsg: '',
        successMsg: '',
        groupMsg: [],
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSendMsg = () => {
        console.log(this.props.currentGroup);

        if (this.state.inputMsg) {
            this.setState({ errorMsg: '' })

            const db = getDatabase();
            const groupListRef = ref(db, 'messages');
            const newGroupRef = push(child(groupListRef, `${this.props.currentGroup.groupId}`));
            set(newGroupRef, {
                message: this.state.inputMsg,
                userName: this.props.loggedInUser.displayName,
                groupName: this.props.currentGroup.groupName,
                sender: this.props.loggedInUser.uid,
                groupId: this.props.currentGroup.groupId,
                time: Date(),
            }).then(() => {
                this.setState({ inputMsg: '' })
                console.log('Message Saved to Database')
            })
            console.log(this.state.groupMsg);

        } else {
            this.setState({ errorMsg: 'Please Add A Message Before Send.' })
        }
    }//End handle send message...................


    componentDidUpdate(previousProps) {
        let groupMessageArr = [];
        const db = getDatabase();
        const messageCountRef = ref(db, 'messages/');
        onChildAdded(messageCountRef, (data) => {
            data.forEach((item) => {
                groupMessageArr.push(item.val())
            })
            if (previousProps.currentGroup) {
                if (previousProps.currentGroup.groupName !== this.props.currentGroup.groupName) {
                    this.setState({ groupMsg: groupMessageArr })
                    console.log(this.state.groupMsg);
                }
            } else {
                this.setState({ groupMsg: groupMessageArr });
            }
        });

        onChildChanged(messageCountRef, (groupMessage) => {
            groupMessageArr = []
            groupMessage.forEach((item) => {
                groupMessageArr.push(item.val())
            })
            if (previousProps.currentGroup) {
                if (previousProps.currentGroup.groupName !== this.props.currentGroup.groupName) {
                    this.setState({ groupMsg: groupMessageArr })
                    console.log(this.state.groupMsg);
                }
            } else {
                this.setState({ groupMsg: groupMessageArr });
            }

        });
    }



    render() {

        console.log(this.state.groupMsg);
        console.log(this.props.currentGroup.groupId);


        return (
            <div style={{ height: '100vh', backgroundColor: '#f2f2f2' }}>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <div className="group mx-3">
                                <h3>Group Chat</h3>
                                <div className="icon">
                                    <BsPeople style={{ color: 'blue', fontSize: '25px' }} />
                                </div>
                                <div className="user">
                                    <h5>5 User in Live</h5>
                                </div>

                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="search text-center" >
                                <Form>
                                    <Form.Group className="mt-3" >
                                        <Form.Control type="text" placeholder="Search Message..." className='rounded' />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="message_field overflow-auto " style={{ backgroundColor: '#cccccc', height: '650px' }}>

                                {this.state.groupMsg.map(item => (
                                    item.groupId === this.props.currentGroup.groupId ?
                                        <>
                                            <div className=" mt-1">

                                                <div className="media-body" style={item.sender === this.props.loggedInUser.uid ? rightAlign : ''}>
                                                    <div className="bg-info rounded">
                                                        <div className="col-12 d-flex justify-content-end">
                                                            <h6>{item.userName}</h6> &nbsp;<span style={{ marginLeft: '25px' }}>{moment().startOf(item.time).fromNow()}</span>
                                                        </div>
                                                        <span style={{ textAlign: 'end', padding: '15px', color: '#FFFFFF' }}> {item.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        ''

                                ))}

                            </div>
                        </Col>
                    </Row>


                    <Row>
                        <Col md={12}>
                            <div className="input">
                                <Form>

                                    <Form.Group className="mt-1" >
                                        {this.state.errorMsg ?
                                            <Alert variant='danger' style={{ textAlign: 'center' }} >
                                                {this.state.errorMsg}
                                            </Alert>
                                            :
                                            ""}
                                        <Form.Control onChange={this.handleChange} type="text" name='inputMsg' placeholder="Type Your Message..." value={this.state.inputMsg} style={{ lineHeight: '40px' }} />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <Row className=" mt-4">
                        <Col md={6}>
                            <div className="add_media ">
                                <Button variant="primary " style={{ width: '100%', height: '3rem' }}>Add Media</Button>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="send_message" >
                                <Button onClick={() => this.handleSendMsg()} variant="info" style={{ width: '100%', height: '3rem' }}>Send Message</Button>

                            </div>
                        </Col>
                    </Row>


                </Container>
            </div >
        );
    }
}

const rightAlign = {
    display: 'flex',
    justifyContent: 'flex-end',

}

export default Messages;


 // componentDidUpdate(previousProps) {
    //     let messageArr = [];
    //     const db = getDatabase();
    //     const starCountRef = ref(db, 'messages/' + this.props.currentGroup.groupId);
    //     onChildAdded(starCountRef, (data) => {
    //         data.forEach((item) => {
    //             messageArr.push(item.val())
    //         })
    //         if (previousProps.currentGroup) {
    //             if (previousProps.currentGroup.groupName !== this.props.currentGroup.groupName) {
    //                 console.log('ager group', previousProps.currentGroup.groupName);
    //                 console.log('new group', this.props.currentGroup.groupName);
    //                 this.setState({ groupMsg: messageArr });
    //             }

    //         } else {
    //             this.setState({ groupMsg: messageArr })
    //             console.log(messageArr)
    //         }
    //     })

    //     onChildChanged(starCountRef, (data) => {
    //         data.forEach((item) => {
    //             messageArr.push(item.val())
    //         })
    //         if (previousProps.currentGroup) {
    //             if (previousProps.currentGroup.groupName !== this.props.currentGroup.groupName) {
    //                 // this.setState({ groupMsg: messageArr })
    //                 console.log('ager group', previousProps.currentGroup.groupName);
    //                 console.log('new group', this.props.currentGroup.groupName);
    //                 this.setState({ groupMsg: messageArr });
    //             }

    //         } else {
    //             this.setState({ groupMsg: messageArr })
    //             console.log(messageArr)
    //         }
    //     })
    // }