const ERROR_STATUSES = [400, 401, 403, 404, 500]

function* networkWatcher() {}

/**
 * @param {string} END_POINT
 * @param {string} METHOD
 * @param {object} HEADERS
 * @param {string} BODY
 */

export function* apiCall(END_POINT = "/", METHOD = "GET", HEADERS, BODY) {
  const data = yield fetch(END_POINT, {
    method: METHOD,
    headers: HEADERS,
    body: BODY
  })
  if ("error" in data || ERROR_STATUSES.includes(data.status))
    throw new { ...data }()
  return data
}
export default networkWatcher
