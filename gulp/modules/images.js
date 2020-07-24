const   gulp = require("gulp"),
        imagemin = require("gulp-imagemin"),
        webp = require('./imagemin_webp');
        
const isProd = false; 

const path = {
    src: ['./src/assets/img/**/*{gif,png,jpeg,jpg,webp,svg,ico}'],
    dest: './build/assets/img/'
};

module.exports = images();

function images(){
    return gulp.series(
        imagesOptimization,
        gulp.series(
            imageWebp
        )
    )
}

function imagesOptimization(){
    return  gulp.src(path.src)
                .pipe(imagemin([
                    imagemin.mozjpeg(
                        {
                        quality: 80,
                        progressive: true, 
                        revert: false, 
                        fastCrush: false, 
                        dcScanOpt: 1, 
                        trellis: true, 
                        trellisDC: true, 
                        tune: "ssim",
                        overshoot: true, 
                        arithmetic: false, 
                        dct: "int", 
                        quantBaseline: false,  
                        quantTable: 3,
                        smooth: 1,
                        maxMemory: 256000
                    }),
                    imagemin.optipng({
                        optimizationLevel: (isProd)?7:2, 
                        bitDepthReduction: true, 
                        colorTypeReduction: true, 
                        paletteReduction: true, 
                        interlaced: false, 
                        errorRecovery: true
                    }),
                    imagemin.svgo({
                        plugins: [
                            {cleanupAttrs: true},
                            {inlineStyles: false},
                            {removeDoctype: true},
                            {removeXMLProcInst: true},
                            {removeComments: true},
                            {removeMetadata: true},
                            {removeTitle: true},
                            {removeDesc: true},
                            {removeUselessDefs: true},
                            {removeXMLNS: false},
                            {removeEditorsNSData: true},
                            {removeEmptyAttrs: true},
                            {removeHiddenElems: true},
                            {removeEmptyText: true},
                            {removeEmptyContainers: true},
                            {removeViewBox: false},
                            {cleanupEnableBackground: true},
                            {minifyStyles: true},
                            {convertStyleToAttrs: true},
                            {convertColors: true},
                            {convertPathData: true},
                            {convertTransform: true},
                            {removeUnknownsAndDefaults: true},
                            {removeNonInheritableGroupAttrs: true},
                            {removeUselessStrokeAndFill: true},
                            {removeUnusedNS: true},
                            {prefixIds: false},
                            {cleanupIDs: false},
                            {cleanupNumericValues: true},
                            {cleanupListOfValues: false},
                            {moveElemsAttrsToGroup: true},
                            {moveGroupAttrsToElems: false},
                            {collapseGroups: true},
                            {removeRasterImages: false},
                            {mergePaths: false},
                            {convertShapeToPath: false},
                            {convertEllipseToCircle: true},
                            {sortAttrs: true},
                            {sortDefsChildren: true},
                            {removeDimensions: true},
                            {removeAttrs: true, attrs: ['style','fill', 'stroke']},
                            {removeAttributesBySelector: false},
                            {removeElementsByAttr: false},
                            {addClassesToSVGElement: false},
                            {addAttributesToSVGElement: false},
                            {removeOffCanvasPaths: false},
                            {removeStyleElement: true},
                            {removeScriptElement: true},
                            {reusePaths: true},
                        ]
                    })
                ], {
                    verbose: true,
                    silent: true
                }))
                .pipe(gulp.dest(path.dest))
                
}

function imageWebp(){
    return  gulp.src(path.src)
                .pipe(webp())
                .pipe(gulp.dest(path.dest))
}
