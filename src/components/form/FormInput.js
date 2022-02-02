import React from 'react'
import { useTranslation } from 'react-i18next'
import { getvalidationErrorKey } from '../../helpers/formHelper'


function FormInput(props) {

    const error = props.error
    const errorKey = getvalidationErrorKey(error)
    const { t } = useTranslation()
    let translatedErrorMessage = t(errorKey)

    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title='required' aria-label="required">*</abbr>}
            </label>
            <input
                type={props.type}
                className={className}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange} 
            />
            <span id={errorSpanId} className='error-text'>{error === '' ? '' : translatedErrorMessage}</span>
        </>
    )
}

export default FormInput