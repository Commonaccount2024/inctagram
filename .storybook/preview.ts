import type { Preview } from '@storybook/react'
import '@fontsource-variable/inter';
import '@fontsource/roboto';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
