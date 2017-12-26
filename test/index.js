'use strict'

const should = require('should')
const createApi = require('../src/index')

describe('gpayments', () => {

  it('should expose a function', () => {
    should(createApi).be.a.Function
  })

  it('throws error if no option is passed', () => {
    try {
      createApi()
    } catch(e) {
      should(e.message.startsWith('Client ID is missing')).be.true()
    }
  })

  it('throws error if client id is missing', () => {
    try {
      createApi({ clientSecret: 'abc' })
    } catch(e) {
      should(e.message.startsWith('Client ID is missing')).be.true()
    }
  })

  it('throws error if client secret is missing', () => {
    try {
      createApi({ clientId: 'abc' })
    } catch(e) {
      should(e.message.startsWith('Client secret is missing')).be.true()
    }
  })

  it('returns all api endpoints', () => {
    const api = createApi({ clientId: 'abc', clientSecret: 'abc' })
    should(api.me).be.an.Object()
    should(api.plans).be.an.Object()
    should(api.charges).be.an.Object()
    should(api.customers).be.an.Object()
    should(api.subscriptions).be.an.Object()
  })

  describe('#me', () => {
    it('returns all `me` endpoint methods', () => {
      const api = createApi({ clientId: 'abc', clientSecret: 'abc' })
      should(api.me.fetch).be.a.Function()
      should(api.me.update).be.a.Function()
    })
  })

  describe('#customers', () => {
    it('returns all `customers` endpoint methods', () => {
      const api = createApi({ clientId: 'abc', clientSecret: 'abc' })
      should(api.customers.create).be.a.Function()
      should(api.customers.update).be.a.Function()
      should(api.customers.fetch).be.a.Function()
      should(api.customers.remove).be.a.Function()
    })
  })

  describe('#plans', () => {
    it('returns all `plans` endpoint methods', () => {
      const api = createApi({ clientId: 'abc', clientSecret: 'abc' })
      should(api.plans.create).be.a.Function()
      should(api.plans.fetch).be.a.Function()
      should(api.plans.remove).be.a.Function()
    })
  })

  describe('#subscriptions', () => {
    it('returns all `subscriptions` endpoint methods', () => {
      const api = createApi({ clientId: 'abc', clientSecret: 'abc' })
      should(api.subscriptions.subscribe).be.a.Function()
      should(api.subscriptions.unsubscribe).be.a.Function()
      should(api.subscriptions.fetch).be.a.Function()
    })
  })

})
