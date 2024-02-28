import { apiBasePath } from './constants'
import { Driver } from './types'

let _abortController: AbortController | undefined
// gets the derivers' data
export async function getDrivers(abortController: AbortController | undefined) {
  if (_abortController && !_abortController.signal.aborted) {
    _abortController.abort()
  }
  _abortController = abortController
  const result = await doFetch(`${apiBasePath}/drivers`)

  if (assertError(result)) {
    return
  }
  return (await result.response) as Driver[]
}

// initiates an overtake
export async function overtake(
  driverId: number,
  abortController: AbortController | undefined
) {
  if (_abortController && !_abortController.signal.aborted) {
    _abortController.abort()
  }
  _abortController = abortController
  const result = await doFetch(`${apiBasePath}/drivers/${driverId}/overtake`, {
    method: 'POST',
  })

  if (assertError(result)) {
    return
  }

  return (await result.response) as boolean
}

function assertError(result: { response: Promise<any>; error: unknown }) {
  if (!result.response) {
    console.log(result.error)
    return true
  }
  return false
}

export async function doFetch(url: string, options = {}) {
  let response = null
  let error = null
  try {
    const signal = _abortController?.signal
    const res = await fetch(url, { ...options, signal })
    response = await res.json()
    _abortController = undefined
  } catch (problem) {
    error = problem
  }
  return { response, error }
}
