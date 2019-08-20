import React from 'react';
import { render } from 'ink';
import App from './App';

export default function packageList(args) {
  render(<App args={args} />);
}
