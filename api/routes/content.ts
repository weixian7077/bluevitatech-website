import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_FILE = path.join(__dirname, '../data/content.json');

export function contentRoutes(app) {
  app.get('/api/content', (req, res) => {
    try {
      const content = fs.readFileSync(CONTENT_FILE, 'utf-8');
      res.json(JSON.parse(content));
    } catch (error) {
      res.status(500).json({ error: 'Failed to read content' });
    }
  });

  app.put('/api/content', (req, res) => {
    try {
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2));
      res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update content' });
    }
  });

  app.put('/api/content/:section', (req, res) => {
    try {
      const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
      const section = req.params.section;
      
      if (content[section]) {
        content[section] = { ...content[section], ...req.body };
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
        res.json({ success: true, message: `${section} updated successfully` });
      } else {
        res.status(404).json({ error: 'Section not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update content' });
    }
  });
}

export default contentRoutes;
