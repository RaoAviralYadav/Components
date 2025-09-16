import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-300">
      <div className="flex space-x-8 mb-10">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="w-24 h-24 transition-transform duration-300 hover:scale-110" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="w-24 h-24 transition-transform duration-300 hover:scale-110" alt="React logo" />
        </a>
      </div>

      <h1 className="text-5xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Vite + React
      </h1>

      <div className="card bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 w-full max-w-sm text-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          count is {count}
        </button>
        <p className="mt-6 text-sm text-gray-400">
          Edit <code className="bg-gray-700 px-2 py-1 rounded-md text-gray-300">src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;