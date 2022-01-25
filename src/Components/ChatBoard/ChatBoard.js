import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ColorPlate from './ColorPlate/ColorPlate';
import ChatMember from './ChatMember/ChatMember';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { connect } from 'react-redux';

class ChatBoard extends Component {

        render() {
        return (
            <>

                <Row className="">
                    <Col xs={4} md={1} >
                        <ColorPlate />
                    </Col>

                    <Col xs={6} md={2} >
                        <ChatMember loggedInUser={this.props.loggedInUser.currentUser} currentGroup={this.props.currentGroup.currentGroup} />
                    </Col>

                    <Col xs={10} md={7} >
                        <Messages loggedInUser={this.props.loggedInUser.currentUser} currentGroup={this.props.currentGroup.currentGroup} />
                    </Col>

                    <Col xs={2} md={2} >
                        <MetaPanel />
                    </Col>
                </Row>

            </>
        );
    }
}

const data = state => ({
    loggedInUser: state.user,
    currentGroup: state.group,
});

export default connect(data)(ChatBoard);