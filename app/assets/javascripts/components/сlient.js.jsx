const Client = (props) => {
  if (props.getClientMode() == "login") {
    return <ClientLoginForm switchClientMode={ props.switchClientMode }
                            getClientMode={ props.getClientMode }
                            setPhoneNum={ props.setPhoneNum }
                            onSignin={ props.onSignin }
                            setupSubscription={ props.setupSubscription }
                            setAuthStatus={ props.setAuthStatus }
                            getAuthStatus={ props.getAuthStatus }
                            />
  }
  else if (props.getClientMode() == "client_info") {
    return <ClientProfile getPhoneNum={ props.getPhoneNum }
                          onSignout={ props.onSignout }
                          phone_num={ props.phone_num }
                          records={ props.records }
                          mail_id={ props.mail_id }
                          status_list={ props.status_list }
                          />
  }
}
