import assoc from "ramda/src/assoc"
import { UPDATE_I18N, UPDATE_LANG } from "../names"
import translations from "../../I18n/defaultTranslations"

const initI18n = {
  lang: "en",
  translations
}

export const i18n = (state = initI18n, { type, payload }) => {
  switch (type) {
    case UPDATE_I18N:
      return assoc("translations", payload, state)
    case UPDATE_LANG:
      return assoc("lang", payload, state)

    default:
      return state
  }
}
