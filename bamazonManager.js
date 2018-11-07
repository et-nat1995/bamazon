const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

function run() {
    inquirer.prompt([
        {
            name: 'input',
            message: 'What would you like to do?',
            choices: ['View whats for sale.', 'View low inventory', 'Add to Inventory', 'Add new item.'],
            type: 'rawlist'
        }
    ]).then(answer => {
        switch (answer.input) {

            case 'View whats for sale.':
                showAllData()
                break;

            case 'View low inventory':
                console.log('View low inventory');
                showLessThan5();
                break;

            case 'Add to Inventory':
                console.log('Add to Inventory');
                addToInvent();
                break;

            case 'Add new item.':
                console.log('Add new item.');
                addItem();
                break;
        }
    });
}

run();

function showAllData() {
    connection.query("SELECT * FROM products", (err, data) => {
        if (err) throw err;
        const table = cTable.getTable(data);
        console.log(table);
        run();
    });
}

function addItem() {
    inquirer.prompt([
        {
            name: 'product_name',
            message: 'Name of product:',
            type: 'input',
            validate: ans =>{
                if (isNaN(ans)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            name: 'department_name',
            message: 'Department:',
            type: 'input',
            validate: ans =>{
                if (isNaN(ans)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            name: 'price',
            message: 'Price:',
            type: 'input',
            validate: ans =>{
                if (isNaN(ans)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        {
            name: 'stock_quantity',
            message: 'Stock Quantity:',
            type: 'input',
            validate: ans =>{
                if (isNaN(ans)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    ]).then(ans => {

        connection.query(`insert into
        products(product_name, department_name, price, stock_quantity)
        values (?, ?, ?, ? ) `, [ans.product_name, ans.department_name, ans.price, ans.stock_quantity], (err, data) => {
                if (err) throw err;

                console.log("Rows Added: " + data.affectedRows);
                run();
            });
    });
}

function showLessThan5() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", (err, data) => {
        if (err) throw err;
        const table = cTable.getTable(data);
        console.log(table);
        run();
    });
}

function addToInvent() {
    inquirer.prompt([
        {
            name: 'itemId',
            message: 'Item ID you would like to modify?',
            type: 'input'
        },
        {
            name: 'stock',
            message: 'How many would you like to add??',
            type: 'input'
        }
    ]).then(ans => {
        var amount;
        connection.query("SELECT * FROM products WHERE item_id = ?", [ans.itemId], (err, data) => {

            amount = parseInt(data[0].stock_quantity) + parseInt(ans.stock);

            connection.query("UPDATE products set stock_quantity = ? where item_id = ?",[amount, ans.itemId] , (err, data) => {
                if (err) throw err;
                run();
            });
        })
    });
}


// Validation stuff.
function validateNumber(ans) {
    if (isNaN(ans)) {
        return false;
    }
    else {
        return true;
    }
}

function validateString(ans) {
    if (isNaN(ans)) {
        return true;
    }
    else {
        return false;
    }
}