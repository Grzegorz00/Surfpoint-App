import React from "react";
import { getClientByIdApiCall, addClientApiCall, updateClientApiCall } from "../../apiCalls/clientApiCalls";
import FormInput from "../../components/form/FormInput"
import FormButtons from "../../components/form/FormButtons"
import formMode from '../../helpers/formHelper'
import { withTranslation } from "react-i18next";
import { checkRequired, checkTextLengthRange, checkIfNumber} from '../../helpers/validationCommon'
import { Redirect } from "react-router-dom";
import { formValidationKeys } from "../../helpers/formHelper";

class ClientForm extends React.Component {

    constructor(props){
        super(props)

        const paramsClientId = props.match.params.clientId
        const currentFormMode = paramsClientId ? formMode.EDIT : formMode.NEW
        
        this.state = {
            clientId:  paramsClientId,
            client: {
                name: '',
                surname: '',
                age: '',
                phoneNumber: ''
            },
            errors: {
                name: '',
                surname: '',
                age: '',
                phoneNumber: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchClientDetails = () => {
        getClientByIdApiCall(this.state.clientId)
            .then(res => res.json())
            .then(
                (data) => {
                    if(data.message){
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            client: data,
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
            this.fetchClientDetails()
        }
    }

    handleChange = (event) => {        
        const { name, value } = event.target
        const client = { ...this.state.client }
        client[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = { ...this.state.errors}

        errors[name] = errorMessage

        this.setState({
            client: client,
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
        
        if(fieldName === 'age'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkIfNumber(fieldValue)){
                errorMessage = formValidationKeys.isDecimal;
            }
        }
        if(fieldName === 'phoneNumber'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.notEmpty
            } else if(!checkIfNumber(fieldValue)){
                errorMessage = formValidationKeys.isDecimal;
            } else if(!checkTextLengthRange(fieldValue,9,9)){
                errorMessage = formValidationKeys.containsNine;
            } 
        }

        return errorMessage
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            const
                client = this.state.client,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if (currentFormMode === formMode.NEW) {
                promise = addClientApiCall(client)

            } else if (currentFormMode === formMode.EDIT) {
                const clientId = this.state.clientId
                promise = updateClientApiCall(clientId, client)
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
        const client = this.state.client
        const errors = this.state.errors

        for(const fieldName in client){
            const fieldValue = client[fieldName]
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
            const notice = currentFormMode === formMode.NEW ? t('client.form.add.confirm.text') : t('client.form.edit.confirm.text');
            return (
                <Redirect to={{
                    pathname: "/client/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
    
        const errorsSummary = this.hasErrors() ? t('error.formHasErrors') : ''
        const fetchError = this.state.error ? `${t('error.error')}: ${this.state.error.message}` : ''
        const pageTitle = this.state.formMode === formMode.NEW ? t('client.form.add.pageTitle') : t('client.form.edit.pageTitle')
    
        const globalErrorMessage = errorsSummary || fetchError || this.state.message
    
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('client.fields.name')}
                        required
                        error={this.state.errors.name}
                        name="name"
                        placeholder={"2-100 " + t('client.form.characters')}
                        onChange={this.handleChange}
                        value={this.state.client.name}
                    />
                    <FormInput
                        type="text"
                        label={t('client.fields.surname')}
                        required
                        error={this.state.errors.surname}
                        name="surname"
                        placeholder={"2-100 " + t('client.form.characters')}
                        onChange={this.handleChange}
                        value={this.state.client.surname}
                    />
                    <FormInput
                        type="text"
                        label={t('client.fields.age')}
                        required
                        error={this.state.errors.age}
                        name="age"
                        placeholder="18"
                        onChange={this.handleChange}
                        value={this.state.client.age}
                    />
                    <FormInput
                        type="text"
                        label={t('client.fields.phoneNumber')}
                        required
                        error={this.state.errors.phoneNumber}
                        name="phoneNumber"
                        placeholder="666777888"
                        onChange={this.handleChange}
                        value={this.state.client.phoneNumber}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/client"
                    />
                </form>
            </main >
        )
    }

    
}

export default withTranslation() (ClientForm)