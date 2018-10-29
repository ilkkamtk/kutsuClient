import React, {Component} from 'react';
import Header from '../header/header';
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  Container,
} from 'reactstrap';
import Courses from '../courseList/courseList';
import CallForm from '../callForm/callForm';
import Wait from '../wait/wait';
import classnames from 'classnames';
import connect from 'react-redux/es/connect/connect';
import {
  deleteKutsuApiCallAction,
  getKutsuApiQueueAction,
} from '../../actions/kutsuApi-actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.makeCall = this.makeCall.bind(this);
    this.getQueue = this.getQueue.bind(this);
    this.stopQueue = this.stopQueue.bind(this);
    this.deleteCall = this.deleteCall.bind(this);
    this.state = {
      activeTab: '1',
      queue: 0
    };
    this.interval = null;
  }

  getQueue() {
    this.interval = setInterval(() => {
      const {kcID, kType, kID} = this.props.call;
      this.props.getKutsuApiQueueAction(kcID, kID, kType);
    }, 10000);
  }

  stopQueue() {
    clearInterval(this.interval);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  makeCall() {
    this.toggle('3');
    this.getQueue();
  }

  deleteCall() {
    this.props.deleteKutsuApiCallAction(this.props.call.kID);
    this.props.call.kID = 0;
    this.stopQueue();
    this.toggle('2');
  }

  render() {
    return (
        <Container fluid>
          <Header/>
          <main className={'row main'}>
            <Col/>
            <div className={'col'}>
              <Nav tabs>
                <NavItem>
                  <NavLink className={classnames(
                      {active: this.state.activeTab === '1'})}
                           onClick={() => {
                             this.toggle('1');
                           }}
                           disabled={this.state.activeTab !== 1}
                  >
                    Select course
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                      className={classnames(
                          {active: this.state.activeTab === '2'})}
                      onClick={() => {
                        this.toggle('2');
                      }}
                      disabled={this.state.activeTab !== 2}
                  >
                    Call teacher
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                      className={classnames(
                          {active: this.state.activeTab === '3'})}
                      onClick={() => {
                        this.toggle('3');
                      }}
                      disabled={this.state.activeTab !== 3}
                  >
                    Hold on to your butt
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Courses toggle={this.toggle}/>
                </TabPane>
                <TabPane tabId="2">
                  <h3>Do you want help with coding or to submit tasks?</h3>
                  <CallForm makeCall={this.makeCall}/>
                </TabPane>
                <TabPane tabId="3" className={'last-tab'}>
                  <Wait/>
                  <Button color="info" onClick={this.deleteCall}>Cancel
                    request</Button>
                  <Button disabled>Queue {this.props.queue}</Button>
                </TabPane>
              </TabContent>
            </div>
            <Col/>
          </main>
        </Container>
    );
  }
}

const mapStateToProps = (store) => ({
  call: store.kutsuApiState.call,
  queue: store.kutsuApiState.queue,
});

export default connect(mapStateToProps,
    {deleteKutsuApiCallAction, getKutsuApiQueueAction})(AppContainer);
