import React, { Component } from 'react';
import { Alert, Button, Dropdown, Form, ListGroup, Modal } from 'react-bootstrap';
import logo from '../../../Assets/Images/profile.png';
import { BsFillPlusCircleFill, BsGlobe, BsPeopleFill } from "react-icons/bs";
import { set, ref, push, getDatabase, onValue } from '../../../firebaseCon';
import { connect } from 'react-redux';
import { setGroup } from './../../../Redux/Action/ActionIndex';

class ChatMember extends Component {
    state = {
        modal: false,
        group: [],
        groupName: '',
        groupTitle: '',
        errorMsg: '',
        successMsg: '',
        displayGroup: true,
        activeGroup: false,
    }







    handleModalChange = () => {
        if (this.state.modal) {
            this.setState({ modal: false })
            this.setState({ errorMsg: '' })
        } else {
            this.setState({ successMsg: '' })
            this.setState({ modal: true })
        }
    }




    //Catch Input Value using ...Input function.. & set input value to state.
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleCreateGroup = (e) => {
        if (this.state.groupName.length > 0 && this.state.groupTitle.length > 0) {
            const db = getDatabase()
            const groupListRef = ref(db, 'groups');
            const newGroupRef = push(groupListRef);
            set(newGroupRef, {
                createdDate: Date(),
                groupName: this.state.groupName,
                groupTitle: this.state.groupTitle,
                groupCreator: this.props.loggedInUser.displayName,
            });
            this.setState({ successMsg: 'New Group Created successfully Done..' })
            this.setState({ errorMsg: '' })
            this.setState({ groupName: '' })
            this.setState({ groupTitle: '' })
            this.setState({ modal: false })

        } else {
            this.setState({ errorMsg: 'Please Fill Group Name & Group Title' })
            this.setState({ successMsg: '' })
        }
    }


    //Set  group information to  Redux store ...from firebase realtime .
    componentDidMount() {
        const db = getDatabase();
        const starCountRef = ref(db, 'groups/');
        onValue(starCountRef, (snapshot) => {
            const afterLoadGroup = [];
            snapshot.forEach((item) => {

                let groupInfo = {
                    groupId: item.key,
                    groupName: item.val().groupName,
                    groupTitle: item.val().groupTitle,
                    groupCreator: item.val().groupCreator,
                }
                afterLoadGroup.push(groupInfo)
            })

            //addGroupOnLoad function call for for show first group after load...
            this.setState({ group: afterLoadGroup }, this.addGroupOnLoad);
        });
    }

    //This function set the first group to the state for Display....
    addGroupOnLoad = () => {
        let firstGroup = this.state.group[0];
        if (this.state.displayGroup && this.state.group.length > 0) {
            this.props.setGroup(firstGroup)
        }
        this.setState({ displayGroup: false })
    }

    //Set  group information in Redux store By handleChangeGroup function...
    handleChangeGroup = (group) => {
        this.props.setGroup(group)
    }










    render() {

        const { displayName, email } = this.props.loggedInUser;

        return (
            <div style={{ height: '100vh', backgroundColor: '#5bccf6', textAlign: 'center' }}>
                <div className="title" style={{ marginTop: '25px' }}>
                    <h2>Talk Bot<hr /></h2>
                </div>
                <div className="loggedinuser">
                    <img src={logo} alt="" style={{ width: '70px', height: '70px', borderRadius: '50%', marginBottom: '10px' }} />
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {displayName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">{email}</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Change Profile picture</Dropdown.Item>
                                <Dropdown.Item href="#/action-3" style={{ color: 'red', fontSize: '16px' }} >Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="groups" style={{ backgroundColor: '#2bccf6', marginTop: '25px' }}>

                    <BsPeopleFill style={{ color: '#fff', fontSize: '35px', marginTop: '5px' }} />

                    <h4>Groups <>({this.state.group.length})</>
                        <span style={{ marginLeft: '20px' }}>
                            {/* //Modal Start from Here...............................  */}

                            <div className="modals" style={{ display: 'inline-block' }}>
                                <Button onClick={() => this.handleModalChange()}>

                                    <BsFillPlusCircleFill />
                                </Button>
                                <Modal show={this.state.modal} onHide={() => this.handleModalChange()}>
                                    <Modal.Header closeButton style={{ textAlign: 'center' }}>
                                        <h3><BsPeopleFill size='2em' /></h3>
                                        <h3>Create New Group</h3>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            {this.state.errorMsg ?
                                                <Alert variant='danger' style={{ textAlign: 'center' }}>
                                                    {this.state.errorMsg}
                                                </Alert>
                                                :
                                                ''}

                                            {this.state.successMsg ?
                                                <Alert variant='info' style={{ textAlign: 'center' }}>
                                                    {this.state.successMsg}
                                                </Alert>
                                                : ""}

                                            <Form.Group className="mb-3" >
                                                <Form.Label> Group Name</Form.Label>
                                                <Form.Control onChange={this.handleChange} name="groupName" type="text" placeholder="Enter Group Name" value={this.state.groupName} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Group Title</Form.Label>
                                                <Form.Control onChange={this.handleChange} name="groupTitle" placeholder="Group Title" value={this.state.groupTitle} />
                                            </Form.Group>

                                            {/* <Form.Group className="mb-3" >
                                                <Form.Label>Upload Group Image</Form.Label>
                                                <Form.Control type="file" placeholder="Group Image" />
                                            </Form.Group> */}
                                        </Form>

                                    </Modal.Body>
                                    <Modal.Footer close>
                                        <Button onClick={() => this.handleModalChange()}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={() => this.handleCreateGroup()}>
                                            Create Group
                                        </Button>
                                    </Modal.Footer>

                                </Modal>
                            </div>

                        </span>
                    </h4>

                    <input type="text" placeholder="Search Group..." style={{ borderRadius: '5px' }} />
                    <ListGroup className='overflow-auto' style={{ textAlign: 'left', height: '200px' }}>
                        {this.state.group.map((item) => (

                            <Button
                                style={
                                    item.groupId === this.props.currentGroup.groupId ?
                                        activegroupstyle
                                        :
                                        groupstyle
                                }
                                onClick={() => this.handleChangeGroup(item)} ><BsGlobe style={{ marginRight: '10px' }} />
                                {item.groupName}
                            </Button>
                        ))}



                    </ListGroup>
                </div>

                <div className="friend" style={{ backgroundColor: '#5fffff', marginTop: '50px' }}>
                    <h4>Friends</h4>
                    <input type="text" placeholder="Search Friend..." style={{ borderRadius: '5px' }} />

                    <ListGroup className='overflow-auto' style={{ textAlign: 'left', height: '150px' }}>

                        <ListGroup.Item action variant="primary">Primary</ListGroup.Item>


                        <ListGroup.Item action variant="info">
                            Info
                        </ListGroup.Item>

                    </ListGroup>
                </div>



            </div>
        );
    }
}

const activegroupstyle = {
    backgroundColor: '#172437',
    color: '#01F9F1',
    textAlign: 'center',
    border: 'none',


}

const groupstyle = {
    backgroundColor: '#233B55',
    color: '#01FEFD',
    textAlign: 'left'

}


export default connect(null, { setGroup })(ChatMember);