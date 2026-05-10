const express = require("express");
const { registerController, loginController, testController, logoutController, forgotPasswordController, updateProfileController } = require("../controllers/authController");
const {AuthMiddleWare,isAdmin} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test",AuthMiddleWare,isAdmin, testController)

router.post("/logout",logoutController);

router.post("/forgot-password" , forgotPasswordController)

//to protect user auth
router.get("/user_auth", AuthMiddleWare , (req,res)=>{

    return res.status(200).json({ok:true})
})

//to protect admin route

router.get('/admin_auth', AuthMiddleWare, isAdmin , (req,res)=>{

    return res.status(200).json({ok:true})
})

//for user profile 
router.put('/profile', AuthMiddleWare ,updateProfileController );

module.exports = router;
