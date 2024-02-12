import { Tcredentials } from './../@types/types.ts';

export async function APIrequest(
    creds: Tcredentials,
    method: string= 'GET',
    version: string= 'v1',
    key: string= '/invoices',
    data: {} | null= null
  ):Promise<Response> {
    const myHeaders = new Headers()
    myHeaders.append('Accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('apikey', creds.apikey)

  const requestOptions = method === "GET" ? {
    method,
    headers: myHeaders,
  } : {
    method,
    headers: myHeaders,
    body: JSON.stringify(data)
  }

  const apiVersion =
    version === 'v1' ? '/api2' : version === 'v2' ? '/v2/api/entity' : null

  const res: Response = await fetch(
    `https://${creds.subdomain}.daftra.com${apiVersion}${key}`,
    requestOptions
  )

  return res || []
}
