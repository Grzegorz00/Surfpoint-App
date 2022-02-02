import React from "react";
import { getFormattedDate } from '../../helpers/dateHelper';
import { useTranslation } from 'react-i18next';

function ClientDetailsData(props) {
    const client = props.clientData
    const { t } = useTranslation();
    return(
        <React.Fragment>
            <p>{t('client.fields.name')}: {client.name}</p>
            <p>{t('client.fields.surname')}: {client.surname} </p>
            <p>{t('client.fields.age')}: {client.age} </p>
            <p>{t('client.fields.phoneNumber')}: {client.phoneNumber}</p>
            <h2>{t('client.details.courses.tableTitle')}</h2>
            <table className="table-list">
                <thead>
                    <tr>
                        <th>{t('client.details.courses.clientName')}</th>
                        <th>{t('client.details.courses.clientSurname')}</th>
                        <th>{t('client.details.courses.dateFrom')}</th>
                        <th>{t('client.details.courses.dateTo')}</th>
                    </tr>
                </thead>
                <tbody>
                    {client.courses.map(
                        course =>
                            <tr key={course.id}>
                                <td>{course.instructor.name}</td>
                                <td>{course.instructor.surname}</td>
                                <td>{course.dateFrom ? getFormattedDate(course.dateFrom) : ""}</td>
                                <td>{course.dateTo ? getFormattedDate(course.dateTo) : ""}</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ClientDetailsData