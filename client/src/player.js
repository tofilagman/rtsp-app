const express = require('express'); 
const path = require('path');
require('dotenv').config();

const app = express()
app.use(express.static(path.join(__dirname , 'public')));

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'player.html'));
});

app.listen(process.env.PORT, () => {
    console.log('running in port 3000');
});