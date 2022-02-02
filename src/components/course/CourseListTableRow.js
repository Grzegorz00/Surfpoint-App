import React from "react";
import { Link } from 'react-router-dom'
import { getFormattedDate } from '../../helpers/dateHelper'
import { useTranslation } from "react-i18next";

function CourseListTableRow(props) {
    const course = props.courseData;
    const { t } = useTranslation();
    return(
        <tr>
            <td>{course.instructor.name}</td>
            <td>{course.client.surname}</td>
            <td>{course.dateFrom ? getFormattedDate(course.dateFrom) : ""}</td>
            <td>{course.dateFrom ? getFormattedDate(course.dateFrom) : ""}</td>
            <td>
                <ul className="list-actions">
                    <li>
                        <Link to={`course/details/${course.id}`} className="list-actions-button-details">{t('list.actions.details')}</Link>
                    </li>
                    <li>
                        <Link to={`course/edit/${course.id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                    </li>
                    <li>
                        <Link to={`course/delete/${course.id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                    </li>
                </ul>
            </td>
        </tr>
    )
}

export default CourseListTableRow