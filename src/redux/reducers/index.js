import { i18n } from "./i18n"
import { combineReducers } from "redux"
import { LOGOUT } from "../names"

const appReducer = combineReducers({
  i18n
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
