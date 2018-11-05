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
            name: "inputId",
            message: "What porduct would you like to buy?\n(Enter Item ID): ",
            type: 'input',
            validate: num => {
                if (isNaN(num)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        },
        {
            name: "inputAmount",
            message: "How many would you like to buy?",
            type: 'input',
            validate: num => {
                if (isNaN(num)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    ]).then(res => {
        udateStore(res.inputId, res.inputAmount);
    });
}

showAllData();

function showAllData() {
    connection.query("SELECT * FROM products", (err, data) => {
        if (err) throw err;
        const table = cTable.getTable(data);
        console.log(table);
        run();
    });
}

function udateStore(itemId, itemCount) {
    connection.query("SELECT * FROM products WHERE item_id = ?", [itemId], (err, data) => {
        if (err) throw err;

        if (itemCount <= data[0].stock_quantity) {
            var newAmount = data[0].stock_quantity - itemCount;
            var values = [
                [data[0].item_id, data[0].product_name, data[0].price, itemCount, itemCount * data[0].price]
            ];
            console.table(['Item ID', 'Item Name', 'Cost', 'Quantity', 'Total Cost'], values);

            connection.query("UPDATE products set stock_quantity = ? where item_id = ?", [newAmount, itemId], (err, data) => {
                if (err) throw err;
            });
        }
        else {
            console.log('Not enough For Sale.');
        }

        showAllData();
    })
}