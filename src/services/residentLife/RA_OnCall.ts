import http from 'services/http';

const fetchOnDutyData = async () => {
  try {
    return await http.get('Housing/ra/on-call/all');
  } catch (error) {
    console.error('Error fetching on-duty data:', error);
    throw error;
  }
};

export { fetchOnDutyData };
