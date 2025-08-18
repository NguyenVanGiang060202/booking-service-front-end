# 🏨 Booking Service Frontend

A modern, responsive booking platform built with React, TypeScript, and Vite. This frontend application provides a seamless user experience for browsing, searching, and booking various services.


## Preview
<img src="./public/preview.gif" width="600" />


## ✨ Features

- 🔍 Service search and filtering
- 📅 Interactive booking calendar
- 🔄 Real-time availability checking
- 📱 Fully responsive design
- 🚀 Blazing fast performance with Vite
- 🛠 TypeScript for type safety
- 🎨 Modern UI with Emotion for styling
- 🔒 Authentication and authorization
- 📍 Location-based services

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher) or yarn (version 1.22 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NguyenVanGiang060202/booking-service-front-end.git
   cd booking-service-front-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   ```

### Available Scripts

- **Development server**
  ```bash
  npm run dev
  # or
  yarn dev
  ```
  Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

- **Production build**
  ```bash
  npm run build
  # or
  yarn build
  ```
  Builds the app for production to the `dist` folder.

- **Preview production build**
  ```bash
  npm run preview
  # or
  yarn preview
  ```
  Locally preview the production build.

- **Linting**
  ```bash
  npm run lint
  # or
  yarn lint
  ```
  Runs ESLint to check code quality.

## 🏗 Project Structure

```
src/
├── assets/           # Static assets like images, fonts
├── components/       # Reusable UI components
│   ├── common/       # Common components (buttons, inputs, etc.)
│   ├── layout/       # Layout components (header, footer, etc.)
│   └── ui/           # UI components library
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API service layer
└── styles/           # Global styles and themes
```

## 🛠 Development

### Code Style

- We use ESLint and Prettier for code formatting
- Follow the Airbnb JavaScript/TypeScript style guide
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)

### Git Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. Commit your changes with a descriptive message:
   ```bash
   git commit -m "feat: add user authentication"
   ```

3. Push your branch and create a pull request

## 📦 Dependencies

- React 18
- TypeScript 5
- Vite 4
- React Router 6
- Emotion (for styling)
- Axios (for API requests)
- React Query (for data fetching)
- React Hook Form (for forms)
- Date-fns (for date manipulation)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any questions or feedback, please open an issue or contact the maintainers.

---

Built with ❤️ by [Your Team Name]
