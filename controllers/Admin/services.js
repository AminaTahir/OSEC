const Admin=require('../Admin/AdminSchema')
const crypto=require('crypto')
/////////////////for add data or post req////////////
var createAdmin = async function createAdmin(admin) {
    return await admin.save().then(
        result => {
            return result
        }
    ).catch(
        err => {
            return err
        }
    )
}
var saveAdmin = async function saveAdmin(req) {
    var hash=crypto.createHash('sha256')
    var data=hash.update(req.body.password,'utf-8')
    var finalhash=data.digest('hex')
    const AdminData = new Admin({
        email:req.body.email,
        name:req.body.name,
        password:finalhash
    })
    var a = await createAdmin(AdminData)
    if (!a) {
        return a
        console.log("saved")
    }
    else {
        return a
        console.log("ERR")
    }
}
//////////for  view data or get req///////////////
var viewAdmin= async function viewAdmin(){
   return await Admin.find({},function(err,results){
        if(err){
            console.log("error occur")
        }else{
           console.log(results)
        }
    }).then(
        result=>
        {
            return result
        }
    ).catch(
        err => {
            return err
        }
    )

}

// // ////////////////////for deleting data or del req//////////
var delAdmin = async function delAdmin(reqID) {
    return await Admin.findByIdAndDelete({_id:reqID},function(err){
        if(err){
            console.log("error occur")
        }else{
            console.log("Admin Deleted");
        }
    }).then(
        result => {
            return result
        }
    ).catch(
        err=>{
            return err
        }
    )
}
var deleteAdmin = async function deleteAdmin(reqID) {
    var a = await delAdmin(reqID)
    if (!a) {
        return "Admin Deleted"
    }
    else {
        return "Error"
    }
}

// // ///////////////////for updating data or update req////////
var modifyAdmin = async function modifyAdmin(admin) { 
   
    return await  Admin.updateOne({_id:admin._id},{$set:admin},function(err,results){
        if(err){
            console.log("error occur")
        }else{
            console.log("Admin updated")
        }
    }).then(
        result => {
            return result
        }
    ).catch(
        err=>{
            return err
        }
    )
}
var updateAdmin = async function updateAdmin(AdminData) {
   
    var a = await modifyAdmin(AdminData)
    return a
}

module.exports = { saveAdmin, viewAdmin,deleteAdmin, updateAdmin}