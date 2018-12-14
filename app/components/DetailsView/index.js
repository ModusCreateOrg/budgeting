import React from 'react';

const DetailsView = ({ transaction, category }) => {
  const description = (transaction && transaction.description) || '';

  return (
    <div>
      {transaction && (
        <React.Fragment>
          <h1>Title: {description}</h1>
          <h5>Category: {category}</h5>
        </React.Fragment>
      )}
    </div>
  );
};

export default DetailsView;
