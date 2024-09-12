const devlog=(logs)=>{
    if(process.env.NODE_ENV !== 'production'){
    console.log(...logs);
    }
}
module.exports = devlog;