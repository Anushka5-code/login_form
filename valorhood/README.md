# VALORHOOD

A React application for VALORHOOD with an interactive login portal.

## Features

- Interactive login modal with a unique "roaming" button that moves when the form is invalid
- Futuristic UI with gradient backgrounds and glassmorphism effects
- Form validation with visual feedback
- Responsive design

## Project Structure

- `src/App.js` - Main application component
- `src/components/LoginModal.js` - Login modal component with interactive button
- `src/App.css` - Styles for the application
- `public/index.html` - HTML template

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

To build the app for production:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## How It Works

The login form features a unique "roaming" button that moves around when the form is invalid. The button stops moving and becomes clickable when:

1. The username is at least 3 characters long
2. The password is at least 6 characters long
3. Both fields are filled

The button also stops moving when either input field is focused, providing a better user experience.

## License

[MIT](LICENSE)
