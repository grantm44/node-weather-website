const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//path variables
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//serve static files
app.use(express.static(publicDirectoryPath))
//handlebars config 
app.set('views', viewsPath);
app.set('view engine', 'hbs') 
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Grant McDonnal"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {location, long, lat} = {}) => {
        if(error){
            res.send({
                error
            })
        }else{
           forecast(lat, long, (error, data) => {
                if(error){
                    res.send( 
                        error
                    )
                }else{
                    res.send(
                        {
                            location,
                            data
                        }
                    )
                }
           })   
        }
        
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: "Help",
        name: "Grant McDonnal",
        helpText: "This is some helpful text"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Grant McDonnal"
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: "404",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        errorMessage: "404 error page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
})