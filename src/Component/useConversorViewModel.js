import { useState } from 'react'
import { fetchExchangeRate } from '../services/exchangeRateService'

const LOCALE = 'pt-BR'
const EMPTY_RESULT = '0'
const EMPTY_UPDATE_LABEL = 'Aguardando consulta'
const IDLE_STATUS_LABEL = 'Pronto para consultar'
const LOADING_STATUS_LABEL = 'Consultando cotacao'
const ERROR_STATUS_LABEL = 'Falha na consulta'
const SUCCESS_STATUS_LABEL = 'Atualizado agora'

function formatIntegerPart(integerDigits) {
  const normalizedDigits = integerDigits.replace(/^0+(?=\d)/, '') || '0'

  return new Intl.NumberFormat(LOCALE, {
    maximumFractionDigits: 0
  }).format(Number(normalizedDigits))
}

export function formatCurrencyInput(rawValue) {
  const sanitizedValue = rawValue.replace(/[^\d.,]/g, '')

  if (!sanitizedValue) {
    return ''
  }

  const separatorIndex = Math.max(
    sanitizedValue.lastIndexOf(','),
    sanitizedValue.lastIndexOf('.')
  )

  const integerDigits = separatorIndex >= 0
    ? sanitizedValue.slice(0, separatorIndex).replace(/\D/g, '')
    : sanitizedValue.replace(/\D/g, '')
  const decimalDigits = separatorIndex >= 0
    ? sanitizedValue.slice(separatorIndex + 1).replace(/\D/g, '').slice(0, 2)
    : ''

  const hasDecimalSeparator = separatorIndex >= 0
  const formattedIntegerPart = formatIntegerPart(integerDigits || '0')

  if (!hasDecimalSeparator) {
    return formattedIntegerPart
  }

  return `${formattedIntegerPart},${decimalDigits}`
}

export function parseCurrencyInput(maskedValue) {
  if (!maskedValue) {
    return Number.NaN
  }

  const normalizedValue = maskedValue.replace(/\./g, '').replace(',', '.')
  return Number.parseFloat(normalizedValue)
}

function formatLastUpdatedLabel(date) {
  const localDate = date.toLocaleDateString(LOCALE)
  const localTime = date.toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${localDate} as ${localTime}`
}

export default function useConversorViewModel({ moedaA, moedaB }) {
  const [moedaAValor, setMoedaAValor] = useState('')
  const [moedaBValor, setMoedaBValor] = useState(EMPTY_RESULT)
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(EMPTY_UPDATE_LABEL)
  const [statusConsulta, setStatusConsulta] = useState(IDLE_STATUS_LABEL)
  const [isLoading, setIsLoading] = useState(false)

  const handleMoedaAValorChange = event => {
    setMoedaAValor(formatCurrencyInput(event.target.value))
  }

  const converter = () => {
    const inputValue = parseCurrencyInput(moedaAValor)

    if (Number.isNaN(inputValue)) {
      setMoedaBValor(EMPTY_RESULT)
      setStatusConsulta(IDLE_STATUS_LABEL)
      return Promise.resolve()
    }

    setIsLoading(true)
    setStatusConsulta(LOADING_STATUS_LABEL)

    return fetchExchangeRate(moedaA, moedaB)
      .then(cotacao => {
        setMoedaBValor((inputValue * cotacao).toFixed(2))
        setUltimaAtualizacao(formatLastUpdatedLabel(new Date()))
        setStatusConsulta(SUCCESS_STATUS_LABEL)
      })
      .catch(() => {
        setMoedaBValor(EMPTY_RESULT)
        setStatusConsulta(ERROR_STATUS_LABEL)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return {
    isLoading,
    moedaAValor,
    moedaBValor,
    ultimaAtualizacao,
    statusConsulta,
    handleMoedaAValorChange,
    converter
  }
}