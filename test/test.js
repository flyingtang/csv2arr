/**
 * Created by tangxiaogang on 2017/7/28.
 */
const filePath = './1.csv';
const index = require('../index');
index.parse(filePath).then(res => {
    "use strict";
    console.log(res)
});