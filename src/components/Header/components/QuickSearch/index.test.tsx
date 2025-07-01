import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GordonQuickSearch from '.';
import { BrowserRouter } from 'react-router-dom';
import { getHighlightedText, getHighlightedDetails } from '.';
import { act } from 'react';

jest.mock('hooks', () => ({
  useNetworkStatus: () => true,
  useWindowSize: () => [800], // Simulate wide screen
}));

const mockSearch = jest.fn();

const renderComponent = (props: any = {}) =>
  render(
    <BrowserRouter>
      <GordonQuickSearch searchFunction={mockSearch} {...props} />
    </BrowserRouter>,
  );

describe('GordonQuickSearch', () => {
  it('renders with default placeholder text', () => {
    render(
      <BrowserRouter>
        <GordonQuickSearch />
      </BrowserRouter>,
    );
    expect(screen.getByPlaceholderText('People Search')).toBeInTheDocument();
  });

  it('renders with custom placeholder text', () => {
    render(
      <BrowserRouter>
        <GordonQuickSearch customPlaceholderText="Search users" />
      </BrowserRouter>,
    );
    expect(screen.getByPlaceholderText('Search users')).toBeInTheDocument();
  });
});

describe('GordonQuickSearch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockSearch.mockReset();
  });

  it('renders placeholder text correctly', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('People Search')).toBeInTheDocument();
  });

  it('triggers search after input debounce', async () => {
    mockSearch.mockResolvedValue([Date.now(), []]);
    renderComponent();

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'John' } });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockSearch).toHaveBeenCalledWith('John');
  });

  it('resets search if input is too short', () => {
    renderComponent();
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'J' } });
    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('displays no options when no results', async () => {
    mockSearch.mockResolvedValue([Date.now(), []]);
    renderComponent();

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'NoResult' } });
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(await screen.findByText('No results')).toBeInTheDocument();
  });
});

describe('getHighlightedDetails', () => {
  it('returns highlighted name and username parts', () => {
    const person: SearchResult = {
      FirstName: 'John',
      LastName: 'Doe',
      NickName: 'Johnny',
      MaidenName: 'Smith',
      UserName: 'john.doe',
    };
    const regex = /john|smith/i;
    const { name, username } = getHighlightedDetails(person, regex);

    expect(name).toBeDefined();
    expect(username).toBeDefined();
  });
});

describe('getHighlightedText', () => {
  it('highlights matched substrings', () => {
    const parts = getHighlightedText('hello john smith', /(john|smith)/i);
    const highlighted = parts.filter((part: any) => part.props?.className);
    expect(highlighted).toHaveLength(2);
  });
});
