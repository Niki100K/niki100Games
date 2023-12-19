const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

require('dotenv').config()

const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});





app.get('/games', (req, res) => {
    db.query(
        "SELECT * FROM games",
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }
        }
    )
})
app.get('/data', (req, res) => {
    const { id } = req.query
    db.query(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }
        }
    )
})
app.get('/cart', (req, res) => {
    const { id } = req.query

    db.query(
        "SELECT * FROM cart WHERE userid = ?",
        [id],
        (err, results) => {
            if (err) {
                
                res.status(500).json(err)
            } else {
                res.status(200).json(results)
            }
        }
    )
})
app.get('/orders', (req, res) => {
    const { id } = req.query

    db.query(
        "SELECT * FROM orders WHERE userId = ?",
        [id],
        (err, results) => {
            if (err) {
                
                res.status(500).json(err)
            } else {
                res.status(200).json(results)
            }
        }
    )
})
app.get('/orderedGames', (req, res) => {
    const { id } = req.query
    db.query(
        "SELECT * FROM order_game WHERE userId = ?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }
        }
    )
})
app.post('/addGame', (req, res) => {
    const { userId, game } = req.body
    db.query(
        `SELECT * FROM cart WHERE userId = ${userId} AND gameId = ${game.id}`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else {
                if (result.length === 0) {
                    db.query(
                        `INSERT INTO cart 
                        (userId, gameId, price, image, name, category) VALUES
                        ('${userId}','${game.id}',"${game.price}","${game.image}","${game.name}",'${game.category}')`,
                        (err) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json(err)
                            } else {
                                res.status(201).json()
                            }
                        }
                    )
                } else {
                    res.status(200).json()
                }
            }
        }
    )
})
app.delete('/removeGameId', (req, res) => {
    const { userId, id } = req.body
    db.query(
        `DELETE FROM cart WHERE userId = ${userId} AND gameId = ${id}`,
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).json(err)
            } else {
                res.status(200).json()
            }
        }
    )
})
app.get('/login', (req, res) => {
    const { email, password } = req.query;

    db.query("SELECT * FROM users WHERE email = ? AND password = ?", 
    [email, password],
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json(err)
        } else {
            if (result.length === 1) {
                res.status(200).json(result[0].id)
            } else {
                res.status(204).json()
            }
        }
    });
});
app.post('/finishOrder', (req, res) => {
    const { id, gamesData, totalPrice, products } = req.body
    const orderDate = new Date().toLocaleDateString();

    db.query(
        `INSERT INTO orders 
        (userId, date, total, products) VALUES
        ('${id}','${orderDate}','${(totalPrice).toFixed(2)}','${products}')`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json()
            } else {
                const insertId = result.insertId
                gamesData.forEach(game => {
                    db.query(
                        `INSERT INTO order_game
                        (userId, orderId, gameId, quantity, image, name, price) VALUES
                        ('${id}', '${insertId}','${game.gameId}','${game.quantity}',"${game.image}","${game.name}",'${game.price}')`,
                        (err) => {
                            if (err) {
                                console.log(err);
                                res.status(500).json()
                            } else {
                                db.query(
                                    `DELETE FROM cart WHERE userId = ${id}`,
                                    (err) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(500).json()
                                        } else {
                                            res.status(201).json()
                                        }
                                    }
                                )
                            }
                        }
                    )
                });
            }
        }
    )
})
app.delete('/clearCart', (req, res) => {
    const { id } = req.body

    db.query(
        "DELETE FROM cart WHERE userId = ?",
        [id],
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else {
                res.status(200).json()
            }
        }
    )
})
app.post('/updateData', (req, res) => {
    const { userData, formData } = req.body;

    if (userData.id !== 1) {
        db.query(
            `UPDATE users SET 
                firstName = ?,
                lastName = ?,
                email = ?,
                phone = ?,
                password = ?
                WHERE id = ?`,
            [            
                formData.firstName,
                formData.lastName,
                formData.email,
                formData.phone,
                formData.password,
                userData.id
            ], 
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json();
                }
            }
        );
    } else {
        res.status(203).json();
    }
});
app.post('/register', async  (req, res) => {
    const { formData } = req.body
    try {
        const hashedPassword = await  bcrypt.hash(formData.password, 10)
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [formData.email],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err)
                } else {
                    if (result.length === 1) {
                        res.status(200).json()
                    } else {
                        db.query(
                            `INSERT INTO users (firstName, lastName, email, phone, password) VALUES
                            ('${formData.firstName}','${formData.lastName}','${formData.email}','${formData.phone}','${hashedPassword}')`,
                            (err, results) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json(err)
                                } else {
                                    res.status(201).json(results.insertId)
                                }
                            }
                        )
                    }
                }
            }
        )
    } catch (error) {
        console.error(error);
    }
})
app.delete('/deleteOrder', (req, res) => {
    const { correctOrder } = req.body

    db.query(
        `DELETE FROM orders WHERE id = ${correctOrder.id}`,
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).json(err)
            } else {
                db.query(
                    `DELETE FROM order_game WHERE orderId = ${correctOrder.id}`,
                    (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json(err)
                        } else {
                            res.status(200).json()
                        }
                    }
                )
            }
        }
    )
})


const port = process.env.PORT || 3004;

app.listen(port, () => {
    console.log('Server is running');
});
