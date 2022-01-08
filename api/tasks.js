//step:1 create table in database
//create products tables

//create table products (pro_id int not null auto_increment,productname varchar(20),productstock int,productprice int,primary key(pro_id));
//alter table products modify column pro_id varchar(20);

//create cart table(parent table)
//create table cart(cart_id int not null auto_increment,user_id varchar(20),primary key(cart_id))
//alter table cart modify column cart_id varchar(20);

//create cart products table(child table)
//create table cartproducts(id int not null auto_increment,pro_id varchar(20),cat_id varchar(20),quantity int,primary key(id),foreign key(cat_id) references cart(cart_id) on update cascade)
//alter table cartproducts modify column  id varchar(20);

//-------------------------------------step:2 products  add in products table------------------------------------------//
//products  add in products table

let express = require("express");
let router = express.Router();
let { connection } = require("../db");
let { randomnumbers } = require("../randomnumber/randomnumbers");

postproducts = (pro_id, productname, productstock, productprice) => {
  console.log("advbjhdsvjhds v");
  return new Promise((resolve, reject) => {
    var sql =
      "insert into products(pro_id,productname,productstock,productprice) values(?,?,?,?)";
    connection.query(
      sql,
      [pro_id, productname, productstock, productprice],
      (err, results) => {
        if (err) {
          return reject(err);
        } else {
          console.log(results);
          return resolve(results);
        }
      }
    );
  });
};

router.post("/addproducts", async (req, res) => {
  console.log(req.body);
  try {
    let pro_id = randomnumbers(10);
    productname = req.body.productname;
    productstock = req.body.productstock;
    productprice = req.body.productprice;

    let insertproducts = await postproducts(
      pro_id,
      productname,
      productstock,
      productprice
    );
    res.status(200).send(insertproducts);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//morning order
//-----------------------step:3 insert products in cart and cartproducts------------------------------//
postmororder = (cart_id, user_id, pro_id, quantity, id) => {
  return new Promise((resolve, reject) => {
    var sql = "select productstock,productprice from products where pro_id=?";
    connection.query(sql, [pro_id], (err, results) => {
      console.log(results);
      console.log(quantity);
      if (quantity <= results[0].productstock) {
        var sql = "insert into cart(cart_id,user_id) values(?,?)";
        connection.query(sql, [cart_id, user_id], (err, results1) => {
          let price1 = results[0].productprice * quantity;
          var sql =
            "insert into cartproducts(id,pro_id,cart_id,quantity,price) values(?,?,?,?,?)";
          connection.query(
            sql,
            [id, pro_id, cart_id, quantity, price1],
            (err, results) => {
              if (err) {
                return reject(err);
              } else {
                return resolve(results);
              }
            }
          );
        });
      } else {
        return reject("stock is not available");
      }
    });
  });
};

router.post("/addproductcart", async (req, res) => {
  try {
    let cat_id = randomnumbers(10);
    user_id = req.body.username;
    pro_id = req.body.pro_id;
    quantity = req.body.quantity;
    let id = randomnumbers(10);

    let mororder = await postmororder(cat_id, user_id, pro_id, quantity, id);
    res.status(200).send(mororder);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//--------------------------------step:4-----------------------------------------
//update  productsstock in products table

productstock1 = (pro_id, productstock) => {
  return new Promise((resolve, reject) => {
    var sql = "update products set productstock=? where pro_id=?";
    connection.query(sql, [productstock, pro_id], (err, results) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(results);
      }
    });
  });
};

router.put("/update/:id", async (req, res) => {
  try {
    let pro_id = req.params.id;
    let productstock = req.body.productstock;

    let updatestock = await productstock1(pro_id, productstock);
    res.status(200).send(updatestock);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//--------------------------step:5 update cart at evening--------------------------------//
cartupdateeve = (user_id) => {
  return new Promise((resolve, reject) => {
    var sql =
      "select  cp.price,cp.quantity,cp.pro_id from cart c ,cartproducts cp where cp.cart_id=c.cart_id and c.user_id=?";

    connection.query(sql, [user_id], (err, results) => {
      var sql = "select productprice  from products where pro_id=?";
      connection.query(sql, [results[0].pro_id], (err, results1) => {
        let cartprice = results[0].price / results[0].quantity;
        if (results1[0].productprice == cartprice) {
          return resolve({ message: "CART PRICE IS SAME" });
        } else {
          return reject({ message: "CART PRICE IS UPDATED PLZ CHECK ONCE" });
        }
      });
    });
  });
};

router.put("/cartupdateafter/:user_id", async (req, res) => {
  try {
    let cart_id = req.params.user_id;

    let updatecart1 = await cartupdateeve(cart_id);
    res.status(200).send(updatecart1);
  } catch (error) {
    res.status(400).send(error);
  }
});
//----------------------step:7fetch user products----------------------------------------//

productdetails = (user_id) => {
  return new Promise((resolve, reject) => {
    var sql =
      "select p.pro_id, p.productname,p.productstock,p.productprice,cp.quantity from  products p,cartproducts cp,cart c where c.cart_id=cp.cart_id and cp.pro_id=p.pro_id and c.user_id=?";
    connection.query(sql, [user_id], (err, results) => {
      if (err) {
        return reject(err);
      } else {
        var sql = "select productstock from products where pro_id=?";
        connection.query(sql, [results[0].pro_id], (err, results1) => {
          console.log(results1[0].productstock);
          console.log(results[0].quantity);
          if (results1[0].productstock <= results[0].quantity) {
            return resolve({ message: "PRODUCTS ADD SUCCESSFULLY" });
          } else {
            return resolve({ message: "PRDUCT IS OUT OF STOCK" });
          }
        });
      }
    });
  });
};

router.get("/fetchproducts/:user_id", async (req, res) => {
  try {
    let user_id = req.params.user_id;

    let fetchproducts = await productdetails(user_id);
    res.status(200).send(fetchproducts);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
