'use strict'

const assert = require('assert')
const axios = require('axios')
const getToken = require('./token')
const { CLIENT_ID, CLIENT_SECRET, API_URL } = require('./config')

const res = res => res.data
const methods = ['get', 'put', 'post', 'patch', 'delete']

module.exports = ({ clientId = CLIENT_ID, clientSecret = CLIENT_SECRET } = {}) => {
  assert(clientId, 'Client ID is missing. Please pass a clientId as parameter or set the GPAYMENTS_CLIENT_ID environment variable.')
  assert(clientSecret, 'Client secret is missing. Please pass a clientSecret as parameter or set the GPAYMENTS_CLIENT_SECRET environment variable.')

  const getAccessToken = getToken(clientId, clientSecret)
  const client = axios.create({ baseURL: `${API_URL}/v1` })

  client.defaults.headers.common['Content-Type'] = 'application/json'
  client.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken()
    config.headers.Authorization = `bearer ${accessToken}`
    return config
  })

  const [ get, put, post, patch, del ] = methods.map(method => (...args) => client[method](...args).then(res))

  const me = {
    fetch: () => get('/accounts/me/'),
    update: (data) => put('/accounts/me/', data)
  }

  const customers = {
    create: (data) => post('/accounts/customers/', data),
    fetch: (key) => key
      ? get(`/accounts/customer/${key}/`)
      : get(`/accounts/customers/`),
    update: (key, data) => patch(`/accounts/customer/${key}/`, data),
    remove: (key) => del(`/accounts/customer/${key}/`)
  }

  const charges = {
    create: (data = {}) => ('customer_key' in data)
      ? post('/charges/create/', data)
      : post('/charges/simple/create/', data),
    logs: () => get('/charges/logs/')
  }

  const plans = {
    fetch: () => get('/plans/mine/'),
    create: (data) => post('/plans/create/', data)
  }

  const subscriptions = {
    subscribe: (data) => post('/plans/subscribe/', data),
    unsubscribe: (id) => del('/plans/un-subscribe/', { data: { subscription_id: id } }),
    fetch: () => get('/plans/subscriptions/')
  }

  return { me, plans, charges, customers, subscriptions }
}
