# gpayments

[![Build Status](https://travis-ci.org/cayasso/gpayments.png?branch=master)](https://travis-ci.org/cayasso/gpayments)
[![NPM version](https://badge.fury.io/js/gpayments.png)](http://badge.fury.io/js/gpayments)

Simple [4Geeks Payments](https://4geeks.io/payments/) API Client for NodeJS.

## Installation

``` bash
$ npm install gpayments
```

## Usage

```js
const gpayments = require('gpayments')

const gpApi = gpayments({
  clientId: '4geeks-payment-client-id',
  clientSecret: '4geeks-payment-client-secret'
})
```

```js
gpApi.plans.create({
  id_name: 'plan-1',
  name: 'Test Plan',
  amount: 300000,
  currency: 'crc',
  trial_period_days: 0,
  interval: 'month',
  interval_count: 1,
  credit_card_description: 'Test Credit Card'
}).then((plan) => {
  console.log(plan)
}).catch((error) => {
  console.log('error', error.response)
})

// or with async/await

const plan = await gpApi.plans.create({
  id_name: 'plan-1',
  name: 'Test Plan',
  amount: 300000,
  currency: 'crc',
  trial_period_days: 0,
  interval: 'month',
  interval_count: 1,
  credit_card_description: 'Test Credit Card'
})
```

## API

You will need your [4Geeks Payment](https://4geeks.io/payments/) `Client ID` and a `Client Secret` in order to use this library.

### gpayments(options)

Create a new instance of `gpayment` api by passing the required `clientId` and `clientSecret` properties.

```js
const api = gpayments({
  clientId: '4geeks-payment-client-id',
  clientSecret: '4geeks-payment-client-secret'
})
```

You can also set the `GPAYMENTS_CLIENT_ID` and `GPAYMENTS_SECRET_ID` environment variables instead of passing `clientId` and `clientSecret` properties directly.

For example, lets say somewhere in your app you have:

```js
const api = gpayments()
```

You can startup your node application like this:

```bash
GPAYMENTS_CLIENT_ID=abc123 GPAYMENTS_SECRET_ID=123abcsecret node app.js
```
### api.me.fetch()

Fetch my account information.

```js
const account = await api.me.fetch()

console.log(account)
```

### api.me.update(data)

Update my account information.

```js
const account = await api.me.update({ bank_name: 'Bac', test: false })

console.log(account)
```

### api.customers.fetch([key])

Fetch customers. You can also pass a customer key to fetch an specific customer.

```js
const customers = await api.customers.fetch()

console.log(customers)
```

Or to fetch a single customer.
```js
const customer = await api.customers.fetch('GfGsOKTZVlTKyn7khcihXYuEUx0nBxb')

console.log(customer)
```

### api.customers.create(data)

Create a new customer.

```js
const customer = await api.customers.create({
  name: 'Bruce Banner',
  email: 'brucebanner@hulk.com',
  currency: 'usd',
  credit_card_number: 4242424242424242,
  credit_card_security_code_number: 123,
  exp_month: 12,
  exp_year: 2035
})

console.log(customer)
```

### api.customers.update(key, data)

Update a customer.

```js
const data = { email: 'brucebanner2@hulk.com' }
const customer = await api.customers.update('GfGsOKTZVlTKyn7khcihXYuEUx0nBxb', data)

console.log(customer)
```
### api.customers.remove(key)

Delete a customer.

```js
await api.customers.remove('GfGsOKTZVlTKyn7khcihXYuEUx0nBxb')
```

### api.plans.fetch()

Fetch all plans.

```js
const plans = await api.plans.fetch()

console.log(plans)
```

### api.plans.create(data)

Create a new plan.

```js
const plan = await api.plans.create({
  id_name: 'plan-1',
  name: 'Test Plan',
  amount: 300000,
  currency: 'crc',
  trial_period_days: 0,
  interval: 'month',
  interval_count: 1,
  credit_card_description: 'Test Credit Card'
})

console.log(plan)
```

### api.subscriptions.fetch()

Fetch all subscriptions.

```js
const subscriptions = await api.subscriptions.fetch()

console.log(subscriptions)
```

### api.subscriptions.subscribe(data)

Create a subscription.

```js
await api.subscriptions.subscribe({
  plan_id_name: 'plan-1',
  customer_key: 'GfGsOKTZVlTKyn7khcihXYuEUx0nBxb',
})
```

### api.subscriptions.unsubscribe(subscription_id)

Delete a subscription.

```js
await api.subscriptions.unsubscribe('sub_B6Vje4CBVugWea')
```

### api.charges.create(data)

Create a new charge.

```js
await api.charges.create({
  amount: 90.32,
  customer_key: 'GfGsOKTZVlTKyn7khcihXYuEUx0nBxb',
  description: 'Plan 1 service charge',
  entity_description: 'Plan 1',
  currency: 'usd',
})
```

You can also just simple charge a credit card by omitting a `customer_key` and adding just the credit card information:

```js
// Simple charge the credit card provided.
await api.charges.create({
  amount: 90.32,
  description: 'Plan 1 service charge',
  entity_description: 'Plan 1',
  currency: 'usd',
  credit_card_number: 4242424242424242,
  credit_card_security_code_number: 123,
  exp_month: 11,
  exp_year: 2020
})
```

### api.charges.logs()

List all charges logs.

```js
const logs = await api.charges.logs()

console.log(logs)
```

## Run tests

``` bash
$ npm install
$ npm run test
```

## License

Under The MIT License
