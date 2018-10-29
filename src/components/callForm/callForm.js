import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Row, Col} from 'reactstrap';
import connect from 'react-redux/es/connect/connect';
import {postKutsuApiCallAction} from '../../actions/kutsuApi-actions';
import {setUserAction} from '../../actions/user-actions';

const CallForm = ({makeCall, postKutsuApiCallAction, setUserAction, course, call}) => {
  console.log(call);
  if(call.success){
    makeCall();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = {
      kName: fd.get('kName'),
      kType: fd.get('kType'),
      kcID: course.cID,
    };

    setUserAction(data);


    postKutsuApiCallAction(data);
    makeCall();
  };

  return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="kName" id="kName"
                 placeholder="Enter your name." required/>
        </FormGroup>
        <Row>
          <Col>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="kType" required
                       value="0"/>{''}
                Help with coding.
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="kType" required
                       value="1"/>{''}
                Submit tasks.
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup inline>
              <Button color="primary" size="lg" block>
                Submit
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
  );

};

const mapStateToProps = (store) => ({
  course: store.userEventsState.selectedCourse,
  call: store.kutsuApiState.call,
});

export default connect(mapStateToProps,
    {setUserAction, postKutsuApiCallAction})(
    CallForm);

