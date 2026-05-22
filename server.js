import express from "express"
import cors from "cors"

import catalogRouter from "./routes/catalog.js"

const PORT=process.env.PORT || 3000
const app=express()

app.use(cors({
origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Headers'],  
  credentials: true      
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.urlencoded({
limit: "50mb",
extended: true
}))

app.use(express.json({limit: "50mb"}))

app.get("/", (req, res) => {
res.send("hello express")
})

app.get("/catalog", (req, res) => {
	let ans=JSON.stringify(catalog[0])
res.send(ans)
})



app.use("/api/catalog", catalogRouter)





app.listen(PORT, () => console.log("server running"))