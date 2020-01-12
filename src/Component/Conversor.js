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
    let de_para = `${this.props.moedaA}_${this.props.moedaB}`
    let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=y&apiKey=ef1e8d7d844b87c98616`

    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(json => {
        let cotacao = json[de_para].val
        let moedaB_valor = (
          parseFloat(this.state.moedaA_valor) * cotacao
        ).toFixed(2)
        if (moedaB_valor == 'NaN') {
          this.setState({ moedaB_valor: 0 })
          console.log(moedaB_valor)
        } else {
          this.setState({ moedaB_valor })
          console.log(json[de_para])
        }
      })
  }

  render () {
    return (
      <div className='conversor'>
        <h2>
          {this.props.moedaA} para {this.props.moedaB}
        </h2>
        <input
          type='text'
          onChange={event => {
            this.setState({ moedaA_valor: event.target.value })
          }}
        ></input>
        <input type='button' value='Converter' onClick={this.converter}></input>
        <h2>{this.state.moedaB_valor}</h2>
      </div>
    )
  }
}
