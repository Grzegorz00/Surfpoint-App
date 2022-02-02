import React from 'react'
import { Link } from 'react-router-dom'
import formMode from '../../helpers/formHelper'
import { useTranslation } from "react-i18next";

function FormButtons (props) {
    const { t } = useTranslation();
    
    const submitButtonLabel = props.formMode === formMode.NEW ? t('instructor.form.add.btnLabel') : t('instructor.form.edit.btnLabel') 

    return (
        <div className='form-buttons'>
            <p id="errorsSummary" className='errors-text'>{props.error}</p>
            <input className='form-button-submit' type="submit" value={submitButtonLabel} />
            <Link to={props.cancelPath} className="form-button-cancel">{t('form.actions.cancel')}</Link>
        </div>
    )
}

export default FormButtons