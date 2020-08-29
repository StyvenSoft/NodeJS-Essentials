app.use((req, res, next) => {
    console.log("A sorcerer approaches!");
    next();
});

app.get('/magic/:spellname', (req, res, next) => {
    console.log("The sorcerer is casting a spell!");
    next();
});

app.get('/magic/:spellname', (req, res, next) => {
    console.log(`The sorcerer has cast ${req.params.spellname}`);
    res.status(200).send();
});

app.get('/magic/:spellname', (req, res, next) => {
    console.log("The sorcerer is leaving!");
});

  // Accessing http://localhost:4001/magic/fireball 
  // Console Output:
  // "A sorcerer approaches!"
  // "The sorcerer is casting a spell!"
  // "The sorcerer has cast fireball"

