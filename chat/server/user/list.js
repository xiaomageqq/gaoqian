const {query} = require('../async-db')

async function selectAllData(){

    let sql = "SELECT * FROM user ORDER BY ordr DESC";
    let datalist = await query(sql);
    return datalist;
}
async function getData(){
    let dataList = await selectAllData();
    return dataList
}
module.exports = getData();

