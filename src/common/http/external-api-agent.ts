import dns from 'node:dns'
import https from 'node:https'

const resolver = new dns.promises.Resolver()
resolver.setServers(['8.8.8.8', '1.1.1.1'])

const isLoopback = (address: string) => address === '127.0.0.1' || address === '::1'

const resolveHost = async (hostname: string): Promise<string[]> => {
  let addresses: string[] = []

  try {
    addresses = await resolver.resolve4(hostname)
  } catch {}

  if (!addresses.length) {
    try {
      addresses = await resolver.resolve6(hostname)
    } catch {}
  }

  if (!addresses.length) {
    try {
      const lookupResults = await dns.promises.lookup(hostname, { all: true })
      addresses = lookupResults.map((item) => item.address)
    } catch {}
  }

  return addresses.filter((address) => address && !isLoopback(address))
}

export const externalHttpsAgent = new https.Agent({
  keepAlive: true,
  lookup: (hostname, options, callback) => {
    resolveHost(hostname)
      .then((addresses) => {
        if (!addresses.length) {
          callback(new Error(`DNS lookup failed for ${hostname}`))
          return
        }

        if (options?.all) {
          callback(
            null,
            addresses.map((address) => ({
              address,
              family: address.includes(':') ? 6 : 4,
            })),
          )
          return
        }

        const address = addresses[0]
        callback(null, address, address.includes(':') ? 6 : 4)
      })
      .catch((error) => callback(error))
  },
})
