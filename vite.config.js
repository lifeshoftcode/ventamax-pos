import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import path from 'path';
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(),
    createStyleImportPlugin({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      'react-is': path.resolve(__dirname, 'node_modules/react-is/index.js'),
      '@': path.resolve(__dirname, "./src"),
      '@component': path.resolve(__dirname, './src/views/component'),
      '@pages': path.resolve(__dirname, './src/views/pages'),
      '@templates': path.resolve(__dirname, './src/views/templates'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      // '@validate': path.resolve(__dirname, './src/utils'),
      '@fbConfig': path.resolve(__dirname, './src/firebase'),
      '@schema': path.resolve(__dirname, './src/schema'),
      '@routes': path.resolve(__dirname, './src/routes'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'btn-padding-base': '10px',
          'btn-padding-large': '6px'
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: '0.0.0.0'
  }, build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Agrupar todos los paquetes de Font Awesome en un solo chunk para evitar problemas de inicialización
          if (id.includes('@fortawesome')) {
            return 'fortawesome-bundle';
          }
          // Para el resto de los módulos, mantener el comportamiento original
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    // Optimización para evitar problemas de hoisting y circulares
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  define: {
    'global': 'window'
  }
})