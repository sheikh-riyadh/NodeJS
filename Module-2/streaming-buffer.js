import fs from "node:fs"

const readingStream = fs.createReadStream('./stream_read.txt',{encoding:'utf-8'})
const writingStream = fs.createWriteStream('./stream_write.txt',{encoding:'utf-8'})




readingStream.on('data',(data)=>{
    writingStream.write(data,(error)=>{
        if(error){
            throw Error('Something went wrong')
        }
    })
})

