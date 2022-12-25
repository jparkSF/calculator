const axios = require('axios')
const express = require('express')
const app = express()
const port = 3001
const db = require('./database');

app.use(express.json());

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post('/', async (req, res) => {
  // Expect a list of names: ['Carla', 'Bert']
  const apiUrl = 'https://api.agify.io/?name=';

  const responseList = [];

  const filteredNames = req.body.filter(name => {
    const data = db.getAgeData(name);
    if (data) {
      responseList.push({
        age: data,
        name,
        count: 0
      })
    } else {
      return true;
    }
  })


  const requestList = filteredNames.map(name => {
    return axios.get(`${apiUrl}${name}`);
  })


  await Promise.all(requestList).then(result => {
    result.forEach(result => {
      db.setAgeData(result.data.name, result.data.age);
      responseList.push(result.data);
    })
  });

  // Expected response to client: [{name: 'Carla', age: 22}, {name: 'Bert', age: 35}]
  res.send(responseList);
})

app.listen(port, () => {
  console.log(`Agify app listening on port ${port}`)
})
