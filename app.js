const slugify = require("slugify");
const fs = require("fs");
const products = [];
const cat = [];
console.log("start")



const id = 3
const oldUrls = []
const newUrls = []

fs.readFile(`urls/old-urls-${id}.csv`, 'utf8', function(err, data){
      
    // Display the file content
    const arr = data.split('\n').splice(1)
    arr.forEach(e=>{
        const split = e.split(',')
        oldUrls.push(split[0])
    })
    readNewUrls()
});


function readNewUrls () {
    fs.readFile(`urls/new-urls-${id}.csv`, 'utf8', function(err, data){
      
        // Display the file content
        const arr = data.split('\n').splice(1)
        arr.forEach(e=>{
            const split = e.split(',')
            newUrls.push(split[0])
            //console.log(`https://test.makersupplies.dk/en/sasaasa;https://test.makersupplies.dk/en/machine-components/;301;1`)
        })
        let i = -1
        let string = ""
        newUrls.forEach((e)=>{
            i += 1
            const oldUrl = oldUrls[i].replace("https://test.makersupplies.dk","").split('/delete-')[0]
            const newUrl = e.replace("https://test.makersupplies.dk","")
            const rewrite = `${oldUrl};${newUrl};301;1;1`
            if(newUrl!==oldUrl){
                console.log(newUrl + " " + oldUrl)
                console.log(rewrite)
                string += rewrite + '\n'
            } else {
                console.log("the same")

            }
        })

        
        fs.writeFile(`urls/rewrites-${id}.csv`, string, err => {
            if (err) {
              console.error(err)
              return
            }
            //file written successfully
          })

    });

}