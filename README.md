# WeatherApp

This repository contains a simple weather application developed using React.js. It fetches current weather data from the OpenWeatherMap API based on user input (city name) and displays essential weather information including temperature, humidity, and wind speed. The app is designed to be intuitive and responsive, providing users with up-to-date weather details for any location worldwide.

## How to Run

### Prerequisites
- Node.js installed on your local machine

### Steps

1. **Clone the repository**:
     ```bash
     git clone <repository-url>
     cd weatherApp
     ```
2. **Set API key**
   - Obtain a free API key from [OpenWeatherMap](https://openweathermap.org/api).
   - Add your API key to the `.env` file in root folder:
     ```
     VITE_APP_KEY = "<YOUR_API_KEY>"
     ```
3. **Install dependencies and start the application**
     ```bash
     npm install
     npm run dev
     ```
