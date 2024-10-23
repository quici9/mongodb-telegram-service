db = db.getSiblingDB('zm');

for (let i = 1; i <= 20; i++) {
    db.password.insertOne({ username: `user${i}`, password: `password${i}` });
}
