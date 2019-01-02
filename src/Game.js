import React from "react";
import Board from "./Board";
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            location: ["","","","","","","","",""]
        };
    }

    handleClick(i) {
        // console.log("handleclick");
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
        this.showLocation(i);

    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    showLocation(index){
        var current = ""
        if(index === 0) {
            current = "1,1";
            this.state.location[0] = current;
            // console.log("index:",current);
        }
        if(index === 1) {
            current = "1,2";
            this.state.location[1] = current;
        }
        if(index === 2) {
            current = "1,3";
            this.state.location[2] = current;
        }
        if(index === 3) {
            current = "2,1";
            this.state.location[3] = current;
        }
        if(index === 4) {
            current = "2,2";
            this.state.location[4] = current;
        }
        if(index === 5) {
            current = "2,3";
            this.state.location[5] = current;
        }
        if(index === 6) {
            current = "3,1";
            this.state.location[6] = current;
        }
        if(index === 7) {
            current = "3,2";
            this.state.location[7] = current;
        }
        if(index === 8) {
            current = "3,3";
            this.state.location[8] = current;
        }
        console.log("Location:", this.state.location);


    }



    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        console.log("current: ",this.state.history);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>

            );
        });
        const list = this.state.location.map((number) =>
            <li key={number.toString()}>
                {number}
            </li>
        );
        // const location = this.state.location.map((value) => {
        //   return (
        //       <li>{value}</li>
        //   )
        // });
        // for(var i=0; i<this.state.location.length;i++){
        //
        // <ul>
        // <li>{this.state.location[i]}</li>
        // </ul>
        //
        // }
        // {/*<li key={value.toString()}>{value}</li>*/}
        //   {/*);*/}



        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    {/*<div>*/}
                    {/*<ul>*/}
                    {/*{this.state.location.map((item ) => (*/}
                    {/*<li key={item}>{item}</li>*/}
                    {/*))}*/}
                    {/*</ul>*/}
                    {/*</div>*/}
                    {/*<NumberList numbers={this.state.location} />*/}
                </div>
            </div>
        );
    }
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;