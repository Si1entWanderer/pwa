const   through = require('through2'),
        imagemin = require('imagemin'),
        colors = require('colors/safe'),
        prettyBytes = require('pretty-bytes'),
        webp = require('imagemin-webp');

module.exports = () => {

    return through.obj((chunk, enc, callback) => {
        if(chunk.isBuffer() && (chunk.extname =='.png' || chunk.extname=='.jpg' || chunk.extname=='.jpeg')){
            let defaultSize = chunk["contents"].length;
            chunk.extname = '.webp';
            (async () => {
                try{
                    const files = await imagemin.buffer(chunk["contents"], {
                        plugins: [
                            webp({
                                preset: "default",
                                quality: 80,
                                alphaQuality: 100,
                                method: 4,
                                sns: 80,
                                size: defaultSize*0.6,
                                filter: 0,
                                autoFilter: false,
                                sharpness: 0,
                                lossless: false,
                                nearLossless: 100
                            })
                        ]
                    });
                    let endSize = files.length,
                        diff = defaultSize - endSize,
                        percent = Math.floor(((defaultSize/endSize)*100 - 100) * 10)/10;

                    chunk["contents"] = files;       

                    let date = new Date();
                    hours = date.getHours()<10?'0'+date.getHours():date.getHours();
                    minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
                    seconds = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
                    let time = hours + ':' + minutes + ':' + seconds;
                    console.log('[' + colors.gray(time)+ '] '+ '['+colors.blue('webp')+'] '+ colors.green('done ') + chunk.relative + colors.grey(`( saved ${prettyBytes(diff)} - ${percent}%)`));
                    callback(null, chunk);
                } catch (e) {
                    console.log(e.message)
                    callback();
                }
            })();
        } else {
            return callback();
        }
    })

}