import React, { Component } from 'react'
import Cell from './Cell'
import axios from 'axios'

export class Gameboard extends Component {
  state = {
    board: [],
    currState: '',
    mines: '',
    gameId: ''
  }

  newGameApi = async () => {
    const resp = await axios.post(`http://minesweeper-api.herokuapp.com/games`)
    this.setState({
      board: resp.data.board,
      currState: resp.data.state,
      mines: resp.data.mines,
      gameId: resp.data.id
    })
    console.log(resp)
  }

  checkCellApi = async (x, y) => {
    const resp = await axios.post(
      `http://minesweeper-api.herokuapp.com/games/${this.state.gameId}/check`,
      { row: x, col: y }
    )
    this.setState({
      board: resp.data.board
      // mines: resp.data.mines,
      // currState: resp.data.state,
    })
    console.log(resp)
  }

  flagCellApi = async (x, y) => {
    const resp = await axios.post(
      `http://minesweeper-api.herokuapp.com/games/${this.state.gameId}/flag`,
      { row: x, col: y }
    )
    this.setState({
      board: resp.data.board
      // mines: resp.data.mines,
      // currState: resp.data.state,
    })
    console.log(resp)
  }
  componentDidMount() {
    console.log('mount')
    this.newGameApi()
  }

  cellLeftClicked = (x, y) => {
    console.log('clicked', x, y)
    this.checkCellApi(x, y)
  }
  cellRightClicked = (x, y) => {
    console.log('rightClick', x, y)
    this.flagCellApi(x, y)
  }

  render() {
    return (
      <>
        <main>
          <h1>Bomb Sniffer</h1>
          <table>
            <tbody>
              {this.state.board.map((col, i) => {
                return (
                  <tr key={i}>
                    {col.map((row, j) => {
                      return (
                        <Cell
                          key={j}
                          display={this.state.board[i][j]}
                          leftClick={() => this.cellLeftClicked(i, j)}
                          rightClick={() => this.cellRightClicked(i, j)}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </main>
      </>
    )
  }
}

export default Gameboard
