var casual = require('casual');
var db = {users:[]};
casual.define('user',function(gender,id){
    return {
      id:id,
      firstname:casual.first_name,
      lastname:casual.last_name,
      email:casual.email,
      dob:casual.date(format='YYYY-MM-DD'),
      age:casual.integer(from=0,to=100),
      gender:gender||'M'
    }
});

for(var i=0;i<20;i++){
  var gen = (i%2 ===0) ? 'M':'F';
  var user = casual.user(gen,i);
  db.users.push(user);
}
console.log(JSON.stringify(db));
