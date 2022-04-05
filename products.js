const slugify = require("slugify");
const fs = require("fs");

getProducts()


const productList = []

const urls = []

function getProducts () {

    fs.readFile(`urls/products.csv`, 'utf8', function(err, data){
      
        // Display the file content
        const arr = data.split('\n').splice(1)
        arr.forEach(e=>{
            const split = e.split(',')
            productList.push(split[0])
        })
    
        productList.forEach(e=>{
            const split = e.split(";")
            const id = split[0].replace(/[^\w\s]/gi, '')
            let cat = ""
            try {
                cat = slugify(split[4].trim().replace(/[^\w\s]/gi, '')).toLowerCase()
            } catch {
                cat = ""
            }
    
            const name = slugify(split[2].toLowerCase().replace(/[^\w\s]/gi, ''))
    
            const finalString = cat + "/" + id + "-product-manufacturer" + name + ".html"
            const obj = {
                n : name,
                s : finalString
            } 
            urls.push(obj)
            
        })
        merge()
    });

} 

function merge () {
    
    fs.readFile("urls/final-rewrites.csv", 'utf8', function(err, data){
        const a = data.split('\n')
        urls.forEach(e=>{
            const substring = e.n;
            let match = ""
            try {
                if(a.includes(substring)){
                    const n = a.indexOf(substring)
                    console.log(n)
                }
            } catch {
                match = ""
            }
            
        })
    })
}






  /* "http://www.langkawi-gazette.com/langkawi-cable-car/1071-cable-car"  */