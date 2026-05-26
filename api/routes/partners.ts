import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Partner } from '../../src/types';

const router = Router();
const dataPath = join(process.cwd(), 'api', 'data', 'partners.json');

const getPartners = (): Partner[] => {
  try {
    const data = readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const savePartners = (partners: Partner[]) => {
  writeFileSync(dataPath, JSON.stringify(partners, null, 2));
};

router.get('/', (_req, res) => {
  const partners = getPartners();
  res.json(partners);
});

router.post('/', (req, res) => {
  const partners = getPartners();
  const newPartner: Partner = {
    ...req.body,
    id: Date.now().toString(),
  };
  partners.push(newPartner);
  savePartners(partners);
  res.json(newPartner);
});

router.put('/:id', (req, res) => {
  const partners = getPartners();
  const index = partners.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Partner not found' });
  }
  partners[index] = { ...partners[index], ...req.body };
  savePartners(partners);
  res.json(partners[index]);
});

router.delete('/:id', (req, res) => {
  const partners = getPartners();
  const index = partners.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Partner not found' });
  }
  partners.splice(index, 1);
  savePartners(partners);
  res.json({ success: true });
});

export default router;
