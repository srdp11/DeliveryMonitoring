class Record extends React.Component {
  render() {
    return(
      <tr>
        <td>{ this.props.record.mail_id }</td>
        <td>{ this.props.record.sender_address }</td>
        <td>{ this.props.record.recipient_address }</td>
        <td>{ this.props.record.status }</td>
        <td>{ this.props.record.phone_num }</td>
      </tr>
    );
  }
}
