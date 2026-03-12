export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),

  externalApi: {
    baseUrl: process.env.EXTERNAL_API_BASE_URL || 'https://thongtindoanhnghiep.co/api',
  },

  frontendUrl: process.env.FRONTEND_URL,
})
