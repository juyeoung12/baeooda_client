import { defineConfig } from 'vite'; // ✅ 이 줄 추가!
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
      define: {
        'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
      },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    ...(isDev && {
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:5000',
            changeOrigin: true,
            secure: false,
          },
        },
      },
    }),
  };
});
