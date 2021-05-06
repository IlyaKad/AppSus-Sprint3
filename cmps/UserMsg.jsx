import { eventBusService } from '../app-services/event-bus-service.js'


export class UserMsg extends React.Component {

  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg }, () => {
        setTimeout(() => this.setState({ msg: null }), 2500)
      })
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    if (!this.state.msg) return <span></span>
 
    return (
      <section className={'user-msg slide-in-bck-bottom '}>
        <button onClick={() => {
          this.setState({ msg: null })
        }}>x</button>
        {this.state.msg}
      </section>
    )
  }
}
