import { Router } from 'express';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const router = Router();
const uploadDir = join(process.cwd(), 'public', 'uploads');

if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

router.post('/', (req, res) => {
  const chunks: Buffer[] = [];
  
  req.on('data', (chunk: Buffer) => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    try {
      const buffer = Buffer.concat(chunks);
      const contentType = req.headers['content-type'] || '';
      
      const boundary = contentType.split('boundary=')[1];
      if (!boundary) {
        return res.status(400).json({ error: 'No boundary found' });
      }

      const boundaryBuffer = Buffer.from(`--${boundary}`);
      const parts: Buffer[] = [];
      let start = 0;
      
      let i = 0;
      while (i < buffer.length - boundaryBuffer.length + 1) {
        let match = true;
        for (let j = 0; j < boundaryBuffer.length; j++) {
          if (buffer[i + j] !== boundaryBuffer[j]) {
            match = false;
            break;
          }
        }
        if (match) {
          if (start < i) {
            parts.push(buffer.subarray(start, i));
          }
          start = i + boundaryBuffer.length;
          i = start;
        } else {
          i++;
        }
      }

      for (const part of parts) {
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd === -1) continue;
        
        const header = part.subarray(0, headerEnd).toString();
        const data = part.subarray(headerEnd + 4);
        
        if (header.includes('filename=')) {
          const filenameMatch = header.match(/filename="([^"]+)"/);
          if (filenameMatch) {
            const originalName = filenameMatch[1];
            const ext = originalName.split('.').pop() || 'jpg';
            const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            const filepath = join(uploadDir, filename);
            
            const actualData = data.subarray(0, data.length - 2);
            
            writeFileSync(filepath, actualData);
            
            return res.json({
              url: `/uploads/${filename}`,
              filename: originalName,
            });
          }
        }
      }

      res.status(400).json({ error: 'No file found in upload' });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
});

export default router;
