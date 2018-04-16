# gulp-npm-buildinfo-replace

> Inject version info into HTML (package.json, git commit, build info).

[![Build Status](http://img.shields.io/travis/hal313/gulp-npm-buildinfo-replace/master.svg?style=flat-square)](https://travis-ci.org/hal313/gulp-npm-buildinfo-replace)
[![NPM version](http://img.shields.io/npm/v/gulp-npm-buildinfo-replace.svg?style=flat-square)](https://www.npmjs.com/package/gulp-npm-buildinfo-replace)
[![Dependency Status](http://img.shields.io/david/hal313/gulp-npm-buildinfo-replace.svg?style=flat-square)](https://david-dm.org/hal313/gulp-npm-buildinfo-replace)

## Information

<table>
<tr>
<td>Package</td><td>-npm-buildinfo-replace</td>
</tr>
<tr>
<td>Description</td>
<td>Inject build information into HTML (package.json, git commit, build info) as comments or meta tags.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.9</td>
</tr>
<tr>
<td>Gulp Version</td>
<td>3.x</td>
</tr>
</table>

## Usage


#### Install

```bash
$ npm install gulp-npm-buildinfo-replace --save-dev
```

## Example

```js
var gulp = require('gulp');
var buildInfoReplace = require('gulp-npm-buildinfo-replace');

// Basic usage:
gulp.task('buildInfo', function(){
  gulp.src('./index.html')
  .pipe(buildInfoReplace(meta: true)) // Elements will be meta tags, not comments
  .pipe(gulp.dest('./'));
});

```

## Options

### options.tag
Set a specific tag to insert before it.

    Type: `String`
    Default: `head`

Example:

```js
.pipe(buildInfoReplace({tag: 'head'})) // Puts the information into the 'head' DOM element

```

### options.indent
Number of spaces for indentation (for formatting).

    Type: `Number`
    Default: `4`

Example:

```js
.pipe(buildInfoReplace({indent: 2}))
```

### options.version
Places the package.json version.

    Type: `Boolean`
    Default: `true`

Example:

```js
.pipe(buildInfoReplacegtag({version: true}))
```

### options.commit
Places the git commit.

    Type: `Boolean`
    Default: `false`

Example:

```js
.pipe(buildInfoReplacegtag({commit: true}))
```

### options.branch
Places the git branch.

    Type: `Boolean`
    Default: `false`

Example:

```js
.pipe(buildInfoReplacegtag({branch: true}))
```

### options.utcdate
Places the UTC formatted date.

    Type: `Boolean`
    Default: `false`

Example:

```js
.pipe(buildInfoReplacegtag({utcdate: true}))
```

### options.buildms
Places the timestamp as milliseconds.

    Type: `Boolean`
    Default: `false`

Example:

```js
.pipe(buildInfoReplacegtag({buildms: true}))
```

### options.meta
Places the build information as meta elements instead of comments.

    Type: `Boolean`
    Default: `false`

Example:

```js
.pipe(buildInfoReplacegtag({meta: true}))
```


## LICENSE

[MIT License](https://raw.githubusercontent.com/hal313/gulp-npm-buildinfo-replace/master/LICENSE)
