//refer to :https://www.sitepoint.com/using-redis-node-js/

var redis = require("redis");
var client = redis.createClient();

client.on('connect', function(){
    console.log('connected');
});

// client.set('framework', 'AngularJS', function(err, reply) {
//   console.log(reply);
//   console.log(err);
// });

// client.get('framework', function(err, reply) {
//     console.log(reply);
//     console.log("err:"+err);
// });

// client.exists('frameworks',function(err, reply){
//     if(reply === 0){
//       console("Add keys");
//       client.hmset(['frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express'], function(err, object){
//         console.log("err:" + err);
//       });
//     } else{
//         client.hgetall('frameworks', function(err, object) {
//             console.log(object);
//         });
//         client.quit();
//     }
// });
//client.rpush("frameworks2", "item1", "item2", "item3");
client.exists('frameworks2',function(err, reply){
    if(reply === 0){
        client.rpush(['frameworks2', 'angularjs', 'backbone'], function(err, reply) {
        console.log("Add a new list. " + reply); //prints 2
      });
    }else{
        client.lrange('frameworks2', 0, -1, function(err, reply) {
            console.log(reply); // ['angularjs', 'backbone']
            client.quit();
        });
    }
});

client.exists('tags',function(err, reply){
    if(reply === 0){
        client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
        console.log("Add a new list. " + reply); //prints 3
      });
    }else{
        client.smembers('tags', function(err, reply) {
            console.log(reply); // ['angularjs', 'backbone']
            client.quit();
        });
    }
});


console.log("first be executed.");
