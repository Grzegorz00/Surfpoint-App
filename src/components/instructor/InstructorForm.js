import React from "react";
import { getInstructorByIdApiCall, addInstructorApiCall, updateInstructorApiCall } from "../../apiCalls/instructorApiCalls";
import FormInput from "../../components/form/FormInput"
import FormButtons from "../../components/form/FormButtons"
import formMode from '../../helpers/formHelper'
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { formValidationKeys } from "../../helpers/formHelper";

import { checkRequired, checkTextLengthRange, checkIfNumber, checkEmail} from '../../helpers/validationCommon'

class InstructorForm extends React.Component {

    
    constructor(props){
        super(props)

        const paramsInstructorId = props.match.params.instructorId
        const currentFormMode = paramsInstructorId ? formMode.EDIT : formMode.NEW
        
        this.state = {
            instructorId:  paramsInstructorId,
            instructor: {
                name: '',
                surname: '',
                email: '',
                sport: '',
                price: '',
                password: ''
            },
            errors: {
                name: '',
                surname: '',
                email: '',
                sport: '',
                price: '',
                password: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchInstructorDetails = () => {
        getInstructorByIdApiCall(this.state.instructorId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message){
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            instructor: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode
        if(currentFormMode === formMode.EDIT){
            this.fetchInstructorDetails()
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const instructor = { ...this.state.instructor }
        instructor[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors}

        errors[name] = errorMessage

        this.setState({
            instructor: instructor,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = ''
        
        if(fieldName === 'name'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkTextLengthRange(fieldValue, 2, 100)){
                errorMessage = formValidationKeys.len_2_100;
            }
        }
        if(fieldName === 'surname'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkTextLengthRange(fieldValue, 2, 100)){
                errorMessage = formValidationKeys.len_2_100;
            }
        }
        if(fieldName === 'email'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkTextLengthRange(fieldValue, 5, 50)){
                errorMessage = formValidationKeys.len_5_50;
            } else if(!checkEmail(fieldValue)){
                errorMessage = formValidationKeys.isEmail;
            }
        }
        if(fieldName === 'sport'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkTextLengthRange(fieldValue, 2, 100)){
                errorMessage = formValidationKeys.len_2_100;
            }
        }
        if(fieldName === 'price'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkIfNumber(fieldValue)){
                errorMessage = formValidationKeys.isDecimal;
            }
        }
        if(fieldName === 'password' && this.state.formMode === formMode.NEW ){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } 
        }

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                instructor = this.state.instructor,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addInstructorApiCall(instructor)

            } else if (currentFormMode === formMode.EDIT) {
                const instructorId = this.state.instructorId
                promise = updateInstructorApiCall(instructorId, instructor)
                
            }
            if (promise) {
                promise
                .then(
                    (data) => {
                        response = data
                            if (response.status === 201 || response.status === 500) {
                                return data.json()
                            }
                        })
                    .then(
                        (data) => {
                            if (!response.ok && response.status === 500) {
                                for (const i in data) {
                                    const errorItem = data[i]
                                    const errorMessage = errorItem.message
                                    const fieldName = errorItem.path
                                    const errors = { ...this.state.errors }
                                    errors[fieldName] = errorMessage
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    })
                                }
                            } else {
                                this.setState({ redirect: true })
                            }
                        },
                        (error) => {
                            this.setState({ error })
                            console.log(error)
                        }
                    )
            }
        }
    }
    
    validateForm = () => {
        const instructor = this.state.instructor
        const errors = this.state.errors

        for(const fieldName in instructor){
            const fieldValue = instructor[fieldName]
            const errorMessage = this.validateField(fieldName,fieldValue)
            errors[fieldName] = errorMessage
        }
        this.setState({
            errors: errors
        })
        return !this.hasErrors()
    }

    hasErrors = () => {
        const errors = this.state.errors
        for(const errorField in this.state.errors){
            if(errors[errorField].length > 0){
                return true
            }
        }
        return false
    }

    render() {
        const { t } = this.props;

        const { redirect } = this.state
        if (redirect) {
            const currentFormMode = this.state.formMode;
            const notice = currentFormMode === formMode.NEW ? t('instructor.form.add.confirm.text') : t('instructor.form.edit.confirm.text');
                return (
                <Redirect to={{
                    pathname: "/instructor/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
    
        const errorsSummary = this.hasErrors() ? t('error.formHasErrors') : ''
        const fetchError = this.state.error ? `${t('error.error')}: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('instructor.form.add.pageTitle') : t('instructor.form.edit.pageTitle')
    
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
    
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('instructor.fields.name')}
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder= {"2-100 " + t('instructor.form.characters')}
                        onChange={this.handleChange}
                        value={this.state.instructor.name}
                        />
                    <FormInput
                        type="text"
                        label={t('instructor.fields.surname')}
                        required
                        error={this.state.errors.surname}
                        name="surname"
                        placeholder={"2-100 " + t('instructor.form.characters')}
                        onChange={this.handleChange}
                        value={this.state.instructor.surname}
                    />
                    <FormInput
                        type="text"
                        label={t('instructor.fields.email')}
                        required
                        error={this.state.errors.email}
                        name="email"
                        placeholder="name@domain.com"
                        onChange={this.handleChange}
                        value={this.state.instructor.email}
                    />
                    <FormInput
                        type="text"
                        label={t('instructor.fields.sport')}
                        required
                        error={this.state.errors.sport}
                        name="sport"
                        placeholder="kitesurfing"
                        onChange={this.handleChange}
                        value={this.state.instructor.sport}
                    />
                    <FormInput
                        type="text"
                        label={t('instructor.fields.price')}
                        required
                        error={this.state.errors.price}
                        name="price"
                        placeholder="100"
                        onChange={this.handleChange}
                        value={this.state.instructor.price}
                    />
                    {this.state.formMode === formMode.NEW ? <FormInput
                        type="password"
                        label={t('instructor.fields.password')}
                        required
                        error={this.state.errors.password}
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.instructor.password}
                    /> : null}
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/instructor"
                    />
                </form>
            </main >
        )
    }
    
    
}

export default withTranslation() (InstructorForm)