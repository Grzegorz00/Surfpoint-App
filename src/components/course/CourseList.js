import React from 'react';
import { Link } from 'react-router-dom';
import { getCourseApiCall } from '../../apiCalls/courseApiCalls';
import { withTranslation } from "react-i18next";
import CourseListTable from './CourseListTable'

class CourseList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            courses: []
        }
    }

    componentDidMount() {
        this.fetchCourseList()
    }

    fetchCourseList = () => {
        getCourseApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        courses: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, courses } = this.state
        let content;
        const { t } = this.props;

        if (error) {
            content = <p>{t('error.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('course.list.loadingText')}</p>
        } else {
            content = <CourseListTable courseList={courses} />
        }

        return (
            <main>
                <h2>{t('course.list.pageTitle')}</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/course/add" className="button-add">{t('course.list.addNew')}</Link>
                </p>
            </main>
        )
    }
}

export default withTranslation() (CourseList)