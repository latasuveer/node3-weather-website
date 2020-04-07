const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000
//define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather-app',
        name: 'Anjali Suveer'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Anjali Suveer'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'this is some helpful text.',
        title:'Help',
        name: 'Anjali Suveer'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
       res.send({
           error:'you must provide an address!',
           
       })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
             res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
            })
        })
    })
      
    
    
})
//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
 res.send('<h1>weather</h1>')
})
app.get('/help/*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'Anjali Suveer',
       errorMessage:'Help article not found'
   })
})
app.get('*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'Anjali suveer',
       errorMessage: 'Page not found'
   })
})
app.listen(port,()=>{
    console.log('The server is up at the port ' + port)
})

