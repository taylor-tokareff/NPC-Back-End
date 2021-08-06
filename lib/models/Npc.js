import pool from '../utils/pool.js';

class Npc {
  id;
  name;
  strength;
  constitution;
  dexterity;
  intelligence;
  wisdom;
  charisma;
  race;
  description;


  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.strength = row.strength;
    this.constitution = row.constitution;
    this.dexterity = row.dexterity;
    this.intelligence = row.intelligence;
    this.wisdom = row.wisdom;
    this.charisma = row.charisma;
    this.race = row.race;
    this.description = row.description;
  }

  static async insert({ name, strength, constitution, dexterity, intelligence, wisdom, charisma, race, description }) {
    const { rows } = await pool.query(
      'INSERT INTO npcs (name, strength, constitution, dexterity, intelligence, wisdom, charisma, race, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8< $9) RETURNING *', [name, strength, constitution, dexterity, intelligence, wisdom, charisma, race, description]
    );

    return new Npc(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT *
    FROM npcs
    WHERE id = $1
  `, [id]);
    if (!rows[0]) return null;

    return new Npc(rows[0]);

  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT * from npcs
    `);
    return rows.map(row => new Npc(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM npcs
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Npc(rows[0]);
  }

  static async update(npc, id) {
    const { rows } = await pool.query(
      `UPDATE npcs
      SET name = $1, strength = $2, constitution =$3, dexterity =$4 intelligence =$5, wisdom =$6, charisma=$7, race=$8, description = $9
      WHERE id = $10
      RETURNING *`,
      [npc.name, npc.strength, npc.constitution, npc.dexterity, npc.intelligence, npc.wisdom, npc.charisma, npc.race, npc.description, id]
    );
    return new Npc(rows[0]);
  }


}

export default Band;