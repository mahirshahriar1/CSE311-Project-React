const express = require('express');

const admin = new express.Router();
const db = require("../db/conn");
const fs = require('fs');
const moment = require('moment');


admin.get('/importSellers', (req, res) => {

    db.query('SELECT * FROM sellers ', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

});

admin.get('/importCustomers', (req, res) => {

    db.query('SELECT * FROM customers ', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

});


//delete user
admin.delete("/dltUser/:id/:Type/:imglink", (req, res) => {

    const id = req.params.id;
    const Type = req.params.Type;
    const userimg = req.params.imglink;
    try {
        if (Type == "Seller") {
            db.query("DELETE FROM sellers WHERE id=?", [id], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log('Data Deleted');
                    res.status(201).json({ status: 201, data: result })
                }
            })
        }
        else if (Type == "Customer") {
            db.query("DELETE FROM customers WHERE id=?", [id], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log('Data Deleted');
                    res.status(201).json({ status: 201, data: result })
                }
            })
        }

    }
    catch (error) {
        res.status(422).json({ status: 422, error });
    }

    // console.log(userimg);
    fs.unlink(`./uploads/${userimg}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File Deleted');
        }
    })

})

admin.post('/importOrders', (req, res) => {
    const status = req.body.status;
    db.query('SELECT * FROM orders WHERE OrderStatus=? order by DateOfOrder desc', [status], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

});

//orderAction
admin.post('/orderAction', (req, res) => {
    const id = req.body.CartID;
    const status = req.body.Status;
    //console.log(status);
    const date=moment().format('YYYY-MM-DD');
    db.query('UPDATE orders SET OrderStatus=? , DateOfProcess=? WHERE CartID=?', [status, date, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    }
    );

});

admin.post('/checkOrderList', (req, res) => {
    db.query('SELECT * FROM orders WHERE OrderStatus IN (?,?)', ['Pending', 'In Warehouse'], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    }
    );
});


admin.post('/getIsProcessed', (req, res) => {
    const id = req.body.CartID;
    db.query('SELECT * FROM orders WHERE CartID=?', [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    }
    );
});

admin.post('/getOrderInfo', (req, res) => {
    const id = req.body.CartID;
    db.query('SELECT * FROM orders WHERE CartID=?', [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    }
    );
});


admin.get('/importReports', (req, res) => {
     db.query('SELECT * FROM reports order by DateOfReport desc', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});


admin.post('/deleteReport', (req, res) => {
    const id = req.body.id;
   // console.log(id);
    db.query('DELETE FROM reports WHERE id=?', [id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(201).json({ status: 201, data: result })
        }
    }
    );
});

// Axios.get(`http://localhost:3001/getCustomerName/${id}`).then((response) => {

admin.get('/getCustomerName/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM customers WHERE id=?', [id], (err, result) => {
        if (err) {
            res.json({ status: 422, error: err });
        }
        else {
            res.send(result);
        }
    }
    );
});


module.exports = admin;
