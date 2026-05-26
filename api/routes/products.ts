import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Product } from '../../src/types';

const router = Router();
const dataPath = join(process.cwd(), 'api', 'data', 'products.json');

const getProducts = (): Product[] => {
  try {
    const data = readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveProducts = (products: Product[]) => {
  writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

router.get('/', (_req, res) => {
  const products = getProducts();
  res.json(products);
});

router.get('/:id', (req, res) => {
  const products = getProducts();
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const products = getProducts();
  const newProduct: Product = {
    ...req.body,
    id: Date.now().toString(),
  };
  products.push(newProduct);
  saveProducts(products);
  res.json(newProduct);
});

router.put('/:id', (req, res) => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  saveProducts(products);
  res.json(products[index]);
});

router.delete('/:id', (req, res) => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(index, 1);
  saveProducts(products);
  res.json({ success: true });
});

export default router;
