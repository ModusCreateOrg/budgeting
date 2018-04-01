import React from 'react';

type  Props = {
  title: string,
  value: number
}

export default (props: Props) => {
  return (
    <div>
      <h3 className="heading">{props.title}</h3>
    </div>
  )
};
