import express from "express"
import cors from "cors"

import { catalog } from "./data/data.js"

const PORT=process.env.PORT || 3000
const app=express()

app.use(cors({
origin: 'https://shopnode.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Headers'],  
  credentials: true      
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://shopnode.vercel.app');
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

app.get("/api/catalog", (req, res) => {
	
let arr=filterCatalog(req, catalog)

arr=arr.map(elem => ({
id: elem.id,
name: elem.name,
promo: elem.promo,
price: elem.price,
color: elem.color,
img: elem.img,
hit: elem.hit,
newly: elem.newly
}))

let ans=arr.slice(+req.query.start, +req.query.end)
console.log(ans)
res.json({ans: ans, size: arr.length})
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

at=at.length==0 ? array : at

let to=at.filter((elem) => {
if (elem.price<=req.query.to)
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

to=to.length==0 ? at : to

let cat=to.filter((elem) => {
if (elem.cat==req.query.cat)
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

cat=cat.length==0 ? to : cat

let season=cat.filter((elem) => {
if (elem.season==req.query.season)
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

season=season.length==0 ? cat : season

let gender=season.filter((elem) => {
if (elem.gender==req.query.gender)
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

gender=gender.length==0 ? season : gender
return gender
}

app.listen(PORT, () => console.log("server running"))