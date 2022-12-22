const http = require('http');
var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const filterService = require('./services/filterDataRoute');
const assetRetriveFilter = require('./services/parseDataRoute');
var axios = require('axios');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

app.post('/filterData', async function (req, res) {
    const query = req.body.filter((sortquery)=> sortquery.sortData)[0];
    const orderby = req.body.filter((or)=> or.orderBy)[0];
    const filterOn = req.body.filter((fl)=> fl.filterOn)[0];
    try {
        const getResult = await filterService.getFilterData(filterOn, query, orderby);
        console.log('getResult', getResult);
        if (getResult) {
            res.statusCode = 200;
            res.send(getResult)
        }
    } catch (error) {
        console.log(error)
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});