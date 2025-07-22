# Image Processing API

This project is a simple Node.js and Express API for resizing images on the fly. It uses TypeScript for type safety and Sharp for image processing.

## Features

- Resize images by providing filename, width, and height as query parameters.
- Returns the resized image as a JPEG.
- Caches resized images for faster subsequent requests.
- Includes unit and integration tests using Jasmine and Supertest.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd image-processing
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the project:
   ```sh
   npm run build
   ```

### Running the Server

```sh
npm start
```

The server will be running at [http://localhost:3000/api/image](http://localhost:3000/api/image).

### Example Request

```
GET /api/image?filename=fjord&width=200&height=200
```

## Testing

Run all tests with:

```sh
npm test
```

## Project Structure

- `src/` - Source code
  - `routes/` - Express routes
  - `utils/` - Utility functions (image processing)
  - `assets/` - Image files (full and resized)
  - `tests/` - Jasmine test

## License

ISC