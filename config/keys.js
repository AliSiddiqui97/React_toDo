// module.exports={
//     JWT_SECRET:"asdasdad",
//     MONGOURI:"mongodb+srv://testuser:4591394@cluster0-srmu4.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority"
// }


if(process.env.NODE_ENV==='production'){
    module.exports = require('./prod')
}
else{
    module.exports =require('./dev')
}