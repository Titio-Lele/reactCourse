export async function fetchExchangeRate(baseCurrency, targetCurrency) {
  const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
  const payload = await response.json()
  const exchangeRate = payload?.rates?.[targetCurrency]

  if (typeof exchangeRate !== 'number') {
    throw new Error('Invalid exchange rate payload')
  }

  return exchangeRate
}