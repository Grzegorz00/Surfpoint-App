import React from "react";
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from 'react-i18next';

function CourseDetailsData(props) {
    const course = props.courseData
    const { t } = useTranslation();
    return(
        <React.Fragment>
            <p>{t('course.fields.instructor')}: {course.instructor.surname}</p>
            <p>{t('course.fields.client')}: {course.client.surname} </p>
            <p>{t('course.fields.dateFrom')}: {course.dateFrom ? getFormattedDate(course.dateFrom) : ""} </p>
            <p>{t('course.fields.dateTo')}: {course.dateTo ? getFormattedDate(course.dateTo) : ""}</p>
        </React.Fragment>
    )
}

export default CourseDetailsData