import { credentials } from '../api/common'

const myHeaders = new Headers()
myHeaders.append('Accept', 'application/json')
myHeaders.append('Content-Type', 'application/json')

export async function APIrequest(
  { ...credentials },
  method: string = 'GET',
  version: string = 'v1',
  key: string = '/invoices',
  data: {} | null = null
): Promise<Response> {
  const requestOptions = {
    method,
    headers: myHeaders,
    body: JSON.stringify(data)
  }

  const apiVersion =
    version === 'v1' ? '/api2' : version === 'v2' ? '/v2/api/entity' : null

  const res: Response = await fetch(
    `https://${credentials.subdomain}.daftra.com${apiVersion}${key}`,
    requestOptions
  )

  return res || []
}
