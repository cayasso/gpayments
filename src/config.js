'use strict'

module.exports = {
  CLIENT_ID: process.env.GPAYMENTS_CLIENT_ID,
  CLIENT_SECRET: process.env.GPAYMENTS_CLIENT_SECRET,
  API_URL: process.env.GPAYMENTS_API_URL || 'https://api.payments.4geeks.io'
}
