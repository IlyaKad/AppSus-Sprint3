import { eventBusService } from '../../../app-services/event-bus-service.js'


export class UserMsg extends React.Component {

  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg }, () => {
        setTimeout(() => this.setState({ msg: null }), 3000)
      })
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    if (!this.state.msg) return <span></span>
    const msgClass = this.state.msg.type || ''
    return (
      <section className={'user-msg slide-in-bck-bottom ' + msgClass}>
        <button onClick={() => {
          this.setState({ msg: null })
        }}>x</button>
        {this.state.msg}
      </section>
    )
  }
}
