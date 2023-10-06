const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");  //1.require mongoose
const { name } = require("ejs");
var _= require("lodash")
const PORT = process.env.PORT || 3030;
 
const app = express();
//let item1 ="";
//const item1 = ["get groceries", "arrange groceries"];    // due to overwrite    //why const? 
//const workItems = []; 
app.set('view engine', 'ejs');   //placed below express declaration
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));  //to access the public folder for static files

//mongoose.connect("mongodb://localhost:27017/todolistDB")
//mongoose.connect("mongodb://127.0.0.1:27017/todolistDB"); //2. connect to db
//mongodb+srv://hrazak50:<password>@cluster0.inc1xze.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://hrazak50:Mu123@cluster0.inc1xze.mongodb.net/todolistDB"); //2. connect to db

//mongodb+srv://hrazak50:<password>@cluster0.inc1xze.mongodb.net/?retryWrites=true&w=majority  >>link we modified up here

//3. create schema and add items to db

const itemsSchema = {
    name: String
}
 const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "this is your todo list"
})

const item2 = new Item({
    name: "click + to add item"
})

const item3 = new Item({
    name: "<-- click here to del item"
})

const defaultItems  = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
}
const List = mongoose.model("List", listSchema);

 Item.find().then(function(doc){
        //mongoose.connection.close();    //close connection:: calling close method on our collection
      doc.forEach(function(item){
        //console.log(car.review)
       // console.log(item.name)
      })
    })

app.get("/", function(req, res){
        
    Item.find({}).then(function(foundItems){

        //console.log(foundItems)
                        
        if(foundItems.length === 0) {     // if item collection has no items
            Item.insertMany([defaultItems]).then(function(){
                console.log("Successfully saved defult items to DB");
              }).catch(function (err){
                console.log(err);
              });
              res.redirect("/");    //redirects to root route and falls into else block
        }else{
            res.render("list", {listTitle: "Today", newListItem: foundItems});
        
    }
        //console.log(foundItems)
       
    });

//let day =  date.thisDay() 
    //res.render("list", {listTitle: "Today", newListItem: items};                                                                                                                                                                                                                                                                                                                                                                                                                                                 //res.render ("list", {day: day} );
});


app.post("/", function(req, res){
      const itemName = req.body.itemss;
      const listName = req.body.list;          //correspomd to "name" value in ejs file

      const item =  new Item({                 //create a new item based on doc
        name: itemName
      });

      if(listName === "Today"){
        item.save();
        res.redirect("/")
      } else {
        List.findOne({name: listName}).then(function(foundList){
          foundList.items.push(item);
          foundList.save();
          res.redirect("/" + listName)
        }).catch(function(err){
          console.log(err)
         })
        }

      // item.save();
      // res.redirect("/")

    //   workItems.push(item);
    //   res.redirect("/work");
});

app.post("/delete", function(req, res){
    console.log(req.body.check);       //show check box value
    const checkedItemId = req.body.check;
    const listName = req.body.listName;

    if(listName === "Today"){

      Item.findByIdAndRemove(checkedItemId) .then(function (err, docs) {
        console.log("Removed");
         
        }).catch(function(err){
         console.log(err)
        })
     res.redirect("/")

    } else {
      List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}).then(function(){
        res.redirect("/" + listName)
      }).catch(function(err){
        console.log(err)
      })
    }
     

    
 })

app.get("/about", function(req, res){
    res.render("about");
    console.log(req.params)

})

    app.get("/:topic", function(req , res){
       // res.render('id' + req.params.id);

        let par = _.capitalize(req.params.topic);

    List.findOne({ name: par })
  .then(function(foundList) {
    console.log(foundList)
    if (!foundList) {
      console.log("no");
      const list = new List({
        name: par,
        items: defaultItems
    });
    
   list.save(); 
   res.redirect("/" + par)   //redirect to our route..
    } else {
      console.log("yes!" + foundList.name);
      res.render("list", {listTitle: foundList.name, newListItem: foundList.items});
    }
  })
  .catch(function(err) {
    console.error(err);
  }); 
})                                                                                                                                                                                                                                                                                                                                                                                                                                             //res.render ("list", {day: day} );                                                                                                                                                                                                                                                                                                                                                                                                                                               

app.listen(3000, function(){
    console.log(`server on port ${PORT}`);
});