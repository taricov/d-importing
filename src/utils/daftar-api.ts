
// Get Site Info
export const GetSiteInfo = async (subdomain: string , apikey: string): Promise<Response> => {
    const res = await fetch(`https://${subdomain}.daftra.com/api2/site_info`, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': apikey,
      },
    })
    return res
  }