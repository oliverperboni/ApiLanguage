const { OpenAI } = require('openai')
const PORT = process.env.PORT || 8000
const express = require("express")
const app = express()
require("dotenv").config()

const API_KEY = "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"
const openai = new OpenAI({apiKey : API_KEY })

app.get("/" ,(req,res) =>{
    res.json("Api for languages")
})

//* end point to detect what is the language of the text; return the language code
app.get("/detectLanguage", async (req,res) =>{
      //* verify if the text is null
      if(req.query.text != null){
         try {
            //* create complation to send a query so chatGPT
            //* the role system uses to define the "persona" of this GPT
            //* User is our request
            const codeDetect = await openai.chat.completions.create({
                messages : [ {"role": "system","content": "you are a program that recives text and detect what language and return only the alpha-3 code of this language" },
                            {"role": "user", "content": req.query.text},
                ],
                model: 'gpt-3.5-turbo'
            })
            res.json(codeDetect.choices[0].message)
         } catch (err) {
            console.log(err);;
         }
      }

})
//* translate the given text 
app.get("/translate", async (req,res) =>{
   //* the language that we want to translate to
   const to = req.query.lang 
   //verify if the parameter arent null
   if(req.query.text != null && to != null){
      try {
         //* create complation to send a query so chatGPT
         //* the role system uses to define the "persona" of this GPT
         //* User is our request
         const codeDetect = await openai.chat.completions.create({
             messages : [ {"role": "system","content": "you are a professional tradutor who can speak all languages, and recives text and a language, and translate this text to this language" },
                         {"role": "user", "content": "traslate this text :"+req.query.text + ". To this language"+ to},
             ],
             model: 'gpt-3.5-turbo'
         })
         res.json(codeDetect.choices[0].message)
      } catch (err) {
         console.log(err);;
      }
   }

})

//*This AI assistant is a paraphrasing tool that uses advanced language processing to understand the intent and meaning of your text. It then rewrites it using different words and sentence structures without changing the core message. This can be helpful for improving clarity, avoiding plagiarism, or finding a more concise way to express yourself.

//* rewrite the given text keeping the meaning
app.get("/rewriteText", async (req,res) =>{

    //* verify if the text is null
    if(req.query.text != null){
      try {
         //* create complation to send a query so chatGPT
         //* the role system uses to define the "persona" of this GPT
         //* User is our request
         const codeDetect = await openai.chat.completions.create({
             messages : [ {"role": "system","content": "This AI assistant is a paraphrasing tool that uses advanced language processing to understand the intent and meaning of your text. It then rewrites it using different words and sentence structures without changing the core message. This can be helpful for improving clarity, avoiding plagiarism, or finding a more concise way to express yourself." },
                         {"role": "user", "content": req.query.text},
             ],
             model: 'gpt-3.5-turbo'
         })
         res.json(codeDetect.choices[0].message)
      } catch (err) {
         console.log(err);;
      }
   }


})

//* rewrite the text as a victorian writer
app.get("/victorianText", async (req,res) =>{
    //* verify if the text is null
    if(req.query.text != null){
      try {
         //* create complation to send a query so chatGPT
         //* the role system uses to define the "persona" of this GPT
         //* User is our request
         const codeDetect = await openai.chat.completions.create({
             messages : [ {"role": "system","content": "You are a Victorian scribe who receives texts from others and rewrites them in your own way, as if they were written in your own time." },
                         {"role": "user", "content": req.query.text},
             ],
             model: 'gpt-3.5-turbo'
         })
         res.json(codeDetect.choices[0].message)
      } catch (err) {
         console.log(err);;
      }
   }
}) 

//* extract the main topic of a given text
app.get("/extractTopics", async (req,res) =>{
   //* verify if the text is null
   if(req.query.text != null){
      try {
         //* create complation to send a query so chatGPT
         //* the role system uses to define the "persona" of this GPT
         //* User is our request
         const codeDetect = await openai.chat.completions.create({
             messages : [ {"role": "system","content": "This AI assistant leverages natural language processing techniques to extract the main topic from a given text. It analyzes keywords, sentence structure, and relationships between ideas to identify the central theme." },
                         {"role": "user", "content": req.query.text},
             ],
             model: 'gpt-3.5-turbo'
         })
         res.json(codeDetect.choices[0].message)
      } catch (err) {
         console.log(err);;
      }
   }

}) 





app.listen(PORT, () => console.log(`running in port ${PORT}`))


