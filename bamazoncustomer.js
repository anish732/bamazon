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
    chooseProduct();
  });     
  function chooseProduct(){ 
      connection.query("SELECT * FROM products", function(err,res){
       console.table(res);
       stock = res;
    inquirer
      .prompt([
          {
        name: "item",
        type: "input",
        message: "Which item_id do you want to get?"
         },
          {
              name:"quantity",
              type:"input",
              message: "How many units would you like to buy?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
          }
      ])
       .then(function(answer) {
           var productName = answer.item;
           var index = answer.item-1;
           var newQuantity = stock[index].stock_quantity - answer.quantity;
           if (answer.quantity>stock[index].stock_quantity){
               console.log("Sorry we don't have enough quantity");
               readProducts();
           }else{
           var totalPrice = stock[index].price * answer.quantity;
           console.log("You total cost : $" +  totalPrice);
           var query = connection.query("UPDATE products SET ? WHERE ?",
           [
               { 
                stock_quantity : newQuantity,
                product_sales : totalPrice,
               },
            {
                item_id : productName
            },
           ],
            function (err,res){
                if(err) throw err;
               console.log(query.sql);   
           readProducts();               
    });  
};
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
    

