var mysql = require("mysql");
var inquirer = require("inquirer");
var stock;
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "#mar1996",
    database: "bamazon_DB"
});
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    display();
  });
  function display(){
    connection.query("SELECT * FROM products", function(err,res){
        //console.table(res);
        stock = res;
        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "What would you like to do?",
                choices: [
                     "list-product",
                     "low-inventory",
                     "add-inventory",
                     "add-new-product",
                     "exit"
                ]
                 }
        ]).then(function(answer){
            switch(answer.choice){
                case "list-product":
                    viewProduct();
                    break;
            
                  case "low-inventory":
                    lowInventory();
                    break;
            
                  case "add-inventory":
                    addInventory();
                    break;
            
                  case "add-new-product":
                    addNewProduct();
                    break;
            
                  case "exit":
                    connection.end();
                    break;
            }
        })
  });
  }
function viewProduct(){
    console.log("viewProduct");
    connection.query("SELECT * FROM products", function(err,res){
        console.table(res);
    })
    display();
};
function addNewProduct(){
    console.log("addnewproduct");
   // console.log(res);
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the new product do you want to add?"
        },
        {
            name: "deparment",
            type: "input",
            message: "Which department your new product will be?"
        },
        {
            name: "price",
            type: "input",
            message: "what is the price for the product you have selected?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many pieces do you have?"
        }
    ]).then(function(answer){

       var query = connection.query("INSERT INTO products SET ?",
        [
            {
                product_name : answer.item,
                department_name : answer.deparment,
                price : answer.price,
                stock_quantity : answer.quantity
                
            },
        ],
        function(err,res){
            if (err) throw err;
            console.log("Product has been inserted");
            console.log(query.sql);
            readProducts();
        },

        )
    });    
}  
function lowInventory(){
    var query = connection.query("SELECT * FROM products", function(err,result){
        if (err) throw err;
        //console.table(result);
        stock = result;
        for (var i =1 ; i<result.length; i++){
            if(result[i].stock_quantity < 5){
                console.log("Product_name: "  + result[i].product_name  + "|| \Quantity: " + result[i].stock_quantity);
            }
        };
        connection.end();
    })
}
function addInventory(){
    connection.query("SELECT * FROM products", function(err,res){
       console.table(res);
        stock = res;
    inquirer.prompt([
        {
            name: "itemId",
            type: "input",
            message: "Which product ID do you want to add?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many pieces do you want to add?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
    ]).then(function(answer){
        var index = answer.itemId-1;
        var newQuantity = (parseInt(stock[index].stock_quantity) + parseInt(answer.quantity));
        console.log(newQuantity);

        var query = connection.query("UPDATE products SET ? WHERE ?",[
            {
                stock_quantity : newQuantity
            },
            {
                item_id : answer.itemId
            },
        ],
        function(err,res){
            if (err) throw err;
            console.log("Your products has been updated");
            console.log(query.sql);
            readProducts();
        },
        )
    });
});
}
function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  }


