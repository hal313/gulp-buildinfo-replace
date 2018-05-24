var through = require('through2'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    packageJSON = JSON.parse(fs.readFileSync('./package.json')),
    git = require('git-rev-sync');

module.exports = function (opts) {
    'use strict';

    opts                = opts || {};
    opts.tag            = opts.tag || 'head';
    opts.version        = !!opts.version || true;
    opts.commit         = !!opts.commit;
    opts.branch         = !!opts.branch;
    opts.utcdate        = !!opts.utcdate;
    opts.buildms        = !!opts.buildms;
    opts.meta           = !!opts.meta;
    opts.gitdir         = opts.gitdir || process.cwd();
    opts.unknownCommit  = opts.unknownCommit || 'unknown';
    opts.unknownBranch  = opts.unknownBranch || 'unknown';
    // opts.indent can be 0, so check for undefined instead of presence
    opts.indent         = undefined !== opts.indent ? opts.indent : 4;

    return through.obj(function (file, encoding, callback) {
        var buildInfoString = '',
            version = packageJSON.version,
            /**
             * Attempts to invoke a function.
             *
             * @param fn the function to invoke
             * @param args an array of parameters to pass in
             * @param defaultValue the value to return if fn fails
             * @param failureMessage the optional message to show when an error occurs
             */
            attempt = (fn, args, defaultValue, failureMessage) => {
                try {
                    return fn.apply({}, args);
                } catch (error) {
                    console.log(failureMessage || ((error && error.message) || 'unknown error'));
                    return defaultValue || '';
                }
            },
            branch = attempt(git.branch, [opts.gitdir], opts.unknownBranch, 'Could not get git branch information. Check to see if a .git folder exists'),
            commit = attempt(git.long, [opts.gitdir], opts.unknownCommit, 'Could not get git commit information. Check to see if a .git folder exists'),
            utcdate = new Date().toUTCString(),
            buildms = new Date().getTime(),
            indentString = new Array(opts.indent + 1).join(' '),
            content,
            generateString = function generateString(name, value) {
                var stringContent = indentString;
                if (opts.meta) {
                    stringContent += '<meta name="' + name + '" content="' + value + '">';
                } else {
                    stringContent += '<!-- ' + name + ': ' + value + ' -->';
                }
                stringContent += '\n';
                return stringContent;
            };

        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return callback(new Error('gulp-buildinfo-replace: streams not supported'));
        }

        // Populate the content string
        buildInfoString += '<' + opts.tag + '>\n';

        if (opts.version) {
            buildInfoString += generateString('version', version);
        }
        if (opts.commit) {
            buildInfoString += generateString('commit', commit);
        }
        if (opts.branch) {
            buildInfoString += generateString('branch', branch);
        }
        if (opts.utcdate) {
            buildInfoString += generateString('utcdate', utcdate);
        }
        if (opts.buildms) {
            buildInfoString += generateString('buildms', buildms);
        }


        // Get the file content
        content = file.contents.toString();

        // Replace the content with the augmented markup
        content = content.replace('<' + opts.tag + '>', buildInfoString);

        // Reassign the buffer
        file.contents = new Buffer(content);

        // Notify Gulp that we are done
        callback(null, file);
    });

};
