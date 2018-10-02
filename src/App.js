import React, { PureComponent } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import actions from "./redux/actions"
import I18n from "./I18n"
import Header from "./components/Header"
import firebase from "firebase/app/"
require("firebase/firestore")

class App extends PureComponent {
  componentDidMount() {
    // this.props.getI18n()
  }

  render() {
    const t = key => {
      const { lang, translations } = this.props
      if (translations[key] && translations[key][lang])
        return translations[key][lang]
      else {
        return key
      }
    }

    var config = {
      apiKey: "AIzaSyC6q-D8VQmRNwi6p6lkFrIUwGmqehfbKMo",
      authDomain: "least-amount.firebaseapp.com",
      databaseURL: "https://least-amount.firebaseio.com",
      projectId: "least-amount",
      storageBucket: "least-amount.appspot.com",
      messagingSenderId: "246176150829"
    }
    firebase.initializeApp(config)
    var db = firebase.firestore()

    db.settings({
      timestampsInSnapshots: true
    })

    db.collection("questions")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, doc.data())
        })
      })

    return (
      <main>
        <I18n.Provider value={t}>
          <Header />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={routeProps => <h1>Main</h1>} />
              <Route
                path="/add-question"
                render={routeProps => <h1>Add Question</h1>}
              />
              <Route path="/:id/stats" render={routeProps => <h1>Stats</h1>} />
              <Route path="/:id" render={routeProps => <h1>id</h1>} />
            </Switch>
          </BrowserRouter>
        </I18n.Provider>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    lang: state.i18n.lang,
    translations: state.i18n.translations
  }
}

function mapDispatchToProps(dispatch) {
  console.log(actions)
  return bindActionCreators(
    {
      getI18n: actions.getI18n
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
