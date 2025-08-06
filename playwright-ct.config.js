import { defineConfig } from '@playwright/experimental-ct-react';

export default defineConfig({
  testDir: './tests/components',
  use: {
    ctPort: 3100
  }
});
