
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'taranmneeld', password: 'test'},
        {id: 2, username: 'jglove87', password: 'test'},
        {id: 3, username: 'hector', password: 'test'}
      ]);
    });
};
