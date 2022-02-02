import React from 'react';
import { Link } from 'react-router-dom';
import { getCourseByIdApiCall } from '../../apiCalls/courseApiCalls';
import { withTranslation } from "react-i18next";
import CourseDetailsData from './CourseDetailsData'

class CourseDetails extends React.Component {
    constructor(props) {
        super(props)
        let { courseId } = props.match.params
        this.state = {
            courseId: courseId,
            course: null,
            error: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.fetchCourseDetails()
    }

    fetchCourseDetails = () => {
        getCourseByIdApiCall(this.state.courseId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            course: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            course: data,
                            message: null,
                        })
                    }
                    this.setState({
                        isLoaded: true,
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                })
    }

    render() {
        const { course, error, isLoaded, message } = this.state
        let content;

        const { t } = this.props;

        if(error){
            content = <p>{t('error.error')}: {error.message}</p>
        } else if (!isLoaded){
            content = <p>{t('course.list.loadingText')}</p>
        }  else if (message) {
            content = <p>{message}</p>
        } else {
            content = <CourseDetailsData courseData={course} />
        }

        return (
            <main>
                <h2>{t('course.list.details')}</h2>
                {content}
                <div className="section-buttons">
                    <Link to="/course" className="button-add">{t('form.actions.return')}</Link>
                </div>
            </main >
        )
    }
}

export default withTranslation() (CourseDetails)