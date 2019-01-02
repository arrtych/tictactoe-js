import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Game from './Game';



function NumberList() {
    const list = Game.state.location;
    const listItems = list.map((number) =>
        <li>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
}



// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

