import pool from '../lib/utils/pool.js';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app.js';
import Npc from '../lib/models/Npc.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a npc via POST', async () => {

    const res = await request(app)
      .post('/api/v1/npcs')
      .send({
        name: 'Grom',
        strength: 20,
        constitution: 16,
        dexterity: 8,
        intelligence: 8,
        wisdom: 10,
        charisma: 5,
        race: 'Human',
        description: 'hella tough'

      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Grom',
      strength: 20,
      constitution: 16,
      dexterity: 8,
      intelligence: 8,
      wisdom: 10,
      charisma: 5,
      race: 'Human',
      description: 'hella tough'
    });

  });

  test('find a npc by id via Get route', async () => {
    const npc = await Npc.insert({
      name: 'Grom',
      strength: 20,
      constitution: 16,
      dexterity: 8,
      intelligence: 8,
      wisdom: 10,
      charisma: 5,
      race: 'Human',
      description: 'hella tough'
    });
    const res = await request(app).get(`/api/v1/npcs/${npc.id}`);

    expect(res.body).toEqual(npc);

  });

  test('finds all npcs via GET route', async () => {

    const npc1 = await Npc.insert({
      name: 'Grom',
      strength: 20,
      constitution: 16,
      dexterity: 8,
      intelligence: 8,
      wisdom: 10,
      charisma: 5,
      race: 'Human',
      description: 'hella tough'
    });
    const npc2 = await Npc.insert({
      name: 'Baltazar',
      strength: 6,
      constitution: 10,
      dexterity: 8,
      intelligence: 18,
      wisdom: 15,
      charisma: 12,
      race: 'Tiefling',
      description: 'hella smart'
    });
    const npc3 = await Npc.insert({
      name: 'Teclis',
      strength: 11,
      constitution: 14,
      dexterity: 18,
      intelligence: 12,
      wisdom: 12,
      charisma: 12,
      race: 'Elf',
      description: 'hella dexterous'
    });

    const res = await request(app).get('/api/v1/npcs');
    expect(res.body).toEqual([npc1, npc2, npc3]);
  });

  test('deletes npc1', async () => {
    const npc1 = await Npc.insert({
      name: 'Grom',
      strength: 20,
      constitution: 16,
      dexterity: 8,
      intelligence: 8,
      wisdom: 10,
      charisma: 5,
      race: 'Human',
      description: 'hella tough'
    });

    const res = await request(app).delete(`/api/v1/npcs/${npc1.id}`);

    expect(res.body).toEqual(npc1);

  });

  test('it updates a npc', async () => {
    const npc1 = await Npc.insert({
      name: 'Grom',
      strength: 20,
      constitution: 16,
      dexterity: 8,
      intelligence: 8,
      wisdom: 10,
      charisma: 5,
      race: 'Human',
      description: 'hella tough'
    });
    const npc2 = await Npc.insert({
      name: 'Baltazar',
      strength: 6,
      constitution: 10,
      dexterity: 8,
      intelligence: 18,
      wisdom: 15,
      charisma: 12,
      race: 'Tiefling',
      description: 'hella smart'
    });
    const res = await request(app).put(`/api/v1/npcs/${npc1.id}`).send(npc2);
    expect(res.body).toEqual({
      id: '1',
      name: 'Baltazar',
      strength: 6,
      constitution: 10,
      dexterity: 8,
      intelligence: 18,
      wisdom: 15,
      charisma: 12,
      race: 'Tiefling',
      description: 'hella smart'
    });

  });



});
