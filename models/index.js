const User = require('./User');
const Pokemon = require('./Pokemons');
const Team = require('./Teams');

Team.hasMany(Pokemon, {
    foreignKey: "team"
});

Pokemon.hasMany(Team, {
    foreignKey: "id"
})

module.exports = { User, Pokemon, Team };
