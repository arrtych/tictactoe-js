import React from "react";
import Square from "./Square";

class Board extends React.Component {
    renderSquare(i) {
        // console.log("this.props.squares[i]")
        return (
            <Square
                value={this.props.squares[i]}
                key={i}
                // className={`square-${key1}`}
                onClick={() => this.props.onClick(i)}
                highlight={this.props.winnerLine.includes(i)}
            />
        );
    }

    createTable = () => {
        let rows = [];

        // Outer loop to create parent
        for (var i = 0; i < 3; i++) {
            let squares = []
            //Inner loop to create children
            for (var j = 0; j < 3; j++) {
                // children.push(<td>{this.renderSquare(j)}</td>)
                squares.push(this.renderSquare(3*i+j));
                console.log("squares");
            }
            // console.log("step i",);
            //Create the parent and add the children
            // table.push(<tr>{children}</tr>)
            rows.push(<div className="board-row">{squares}</div>);
        }
        return rows;
    }



    render() {
        {
            /*
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
       </div>*/
        }
        var self = this;
        return (
            <div>
                {[...Array(3)].map(function(row, rowI) { // create rows
                    return (
                        <div className="board-row" key={rowI}>
                            {
                                [...Array(3)].map((col, colI) => { // create columns
                                    return self.renderSquare((3 * rowI) + colI); // square index
                                })}
                        </div>
                    );
                })}
            </div>
        );
    }
}
export default Board;