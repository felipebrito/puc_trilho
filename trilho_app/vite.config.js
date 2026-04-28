import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const DESIGN_SETTINGS_PATH = path.resolve('./src/data/design_settings.json')

function designSaverPlugin() {
  return {
    name: 'design-saver',
    configureServer(server) {
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
    }
  }
}

export default defineConfig({
  plugins: [react(), designSaverPlugin()],
})
