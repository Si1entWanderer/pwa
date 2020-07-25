const   pretty = require('js-beautify').html,
        colors = require('colors'),
        through = require('through2');

module.exports = () => {
    return through.obj(function (chunk, enc, callback){

        const   data = chunk.contents.toString('utf-8'),
                options = {
                    indent_size: 4,                             // Indentation size [4]
                    indent_char: ' ',                           // Indentation character [" "]
                    indent_with_tabs: true,                     // Indent with tabs, overrides -s and -c
                    eol: '\\n',                                 // Character(s) to use as line terminators. (default newline - "\\n")
                    end_with_newline: false,                    // End output with newline
                    preserve_newlines: false,                   // Preserve existing line-breaks (--no-preserve-newlines disables)
                    max_preserve_newlines: 10,                  // Maximum number of line-breaks to be preserved in one chunk [10]
                    indent_inner_html: false,                   // Indent <head> and <body> sections. Default is false.
                    brace_style: 'collapse',                    // [collapse-preserve-inline|collapse|expand|end-expand|none] ["collapse"]
                    indent_scripts: 'normal',                   // [keep|separate|normal] ["normal"]
                    wrap_line_length: 250,                      // Maximum characters per line (0 disables) [250]
                    wrap_attributes: 'auto',                    // Wrap attributes to new lines [auto|force|force-aligned|force-expand-multiline|aligned-multiple|preserve|preserve-aligned] ["auto"]
                    wrap_attributes_indent_size: false,         // Indent wrapped attributes to after N characters [indent-size] (ignored if wrap-attributes is "aligned")
                    inline: [],                                 // List of tags to be considered inline tags
                    unformatted: [],                            // List of tags (defaults to inline) that should not be reformatted
                    content_unformatted: [],                    // List of tags (defaults to pre) whose content should not be reformatted
                    extra_liners: [],                           // List of tags (defaults to [head,body,/html] that should have an extra newline before them.
                    editorconfig: false,                        // Use EditorConfig to set up the options
                    indent_scripts: 'keep',                     // Sets indent level inside script tags ("normal", "keep", "separate")
                    unformatted_content_delimiter: '',          // Keep text content together between this string [""]
                    indent_empty_lines: false,                  // Keep indentation on empty lines
                    templating: 'auto'                          // List of templating languages (auto,none,django,erb,handlebars,php) ["auto"] auto = none in JavaScript, all in html     
                };
        
        (async () => {
            
            try{

                const prettyData = await pretty(data, options);
                chunk.contents = Buffer.from(prettyData);
            
            } catch (e){
            
                console.log(`[${colors.red('ERR')}] ${e.message}`)
                callback(e);
            
            }

        })()

        callback(null, chunk);
    })
}