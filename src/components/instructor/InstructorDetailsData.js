import React from "react";
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';

function InstructorDetailsData(props) {
    const instructor = props.instructorData
    const { t } = useTranslation();
    return(
        <React.Fragment>
            <p>{t('instructor.fields.name')}: {instructor.name}</p>
            <p>{t('instructor.fields.surname')}: {instructor.surname} </p>
            <p>{t('instructor.fields.email')}: {instructor.email} </p>
            <p>{t('instructor.fields.sport')}: {instructor.sport}</p>
            <p>{t('instructor.fields.price')}: {instructor.price}</p>
            <h2>{t('instructor.details.courses.tableTitle')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('instructor.details.courses.clientName')}</th>
                        <th>{t('instructor.details.courses.clientSurname')}</th>
                        <th>{t('instructor.details.courses.dateFrom')}</th>
                        <th>{t('instructor.details.courses.dateTo')}</th>
                    </tr>
                </thead>
                <tbody>
                    {instructor.courses.map(
                        course =>
                            <tr key={course.id}>
                                <td>{course.client.name}</td>
                                <td>{course.client.surname}</td>
                                <td>{course.dateFrom ? getFormattedDate(course.dateFrom) : ""}</td>
                                <td>{course.dateTo ? getFormattedDate(course.dateTo) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default InstructorDetailsData