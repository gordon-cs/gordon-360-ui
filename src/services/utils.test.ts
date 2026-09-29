import { toTitleCase } from './utils';

describe('toTitleCase', () => {
  it('returns an empty string when the input is empty', () => {
    // Arrange
    const input = '';

    // Act
    const result = toTitleCase(input);

    // Assert
    expect(result).toBe('');
  });

  it('preserves empty segments from repeated separators', () => {
    // Arrange
    const input = 'a__b';

    // Act
    const result = toTitleCase(input, '_');

    // Assert
    expect(result).toBe('A  B');
  });

  it('preserves empty segments from leading and trailing separators', () => {
    // Arrange
    const input = '_a_';

    // Act
    const result = toTitleCase(input, '_');

    // Assert
    expect(result).toBe(' A ');
  });

  it('capitalizes each word split on spaces by default', () => {
    // Arrange
    const input = 'person first name';

    // Act
    const result = toTitleCase(input);

    // Assert
    expect(result).toBe('Person First Name');
  });

  it('lowercases the rest of each word', () => {
    // Arrange
    const input = 'FIRST_NAME';

    // Act
    const result = toTitleCase(input, '_');

    // Assert
    expect(result).toBe('First Name');
  });
});
