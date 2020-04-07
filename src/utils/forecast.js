const request = require ('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/9140cd08cc6e6ceaf5799a793d4a236f/' + latitude + ',' + longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect' , undefined)

          }else if (body.error){
             callback('unable to connect to the location' , undefined)
        }
        else{
            
            callback(undefined , body.daily.data[0].summary +' it is currently '+ body.currently.temperature +'. degrees out.This high today is' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow +  'There is a' +  body.currently.precipProbability +' % chnace of rain.')
        }

    })
}



module.exports = forecast