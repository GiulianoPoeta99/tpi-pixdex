# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Configure environment variables

   ```bash
   # Copy the example environment file
   cp .env.sample .env

   # Edit .env and add your configuration values
   # - EXPO_PUBLIC_SUPABASE_URL: Your Supabase project URL
   # - EXPO_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous key
   # - EXPO_PUBLIC_API_URL: Your API base URL (default: http://localhost:8081)
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Environment Configuration

The application uses environment variables for configuration. The following variables are available:

- `EXPO_PUBLIC_SUPABASE_URL`: URL of your Supabase project
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`: Anonymous key for Supabase authentication
- `EXPO_PUBLIC_API_URL`: Base URL for API calls (defaults to `http://localhost:8081`)

These variables are automatically loaded from the `.env` file and are accessible throughout the application.

## API Integration

The application includes a modular HTTP service for API calls:

- **HttpService**: Centralized HTTP client with error handling and type safety
- **API Constants**: Centralized API URLs and endpoints configuration
- **Service Classes**: Modular services for different data types (ContenidosService, GenerosService, etc.)

All API calls include fallback to local data if the API is unavailable.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
