import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Square componet
class Square extends React.Component {
  componentWillMount() {
    console.log('Square-componentWillMount执行1次');
  }

  componentDidMount() {
    console.log('Square-componentDidMount执行1次');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('Square-componentWillReceiveProps执行1次');
  }

  shouldComponentUpdate() {
    console.log('Square-componentshouldComponentUpdate执行1次');
    return true;
  }

  componentWillUpdate() {
    console.log('Square-componentWillUpdate执行1次');
  }

  componentDidUpdate() {
    console.log('Square-componentDidUpdate执行1次');
  }  

  render() {
    console.log('componet-Square-render');
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
/*function Square(props) {
  console.log('componet-Square-render');
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}*/

//Board componet
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  componentWillMount() {
    console.log('Board-componentWillMount执行1次');
  }

  componentDidMount() {
    console.log('Board-componentDidMount执行1次');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('Board-componentWillReceiveProps执行1次');
  }

  shouldComponentUpdate() {
    console.log('Board-componentshouldComponentUpdate执行1次');
    return true;
  }

  componentWillUpdate() {
    console.log('Board-componentWillUpdate执行1次');
  }

  componentDidUpdate() {
    console.log('Board-componentDidUpdate执行1次');
  } 

  render() {
    console.log('componet-Board-render');
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//Game componet
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  componentWillMount() {
    console.log("Game-componentWillMount执行1次");
  }

  componentDidMount() {
    console.log("Game-componentDidMount执行1次");
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log('Game-componentWillReceiveProps执行1次');
  }

  shouldComponentUpdate() {
    console.log('Game-shouldComponentUpdate执行1次');
    return true;
  }

  componentWillUpdate() {
    console.log('Game-componentWillUpdate执行1次');
  }

  componentDidUpdate() {
    console.log(this.state.history);
    console.log('Game-componentDidUpdate执行1次');
  }

  handleClick(i) {
    const history = this.state.history.slice();
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      console.log('winner!');
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber : step,
      xIsNext : (step % 2) ? false : true,
    });
  }

  render() {
    console.log('componet-Game-render');
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game Start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'winner: ' + winner;
    }else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {x => this.handleClick(x)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root'),
  () => {console.log('ReactDom首次render')}
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}