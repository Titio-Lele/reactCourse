import React, { Component } from 'react'
import './Conversor.css'

export default class Conversor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      moedaA_valor: '',
      moedaB_valor: 0
    }

    this.converter = this.converter.bind(this)
    // o rato roeu a roupa do rei de roma
  }

  converter () {
    const { moedaA, moedaB } = this.props
    const inputValue = parseFloat(this.state.moedaA_valor)

    if (Number.isNaN(inputValue)) {
      this.setState({ moedaB_valor: 0 })
      return
    }

    const url = `https://open.er-api.com/v6/latest/${moedaA}`

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(json => {
        const cotacao = json?.rates?.[moedaB]

        if (typeof cotacao !== 'number') {
          throw new Error('Invalid exchange rate payload')
        }

        const moedaB_valor = (inputValue * cotacao).toFixed(2)
        this.setState({ moedaB_valor })
      })
      .catch(() => {
        this.setState({ moedaB_valor: 0 })
      })
  }

  render () {
    return (
      <div className='conversor'>
        <h2 className='conversor-title'>
          {this.props.moedaA} para {this.props.moedaB}
        </h2>
        <input
          className='conversor-input'
          type='text'
          onChange={event => {
            this.setState({ moedaA_valor: event.target.value })
          }}
        ></input>
        <input
          className='conversor-button'
          type='button'
          value='Converter'
          onClick={this.converter}
        ></input>
        <h2 className='conversor-result'>{this.state.moedaB_valor}</h2>
      </div>
    )
  }
}
