import React, { Component } from 'react'
import Header from './components/Header'
import Cell from './components/Cell'
import DoOver from './components/DoOver'

const gameUrl = 'https://minesweeper-api.herokuapp.com/'

class App extends Component {
  state = {
    game: { board: [] },
    message: ''
  }

  doOver = () => {
    fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ difficulty: 0 })
    })
      .then(resp => {
        return resp.json()
      })
      .then(newGame => {
        this.setState({
          game: newGame,
          message: ''
        })
        console.log({ newGame })
      })
  }

  componentDidMount() {
    fetch('https://minesweeper-api.herokuapp.com/games', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ difficulty: 0 })
    })
      .then(resp => {
        return resp.json()
      })
      .then(newGame => {
        this.setState({
          game: newGame,
          message: ''
        })
        console.log({ newGame })
      })
  }

  gameResults() {
    if (this.state.game.state === 'winner') {
      this.setState({
        message: 'Congratulations, You Made It!!'
      })
    } else if (this.state.game.state === 'loser') {
      console.log(this.state.message)
      this.setState({
        message: 'Boom...!'
      })
    } else {
      this.setState({
        message: 'Phew, That was Close!'
      })
    }
  }

  cellClick = (row, col) => {
    console.log('clicked', row, col)
    fetch(`${gameUrl}games/${this.state.game.id}/check`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ row: row, col: col })
    })
      .then(resp => {
        return resp.json()
      })
      .then(newGame => {
        this.setState({
          game: newGame,
          message: newGame.state
        })
        console.log({ newGame })
        this.gameResults()
      })
  }

  flaggedCell = (event, row, col) => {
    console.log('clicked', row, col)
    event.preventDefault()
    fetch(`${gameUrl}games/${this.state.game.id}/flag`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ row: row, col: col })
    })
      .then(resp => {
        return resp.json()
      })
      .then(currentGameState => {
        this.setState({
          game: currentGameState,
          message: currentGameState.state
        })
        console.log({ currentGameState })
      })
  }

  render() {
    return (
      <>
        <section>
          <Header />
          <Cell
            game={this.state.game}
            cellClick={this.cellClick}
            flaggedCell={this.flaggedCell}
            message={this.state.message}
          />
          <DoOver doOver={this.DoOver} />
        </section>
      </>
    )
  }
}

export default App
