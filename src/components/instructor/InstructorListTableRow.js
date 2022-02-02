import React from "react";
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { isAuthenticated, isAdmin, isUser } from '../../helpers/authHelper'

function InstructorListTableRow(props) {
    const instructor = props.instructorData
    const { t } = useTranslation();

    return(
        <tr>
            <td>{instructor.name}</td>
            <td>{instructor.surname}</td>
            <td>{instructor.email}</td>
            <td>{instructor.sport}</td>
            <td>{instructor.price}</td>
            {isAuthenticated() && 
                <td>
                    <ul className="list-actions">
                        <li>
                            <Link to={`instructor/details/${instructor.id}`} className="list-actions-button-details">{t('list.actions.details')}</Link>
                        </li>
                        <li>
                            {(isUser(instructor.id) || isAdmin()) &&
                                <Link to={`/instructor/edit/${instructor.id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                            }
                        </li>
                        <li>
                            {isAdmin() &&
                                <Link to={`instructor/delete/${instructor.id}`} className="list-actions-button-delete"> {t('list.actions.delete') } </Link>
                            }   
                        </li>
                    </ul>
                </td>
            }
        </tr>
    )
}

export default InstructorListTableRow