module.exports = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://fale-ingles-como-um-nativo-pre-cadastro.vercel.app/:path*',
      },
    ]
  },
}
