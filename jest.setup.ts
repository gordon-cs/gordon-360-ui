import '@testing-library/jest-dom';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

jest.mock('services/storage', () => ({
  get: jest.fn((key) => {
    if (key === 'network-status') return 'online';
    return null;
  }),
  set: jest.fn(),
}));

