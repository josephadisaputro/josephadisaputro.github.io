const express = require('express')
const cors = require('cors')
const fs = require('fs');
const app = express()

app.use(cors())

app.get('/', async function (req, res, next) {
  res.sendFile(__dirname + `/views/index.html`)
})

app.get('/api/:path', async function (req, res, next) {
    const data = (await readFile(`./data/${req.params.path}.json`, true))
    let response = {}
    if(data.status){
        response = data.data
    }
    res.json(response)
})

app.get('/ip', async function (req, res, next) {
    res.json({
        ip: req.socket.remoteAddress
    })
  })

async function readFile(filename, isJSON = false){
    return new Promise(async (resolve, reject) => {
        await fs.readFile(`${filename}`, async (err, data) => {
            if (err){
                console.log(err)
                resolve({
                    status: false,
                    data: []
                })
            }
            if(isJSON){
                data = JSON.parse(data);
            }
            resolve({
                status: true,
                data
            })
        });
    });
}

const PORT = process.env.PORT || 9000;

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})