export function filterCatalog(req, array) {

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