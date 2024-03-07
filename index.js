const { OpenAI } = require('openai')
const PORT = process.env.PORT || 8000
const express = require("express")
const app = express()
require("dotenv").config()

 const API_KEY = "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"

app.get("/" ,(req,res) =>{
    res.json("Api for languages")
})

//* end point to detect what is the language of the text; return the language code
app.get("/detectLanguage", async (req,res) =>{
     const openai = new OpenAI({apiKey : API_KEY })

      if(req.query.text != null){
         try {
            const codeDetect = await openai.chat.completions.create({
                messages : [ {"role": "system","content": "you are a program that recives text and detect what language and return only the alpha-3 code of this language" },
                            {"role": "user", "content": req.query.text},
                ],
                model: 'gpt-3.5-turbo'
            })
            console.log(codeDetect.choices[0].message)
         } catch (err) {
            console.log(err);;
         }
      }

})
//* translate the given text 
app.get("/translate", async (req,res) =>{

})

//* rewrite the given text keeping the meaning
app.get("/rewriteText", async (req,res) =>{

})

//* rewrite the text as a victorian writer
app.get("/victorianText", async (req,res) =>{

}) 

//* extract the main topic of a given text
app.get("/extractTopics", async (req,res) =>{

}) 





app.listen(PORT, () => console.log(`running in port ${PORT}`))


