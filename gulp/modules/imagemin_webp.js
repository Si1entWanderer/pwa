const   through = require('through2'),
        colors = require('colors/safe'),
        optimize = require('./cwebp_optimize'),
        getCurrentTime = require('./current_time');

module.exports = () => {

    return through.obj(function (chunk, enc, callback){

        if(chunk.isBuffer() && (chunk.extname =='.png' || chunk.extname=='.jpg' || chunk.extname=='.jpeg' || chunk.extname=='.webp' || chunk.extname=='.gif' )){
            
            if(chunk.extname == '.jpeg') chunk.extname = '.jpg';

            let options = {}, // настройки оптимизаторов изображений
                data = []; // массив Vinyl объектов с оптимизированными изображениями 

            console.log('\n[' + colors.gray(getCurrentTime())+ '] ' + 'Converting started...   ' + colors.grey(chunk.relative))

            // Проверка на наличие буфера в contents Vinyl объекта
            if(chunk.isBuffer()){

                (async ()=>{

                    try {

                        switch (chunk.extname){
                            case '.jpg':
                            case '.png':
                                options = {
                                    meta: 'all',
                                    quality: 75,
                                    silent: true,
                                }
                                
                                data = await optimize(options, chunk, '.webp', 'cwebp');

                                this.push(data);

                                break;

                            case '.gif':
                                options = {
                                    meta: 'none',
                                    quality: 58,
                                }
                                
                                data = await optimize(options, chunk, '.webp', 'gwebp');

                                this.push(data);

                                break;

                            case '.webp':
                                options = {
                                    output: true // не стирать, необходимо для корректной работы
                                };
                            
                                data = await optimize(options, chunk, '.png', 'dwebp');

                                this.push(data);

                                break;

                            default: break;
                        }
                        callback();

                    } catch(e) {

                        console.log(e.message);
                        callback(e);

                    }
            
                })()
            
            }

        } else {
            
            return callback();

        }

    })

}

