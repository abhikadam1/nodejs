
const { log } = require('console');
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./Template/data/jsonData.json', 'utf-8'));

exports.paramMiddelware = (req,res,next,value)=>{
    let data = jsonData.find(el => el.id === value*1);
    if (!data) {
        return res.status(404).json({
            status: 'Failed',
            message: `No voucher details found with ${value} this id`,
        })
    }
    next();
};

exports.getAllVouchers = (req, res) => {
    console.log(' Data ', req.body);
    res.status(200).json({
        status: 200,
        message: {
            voucher: " Voucher Details found",
        },
        count: jsonData.length,
        data: {
            jsonData: jsonData,
        },
    })
}

exports. getVoucer = (req, res) => {
    let id = +req.params.id
    let data = jsonData.find(el => el.id === id);
    res.status(200).json({
        status: 'Success',
        message: {
            voucher: " Voucher Details found",
        },
        data: {
            jsonData: data,
        },
    });
    // res.send("isjdv");
};

exports. createVoucher = (req, res) => {
    // console.log(' Data ', req.body);/
    let newId = +(jsonData[jsonData.length - 1].id + 1);
    console.log(newId, ' newId ');
    let newData = Object.assign({ id: newId }, req.body);
    jsonData.push(newData);
    fs.writeFile('./Template/data/jsonData.json', JSON.stringify(jsonData), (err, data) => {
        res.status(201).json({
            status: 'Success',
            data: {
                newData: newData,
            },
        })
    })
};

exports. updateVoucer = (req, res) => {
    let id = +req.params.id;
    console.log(req.body, ' re.body ');
    let dataToUpdate = jsonData.find(el => el.id === id);
    console.log(Object.keys(req.body), ' Object.keys(req.body) ');
    if (dataToUpdate && Object.keys(req.body).length ) {
        let objIndex = jsonData.indexOf(dataToUpdate);
        const newObj = Object.assign(dataToUpdate, req.body);
        jsonData[objIndex] = newObj; 
        fs.writeFile('./Template/data/jsonData.json',JSON.stringify(jsonData), (err, data)=>{
            res.status(200).json({
                status : "Success",
                body : " Patch Req Updated",
            })
        })
    }else{
        res.status(404).json({
            status : "Filed",
            body : " NO data Found to update",
        })
    }
}

exports. updateVoucer1 = (req, res) => {
    let id = +req.params.id;
    console.log(req.body, ' re.body ');
    let dataToUpdate = jsonData.find(el => el.id === id);
    if (dataToUpdate && Object.keys(req.body).length) {
        let objIndex = jsonData.indexOf(dataToUpdate);
        const newObj = Object.assign(dataToUpdate, req.body);
        console.log(newObj, ' newObj ');
        jsonData[objIndex] = newObj; 
        fs.writeFile('./Template/data/jsonData.json',JSON.stringify(jsonData), (err, data)=>{
            res.status(200).json({
                status : "Success",
                body : " Patch Req Updated",
            })
        });
    }else{
        res.status(201).json({
            status : "Filed",
            body : " NO data Found",
        });
    }
};

exports.deleteVoucher = (req, res) => {
    let id = +req.params.id;
    let dataToDelete = jsonData.find(el => el.id === id);
    if (dataToDelete) {
        let objIndex = jsonData.indexOf(dataToDelete);
        jsonData.splice(objIndex, 1);
        fs.writeFile('./Template/data/jsonData.json',JSON.stringify(jsonData), (err, data)=>{
            res.status(200).json({
                status : "Success",
                body : " Data deleted successfully",
            });
        });
    }else{
        console.log(' id not found');
        res.status(404).json({
            status : "Filed",
            body : " NO data Found",
        });
    }
}; 