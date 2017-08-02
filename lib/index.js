/**
 * Created by tangxiaogang on 2017/7/28.
 */
const fs = require('fs');
const PromiseA = require('bluebird');
const iconv = require('iconv-lite');
const _ = require('lodash');
const moment = require('moment');
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
exports.toCSV = function (data, template) {
    const keys = Object.keys(template);
    let tempData = [_.values(template).join(" ,")];
    data.forEach(one => {
        let temp = [];
        keys.forEach((k, index) => {
            if (index == 0)
                temp.push(moment(one[k]).format('YYYY-MM-DD')).toString();
            else
                temp.push(one[k] || 0);
        });
        temp = temp.join(" ,");
        return tempData.push(temp);
    });
    return tempData.join(" \n ");
};