import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Publisher } from '../src/publisher';

const pubEvent = new Publisher();

const publish = () => pubEvent.publish();

function App() {

  const [pubs, setPubs] = useState([]);

  useEffect(() => {

    const handlePublishEvent = () => setPubs(
      _pubs => ([
        ..._pubs,
        (_pubs.length > 0 ? ', ' : '') + 'pub ' + _pubs.length
      ])
    );

    const sub = pubEvent.subscribe(handlePublishEvent);

    return () => sub.unsubscribe();

  }, []);

  return (
    <>
      <div>pubs: {pubs}</div>
      <div>
        <button onClick={publish}>publish</button>
      </div>
    </>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
