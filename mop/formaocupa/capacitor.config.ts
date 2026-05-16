import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'formaocupa',
  webDir: 'www',
  server: {
    cleartext: true, // ◄ ADD THIS LINE TO PERMIT HTTP TRAFFIC
    androidScheme: 'http'
  }
};

export default config;
