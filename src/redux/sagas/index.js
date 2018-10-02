import { all } from "redux-saga/effects"
import i18n from "./i18n"
const watchers = [i18n]

const WATCHERS = watchers.map(watcher => watcher())

export default function* rootSaga() {
  yield all(WATCHERS)
}
