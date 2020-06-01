import React from 'react';

import './Card.scss';

const Row = ({ className, title, value, children }) => (
    <div className={`card-row ${className ? className : ''}`}>
        <div className="card-row-title">{title}</div>
        {value && <div className="card-row-value">{value}</div>}
        {children && <div className="card-row-value">{children}</div>}
    </div>
);

export const Card = ({ data = {} }) => {
    return (
        <div className="card">
            <div className="card-content">
                {Object.keys(data).map((key) => <Row key={key + data[key]} className="row" title={key + ':'} value={key === 'hiredate' ? new Date(data[key]).toLocaleDateString() : data[key]} />)}
            </div>
        </div>
    );
};

export default Card;