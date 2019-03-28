import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Publisher } from '../src/publisher';

const pubEvent = new Publisher();

function App() {

  const [pubs, setPubs] = useState([]);
  const publish = useCallback(
    () => pubEvent.publish(),
    []
  );
  useEffect(
    () => {
      const sub = pubEvent.subscribe(
        () => setPubs(
          _ => ([
            ..._,
            (_.length > 0 ? ', ' : '') + 'pub ' + _.length
          ])
        )
      );
      return () => sub.unsubscribe();
    },
    []
  );

  return (<>
    <div>pubs: {pubs.map(pub => pub)}</div>
    <div>
      <button onClick={publish}>publish</button>
    </div>
  </>);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
