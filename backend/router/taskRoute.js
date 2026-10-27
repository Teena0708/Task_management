const express = require('express');
const router = express.Router();

const Task = require('../models/taskSchema');

router.get("/api/task", asyncHandler(async(req,res)=>{
    const limit = parseInt(req.query.limit,10)||10;
    const sanitizeLimit = limit < 1 ? 10 : limit;
    const {nextCursor} = req.query;
    const query = {}
    if(nextCursor)


        if(!mongoose.isValidObjectId){
            return res.status(400).json({
                success : false,
                message : "Not valid id"
            })
        }
    


    const tasks = await Task.find(query).sort({_id : -1}).limit(sanitizeLimit+1);
    const hasNext = tasks.length > sanitizeLimit;
    if(hasNext){
        tasks.pop();
    }

    const lastitem = task[task.length-1];
    const newCursor = hasNext&&lastitem? lastitem._id : null;
    res.status(200).json({
        success : true,
        metadata : {
            limit : sanitizeLimit,
            nextCursor : newCursor
        },
        data : task
    })



    
}));





// router.get("/api/task", asyncHandler(async (req, res) => {
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 10;
//     const sanitizePage = page > 1 ? page : 1;
//     const sanitizeLimit = limit < 1 ? 10 : limit;
//     const skip= (sanitizePage - 1) * sanitizeLimit;
//     const [tasks, totalTasks] = await Promise.all([
//         Task.find()
//             .populate("user", "name email")
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(sanitizeLimit),
//         Task.countDocuments()
//     ]);
//     const totalPages = Math.ceil(totalTasks/sanitizeLimit);
//     res.status(200).json({
//         tasks,
//         totalTasks,
//         currentPage: sanitizePage,
//         totalPages,
//         prevPage: sanitizePage>1 ? sanitizePage-1 : null,
//         nextPage: sanitizePage<totalPages ? sanitizePage+1 : null
//     });
// }));


router.post("/api/task", asyncHandler(async (req, res) => {
    const {title}=req.body;
    if (!title || !title.trim()){
        return res.status(400).json({ message: "Title is required"});
    }
    const newTask=await Task.create({
        title: title.trim()
    });
    res.status(201).json(newTask);
}));

router.delete("/api/task/:id", asyncHandler(async (req, res) => {
    const id=req.params.id;
    const task=Task.find(id=>Task.id);
    const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        });
    
}));

module.exports = router;