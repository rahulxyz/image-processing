import express from "express"
import api from "./routes/api";


const port = 3000;
const app = express();

app.use('/api', api);

app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port}/api/image?filename=fjord&width=300&height=200`)
})