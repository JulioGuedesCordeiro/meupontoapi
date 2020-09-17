exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ponto', function(table) {
      table.increments('id');
      table.string('data').notNullable();
      table.string('hora_entrada', 20);
      table.string('hora_saida_almoco', 20); 
      table.string('hora_volta_almoco', 20); 
      table.string('hora_saida', 20); 
      table.string('hora_entra_extra', 20); 
      table.string('hora_saida_extra', 20);  
      table
        .integer("usuario_id")
        .unsigned()
        .references("id")
        .inTable("usuario");
      table.timestamp('criado_em').notNullable().defaultTo(knex.fn.now());
      table.timestamp('atualizado_em').notNullable().defaultTo(knex.fn.now());
      table.charset('utf8');
      table.engine('InnoDB');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('ponto')]);
};

exports.configuration = { transaction: true };
