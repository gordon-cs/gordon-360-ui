import { Polar } from 'react-chartjs-2';
import { toTitleCase } from 'services/utils';
import { Colors, VictoryPromiseCategory, VictoryPromiseColor } from 'services/victoryPromise';

let light_gray = '#EBEAEA';

const colors = new Array<VictoryPromiseColor | typeof light_gray>(4);
const data = new Array<number>(4);
const labels = new Array<string>(4);

type Props = { scores: Record<VictoryPromiseCategory, number> };

const GraphDisplay = ({ scores }: Props) => {
  const minimumScore = Math.min(...Object.values(scores).filter((v) => v > 0), 1);
  /**
   * A 0 value won't display on the graph, so we use `emptySliceValue` to represent empty values,
   * which is 2/3 of the minimum non-zero score
   */
  const emptySliceValue = minimumScore * 0.6;

  Object.entries(scores).forEach((score) => {
    const [key, value] = score as [VictoryPromiseCategory, number];
    const index = GraphOrder[key];
    labels[index] = toTitleCase(key, '_');
    if (value > 0) {
      colors[index] = Colors[key];
      data[index] = value;
    } else {
      colors[index] = light_gray;
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
            max: (Math.max(...data) ?? 0.8) + 0.2,
            min: 0,
            maxTicksLimit: 1,
          },
        },
        tooltips: {
          callbacks: {
            label: (
              tooltipItem: { yLabel: number; index: number },
              data: { labels: typeof labels; datasets: typeof datasets },
            ) => {
              const score = tooltipItem.yLabel;
              const value = score === emptySliceValue ? 0 : score;
              var label = data.labels[tooltipItem.index];
              return `${label}: ${value}`;
            },
          },
        },
      }}
    />
  );
};

/**
 * The ChartJS graph should be in order so that each Victory Promise category
 * appears in the same quadrant as it's corresponding icon in the IconDisplay mode.
 *
 * The IconDisplay mode shows the categories in a square ordered by when they appear in the
 * mission statement. So this order in the mission statement:
 *   1. Christian Character
 *   2. Intellectual Maturity
 *   3. Lives of Service
 *   4. Leadership Worldwide
 *
 * becomes this layout in the Icon Display:
 *
 * 1  2
 *
 * 3  4
 *
 * However, the ChartJS Polar Graph takes data in an array (including the numbers, labels,
 * and background colors). The elements are placed in clockwise order on the graph, starting at
 * the top right. For 4 elements numbered 0 through 3, we get the order:
 *
 * 3  0
 *
 * 2  1
 *
 * To ensure that the graph data lines up with icon order, we use the following map to determine
 * the array index of each category.
 */
export const GraphOrder = {
  christian_character: 3,
  intellectual_maturity: 0,
  lives_of_service: 2,
  leadership_worldwide: 1,
} as const;

export default GraphDisplay;
