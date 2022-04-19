# (Udacity) Image Processing API

This project is for the Advanced Full-Stack Web Development track provided by [Udacity](https://www.udacity.com/).

It is a service to resize images with the desired dimensions and save them as a cache to be reused upon request again.

## Tech Stack

- Server
  - Node
  - Express
  - Sharp
- Development
  - Typescript
  - Eslint
  - Prettier
  - Jasmine
  - Supertest

## Installation

Clone the project

```bash
  git clone https://github.com/Eslam-Gaber645/-Udacity--Image-processing-API.git
```

Go to the project directory

```bash
  cd ./-Udacity--Image-processing-API
```

Install dependencies

```bash
  npm i
```

Build project

```bash
  npm run build
```

## Running Server

To run the server, run the following command

```bash
  npm run start
```

_Now the server is running on port 3000!._

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## All NPM Tasks

| Task              | Action                             | Note                                      |
| :---------------- | :--------------------------------- | :---------------------------------------- |
| `clean`           | Remove build directory             | .                                         |
| `move:index.html` | Move index.html to build directory | it's used by `build`                      |
| `build`           | Build the app                      | uses the `clean & move:index.html` tasks. |
| `start`           | Start the server                   | You have to `build` the app first.        |
| `start:dev`       | Start the dev server               | .                                         |
| `jasmine`         | Run jasmine tests                  | You have to `build` the app first.        |
| `test`            | Build app and run tests            | uses the `build` task.                    |
| `prettier`        | Prettify source code               | .                                         |
| `lint`            | Linting source code                | .                                         |
| `lint:fix`        | Linting and fix source code        | .                                         |

## API Reference

#### Description page:-

```http
  GET /
```

#### Get image:-

```http
  GET /image?filename=${imageName}&width=${width}&height=${height}
```

| Parameter   | Type      | Description                       |
| :---------- | :-------- | :-------------------------------- |
| `imageName` | `string`  | **Required**. Target image name   |
| `width`     | `integer` | **Optional**. Pixel numeric value |
| `height`    | `integer` | **Optional**. Pixel numeric value |

## Environment Variables

You can change the following environment variables in .env file.

- `PORT` : The server port.

- `ORIGINAL_IMAGES_DIR` : The original images directory.

- `THUMB_IMAGES_DIR` : The resized images directory.

## Notes

-If width and height are not defined or are not valid values, then the original image will be sent without resizing.

-If only width or height is defined with a valid value, the other dimension of the image will be scaled based on the aspect ratio of the original image.

-You can resize any image with any extension.
