import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const DESIGN_SETTINGS_PATH = path.resolve('./src/data/design_settings.json')
const RAIL_SETTINGS_PATH = path.resolve('./src/data/rail_settings.json')

const __dirname = path.dirname(new URL(import.meta.url).pathname)

function designSaverPlugin() {
  return {
    name: 'design-saver',
    configureServer(server) {
      server.middlewares.use('/api/save-rail', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end('Method Not Allowed'); return; }
        let body = '';
        req.on('data', chunk => { body += chunk });
        req.on('end', () => {
          try {
            const newSettings = JSON.parse(body);
            fs.writeFileSync(RAIL_SETTINGS_PATH, JSON.stringify(newSettings, null, 2));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });

      server.middlewares.use('/api/save-design', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', () => {
          try {
            const { period, section, id, values } = JSON.parse(body)
            if (!period || !section || !id || !values) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'period, section, id e values são obrigatórios' }))
              return
            }

            const settings = JSON.parse(fs.readFileSync(DESIGN_SETTINGS_PATH, 'utf-8'))
            if (!settings[period]) settings[period] = {}
            if (!settings[period][section]) settings[period][section] = {}
            settings[period][section][id] = values

            fs.writeFileSync(DESIGN_SETTINGS_PATH, JSON.stringify(settings, null, 2))
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: e.message }))
          }
        })
      })
      // Middleware para servir a pasta _conteudo que está fora da raiz do app
      server.middlewares.use('/_conteudo', (req, res, next) => {
        const filePath = path.join(__dirname, '..', req.url.split('?')[0]);
        if (req.url.startsWith('/Videos') || req.url.includes('_conteudo')) {
           // Se a URL já começar com /_conteudo a gente ajusta
           const targetPath = path.resolve(__dirname, '..', req.url.replace(/^\/_conteudo/, '_conteudo'));
           if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isFile()) {
             res.setHeader('Content-Type', 'video/mp4'); // Simplificando para mp4
             fs.createReadStream(targetPath).pipe(res);
             return;
           }
        }
        next();
      });
    }
  }
}

export default defineConfig({
  plugins: [react(), designSaverPlugin()],
  server: {
    fs: {
      allow: ['..']
    }
  }
})
