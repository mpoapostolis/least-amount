import { takeLatest, put } from "redux-saga/effects"
import { GET_I18N } from "../names"
import actions from "../actions"
import { apiCall } from "./network"

const URL = "/bo/getTranslations"

function* updateI18n() {
  try {
    const res = yield apiCall(URL, "GET")
    const data = yield res.json()
    yield put(actions.updateI18n(data))
  } catch (error) {
    console.error(error)
  }
}

function* i18nWatcher() {
  yield takeLatest(GET_I18N, updateI18n)
}

export default i18nWatcher
