/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://thefitnesschef.co.uk',
  generateRobotsTxt: true,
  exclude: ['/config']
}
