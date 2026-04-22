import express from "express"
import path from "path"

import { catalog } from "./dist/data/data.js"

const PORT=process.env.PORT || 3000
const app=express()

app.use(express.urlencoded({
limit: "50mb",
extended: true
}))

app.use(express.json({limit: "50mb"}))

app.use(express.static(path.resolve("dist")))

app.get("/", (req, res) => {
res.sendFile(path.resolve("dist/index.html"))
})

app.get("/api/catalog", (req, res) => {
console.log("catalog")
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

app.get("/api/catalog/promo", (req, res) => {
let arr=filterCatalog(req, catalog)

arr=arr.filter((elem) => {if (elem.promo!=0)
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
let ans=arr.slice(+req.query.start, +req.query.end)
console.log(ans)
res.json({ans: ans, size: arr.length})
})

app.get("/api/catalog/hit", (req, res) => {
let arr=filterCatalog(req, catalog)

arr=arr.filter((elem) => {
if (elem.hit)
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
let ans=arr.slice(+req.query.start, +req.query.end)
console.log(ans)
res.json({ans: ans, size: arr.length})
})

app.get("/api/catalog/new", (req, res) => {
let arr=filterCatalog(req, catalog)

arr=catalog.filter((elem) => {
if (elem.newly)
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
let ans=arr.slice(+req.query.start, +req.query.end)
console.log(ans)
res.json({ans: ans, size: arr.length})
})

app.get("/api/product/:id", (req, res) => {
let ans=catalog.find(elem => elem.id==req.params.id)
res.json(ans)
})

app.get("/api/search", (req, res) => {
let str=req.query.clothes.toLowerCase()
let ans=catalog.filter((elem) => {
if (elem.name.toLowerCase().startsWith(str))
return {
id: elem.id,
name: elem.name,
img: elem.img[0]
}
})
res.json(ans)
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

app.post("/api/login", (req, res) => {
let user=users.find((elem) => 
 elem.tel==req.body.tel && elem.password==req.body.password)
if (user) {
let ans={
id: user.id,
name: user.name,
tel: user.tel,
email: user.email,
bonus: user.bonus
}

const token="qwerty"
console.log(ans)
res.json({ans, token})
}
if (!user) {
res.sendStatus(401)
}
})

app.post("/api/reg", (req, res) => {
let id=users.length+1
let userAns={
id: id,
name: req.body.name,
tel: req.body.tel,
email: req.body.email,
name: req.body.name,
bonus: 0
}
const token="qwerty"
res.json({userAns, token})
userAns.password=req.body.password
users.push(userAns)
})

app.post("/api/settings", (req, res) => {
console.log(req.body)
let user=users.find(elem => elem.
id==req.body.id)
user.name=req.body.name ?? user.name
user.tel=req.body.tel ?? user.tel
user.email=req.body.email ?? user.email
let ans={
id: user.id,
name: user.name,
tel: user.tel,
email: user.email,
bonus: user.bonus
}
console.log(ans)
res.json(ans)
})

app.post("/api/settingsPassw", (req, res) => {
console.log(req.body)
let user=users.find(elem => elem.
id==req.body.id)
if (user.password==req.body.password)
user.password=req.body.passwordNew
res.json({ans: "Пароль изменен"})
})


app.get("/api/orders/:userid", (req, res) => {
console.log(req.params)
let ans=orders.filter(elem => {
if (elem.userid==req.params.userid)
return {
id: elem.id,
date: elem.date,
status: elem.status,
total: elem.total
}
})
res.json(ans)
})

app.get("/api/order/:id", (req, res) => {
console.log("id", req.params)
let ans=orders.find(elem => elem.id==req.params.id)
console.log("ans", ans)
res.json(ans)
})

app.post("/api/addOrder", (req, res) => {
let newBonus=0
users.forEach(elem => {
if (elem.id==req.body.userid) {
newBonus=req.body.bonus ? 0 : elem.bonus
}
let bonus=Math.floor((req.body.total-req.body.sumDel)/100)
newBonus+=bonus
elem.bonus=newBonus
})
let order=req.body
let numOrder=orders.length+1
order.id=numOrder
let date=new Date()
order.date=`${zeroDate(date.getDate())}.${zeroDate(date.getMonth()+1)}.${date.getFullYear()} ${zeroDate(date.getHours())}:${zeroDate(date.getMinutes())}`
order.status="В пути"
orders.push(order)
setTimeout(() => {
res.status(201).json({numOrder, bonus: newBonus})
}, 3000)
})

app.get(/.*/, (req, res) => {
res.sendFile(path.resolve("dist/index.html"))
})

app.listen(PORT, () => console.log("server running"))

function zeroDate(date) {
return date<10 ? "0"+date : date
}

let orders=[]

let users=[{
id: 1,
tel: "89000000000",
email: "sb@mail.ru",
password: "12345678",
name: "a",
bonus: 100
}]



