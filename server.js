import express from "express"

import { catalog } from "./data/data.js"

const PORT=process.env.PORT || 3000
const app=express()

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

app.listen(PORT, () => console.log("server running"))