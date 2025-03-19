
import {generateContent} from '../services/ai.service.js'


export async function generate(req, res){
console.log('running')
    const prompt = req.query.prompt
    if(!prompt){
        return res.status(400).json({error: "Please provide a prompt."});
    }
    const response = await generateContent(prompt)

    res.status(200).json({message: "Content generated successfully!", data: response});

}

export async function get_revivew(req, res){
    console.log('running')
        const code = req.body.code;
        if(!code){
            return res.status(400).json({error: "Please provide a prompt."});
        }
        const response = await generateContent(code)
    
        res.status(200).json({message: "Content generated successfully!", data: response});
    
    }