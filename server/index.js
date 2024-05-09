const express = require ('express')
const app = express ()

const fs = require ('fs')

require ('green_curry') (['globalize', 'short F.c'])

app.use ('/', express.static ('../client'))

app.get ('/list', (req, res) => {
    function windowsFileSort(files) {
        return files.sort((a, b) => {
            // Regular expression to match numbers
            const numRegex = /\d+/g;
    
            // Extract numbers from filenames
            const aNums = a.match(numRegex);
            const bNums = b.match(numRegex);
    
            // Compare numbers if both filenames contain numbers
            if (aNums && bNums) {
                // Convert numbers from strings to integers
                const aNum = parseInt(aNums[0], 10);
                const bNum = parseInt(bNums[0], 10);
    
                // Compare numbers numerically
                if (aNum !== bNum) {
                    return aNum - bNum;
                }
            }
    
            // If numbers are equal or filenames don't contain numbers,
            // compare filenames lexicographically
            return a.localeCompare(b);
        });
    }

    // get and return list of all files at location
    // TODO: image file extension check
    try {
        const path = atob (Object.keys (req.query) [0])
        const ans = fs.readdirSync (path)
        res.json (JSON.stringify (windowsFileSort (ans)))
    }
    catch (e) {
        res.send ([])
    }
})

app.get ('/fetch', (req, res) => {
    // get and return file at location
    try {
        const file = atob (Object.keys (req.query) [0])
        const ans = fs.readFileSync (file)
        res.send (ans)
    }
    catch (e) {
        F.log ('did not find file')
        F.log (e.message)
        res.send (undefined)
    }
})

app.listen (3000)