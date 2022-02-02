import React from "react";
import InstructorListTableRow from "./InstructorListTableRow";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from '../../helpers/authHelper'

function InstructorListTable(props) {
    const instructors = props.instructorList
    const { t } = useTranslation();
    return(
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('instructor.fields.name')}</th>
                    <th>{t('instructor.fields.surname')}</th>
                    <th>Email</th>
                    <th>{t('instructor.fields.sport')}</th>
                    <th>{t('instructor.fields.price')}</th>
                    {isAuthenticated() && <th>{t('list.actions.title')}</th>}
                </tr>
            </thead>
            <tbody>
                {instructors.map((instructor, index) => 
                    index === 0 ? null : <InstructorListTableRow instructorData={instructor} key={instructor.id}/>
                )}
            </tbody>
        </table>
    )
}

export default InstructorListTable