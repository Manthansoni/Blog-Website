const express = require('express');
const app = express();
const port = process.env.port || 8000;
const {MongoClient} = require("mongodb");


// const articlesInfo = {
//     "learn-react":{
//         comments: [],
//     },
//     "learn-node":{
//         comments: [],
//     },
//     "my-thoughts-on-learning-react":{
//         comments: [],
//     },
// };

//init middleware
app.use(express.json({extended:false }));

const withDB = async(operations, res) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db("mernblog");
        await operations(db);
        client.close();
    }
    catch{
        res.status(500).json({message: "Error connection db"});
    }
}

app.get('/api/articles/:name', async (req,res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection("articles").findOne({ name: articleName });
        res.status(200).json(articleInfo);
    }, res)
});

//get
// app.get('/', (req, res) => res.send("Hello World"));
// app.get('/hello/:name', (req,res) => res.send(`Hello ${req.params.name}`));

//Post
// app.post('/',(req,res) => res.send(`Hello ${req.body.name}`));

app.post('/api/articles/:name/add-comments', (req,res) =>{
    const {username, text} = req.body;
    const articleName = req.params.name;
    
    withDB(async(db) => {
        const articleInfo = await db.collection('articles').findOne({name: articleName})
        await db.collection('articles').updateOne({name: articleName},
            {
                $set : {
                    comments: articleInfo.comments.concat({ username,text }),
                },
            });
            const updateArticleInfo = await db.collection('articles').findOne({name: articleName})
            res.status(200).json(updateArticleInfo);
    }, res);
    
});

app.listen(port, () => console.log(`Server Started at ${port}`));
