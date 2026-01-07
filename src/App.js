import './App.css';
import { BarChart } from './components/BarChart/BarChart';

const sampleData = JSON.stringify(
  [
    { name: 'Page A', value1: 4000, value2: 2400 },
    { name: 'Page B', value1: 3000, value2: 1398 },
    { name: 'Page C', value1: 2000, value2: 9800 },
    { name: 'Page D', value1: 2780, value2: 3908 },
    { name: 'Page E', value1: 1890, value2: 4800 },
    { name: 'Page F', value1: 2390, value2: 3800 },
    { name: 'Page G', value1: 3490, value2: 4300 },
  ],
  null,
  2
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Webflow Code Components</h1>
        <p>
          This is the development environment for Webflow Code Components.
        </p>
        <p>
          To share your components with Webflow, run: <code>npx webflow library share</code>
        </p>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <a
            href="https://docs.webflow.com/developers/code-components"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#61dafb', textDecoration: 'none' }}
          >
            View Webflow Code Components Documentation →
          </a>
          <a
            href="https://webflow-code-components.webflow.io/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#61dafb', textDecoration: 'none' }}
          >
            View Live Examples →
          </a>
        </div>
      </header>

      <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '20px', color: '#fff' }}>Bar Chart Component</h2>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <BarChart
              data={sampleData}
              xAxisKey="name"
              bar1Key="value1"
              bar2Key="value2"
              bar1Fill="#8884d8"
              bar1ActiveFill="#6366f1"
              bar1ActiveStroke="#4f46e5"
              bar2Fill="#82ca9d"
              bar2ActiveFill="#10b981"
              bar2ActiveStroke="#059669"
              barRadius={10}
              showCartesianGrid={true}
              showXAxis={true}
              showYAxis={true}
              showTooltip={true}
              showLegend={true}
              gridStrokeDasharray="3 3"
              maxWidth="700px"
              maxHeight="70vh"
              aspectRatio={1.618}
              marginTop={5}
              marginRight={0}
              marginBottom={5}
              marginLeft={0}
              yAxisWidth={60}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
