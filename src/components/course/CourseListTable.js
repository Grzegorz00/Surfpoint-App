import React from "react";
import CourseListTableRow from "./CourseListTableRow";
import { useTranslation } from "react-i18next";
import { getCurrentUser, isAdmin } from '../../helpers/authHelper'

function CourseListTable(props) {
    const courses = props.courseList
    const { t } = useTranslation();
    const user = getCurrentUser();
    return(
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('course.fields.instructor')}</th>
                    <th>{t('course.fields.client')}</th>
                    <th>{t('course.fields.dateFrom')}</th>
                    <th>{t('course.fields.dateTo')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
                {courses.map(course => 
                    (user.userId === course.instructor.id) || isAdmin() ? <CourseListTableRow courseData={course} key={course.id} /> : null
                )}
            </tbody>
        </table>
    )
}

export default CourseListTable