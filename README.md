# Windsurf UI Library

A lightweight React UI library built with React 15.

## Installation

```bash
npm install windsurf-ui-lib
```

## Usage

### Modal Component

```jsx
import { showModal } from 'windsurf-ui-lib';

const closeModal = showModal({
  title: "Welcome",
  content: <div>Hello World!</div>
});

// Call closeModal() when you want to close the modal programmatically
```

## Available Components

- `Modal`: A modal dialog component with a programmatic API via `showModal` function

## Requirements

- React ^15.0.0
- React DOM ^15.0.0

## Development

- `npm install`: Install dependencies
- `npm run build`: Build the library
- `npm publish`: Publish to npm (requires authentication)

## License

MIT License
