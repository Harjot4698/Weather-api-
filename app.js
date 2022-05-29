const PORT=8000

const express=require('express')
const cheerio=require('cheerio')
const axios=require('axios')
const articles=[]

const app=express()


app.get('/',(req,res)=>{
    res.json('Welcome to my Climate change News API')
})

app.get('/news',(req,res)=>{

    axios.get('https://www.theguardian.com/world/extreme-weather')
    .then((response) =>{
        const html=response.data
        console.log(html)
        const $=cheerio.load(html)
        $('a:contains("climate")',html).each(function(){
           const title= $(this).text()
           const url=$(this).attr('href')
           articles.push({title,
                 
            url})
        })
        res.json(articles)
    }).catch((err)=>console.log(err))

})

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
