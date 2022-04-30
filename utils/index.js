const seedUsers = require('./seed');
const db = require('./../config/connection');


const seedAll = async () => {

await seedUsers(5);
console.log("users seeded");

process.exit(0);

};


db.once('open', () => {
    
    seedAll();

});