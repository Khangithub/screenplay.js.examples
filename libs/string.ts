export function to_string(input: string | undefined): string {
  if (typeof input === 'string') {
    return input; // Return the input string if it's defined
  } else {
    throw new Error('Input is not a string');
  }
}
