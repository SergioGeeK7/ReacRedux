// React Redux Container Component
// React Stateless Component
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm'
import toastr from 'toastr'

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
		
		// explode because is still doing the ajax call so right now you doesn't have that prop.course 
		// when the call end will remount this component and set the prop
    this.state = {
        course: Object.assign({},props.course),// an empy course pass in by mapStateToProps
        errors: {},
				saving: false
    }
		this.updateCourseState = this.updateCourseState.bind(this)
		this.saveCourse = this.saveCourse.bind(this)
  }
	
	componentWillReceiveProps(nextProps){
		if(this.props.course.id != nextProps.course.id){
			this.setState({course: Object.assign({},nextProps.course)});
		}
	}
	
	updateCourseState(event){
			const field = event.target.name;
			let course = this.state.course;
			course[field] = event.target.value;
			return this.setState({course});
	}
	
	saveCourse(event) {
		event.preventDefault();
		this.setState({saving:true})
		this
			.props
			.actions
			.saveCourse(this.state.course)
			.then(()=>this.redirect())
			.catch(error=> {
				toastr.error(error);
				this.setState({saving: false})
			})
		
	}

	redirect() {
		toastr.success("Course Saved ")
		this.context.router.push("/courses")
		//this.setState({saving:false})
	}
		
  render() {
    return (
            <CourseForm 
                allAuthors={this.props.authors}
								onChange={this.updateCourseState}
								onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors}
								saving={this.state.saving}
            />
    );
  }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
		actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
	router: PropTypes.object
}

function getCourseById(courses,id){
	return courses.find(course=>course.id === id);
}


// this state is the whole application. WHOLE that is why you just set what you need
// and if somebody somewhere update a state this will fire and re-set the data as a prop
function mapStateToProps(state, ownProps) {

		console.info("Fire Up !!!");
		//console.info(state.courses);
		
		
		const courseId = ownProps.params.id;
		let course = {id: '', watchHref: '', title: 'default title', authorId: '', length: '', category: ''};
		course = courseId && state.courses.length > 0 ? getCourseById(state.courses,courseId) : course;
	
	
		const authorsFormatedForDropdown = state.authors.map(author=>({
				value: author.id,
				text: author.firstName + ' ' + author.lastName
		}));
				
    return {
 			course: course,
 			authors: authorsFormatedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);