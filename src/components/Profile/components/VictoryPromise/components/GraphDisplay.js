import { Polar } from 'react-chartjs-2';
import { toTitleCase } from 'services/utils';
import { gordonColors } from 'theme';

const colorsMap = {
  christian_character: gordonColors.secondary.red,
  intellectual_maturity: gordonColors.secondary.green,
  lives_of_service: gordonColors.secondary.yellow,
  leadership_worldwide: gordonColors.primary.cyan,
};

const graphOrder = {
  christian_character: 3,
  intellectual_maturity: 0,
  lives_of_service: 2,
  leadership_worldwide: 1,
};

const getDatasets = (scores) => {
  const minimumScore = Math.min(...Object.values(scores));
  const emptySliceValue = (minimumScore || 1) - 0.3;

  const colors = new Array(4);
  const data = new Array(4);
  const labels = new Array(4);

  Object.entries(scores).forEach(([key, value]) => {
    const index = graphOrder[key];
    labels[index] = toTitleCase(key, '_');
    if (value > 0) {
      colors[index] = colorsMap[key];
      data[index] = value;
    } else {
      colors[index] = gordonColors.neutral.lightGray;
      data[index] = emptySliceValue;
    }
  });

  const datasets = [
    {
      data,
      backgroundColor: colors,
      borderWidth: 3,
    },
  ];

  return { labels, datasets };
};

const GraphDisplay = ({ scores }) => {
  const { labels, datasets } = getDatasets(scores);
  return (
    <Polar
      data={{ labels, datasets }}
      options={{
        legend: {
          display: false,
        },
        scale: {
          display: false,
          ticks: {
            display: false,
            max: (Math.max(...datasets[0].data) ?? 0.8) + 0.2,
            min: 0,
            maxTicksLimit: 1,
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const score = tooltipItem.yLabel;
              const value = score < 1 && score > 0 ? 0 : score;
              var label = data.labels[tooltipItem.index];
              return `${label}: ${value}`;
            },
          },
        },
      }}
    />
  );
};

export default GraphDisplay;
