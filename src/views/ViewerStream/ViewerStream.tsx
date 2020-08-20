import React, { FunctionComponent } from 'react';

import { PendingStream } from '../StreamPending';
import { ActiveStream } from '../StreamActive';

import { useDB } from '../../data';

export const ViewerStream: FunctionComponent = () => {
  const { rooms, user } = useDB();

  const pathArray = window.location.pathname.split('/');

  const code = pathArray[pathArray.length - 1];

  const data =
    rooms && rooms.length ? rooms.find((r) => r.shortcode === code) : null;

  if (!data) {
    return <div>{'This was a bad link. :('}</div>;
  }

  const startTime = data.stream.startTime;
  const endTime = data.stream.endTime;
  const currentTime = new Date().getTime();

  // Stream has ended
  if (endTime < currentTime) {
    return <div>{'The stream you are looking for has ended. :('}</div>;
  }

  // Stream is pending
  if (startTime > currentTime) {
    return <PendingStream data={data} code={code} />;
  }

  // Stream is active
  if (user?.userID === data.owner) {
    return <div>{'This should display the user stream set up'}</div>;
  }

  return <ActiveStream />;
};
