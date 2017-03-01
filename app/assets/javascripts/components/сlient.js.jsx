const Client = (props) => {

  if (!props.isAuth()) {
    return <ClientLoginForm getClientMode={ props.getClientMode }
                            isFailedAuth={ props.isFailedAuth }
                            onSignin={ props.onSignin }
                            />
  }
  else {
    return <ClientProfile getPhoneNum={ props.getPhoneNum }
                          onSignout={ props.onSignout }
                          phone_num={ props.phone_num }
                          records={ props.records }
                          mail_id={ props.mail_id }
                          status_list={ props.status_list }
                          />
  }
}
