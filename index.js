import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { setupDatabase } from './src/core/config';

setupDatabase();

AppRegistry.registerComponent(appName, () => App);
