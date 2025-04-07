const express = require("express")
const cmplntModel = require("../models/complaint")
const router = express.Router()
const mongoose = require("mongoose");

var ObjectId = require('mongodb').ObjectId;
const path = require("path")

router.get("/all", async function (req, res) {
    let complnts = await cmplntModel.find()
    res.send(complnts)
})
router.post("/create", async (req, res) => {
    console.log("Received complaint data:", req.body); // Debugging
    try {
        const newComplnts = new cmplntModel(req.body);
            // title: req.body.title,
            // content: req.body.content,
            // author: req.body.author,
            // image: req.body.image,
            // category: req.body.category,
            // userId: req.body.userId // Ensure userId is saved
        
        newComplnts.status = "open"
        await newComplnts.save();
        res.status(201).json({ message: "Complaint created successfully", newComplnts });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
        console.log(err)
    }
});





// Endpoint to fetch all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// router.delete("/deleteCmplnt/:id", async function (req, res) {
//     const deletedCmplnt = await cmplntModel.deleteOne({ "_id": new ObjectId(req.params.id) })
//     res.send("cmplt deleted successfully")
// })

router.delete("/deleteCmplnt/:id", async (req, res) => {
    try {
      const deletedComplaint = await cmplntModel.findByIdAndDelete(req.params.id);
      
      if (!deletedComplaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
  
      res.json({ message: "Complaint deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
router.get("/cmplntById/:id", async function (req, res) {
    let complaint = await cmplntModel.findOne({ "_id": new ObjectId(req.params.id) })
    res.send(complaint)
})

router.put("/edit/:id", async function (req, res) {
    const updatedCmplnt = await cmplntModel.findByIdAndUpdate({ "_id": new ObjectId(req.params.id) }, req.body, { upsert: true })
    res.send("complaint updated successfully")
})

router.put("/status/:id", async function (req, res) {
    const updatedCmplnt = await cmplntModel.findByIdAndUpdate({ "_id": new ObjectId(req.params.id) }, { status: req.body.status }, { upsert: true })
    res.send("complaint status solved updated")
})

router.get("/searchByTitle/:title", async function (req, res) {
    console.log(req.params.title)
    const cmplnts = await cmplntModel.find({ title: req.params.title })
    res.send(cmplnts)
})
router.get("/searchByCategory/:category", async function (req, res) {
    console.log(req.params.category)
    if (req.params.category.toLowerCase() === 'all') {
        const cmplnts = await cmplntModel.find({})
        res.send(cmplnts)
    } else {
        const cmplnts = await cmplntModel.find({ category: req.params.category.toLowerCase() })
        res.send(cmplnts)
    }

})
// Get complaints by User ID (New API)
router.get("/user/:userId", async function (req, res) {
    try {
        const userId = req.params.userId;
        console.log("Fetched userId:", userId);

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        let userComplaints = await cmplntModel.find({ userId: userId })
            .populate("userId", "name email") // Populate User details
            .exec();

        console.log("Fetched complaints:", userComplaints);

        if (!userComplaints.length) {
            return res.status(404).json({ message: "No complaints found for this user." });
        }

        res.json(userComplaints);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});
// ... (other imports and code)

// Endpoint to fetch all categories
// router.get('/categories', async (req, res) => {
//     try {
//         const categories = await Category.find(); // Fetch all categories
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch categories' });
//     }
// });

router.get("/user/:userId/category/:category", async (req, res) => {
    const { userId, category } = req.params;
    const lowerCaseCategory = category.toLowerCase();

    try {
        if (lowerCaseCategory === "all") {
            const complaints = await cmplntModel.find({ userId });
            return res.json(complaints);
        }

        const complaints = await cmplntModel.find({
            userId,
            category: lowerCaseCategory,
        });

        res.json(complaints);
    } catch (error) {
        console.error("Error fetching complaints by category:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// ... (rest of your code)
  
  
  



router.post("/imageupload", function (req, res) {
    console.log(req.files)
    const filename = Date.now() + req.files.cmplntimage.name;
    const fileData = req.files.cmplntimage;
    const uploadPath = path.join(__dirname, "../", "uploads")
    console.log(filename, fileData, uploadPath)
    fileData.mv(uploadPath + "/" + filename, function (err) {
        if (err)
            res.send("something went wrng")
        res.send({ image: filename })
    })
})


module.exports = router