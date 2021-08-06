import { Router } from 'express';
import Npc from '../models/Npc.js';

export default Router()
  .post('/api/v1/npcs', async (req, res) => {
    console.log(req.body);
    try {
      const npc = await Npc.insert(req.body);
      console.log(npc, 'biscuits');
      res.send(npc);
    } catch (err) {
      res.status(401).send(err);
    }
  })

  .get('/api/v1/npcs/:id', async (req, res) => {
    try {
      const npc = await Npc.findById(req.params.id);
      res.send(npc);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/npcs', async (req, res) => {
    try {
      const npcs = await Npc.findAll();
      res.send(npcs);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/npcs/:id', async (req, res) => {
    try {
      const npc = await Npc.delete(req.params.id);
      res.send(npc);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/npcs/:id', async (req, res) => {
    try {
      const npc = await Npc.update(req.body, req.params.id);
      res.send(npc);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

