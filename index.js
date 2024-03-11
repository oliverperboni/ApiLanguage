const { OpenAI } = require('openai')
const PORT = process.env.PORT || 8000
const express = require("express")
const app = express()
require("dotenv").config()


const detectPersona = `you are a program that recives text and detect what
                       language and return the json of  the alpha code of this
                       language. send always with this structure : {\n    \"language\": \"Hebrew\",\n    \"alpha2_code\": \"he\",\n    \"alpha3_code\": \"heb\"\n}`

const traslatePersona = `you are a professional tradutor who can speak all languages
                        , and recives text and a language, and translate this text to
                        this language`

const rewritePersona = `"This AI assistant is a paraphrasing tool that uses advanced language
                        processing to understand the intent and meaning of your text. It then
                        rewrites it using different words and sentence structures without
                        changing the core message. This can be helpful for improving clarity,
                        avoiding plagiarism, or finding a more concise way to express yourself."`

const victorianPersona  = `"You are a Victorian scribe who receives texts from others and rewrites
                           them in your own way, as if they were written in your own time."`


const extractPersona = `Given a text, please provide a list of subjects with max of 7 elements, that are mentioned in the text.`
   
                        
const openai = new OpenAI({apiKey : process.env.OPENAI_API_KEY})

//util functions

function parseLanguageString(inputString) {
   try {
       // parse the input string to convert it into a JavaScript object
       const languageObject = JSON.parse(inputString);
      console.log("Objeto apos o parse "+languageObject)
       // extract the desired properties from the object
       const { language, alpha2_code, alpha3_code } = languageObject;

       // create an array with the extracted values in an object
       const resultArray = [{ language, alpha2_code, alpha3_code }];

       return resultArray;
   } catch (error) {
       // handle parsing errors
       console.error("Error parsing the input string:", error);
       return null;
   }
}

function parseSubjectsString(subjectsString) {
   // Split the string into an array of subjects
   const subjectsArray = subjectsString.split('\n')
       .map(subject => subject.trim())
       .filter(subject => subject.length > 0);

   // Create an object with the subjects
   const subjectsObject = {
       subjects: subjectsArray
   };

   return subjectsObject;
}
//util functions end 


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
                messages : [ {"role": "system","content": detectPersona },
                            {"role": "user", "content": req.query.text},
                ],
                model: 'gpt-3.5-turbo'
            })
            const preString = codeDetect.choices[0].message.content
            const result = parseLanguageString(preString)
            res.json(result[0])
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
             messages : [ {"role": "system","content": traslatePersona },
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




//* rewrite the given text keeping the meaning
app.get("/rewriteText", async (req,res) =>{

    //* verify if the text is null
    if(req.query.text != null){
      try {
         //* create complation to send a query so chatGPT
         //* the role system uses to define the "persona" of this GPT
         //* User is our request
         const codeDetect = await openai.chat.completions.create({
             messages : [ {"role": "system","content": rewritePersona },
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
             messages : [ {"role": "system","content": victorianPersona },
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
             messages : [ {"role": "system","content": extractPersona },
                         {"role": "user", "content": req.query.text},
             ],
             model: 'gpt-3.5-turbo'
         })
         res.json(parseSubjectsString(codeDetect.choices[0].message.content))
      } catch (err) {
         console.log(err);;
      }
   }

}) 





app.listen(PORT, () => console.log(`running in port ${PORT}`))


