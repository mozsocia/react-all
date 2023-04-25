Sure! Here's an example of how you can use the `react-chartjs-2` library to create a simple bar chart in a React component:

```js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  // Data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75,192,192,0.2)', // Bar fill color
        borderColor: 'rgba(75,192,192,1)', // Bar border color
        borderWidth: 1, // Bar border width
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart Example</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

```

In this example, we're using the `Bar` component from `react-chartjs-2` to render a bar chart. The `data` prop contains the labels and data for the chart, while the `options` prop allows you to configure various chart settings, such as scales, legends, and tooltips.

You can customize the appearance of the chart by modifying the properties in the `data` object, such as `backgroundColor` and `borderColor`, to set the fill color and border color of the bars, respectively. You can also adjust the `options` object to configure different chart settings, such as adjusting the scales for the x and y axes, adding tooltips, and changing the chart title.

Note: Make sure to install the required dependencies `react-chartjs-2` and `chart.js` in your project before using this code. You can install them using npm or yarn:

```
npm install react-chartjs-2 chart.js
```

or

```
yarn add react-chartjs-2 chart.js
```

I hope this helps you get started with `react-chartjs-2`! Let me know if you have any further questions.


1 / 1

give me example of Line Chart two dataset

1 / 1

Certainly! Here's an example of how you can create a line chart with two datasets using `react-chartjs-2` in a React component:

```js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  // Data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgba(75,192,192,1)', // Line color for dataset 1
        borderWidth: 1, // Line width for dataset 1
      },
      {
        label: 'Dataset 2',
        data: [50, 40, 70, 91, 66],
        borderColor: 'rgba(255,99,132,1)', // Line color for dataset 2
        borderWidth: 1, // Line width for dataset 2
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Line Chart Example with Two Datasets</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;

```

In this example, we're using the `Line` component from `react-chartjs-2` to render a line chart with two datasets. The `data` prop contains the labels and data for both datasets, while the `options` prop allows you to configure various chart settings, such as scales, legends, and tooltips.

The `datasets` array within the `data` object contains two objects, one for each dataset. Each dataset object has its own `label` for the legend, `data` for the data points, `borderColor` for the line color, and `borderWidth` for the line width.

You can customize the appearance and behavior of the line chart by modifying the properties in the `data` and `options` objects according to your needs. For example, you can adjust the colors, line styles, tooltips, and other settings to suit your requirements.

I hope this helps you create a line chart with two datasets using `react-chartjs-2`! Let me know if you have any further questions.
