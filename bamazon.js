var mysql = require("mysql");

var inquirer = require("inquirer");

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
  var mysql = require("mysql");

var inquirer = require("inquirer");

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
     //console.table(res);
     inquirer.prompt({
         name:"itemId",
         type: "input",
         message: "Which ID of the product do you want to buy?"
     }).then(function(answer1){
       var userChoose = answer1.itemId;
       connection.query("SELECT * FROM product WHERE Id= ? " +  userChoose,function(err,res){
           if (err){
               console.log(err);
           }else{
           }
       } )
     })
    });
}
      
    
