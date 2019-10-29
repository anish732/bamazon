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
    runSearch();
  });    
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Product Sales by Department",
          "Create new department",
          "exit"
        ]
      }).then(function(answer){
        switch(answer.choice){
            case "View-Product Sales by Department":
                viewProduct();
                break;
            case "Creat new department":
                creatDepartment();
                break;
            case "exit":
                connection.end();
                break;
            }
      })
    }
function viewProduct(){
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "Which department do you want to check?"
  }).then(function(answer){
    var query = "SELECT department_id,department_name,over_head_cost,products_sales FROM departments LEFT JOIN products ON product_sale";
    connection.query(query,[answer.department],function(err,res){
      console.log(res);
     // (console.log(res.length + "match found"));
      runSearch();
    })
  })
     
    }