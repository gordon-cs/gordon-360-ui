import { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { getAffiliations } from 'services/recim/affiliations';
import { theme360 } from 'theme';

const AffiliationsChart = () => {
  const [affiliations, setAffiliations] = useState();
  const [data, setData] = useState([]);

  const options = {
    scales: {
      yAxes: {
        beginAtZero: true,
        ticks: {
          beginAtZero: true,
        },
      },
    },
    title: {
      display: false,
    },
  };

  useEffect(() => {
    const loadData = async () => {
      let sortedAffiliations = await getAffiliations();
      sortedAffiliations.sort((a, b) => {
        if (a.Points > b.Points) return -1;
        return 1;
      });
      setAffiliations(sortedAffiliations);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (affiliations) {
      setData({
        labels: affiliations.map((a) => a.Name),
        datasets: [
          {
            indexAxis: 'y',
            label: 'Points',
            // current implementation of theme does not allow me to change chart.js colors
            backgroundColor: theme360.colorSchemes.light.palette.primary[700],
            borderColor: theme360.colorSchemes.light.palette.primary[600],
            data: affiliations.map((a) => a.Points),
          },
        ],
      });
    }
  }, [affiliations]);
  return <HorizontalBar data={data} options={options} />;
};

export default AffiliationsChart;
