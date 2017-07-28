/**
 * Created by tangxiaogang on 2017/7/28.
 */
const fs = require('fs');
const PromiseA = require('bluebird');
const iconv = require('iconv-lite');
const _ = require('lodash');
exports.parse = function (filePath, encoding = 'GBK') {
    return PromiseA.fromCallback(cb => fs.readFile(filePath, 'binary', cb)).then(file => {
        const buf = new Buffer(file, 'binary');
        const str = iconv.decode(buf, encoding);
        let arrayStr = str.split('\n');
        console.log(arrayStr);
        arrayStr = _.compact(arrayStr);
        const arrayConbineArray = _.map(arrayStr, str => {
            return str.split(',')
        });
        return arrayConbineArray;
    });
};
