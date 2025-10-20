import { appTools, defineConfig } from '@edenx/app-tools';

// https://edenx.bytedance.net/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  deploy: {
    autoRegion: true,
  },
  devtools: { sw: false },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
  ],
});
