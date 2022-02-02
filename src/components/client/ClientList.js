import React from "react";
import { getClientApiCall } from "../../apiCalls/clientApiCalls";
import { Link } from 'react-router-dom'
import { withTranslation } from "react-i18next";
import ClientListTable from "./ClientListTable";

class ClientList extends React.Component{

    constructor(props){
        super(props)
        let notice = props.location.state && props.location.state.notice ? props.location.state.notice : ''
        this.state = {
            error: null,
            isLoaded: false,
            clients: [],
            notice: notice
        }
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

    componentDidMount(){
        this.fetchClientList();
    }

    render(){
        const { error, isLoaded, clients } = this.state;
        let content;
        const { t } = this.props;

        if(error){
            content = <p>{t('error.error')}: {error.message}</p>
        } else if (!isLoaded){
            content = <p>{t('client.list.loadingText')}</p>
        } else {
            content = <ClientListTable clientList={clients} />
        }
        
        return(
            <main>
                <h2>{t('client.list.pageTitle')}</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/client/add" className="button-add">{t('client.list.addNew')}</Link>
                </p>
            </main>
        )
    }

}

export default withTranslation() (ClientList)