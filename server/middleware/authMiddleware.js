// import User from "../models/User.js";

// // Middleware to check if user is authenticated
// export const protect = async (req, res, next) => {


//   const {userId} = await req.auth();
 



//   if (!userId) {
//     res.json({ success: false, message: "not authenticated" });
//   } else {
//     const user = await User.findById(userId);
//     req.user = user;
//     next();
//   }
// };



// import User from "../models/User.js";

// // Middleware to check if user is authenticated
// export const protect = async (req, res, next) => {
//   try {
//     const auth = await req.auth(); // ⬅️ call the function
//     console.log("🔐 req.auth():", auth); // ✅ LOG AUTH OBJECT

//     const userId = auth?.userId;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     // const user = await User.findById(userId);
//     const user = await User.findOne({ clerkId: userId });

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("❌ Auth middleware error:", error);
//     res.status(401).json({ success: false, message: "Authentication failed" });
//   }
// };

import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  try {
    const auth = await req.auth(); // Correct Clerk usage
    const userId = auth?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};


