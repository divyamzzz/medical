// src/components/Result.js
import React from 'react';

function Result({ result }) {
    return (
        <div>
            {result === 1 ? 
                <div className="alert alert-danger">POSITIVE. The patient might have the disease.</div> :
                <div className="alert alert-success">NEGATIVE. The patient is healthy.</div>}
        </div>
    );
}

export default Result;
