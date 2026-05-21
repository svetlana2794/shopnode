import express from "express"
import cors from "cors"

import { catalog } from "./data/data.js"

const PORT=process.env.PORT || 3000
const app=express()

app.use(cors({
origin: 'https://shopnode.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],  
  credentials: true      
}))

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

app.get("/api/catalog", (req, res) => {
	
res.json(catalog)
})





function filterCatalog(req, array) {

let at=array.filter((elem) => {
if (elem.price>=req.query.at)
return {
id: elem.id,
name: elem.name,
promo: elem.promo,
price: elem.price,
color: elem.color,
img: elem.img,
hit: elem.hit,
newly: elem.newly
}
})

app.listen(PORT, () => console.log("server running"))