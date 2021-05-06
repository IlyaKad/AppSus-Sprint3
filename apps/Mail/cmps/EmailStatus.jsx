import { eventBusService } from '../../../app-services/event-bus-service.js'

export class EmailStatus extends React.Component {

    removeEvent;
    state = {
        emailCount: 0
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('email-count', (emailCount) => {
            this.setState({ emailCount })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }


    render() {
        console.log(this.props.emails.length);
        return (
            <span>
                ({this.state.emailCount})
            </span>
        )
    }
}
