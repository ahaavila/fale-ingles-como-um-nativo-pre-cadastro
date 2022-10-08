module.exports = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fale-ingles-como-um-nativo-pre-cadastro.vercel.app/:path*',
      },
    ]
  },
}
