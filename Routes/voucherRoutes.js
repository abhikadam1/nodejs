const express = require('express');
const voucherRouter = express.Router();
const voucherController = require('./../Controller/voucherController');

voucherRouter.param('id', voucherController.paramMiddelware);

voucherRouter.route('/')
    .get(voucherController.getAllVouchers)
    .post(voucherController.createVoucher);

voucherRouter.route('/:id')
    .get(voucherController.getVoucer)
    .patch(voucherController.updateVoucer)
    .put(voucherController.updateVoucer1)
    .delete(voucherController.deleteVoucher);

module.exports = voucherRouter;


// Api by arrow functions 
// app.get('/vouchers', getAllVouchers);
// app.get('/vouchers/:id/:name?', getVoucer);
// app.post('/vouchers', createVoucher);
// app.patch('/vouchers/:id', updateVoucer);
// app.put('/vouchers/:id', updateVoucer1);
// app.delete('/vouchers/:id', deleteVoucher);

//Api Call by route handeler 
// app.route('/vouchers')
//     .get(getAllVouchers)
//     .post(createVoucher);

// app.route('/vouchers/:id')
//     .get(getVoucer)
//     .patch(updateVoucer)
//     .put(updateVoucer1)
//     .delete(deleteVoucher);

// Mouting routes in express using middleware
// const voucherRouter = express.Router();
// voucherRouter.route('/')
//     .get(getAllVouchers)
//     .post(createVoucher);

// voucherRouter.route('/:id')
//     .get(getVoucer)
//     .patch(updateVoucer)
//     .put(updateVoucer1)
//     .delete(deleteVoucher);
