'use strict'

const axios = require('axios')
const { API_URL } = require('./config')

const secondsBeforeExp = 600 // 10 minutes

axios.defaults.headers.common['Content-Type'] = 'application/json'

module.exports = (client_id, client_secret) => {
  let token = null

  return async () => {
    const now = new Date()

    if (token && token.expires_at > now.getTime()) {
      return token.access_token
    }

    const res = await axios.post(`${API_URL}/authentication/token/`, {
      client_id,
      client_secret,
      grant_type: 'client_credentials'
    })

    token = res.data

    const time = new Date()
    time.setSeconds(time.getSeconds() + (token.expires_in - secondsBeforeExp))
    token.expires_at = time.getTime()
    return token.access_token
  }
}
