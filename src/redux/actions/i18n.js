import { createAction } from "redux-actions"
import { UPDATE_I18N, UPDATE_LANG, GET_I18N } from "../names"

const getI18n = createAction(GET_I18N)
const updateI18n = createAction(UPDATE_I18N)
const updateLang = createAction(UPDATE_LANG)

export default { getI18n, updateI18n, updateLang }
