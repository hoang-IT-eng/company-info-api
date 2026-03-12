function normalizeExternalApiBaseUrl(rawUrl: string) {
  if (rawUrl.endsWith('/api')) {
    return rawUrl
  }
  return `${rawUrl.replace(/\/$/, '')}/api`
}

export default () => {
  const rawExternalApiBaseUrl =
    process.env.EXTERNAL_API_BASE_URL || 'https://thongtindoanhnghiep.co/api'

  return {
    port: parseInt(process.env.PORT || '3000', 10),

    externalApi: {
      baseUrl: normalizeExternalApiBaseUrl(rawExternalApiBaseUrl),
    },

    frontendUrl: process.env.FRONTEND_URL,
  }
}
