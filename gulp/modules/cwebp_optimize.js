const   prettyBytes = require('pretty-bytes'),
        colors = require('colors/safe'),
        getCurrentTime = require('./current_time'),
        webp = require('./webp-converter/src/webpconverter');

/**
 * 
 * Конвертация изображений плагином webp-converter
 * 
 * @param  {object} options объект с настройками оптимизатора
 * @param  {Vinyl} chunk Vinyl объект, из которого будут браться оптимизированные изображения
 * @param  {string} ext расширение целевого файла прим.: .webp
 * @param  {string} optimizer имя оптимизатора: cwebp - конвертирование из jpg/png в webp, dwebp - конвертирование webp в png/bpm/tiff/pam/ppm/pgm/yuv, gwebp - конвертирование gif в webp
 * @returns {Array} массив Vinyl объектов изображений
 */

module.exports = async function optimize(options={}, chunk, ext, optimizer){

    // строка с командой оптимизации
    let     opt = '',
            data,
            optionsFlagsDefault = {     // флаги опций плагинов, используются для интерпретации опций в флаги командной строки
                '.webp':{
                    output: 'o',
                    summary: 'h',
                    version: 'version',
                    bmp_output: 'bmp',
                    tiff_output: 'tiff',
                    pam_output: 'pam',
                    ppm_output: 'ppm',
                    pgm_output: 'pgm',
                    yuv_output: 'yuv',
                    no_fancy: 'nofancy',
                    no_filter: 'nofilter',
                    dithering: 'dither',
                    no_dither: 'nodither',
                    multi_threading: 'mt',
                    crop: 'crop',
                    vertical_flip: 'flip',
                    size: 'scale',
                    extra_info: 'v',
                    no_assembly: 'noasm'
                },
                '.png': {
                    //  Main optionss
                    lossless: 'lossless',
                    near_lossless: 'near_lossless',
                    quality: 'q',
                    lossless_level: 'z',
                    alpha_compression: 'alpha_q',
                    preset: 'preset',
                    compression_method: 'm',
                    size: 'resize',
                    crop: 'c',
                    multi_threading: 'mt',
                    low_memory: 'low_memory',
                    //  Lossy options
                    file_size: 'size',
                    passes: 'pass',
                    auto_filter: 'af',
                    jpeg_like: 'jpeg_like',
                    filter: 'f',
                    sharpness: 'sharpness',
                    strong: 'strong',
                    nostrong: 'nostrong',
                    sharp_YUV: 'sharp_yuv',
                    sns: 'sns',
                    segments: 'segments',
                    partition_limit: 'partition_limit',
                    // Logging options
                    extraInfo: 'v',
                    report_psnr: 'print_psnr',
                    report_print: 'print_ssim',
                    report_lsim: 'print_lsim',
                    progress: 'progress',
                    silent: 'quiet',
                    short_desc: 'short',
                    output_ASCII_map: 'map',
                    // Additional options
                    luma_plane_size: 's',
                    pre_processing: 'pre',
                    alpha_filter: 'alpha_filter',
                    alpha_method: 'alpha_method',
                    transparent_rgb_val: 'exact',
                    blend_alpha: 'blend_alpha',
                    discard_alpha: 'noalpha',
                    hint: 'hint',
                    meta: 'metadata',
                    no_assembly: 'noasm'
                },
                '.jpg': {
                    //  Main optionss
                    lossless: 'lossless',
                    near_lossless: 'near_lossless',
                    quality: 'q',
                    lossless_level: 'z',
                    alpha_compression: 'alpha_q',
                    preset: 'preset',
                    compression_method: 'm',
                    sizes: 'resize',
                    crop: 'c',
                    multi_threading: 'mt',
                    low_memory: 'low_memory',
                    //  Lossy options
                    file_size: 'size',
                    passes: 'pass',
                    auto_filter: 'af',
                    jpeg_like: 'jpeg_like',
                    filter: 'f',
                    sharpness: 'sharpness',
                    strong: 'strong',
                    nostrong: 'nostrong',
                    sharp_YUV: 'sharp_yuv',
                    sns: 'sns',
                    segments: 'segments',
                    partition_limit: 'partition_limit',
                    // Logging options
                    extraInfo: 'v',
                    report_psnr: 'print_psnr',
                    report_print: 'print_ssim',
                    report_lsim: 'print_lsim',
                    progress: 'progress',
                    silent: 'quiet',
                    short_desc: 'short',
                    output_ASCII_map: 'map',
                    // Additional options
                    luma_plane_size: 's',
                    pre_processing: 'pre',
                    alpha_filter: 'alpha_filter',
                    alpha_method: 'alpha_method',
                    transparent_rgb_val: 'exact',
                    blend_alpha: 'blend_alpha',
                    discard_alpha: 'noalpha',
                    hint: 'hint',
                    meta: 'metadata',
                    no_assembly: 'noasm'
                },
                '.gif':{
                    help: 'h',
                    version: 'version',
                    lossy: 'lossy',
                    mixed_compression: 'mixed',
                    quality: 'q',
                    min_size: 'min_size',
                    compression_method: 'm',
                    min_frame_distance: 'kmin', 
                    max_frame_distance: 'kmax',
                    meta: 'metadata',
                    filter: 'f',
                    multi_threading: 'mt',
                    loop_compatibility: 'loop_compatibility',
                    extra_info: 'v',
                    silent: 'quiet'
                }
            },
            optionsFlags = optionsFlagsDefault[chunk.extname],  
            defaultSize = chunk["contents"].length,  //  исходный размер для проверки уровня сжатия
            newChunk = chunk.clone();

    // добавление опций в команду
    for(let option in options){

        if(option == 'sizes'){

            const   width = item.split('x')[0],
                    height = item.split('x')[1];
            
            opt += ` -${optionsFlags[option]} ${width} ${height}`;

        } else {

            opt += ` -${optionsFlags[option]} ${(typeof options[option]==='boolean')?'':options[option]}`;

        }
    }

    try{
        // выполнение оптимизации
        const result = webp[optimizer](newChunk.path, '-', opt);

        // добавление файла в буфер Vinyl объекта
        await result.then((response)=>{

            newChunk['contents'] = Buffer.from(response);

            let endSize = response.length,
                diff = defaultSize - endSize,
                percent = Math.floor(((defaultSize/endSize)*100 - 100) * 10)/10;
            
            console.log('[' + colors.gray(getCurrentTime())+ '] '+ '['+colors.blue('webp')+'] '+ colors.green('done ') + newChunk.stem + ext + colors.grey(` (${(diff > 0)?colors.green('saved'):colors.red('lost')} ${prettyBytes(Math.abs(diff))} ~ ${Math.abs(percent)}%)`));
        
        })

    } catch(e){

        console.log(e.message);

    }
        
    // смена конечного расширения файла на требуемое
    newChunk.extname = ext;

    data = newChunk;

    return data;
    
}