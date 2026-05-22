import express from "express"
import  { Router } from "express"

const catalogRouter=Router()

import { catalog } from "./data/data.js"

catalogRouter.get("/", (req, res) => {
	
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

export default catalogRouter