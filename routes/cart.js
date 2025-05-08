const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/add_product', (req, res) => {
    const { email, product_id } = req.body;
  
    if (!email || !product_id) {
      return res.status(400).json({ error: 'email and product_id are required' });
    }
  
    const existing = db.prepare('SELECT * FROM cart_items WHERE user_email = ? AND product_id = ?').get(email, product_id);
  
    if (existing) {
      db.prepare('UPDATE cart_items SET quantity = quantity + 1 WHERE user_email = ? AND product_id = ?').run(email, product_id);
  
    } else {
      db.prepare('INSERT INTO cart_items (user_email, product_id, quantity) VALUES (?, ?, 1)').run(email, product_id);
    }
  
    const updated = db.prepare('SELECT quantity FROM cart_items WHERE user_email = ? AND product_id = ?').get(email, product_id);
  
    res.json({
      message: 'Item added/updated in cart',
      product_id,
      quantity: updated.quantity
    });
});
  
router.post('/get_products', (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Missing email in request body' });
    }

    const items = db.prepare(`SELECT * FROM cart_items WHERE user_email = ?`).all(email);
  
    res.status(200).json(items);
});
  
router.post('/remove_product', (req, res) => {
    const { email, product_id } = req.body;
  
    if (!email || !product_id) {
      return res.status(400).json({ error: 'Missing email or product_id in request body' });
    }
  
    const item = db.prepare('SELECT * FROM cart_items WHERE user_email = ? AND product_id = ?').get(email, product_id);
  
    if (!item) {
      return res.status(404).json({ error: 'Product not found for this user' });
    }
  
    if (item.quantity > 1) {
      db.prepare('UPDATE cart_items SET quantity = quantity - 1 WHERE user_email = ? AND product_id = ?').run(email, product_id);
  
      const updated = db.prepare('SELECT * FROM cart_items WHERE user_email = ? AND product_id = ?').get(email, product_id);
      return res.status(200).json(updated);
    } 
    else {
      db.prepare('DELETE FROM cart_items WHERE user_email = ? AND product_id = ?').run(email, product_id);
  
      return res.status(200).json({
        user_email: email,
        product_id,
        quantity: 0
      });
    }
});
  

module.exports = router;
