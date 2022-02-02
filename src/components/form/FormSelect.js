import React from 'react'
import { isAdmin, isUser } from '../../helpers/authHelper'

function FormSelect(props) {
    const className = props.error === '' ? '' : 'error-input'
    const name = props.name
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1)
    const options = props.selectData
    const isClient = props.data === "client"
    return (
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <abbr title='required' aria-label="required">*</abbr>}
            </label>
            <select
                type={props.type}
                className={className}
                name={props.name}
                id={props.name}
                onChange={props.onChange} v
                value={props.value}
            >
                <option value="">{props.preSelectedText}</option>
                    {options.map((option) => (
                       isAdmin() || isClient || isUser(option.id) ? <option value={option.id}>{option.name + ' ' + option.surname}</option> : null
                    ))}
                
            </select>
            <span id={errorSpanId} className='error-text'>{props.error}</span>
        </>
    )
}

export default FormSelect