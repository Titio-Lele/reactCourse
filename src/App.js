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
      <h1>Conversor de moedas</h1>
      <div className="linha">
        {isLoading ? (
          <>
            <ConversorSkeleton />
            <ConversorSkeleton />
          </>
        ) : (
          <>
            <Conversor moedaA={PAIRS[0][0]} moedaB={PAIRS[0][1]} />
            <Conversor moedaA={PAIRS[1][0]} moedaB={PAIRS[1][1]} />
          </>
        )}
      </div>
      <div className="linha">
        {isLoading ? (
          <>
            <ConversorSkeleton />
            <ConversorSkeleton />
          </>
        ) : (
          <>
            <Conversor moedaA={PAIRS[2][0]} moedaB={PAIRS[2][1]} />
            <Conversor moedaA={PAIRS[3][0]} moedaB={PAIRS[3][1]} />
          </>
        )}
      </div>
      <div className="linha">
        {isLoading ? (
          <>
            <ConversorSkeleton />
            <ConversorSkeleton />
          </>
        ) : (
          <>
            <Conversor moedaA={PAIRS[4][0]} moedaB={PAIRS[4][1]} />
            <Conversor moedaA={PAIRS[5][0]} moedaB={PAIRS[5][1]} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
