import React from 'react';

const BackButton = (props) => {
    return (
        <div>
            <button onClick={props.history.goBack}>Back</button>
        </div>
    );
}

export default BackButton;