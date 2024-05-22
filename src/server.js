const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/images', express.static('images'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'images/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});


// filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Unique filename
//   }
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//   }
// })

const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hardware"
})


// get product
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if(err) return res.json("Error");
    return res.json(results);
  })
});



// insert product
app.post('/upload', upload.single('image'), (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file.filename;

    const sql = 'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, price, description, image], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error uploading data');
        } else {
            res.status(200).send('Data uploaded successfully');
        }
    });
});


//update form in view data
app.get('/search/:id', (req,res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if(err) return res.json("error");
    return res.json(results);
  })
})




// Update product
app.put('/update/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = "UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?";
    const values = [
        name,
        price,
        description,
        image,
        id
    ];

    db.query(sql, values, (err, data) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ error: 'Error updating product' });
        }
        return res.json("updated");
    });
});
  


// Delete product
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';
  
    db.query(sql, [productId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting product' });
      } else {
        res.json({ message: 'Product deleted successfully' });
      }
    });
  });



//signup
app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES(?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

// app.post('/signin', (req, res) => {
//     const { email, password } = req.body; // Destructure email and password from req.body
//     const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
//     db.query(sql, [email, password], (err, data) => {
//         if (err) {
//             return res.json("Error");
//         }
//         if (data.length > 0) {
//             return res.json("Success");
//         } 
//         else if (email === "admin123@gmail.com" && password === "admin123XY"){
//             return res.json("Admin");
//         }
//         else {
//             return res.json("Failed");
//         }
//     });
// });


app.post('/signin', (req, res) => {
    const { email, password } = req.body; // Destructure email and password from req.body
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [email, password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            // User exists, check if admin
            if (email === "admin123@gmail.com" && password === "admin123XY") {
                return res.json("Admin");
            } else {
                return res.json("Success");
            }
        } else {
            return res.json("Failed");
        }
    });
});


app.use(bodyParser.urlencoded({ extended: true }));
// POST endpoint to handle order placement
app.post("/orders", (req, res) => {
    const {
      pname,
      price,
      customername,
      contact,
      oqty,
      address,
      totalPrice,
    } = req.body;

    const orderData = {
      pname,
      price,
      customername,
      contact,
      oqty,
      address,
      totalPrice,
      date: new Date().toISOString(),
      status: 'inprogress'
    };
  
    // Insert order data into the orders table
    db.query("INSERT INTO orders SET ?", orderData, (err, result) => {
      if (err) {
        console.error("Error placing order:", err);
        res.status(500).send("Error placing order");
      } else {
        console.log("Order placed successfully");
        res.status(201).send("Order placed successfully");
      }
    });
  });



  // get orders
app.get('/orders', (req, res) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, results) => {
      if(err) return res.json("Error");
      return res.json(results);
    })
  });


  // order are complete in click complete button 
app.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId], (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).send("Error updating order status");
    } else {
      console.log("Order completed successfully");
      res.status(200).send("Order completed successfully");
    }
  });
});

// Endpoint to fetch completed orders
app.get('/completed-orders', (req, res) => {
  // Fetch orders with status 'completed' from the database
  db.query('SELECT * FROM orders WHERE status = ?', ['completed'], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching completed orders');
    } else {
      res.json(results);
    }
  });
});


// Endpoint to fetch cancel orders
app.get('/cancelled-orders', (req, res) => {
  // Fetch orders with status 'completed' from the database
  db.query('SELECT * FROM orders WHERE status = ?', ['cancelled'], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching cancelled orders');
    } else {
      res.json(results);
    }
  });
});



// Delete OrdersComplete
app.delete('/orders-completed/:id', (req, res) => {
  const orderId = req.params.id;
  const sql = 'DELETE FROM orders WHERE id = ?';

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting orders' });
    } else {
      res.json({ message: 'Completeorders deleted successfully' });
    }
  });
});


// Delete OrdersComplete
app.delete('/orders-cancelled/:id', (req, res) => {
  const orderId = req.params.id;
  const sql = 'DELETE FROM orders WHERE id = ?';

  db.query(sql, [orderId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error deleting orders' });
    } else {
      res.json({ message: 'Cancelorders deleted successfully' });
    }
  });
});



const router = express.Router();

// Assuming you have session middleware set up
app.get('/logout', (req, res) => {
  // Assuming you are using sessions
  if (req.session) {
    // Clear the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // Redirect to login page after successful logout
      console.log('Logout successful');
      return res.status(200).json({ message: 'Logout successful' });
    });
  } else {
    // Session doesn't exist, consider the user already logged out
    return res.status(200).json({ message: 'User already logged out' });
  }
});

module.exports = router;


app.listen(8081, () => {
    console.log("listening");
});

