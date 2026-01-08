import './App.css';
import { BarChart } from './components/BarChart/BarChart';
import { HorizontalBarChart } from './components/HorizontalBarChart/HorizontalBarChart';
import { PieChart } from './components/PieChart/PieChart';

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

const horizontalData = JSON.stringify(
  [
    { label: '2022', value: 14.8 },
    { label: '2023', value: 16.5 },
    { label: '2024', value: 17.5 },
  ],
  null,
  2
);

const pieData = JSON.stringify(
  [
    { name: 'Combustibles', value: 9094 },
    { name: 'Traditional Oral', value: 1058 },
    { name: 'New Categories', value: 1078 },
    { name: 'Other', value: 48 },
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
              bar2Fill="#82ca9d"
              barRadius={10}
              showCartesianGrid={true}
              showXAxis={true}
              showYAxis={true}
              showTooltip={true}
              showLegend={true}
              enableAnimation={true}
              valueFormat="currency"
              currencySymbol="$"
              gridStrokeDasharray="3 3"
              height={400}
              yAxisWidth={60}
            />
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '20px', color: '#fff' }}>Horizontal Bar Chart Component</h2>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <HorizontalBarChart
              data={horizontalData}
              labelKey="label"
              valueKey="value"
              baseColor="#ff007a"
              showGrid={true}
              showXAxis={true}
              showYAxis={true}
              showLabels={true}
              showTooltip={true}
              enableAnimation={true}
              valueFormat="percent"
              currencySymbol="$"
              minValue={0}
              maxValue={20}
              height={160}
              barCategoryGap={4}
              barRadius={8}
              labelFontWeight={600}
              labelColor="#000000"
              yAxisWidth={50}
              gridStrokeColor="#e6e6e6"
            />
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '20px', color: '#fff' }}>Pie Chart Component</h2>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <PieChart
              data={pieData}
              nameKey="name"
              valueKey="value"
              color1="#ff6b35"
              color2="#004e89"
              color3="#1a8fe3"
              color4="#b8b8b8"
              showTooltip={true}
              showLegend={true}
              enableAnimation={true}
              valueFormat="number"
              currencySymbol="$"
              innerRadius={60}
              paddingAngle={2}
              height={400}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
