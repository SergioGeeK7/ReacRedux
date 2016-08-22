import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as courseActions from '../../actions/courseActions'
import {bindActionCreators} from 'redux'
import CourseList from './CourseList'
import {browserHistory} from 'react-router'

class CoursesPage extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            course : {title: '' }
        }
				this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this)
    }
    
    courseRow(course,index){
        return <div key={index}>{course.title}</div>
    }
	
		redirectToAddCoursePage() {
			browserHistory.push("/course")
		}
    
    render() {
        const {courses} = this.props
        
        return (
            <div>
                <h1>Courses</h1>
								<input type="submit"
											 value="Add Course"
											 className="btn btn-primary"
											 onClick={this.redirectToAddCoursePage}
								/>
                <CourseList courses={courses}/>
            </div>
        )
    }
}
CoursesPage.propTypes = {
    // dispatch:PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    //createCourse: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch){
    // this line is going to call all dispatches and see what match for this action
    return {
        //createCourse: course => dispatch(courseActions.createCourse(course))
        actions: bindActionCreators(courseActions,dispatch) // all the courseActions will have maped
    }
}

// index reducer was imported in index app
function mapStateToProps (state,ownProps) {
    // update my state by upcoming prop change
    return {
        courses: state.courses // index reducer
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage)