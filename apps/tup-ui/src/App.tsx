import { useState } from 'react';
import { Message } from '@tacc/core-components';
import LoginComponent from './auth/LoginComponent';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <Message />
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <LoginComponent />
      </header>
    </div>
  );
}

export default App;
