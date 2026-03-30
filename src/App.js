import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';

import Conversor from "./Component/Conversor"

const DEFAULT_LOADING_DELAY_MS = 5000
const parsedDelay = Number(process.env.REACT_APP_SKELETON_DELAY_MS)

export const LOADING_DELAY_MS = Number.isFinite(parsedDelay) && parsedDelay >= 0
  ? parsedDelay
  : DEFAULT_LOADING_DELAY_MS

const PAIRS = [
  ['USD', 'BRL'],
  ['BRL', 'USD'],
  ['CAD', 'BRL'],
  ['BRL', 'CAD'],
  ['EUR', 'BRL'],
  ['BRL', 'EUR']
]

function ConversorSkeleton() {
  return (
    <div
      className="conversor conversor-skeleton"
      data-testid="conversor-skeleton"
      aria-label="Carregando conversor"
    >
      <p className="skeleton-hint">Carregando cotacao...</p>
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-input" />
      <div className="skeleton-line skeleton-button" />
      <div className="skeleton-line skeleton-result" />
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, LOADING_DELAY_MS)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="App">
      <header className="bank-header">
        <div className="brand-block">
          <span className="brand-pill">Bradesco Exchange</span>
          <h1>Conversor de moedas</h1>
          <p className="bank-subtitle">Consulta de cotacao com visual de internet banking</p>
        </div>
        <div className="status-card" aria-label="Status da central de cotacoes">
          <span className="status-dot" />
          <span>Central ativa</span>
        </div>
      </header>

      <main className="bank-main" aria-label="Painel de cotacoes">
        <section className="section-header">
          <h2>Consulta de Cotacao</h2>
          <p>Escolha um card, informe o valor e clique em Converter.</p>
        </section>

        <section className="cards-grid">
          {isLoading
            ? PAIRS.map(pair => <ConversorSkeleton key={pair.join('-')} />)
            : PAIRS.map(pair => (
              <Conversor key={pair.join('-')} moedaA={pair[0]} moedaB={pair[1]} />
              ))}
        </section>
      </main>
    </div>
  );
}

export default App;
