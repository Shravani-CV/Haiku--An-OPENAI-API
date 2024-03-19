const PORT = process.env.port || 8000
const express = require("express")
const app = express()
const {OpenAI} = require('openai')
require('dotenv').config()

app.get('/', (req, res) => res.json('Welcome to my haiku API'))

app.get('/haiku', async(req, res) => {
    const authHeaders = req.headers

    if(autheHeaders.secretkey !== "super-secret-key"){
        res.json({message: "You are not authorized to make this request."})
        return
    }

    const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY})

    try{
        const completion = await openai.chat.completions.create({
            messages: [{role: "system", content:"Write a haiku"}],
            model:"gpt-3.5-turbo"
        })
        res.json(completion.choices[0].message)
    }
    catch(err){
        console.error(err)
    }
})

app.listen(PORT, () =>console.log(`listening on port ${PORT}`))