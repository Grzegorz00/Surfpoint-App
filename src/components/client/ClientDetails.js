import React from 'react'
import { Link } from 'react-router-dom'
import { getClientByIdApiCall } from '../../apiCalls/clientApiCalls'
import ClientDetailsData from "./ClientDetailsData";


class ClientDetails extends React.Component {
    constructor(props){
        super(props)
        let { clientId } = this.props.match.params
        this.state = {
            clientId: clientId,
            client: null,
            error: null,
            isLoaded: null,
            message: null
        }
    }

    fetchClientDetails = () => {
        getClientByIdApiCall(this.state.clientId)
            .then(res => res.json())
            .then(
                (data) => {
                    if (data.message) {
                        this.setState({
                            client: null,
                            message: data.message
                        })
                    } else {
                        this.setState({
                            client: data,
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
        this.fetchClientDetails()
    }

    render(){
        const { client, error, isLoaded, message } = this.state;
        let content;

        if(error){
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded){
            content = <p>Ładowanie danych pracownika...</p>
        } else if (message){
            content = <p>{message}</p>
        } else {
            content = <ClientDetailsData clientData={client} />
        }

        return(
            <main>
                <h2>Szczegóły instruktora</h2>
                {content}
                <p className="section-buttons">
                    <Link to="/client" className="button-add">Powrót</Link>
                </p>
            </main>
        )
    }
}
export default ClientDetails