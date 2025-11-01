# 🎬 Redux Toolkit Movie Application

A modern, feature-rich movie and TV show discovery application built with React and Redux Toolkit. Browse thousands of movies and TV shows, view detailed information, explore actor profiles, and track upcoming releases.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.2.7-purple?logo=redux)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎥 Movies & TV Shows
- **Browse Movies**: Discover thousands of movies with pagination support
- **TV Shows**: Explore popular TV shows and series
- **Detailed Information**: View comprehensive details including cast, crew, ratings, and reviews
- **Movie Trailers**: Watch trailers and video content
- **Soundtracks**: Browse movie soundtracks and music

### 🔍 Search & Filter
- **Smart Search**: Search movies and TV shows by title
- **Genre Filtering**: Filter content by genre categories
- **Advanced Filtering**: Sort and filter by various criteria

### 👤 Actor Profiles
- **Actor Information**: View detailed actor profiles and biographies
- **Filmography**: Browse complete filmography of actors
- **Cast & Crew**: Explore cast and crew information for each title

### 📊 Analytics & Charts
- **Box Office Charts**: Visualize box office performance with interactive charts
- **Trending Content**: Discover trending movies and TV shows
- **Statistics**: View ratings and popularity metrics

### 🌐 Internationalization
- **Multi-language Support**: Switch between different languages
- **Language Context**: Persistent language preferences

### 📅 Calendar
- **Release Calendar**: Track upcoming movie releases
- **Schedule View**: View release dates in calendar format

### 🎨 UI/UX Features
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Fully responsive layout for all devices
- **Skeleton Loaders**: Smooth loading states
- **Modal Views**: Interactive modals for detailed content
- **Carousel/Slider**: Browse content with smooth sliders
- **Pagination**: Navigate through large datasets efficiently

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- TMDB API Key (Get one from [The Movie Database](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/redux-toolkit-project.git
   cd redux-toolkit-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Create a `.env` file in the root directory
   - Add your TMDB API key:
     ```
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is optimized and minified for best performance.

### `npm run eject`
**Note: This is a one-way operation!** Ejects the app from Create React App configuration for full control.

## 🛠️ Technology Stack

### Core
- **React** (18.3.1) - UI library
- **Redux Toolkit** (2.2.7) - State management
- **React Redux** (9.1.2) - React bindings for Redux
- **React Router DOM** (5.3.4) - Routing

### UI Components & Styling
- **Lucide React** (0.477.0) - Icon library
- **React Icons** (5.5.0) - Additional icons
- **React Modal** (3.16.3) - Modal dialogs
- **React Tabs** (6.1.0) - Tab components
- **React Slick** (0.30.3) - Carousel/slider
- **Slick Carousel** (1.8.1) - Carousel functionality

### Data Visualization
- **Recharts** (2.15.1) - Charts and graphs

### Utilities
- **Axios** (1.7.5) - HTTP client
- **React Calendar** (5.1.0) - Calendar component
- **React Paginate** (8.3.0) - Pagination
- **AJV** (8.17.1) - JSON schema validator

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing

## 📁 Project Structure

```
redux-toolkit-project/
├── public/              # Static files
├── src/
│   ├── common/          # Common utilities and API
│   │   └── api/         # API configuration
│   ├── component/       # React components
│   │   ├── Home.js
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── MovieListing.js
│   │   ├── MovieDetail.js
│   │   ├── TVShows.js
│   │   ├── TVShowDetail.js
│   │   ├── ActorProfilePage.js
│   │   ├── MovieCalendar.js
│   │   ├── BoxOfficeChart.js
│   │   ├── CastCrew.js
│   │   ├── MovieVideos.js
│   │   ├── Soundtracks.js
│   │   ├── LanguageSwitcher.js
│   │   ├── ThemeToggle.js
│   │   └── ...
│   ├── context/         # React Context providers
│   ├── features/        # Redux slices
│   │   ├── movies/      # Movie-related state
│   │   └── store.js     # Redux store configuration
│   ├── images/          # Image assets
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── package.json
└── README.md
```

## 🎯 Key Features Explained

### Redux State Management
The application uses Redux Toolkit for efficient state management with slices for different features:
- Movie state management
- TV show state management
- User preferences

### Routing
React Router handles navigation between:
- Home page (`/`)
- TV Shows (`/tv`)
- TV Show Details (`/tv/:id`)
- Movie Details (`/movie/:id`)
- Actor Profiles (`/actor/:id`)
- Movie Calendar (`/calendar`)
- 404 Page (Not Found)

### API Integration
Integrates with The Movie Database (TMDB) API for:
- Movie and TV show data
- Actor information
- Images and posters
- Video trailers
- Ratings and reviews

## 🎨 Customization

### Theme
The app supports theme toggling. Customize themes in the respective CSS files.

### Language
Add new languages by extending the language context and updating API calls with appropriate language codes.

## 🐛 Troubleshooting

### Common Issues

**API Key Error**
- Ensure your TMDB API key is correctly set in the `.env` file
- Verify the API key is valid and active

**Build Fails**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

**Port Already in Use**
- Change the port by setting `PORT=3001 npm start`

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Create React App](https://create-react-app.dev/) for the initial setup
- All contributors and open-source libraries used in this project

---

**Built with ❤️ using React and Redux Toolkit**
