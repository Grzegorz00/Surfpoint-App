import React from 'react'
import { Link } from 'react-router-dom'
import { getInstructorByIdApiCall } from '../../apiCalls/instructorApiCalls'
import { withTranslation } from "react-i18next";
import InstructorDetailsData from "./InstructorDetailsData";


class InstructorDetails extends React.Component {
    constructor(props){
        super(props)
        let { instructorId } = this.props.match.params
        this.state = {
            instructorId: instructorId,
            instructor: null,
            error: null,
            isLoaded: null,
            message: null
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
        this.fetchInstructorDetails()
    }

    render(){
        const { instructor, error, isLoaded, message } = this.state;
        let content;

        const { t } = this.props;

        if(error){
            content = <p>{t('error.error')}: {error.message}</p>
        } else if (!isLoaded){
            content = <p>{t('instructor.list.loadingText')}</p>
        } else if (message){
            content = <p>{message}</p>
        } else {
            content = <InstructorDetailsData instructorData={instructor} />
        }

        return(
            <main>
                <h2>{t('instructor.list.details')}</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/instructor" className="button-add">{t('form.actions.return')}</Link>
                </p>
            </main>
        )
    }
}
export default withTranslation() (InstructorDetails)