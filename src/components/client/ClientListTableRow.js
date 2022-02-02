import React from "react";
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { isAuthenticated } from '../../helpers/authHelper'

function ClientListTableRow(props) {
    const client = props.clientData;
    const { t } = useTranslation();
    return(
        <tr>
            <td>{client.name}</td>
            <td>{client.surname}</td>
            <td>{client.age}</td>
            <td>{client.phoneNumber}</td>
            {isAuthenticated() && 
                <td>
                    <ul className="list-actions">
                        <li>
                            <Link to={`client/details/${client.id}`} className="list-actions-button-details">{t('list.actions.details')}</Link>
                        </li>
                        <li>
                            <Link to={`/client/edit/${client.id}`} className="list-actions-button-edit">{t('list.actions.edit')}</Link>
                        </li>
                        <li>
                            <Link to={`client/delete/${client.id}`} className="list-actions-button-delete">{t('list.actions.delete')}</Link>
                        </li>
                    </ul>
                </td>
            }
        </tr>
    )
}

export default ClientListTableRow