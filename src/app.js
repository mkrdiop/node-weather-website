const express =  require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app= express()
const port = process.env.PORT  || 3000


// Define path for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Express routes
app.get('', (req, res) => {
    res.render('index',  {
        title:'Weather',
        name:'Makhtar Diop'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About',
        name:'Makhtar diop'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        message:'This is an help rendered with hbs',
        name:'Makhtar DIOP'
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send('an address must be provided')
    }
    geocode(req.query.address, (error, data) =>{
        if(error){
            return res.send(error)

        } else {
            forecast(data.latitude, data.longitude, (error, forcastedData) => {
                if (error){
                    return res.send(error)

                } else{
                    return res.send(forcastedData)
                    // return res.render('info',{
                    //     temperature:forcastedData.temperature,
                    //     icon:forcastedData.icon,
                    //     summary:forcastedData.summary,
                    //     country:req.query.address
                    // })
                }
            })


        }



    })
    
    
    })

    
    


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:'400 Page',
        name:'Makhtar DIOP',
        errorMessage: 'The help article is not found'
    })
 

})



app.get('/products', (req, res) => {

    if (!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })

    } 
    console.log(req.query)
    //req.query
    res.send({
        products:[]
    })
})
app.get('*', (req, res) => {

    res.render('404', {
        title:'400 Page',
        name:'Makhtar DIOP',
        errorMessage: 'This is a 404 Page'
    })
 

})

// instantiation of the express Server

app.listen(port, () => {
    console.log('Server is up on port ' + port )
})