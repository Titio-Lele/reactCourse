import React, { useId } from 'react'
import './Conversor.css'
import useConversorViewModel from './useConversorViewModel'

export default function Conversor({ moedaA, moedaB }) {
  const inputId = useId()
  const {
    isLoading,
    moedaAValor,
    moedaBValor,
    ultimaAtualizacao,
    statusConsulta,
    handleMoedaAValorChange,
    converter
  } = useConversorViewModel({ moedaA, moedaB })

  return (
    <div className={`conversor${isLoading ? ' conversor-loading' : ''}`} aria-busy={isLoading}>
      <div className='conversor-topbar'>
        <div>
          <h2 className='conversor-title'>
            {moedaA} para {moedaB}
          </h2>
          <p className='conversor-caption'>Mesa digital de cambio</p>
        </div>
        <div className='conversor-update-panel'>
          <span className='conversor-update-label'>Ultima atualizacao</span>
          <strong className='conversor-update-value'>{ultimaAtualizacao}</strong>
          <span className='conversor-status'>{statusConsulta}</span>
        </div>
      </div>

      <label className='conversor-label' htmlFor={inputId}>
        Valor em {moedaA}
      </label>
      <input
        id={inputId}
        className='conversor-input'
        type='text'
        inputMode='decimal'
        placeholder='0,00'
        value={moedaAValor}
        onChange={handleMoedaAValorChange}
      ></input>
      <input
        className='conversor-button'
        type='button'
        value={isLoading ? 'Consultando...' : 'Converter'}
        disabled={isLoading}
        onClick={converter}
      ></input>
      <h2 className='conversor-result'>{moedaBValor}</h2>
    </div>
  )
}
