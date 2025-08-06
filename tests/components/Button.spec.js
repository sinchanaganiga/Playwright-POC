import { test, expect } from '@playwright/experimental-ct-react';
import Button from '../../components/Button.jsx';

test('Button renders and clicks', async ({ mount }) => {
  const component = await mount(<Button label="Click Me" onClick={() => {}} />);
  await expect(component).toContainText('Click Me');
  await component.click();
});
