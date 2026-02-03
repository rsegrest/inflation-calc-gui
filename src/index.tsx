import { createRoot } from 'react-dom/client';
import './index.css';

// import { LineChartExample } from './LineChartExample.tsx';
import App from './components/App'

const rootElement = document.getElementById('root');
createRoot(rootElement as HTMLElement).render(<App />);
