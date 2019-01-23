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
            gameEnd: false,
            location: [],
            order: 0
        };
    }

    handleClick(i) {
        console.log("handleclick ",i);
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        let location = this.generateLocation(i);
        location = this.showLocation(i, location);
        const isWinner = calculateWinner(squares,this.state.gameEnd);
        this.setState({
            location
        });
        if(isWinner) {
            this.setState({
                gameEnd: true
            });
        }
        if (isWinner || squares[i]) {
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

    }


    jumpTo(step) {
        let newState = {};
        if(step === 1){
            newState = {
               location: [],
               history: []
            };
        }
        this.setState({
            ...newState,
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }
    generateLocation(index) {
        let labels = [
            "1,1", "1,2", "1,3", "2,1", "2,2", "2,3", "3,1", "3,2", "3,3"
        ];
        const { location } = this.state;
        for(let i = 0; i < labels.length; i++) {
            if(index === i) {
                const label = labels[i];
                const hasLocation = !!location.filter((val) => val.label === label).length;
                if (!hasLocation) {
                    let current = {
                        index,
                        label: null,
                        clicks: 0,
                        active: false,
                        className: '',
                    };
                    current.label = label;
                    location.push(current);
                }
            }
        }
        console.log("location", location);
        return location;
    }
    showLocation(index, location){
        const { gameEnd } = this.state;
        const newState = location.map((v) => {
            let location = {
                ...v,
                clicks: v.clicks + 1,
                active: false
            };
            if(!gameEnd && location.clicks > 1) {
                if (index === v.index) {
                    location.active = true;
                }
            }
            return location;
        });
        console.log("this.state.location", newState);
        console.log("game-end",gameEnd);
        return newState;
    }

    changeOrder(){
        const o = this.state.order;
        this.setState({
            order: ~o,
        });
    }



    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const currentCell = history[history.length - 1];
        const winnerInfo = calculateWinner(currentCell.squares,this.state.gameEnd);

        const winner = winnerInfo ? winnerInfo.winner : null;
        const winnerLine = winnerInfo ? winnerInfo.line : [];
        console.log("winnerInfo", winnerInfo);
        // if(winnerInfo.winner ==="Draw") {
        //     document.getElementById("move-list").write("Draw");
        // }
        const order = this.state.order;
        console.log("current: ",current);

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
        const list = this.state.location.map((element , index) => {
            let classes = `movie-list-item-st-${index}`;
            if(element.active) {
                classes += ' active';
            }
            return <li className={classes} key={element.label}>{element.label}</li>;
        });




        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div id="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        winnerLine={winnerLine}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div id="move-list">

                        <button onClick={() => this.changeOrder()}>Change order</button>
                        {(() => {
                            return order === 0 ? <ol>{moves}</ol> : <ol>{moves.reverse()}</ol>
                        })()}
                        <span>Move list</span>
                        <ul>{list}</ul>
                    </div>


                </div>
            </div>
        );
    }
}
function calculateWinner(squares,gameStatus) {

    var gameEnd = gameStatus;
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
        // console.log("gEnd", gameEnd);

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a],
                line: [a, b, c]
            };
        }
        else {
            const busyCells= squares.map((element,index) =>{
                console.log("sqrs el", element);
                console.log("gEnd-",gameEnd);
                if( element != null &&  gameEnd===false){
                    console.log("Draw");
                    return {
                        winner: "Draw",
                        gameEnd: true
                    };
                }
            });
        }
    }
    return null;
}

export default Game;