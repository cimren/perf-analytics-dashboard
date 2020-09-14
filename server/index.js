import path from 'path';
import fs from 'fs';

import React from 'react';
import express, { response } from 'express';
import bodyParser from 'body-parser';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const request = require('request');

const PORT = process.env.PORT || 3006;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const getData = (req, res) => {
  let url = "https://cihan-perf-analytics-api.herokuapp.com/perf_metrics"; 
  
   request(url , function(error, response, body) {
    
    if(error){      
      throw error
    }
    else if (!error && response.statusCode === 200) {            
      res.status(200).send(response.body);
    }
  }) 
}

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.get('/api/perf_metrics', getData);

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});