import React from "react";
import { getInstructorApiCall } from "../../apiCalls/instructorApiCalls";
import { Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";
import InstructorListTable from "./InstructorListTable";

class InstructorList extends React.Component{

    constructor(props){
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            instructors: [],
            notice: notice
        }
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

    componentDidMount(){
        this.fetchInstructorList();
    }

    render(){
        const { error, isLoaded, instructors } = this.state;
        let content;
        const { t } = this.props;

        if(error){
            content = <p>{t('error.error')}: {error.message}</p>
        } else if (!isLoaded){
            content = <p>{t('instructor.list.loadingText')}</p>
        } else {
            content = <InstructorListTable instructorList={instructors} />
        }
        
        return(
            <main>
                <h2>{t('instructor.list.pageTitle')}</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/instructor/add" className="button-add">{t('instructor.list.addNew')}</Link>
                </p>
            </main>
        )
    }

}

export default withTranslation() (InstructorList)