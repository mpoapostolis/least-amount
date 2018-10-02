export const loadState = curr_ver => {
  try {
    const serializedState = localStorage.getItem(curr_ver)
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export const saveState = (state, curr_ver) => {
  const { auth, i18n } = state

  try {
    const serializedState = JSON.stringify({ auth, i18n })
    localStorage.setItem(curr_ver, serializedState)
  } catch (e) {}
}
