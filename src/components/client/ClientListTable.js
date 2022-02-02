import React from "react";
import ClientListTableRow from "./ClientListTableRow";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from '../../helpers/authHelper'

function ClientListTable(props) {
    const clients = props.clientList
    const { t } = useTranslation();
    return(
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('client.fields.name')}</th>
                    <th>{t('client.fields.surname')}</th>
                    <th>{t('client.fields.age')}</th>
                    <th>{t('client.fields.phoneNumber')}</th>
                    {isAuthenticated() && <th>{t('list.actions.title')}</th>}
                </tr>
            </thead>
            <tbody>
                {clients.map(client => 
                    <ClientListTableRow clientData={client} key={client.id}/>
                )}
            </tbody>
        </table>
    )
}

export default ClientListTable