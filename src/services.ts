import { apiBasePath } from './constants'
import { Driver } from './types'

let abortController: AbortController

// gets the derivers' data
export async function getDrivers() {
  abortController = new AbortController()
  const result = await doFetch(`${apiBasePath}/drivers`)

  if (assertError(result)) {
    return
  }
  return (await result.response) as Driver[]
}

// initiates an overtake
export async function overtake(driverId: number) {
  abortController = new AbortController()
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
    const signal = abortController.signal
    const res = await fetch(url, { ...options, signal })
    response = await res.json()
  } catch (problem) {
    abortController.abort()
    error = problem
  }
  return { response, error }
}
