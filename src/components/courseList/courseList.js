import React, {Component} from 'react';
import {ListGroup} from 'reactstrap';
import CourseItem from '../courseItem/courseItem';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getKutsuApiCoursesAction} from '../../actions/kutsuApi-actions';

class CourseList extends Component {

  componentDidMount() {
    this.getCourses();
  }

  getCourses() {
    console.log('kutsuttu');
    const {getKutsuApiCoursesAction} = this.props;
    getKutsuApiCoursesAction();
  };

  render() {
    const {courses, toggle, setCourse} = this.props;
    return (
        <ListGroup>
          {courses.map((course) => {
            console.log(course);
            return <CourseItem key={course.cID} course={course}
                               toggle={toggle}
                               setCourse={setCourse}/>;
          })}
        </ListGroup>
    );
  }
};

const mapStateToProps = (store) => {
  return {
    courses: store.kutsuApiState.courses,
    isLoading: store.kutsuApiState.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getKutsuApiCoursesAction: bindActionCreators(
        getKutsuApiCoursesAction,
        dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
