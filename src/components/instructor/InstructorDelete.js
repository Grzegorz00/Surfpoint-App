import React from "react";
import { getInstructorByIdApiCall, deleteInstructorApiCall } from "../../apiCalls/instructorApiCalls";
import { Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

class InstructorDelete extends React.Component{

    constructor(props){
        super(props)
        let { instructorId } = this.props.match.params
        
        this.state = {
            error: null,
            isLoaded: false,
            instructorId: instructorId,
            instructor: null,
            message: null,
            redirect: false
        }
    }

    fetchInstructorDetails = () => {
        getInstructorByIdApiCall(this.state.instructorId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            instructor: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            instructor: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true,
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

    componentDidMount(){
        this.fetchInstructorDetails();
    }

    handleDelete = () => {
        let 
            promise,
            response;

        promise = deleteInstructorApiCall(this.state.instructorId)

        if (promise) {
            promise
            .then(
                (data) => {
                    response = data
                        if (response.status === 201 || response.status === 500) {
                            return data.json()
                        }
                })
            
            this.setState({ redirect: true })
        }
    }

    render(){
        const { error, isLoaded, instructor } = this.state;
        let content;
        const { redirect } = this.state
        const { t } = this.props;

        if (redirect) {
                return (
                <Redirect to={{
                    pathname: "/instructor"
                }} />
            )
        }

        if(error){
            content = <p>{t('error.error')}: {error.message}</p>
        } else if (!isLoaded){
            content = <p>{t('instructor.list.loadingText')}</p>
        } else {
            content = 
                <div>
                    <p><b>{t('instructor.fields.name')}</b>: {instructor.name}</p> 
                    <p><b>{t('instructor.fields.surname')}</b>: {instructor.surname}</p>
                </div>
            
        }

        
        return(
            <main>
                <h2>Jesteś pewny że chcesz usunąć instruktora?</h2>
                {content}
                
                <button className="button-add" onClick={() => this.handleDelete()}>Tak</button>
                <br></br>
                <br></br>
                <Link to="/instructor" className="button-add">Nie</Link>
                
            </main>
        )
    }

}

export default withTranslation() (InstructorDelete)