import React, { FunctionComponent } from 'react';

interface IProps {
  code: string;
}

export const Confirmation: FunctionComponent<IProps> = (props) => {
  const { code } = props;

  return (
    <div>
      You're all set! Here's your link to share with others!
      <div>
        <a
          href={`localhost:3000/party/${code}`}
        >{`localhost:3000/party/${code}`}</a>
      </div>
    </div>
  );
};
