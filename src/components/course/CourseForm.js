import React from "react";
import { getCourseByIdApiCall, addCourseApiCall, updateCourseApiCall } from "../../apiCalls/courseApiCalls";
import { getClientApiCall } from "../../apiCalls/clientApiCalls";
import { getInstructorApiCall } from "../../apiCalls/instructorApiCalls";
import FormInput from "../../components/form/FormInput"
import FormSelect from "../../components/form/FormSelect"
import FormButtons from "../../components/form/FormButtons"
import formMode from '../../helpers/formHelper'
import { getFormattedDate } from '../../helpers/dateHelper'
import { withTranslation } from "react-i18next";
import { checkRequired, checkDate } from '../../helpers/validationCommon'
import { Redirect } from "react-router-dom";
import { formValidationKeys } from "../../helpers/formHelper";

class CourseForm extends React.Component {

    constructor(props){
        super(props)

        const paramsCourseId = props.match.params.courseId
        const currentFormMode = paramsCourseId ? formMode.EDIT : formMode.NEW
        
        this.state = {
            courseId:  paramsCourseId,
            course: {
                instructor_id: '',
                client_id: '',
                dateFrom: '',
                dateTo: ''
            },
            errors: {
                instructor: '',
                client: '',
                dateFrom: '',
                dateTo: ''
            },
            instructors: [],
            clients: [],
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchCourseDetails = () => {
        getCourseByIdApiCall(this.state.courseId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message){
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            course: data,
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

    fetchInstructorList = () => {
        getInstructorApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        instructors: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    fetchClientList = () => {
        getClientApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        clients: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount = () => {
        this.fetchInstructorList();
        this.fetchClientList();
        const currentFormMode = this.state.formMode
        
        if(currentFormMode === formMode.EDIT){
            this.fetchCourseDetails()
        }
    }

    handleChange = (event) => {        
        const { name, value } = event.target
        const course = { ...this.state.course }
        course[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors}

        errors[name] = errorMessage

        this.setState({
            course: course,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = ''
        
        if(fieldName === 'instructor_id' && !checkRequired(fieldValue)){
            errorMessage = formValidationKeys.notEmpty; 
        }

        if(fieldName === 'client_id' && !checkRequired(fieldValue)){
            errorMessage = formValidationKeys.notEmpty; 
        }
        
        if(fieldName === 'dateFrom'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty;
            } else if(!checkDate(fieldValue)){
                errorMessage = formValidationKeys.isDate
            }
        }
        if(fieldName === 'dateTo'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty;
            } else if(!checkDate(fieldValue)){
                errorMessage = formValidationKeys.isDate
            }
        }

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            const
                course = this.state.course,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addCourseApiCall(course)

            } else if (currentFormMode === formMode.EDIT) {
                const courseId = this.state.courseId
                promise = updateCourseApiCall(courseId, course)
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
        const course = this.state.course
        const errors = this.state.errors

        for(const fieldName in course){
            const fieldValue = course[fieldName]
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
            const currentFormMode = this.state.formMode
            const notice = currentFormMode === formMode.NEW ? t('course.form.add.confirm.text') : t('course.form.edit.confirm.text');
            return (
                <Redirect to={{
                    pathname: "/course/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
    
        const errorsSummary = this.hasErrors() ? t('error.formHasErrors') : ''
        const fetchError = this.state.error ? `${t('error.error')}: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('course.form.add.pageTitle') : t('course.form.edit.pageTitle')
    
        const globalErrorMessage = errorsSummary || fetchError || this.state.message

        const instructors = this.state.instructors;
        const clients = this.state.clients;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormSelect
                        preSelectedText= {t('course.fields.preSelectedTextInstr')}
                        data = "instructor"
                        selectData = {instructors}
                        type="text"
                        label={t('course.fields.instructor')}
                        required
                        error={this.state.errors.instructor}
                        name="instructor_id"
                        placeholder={"2-100 " + t('course.form.characters')}
                        onChange={this.handleChange}
                        value={this.state.course.instructor_id}
                    />
                    <FormSelect
                        preSelectedText= {t('course.fields.preSelectedTextKlient')}
                        selectData = {clients}
                        data = "client"
                        type="text"
                        label={t('course.fields.client')}
                        required
                        error={this.state.errors.client}
                        name="client_id"
                        placeholder={"2-100 " + t('course.form.characters')}
                        onChange={this.handleChange}
                        value={this.state.course.client_id}
                    />
                    <FormInput
                        type="date"
                        label={t('course.fields.dateFrom')}
                        required
                        error={this.state.errors.dateFrom}
                        name="dateFrom"
                        onChange={this.handleChange}
                        value={this.state.course.dateFrom ? getFormattedDate(this.state.course.dateFrom) : ""}
                    />
                    <FormInput
                        type="date"
                        label={t('course.fields.dateTo')}
                        required
                        error={this.state.errors.dateTo}
                        name="dateTo"
                        onChange={this.handleChange}
                        value={this.state.course.dateTo ? getFormattedDate(this.state.course.dateTo) : ""}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/course"
                    />
                </form>
            </main >
        )
    }

    
}

export default withTranslation() (CourseForm)