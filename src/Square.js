import React from 'react';

function Square(props) {
    if (props.highlight) {
        return (
            <button className="square" onClick={props.onClick} style={{color: "red"}}>
                {props.value}
            </button>
        );
    }else {
        return (
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
    }

    // return (
    //     <button className="square" onClick={props.onClick}>
    //         {props.value}
    //     </button>
    // );
}
export default Square;