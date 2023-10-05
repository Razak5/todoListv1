// //console.log(module);
// module.exports.thisDate = thisDate;

// function thisDate(){
     
// var today = new Date();
//     let options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long"
//     };
//    // var currentDay = date.getDay();
//     //let day = "";
//     //let day = today.toLocaleDateString("en-US", options);
//     today.toLocaleDateString("en-US", options);

//     return day;
// }
// module.exports.thisDay = thisDay;

// function thisDay(){
     
//     var today = new Date();
//         let options = {
//             weekday: "long"
//         };
    
//        // let day = today.toLocaleDateString("en-US", options);
//         return today.toLocaleDateString("en-US", options);

//     }

//     console.log(module.exports)
       //USING FXN EXP//
//console.log(module);
exports.thisDate = function (){
     
var today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
   // var currentDay = date.getDay();
    //let day = "";
    //let day = today.toLocaleDateString("en-US", options);
    return today.toLocaleDateString("en-US", options);

}
exports.thisDay = function thisDay(){
     
    var today = new Date();
        const options = {
            weekday: "long"
        };
    
       // let day = today.toLocaleDateString("en-US", options);
        return today.toLocaleDateString("en-US", options);

    }

    console.log(module.exports)