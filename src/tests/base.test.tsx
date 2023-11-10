import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ErrorTriggerButton from '../components/ErrorTriggerButton';
import '@testing-library/jest-dom';

test('displays the correct title', () => {
  render(<ErrorTriggerButton />);
  const linkElement = screen.getByText(/Crash the App!/);
  expect(linkElement).toBeVisible();
});
