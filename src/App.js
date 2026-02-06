import './App.css';
import { BarChart } from './components/BarChart/BarChart';
import { HorizontalBarChart } from './components/HorizontalBarChart/HorizontalBarChart';
import { PieChart } from './components/PieChart/PieChart';
import { LineChart } from './components/LineChart/LineChart';

const sampleData = JSON.stringify(
  [
    { name: 'Q1', revenue: 100, costs: 40, profit: 60 },
    { name: 'Q2', revenue: 120, costs: 45, profit: 75 },
    { name: 'Q3', revenue: 140, costs: 50, profit: 90 },
  ],
  null,
  2
);

const horizontalData = JSON.stringify(
  [
    { label: '2022', value: 18 },
    { label: '2023', value: 6 },
    { label: '2024', value: -22 },
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

const lineChartData = JSON.stringify(
  [
    { name: 'Jan', revenue: 4000, costs: 2400 },
    { name: 'Feb', revenue: 3000, costs: 1398 },
    { name: 'Mar', revenue: 2000, costs: 5800 },
    { name: 'Apr', revenue: 2780, costs: 3908 },
    { name: 'May', revenue: 1890, costs: 4800 },
    { name: 'Jun', revenue: 2390, costs: 3800 },
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
              chartType="column"
              baseColor="#00a0dc"
              barRadius={10}
              showCartesianGrid={true}
              showXAxis={true}
              showYAxis={true}
              showTooltip={true}
              showLegend={true}
              enableAnimation={true}
              valueFormat="number"
              gridStrokeDasharray="3 3"
              height={400}
              yAxisWidth={60}
            />
          </div>
        </section>

        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '20px', color: '#fff' }}>Line Chart Component</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', background: '#fff', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>Line Mode</h3>
              <LineChart
                data={lineChartData}
                xAxisKey="name"
                chartType="line"
                baseColor="#00a0dc"
                showCartesianGrid={true}
                showXAxis={true}
                showYAxis={true}
                showTooltip={true}
                showLegend={true}
                enableAnimation={true}
                valueFormat="number"
                height={300}
                yAxisWidth={60}
              />
            </div>
            <div style={{ flex: '1 1 400px', background: '#fff', padding: '20px', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>Area Mode</h3>
              <LineChart
                data={lineChartData}
                xAxisKey="name"
                chartType="area"
                baseColor="#00a0dc"
                showCartesianGrid={true}
                showXAxis={true}
                showYAxis={true}
                showTooltip={true}
                showLegend={true}
                enableAnimation={true}
                valueFormat="number"
                height={300}
                yAxisWidth={60}
              />
            </div>
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
              height={160}
              barCategoryGap={4}
              barRadius={8}
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
