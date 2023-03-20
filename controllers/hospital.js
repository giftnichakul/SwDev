const Hospital = require('../models/Hospital');
const vacCenter = require('../models/VacCenter');

//@desc     Get vaccine centers
//@route    GET /api/v1/hospitals/vacCenters/
//@access   Public
exports.getVacCenters = (req, res, next) => {
    vacCenter.getAll((err, data) => {
        if(err) res.status(500).send({msg: err.message || "Some error ocuured while retrieving Vaccine Centers."});
        else res.send(data);
    })
}

//Get all hospitals
exports.getHospitals= async (req, res, next)=>{
    try{
        let query;
        let queryStr = JSON.stringify(req.query);

        //Copy req.query
        const reqQuery = {...req.query};
        //Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];
        //Loop over remove fields and delete them from reqQuery
        removeFields.forEach(param=> delete reqQuery[param]);
        console.log(reqQuery);

        queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=> `$${match}`);

        query = Hospital.find(JSON.parse(queryStr)).populate("appointments");

        //select field
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ');
            query=query.select(fields);
        }
        //sort
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else{
            query=query.sort("-createdAt");
        }

        //pagination
        const page=parseInt(req.query.page,10)||1;
        const limit=parseInt(req.query.limit,10)||25;
        const startIndex=(page-1)*limit;
        const endIndex=page*limit;
        const total=await Hospital.countDocuments();
        query=query.skip(startIndex).limit(limit);

        const hospitals = await query;

        const pagination = {};
        if(endIndex<total){
            pagination.next={
                page:page+1,limit
            }
        }
        if(startIndex>0){
            pagination.prev={
                page:page-1,limit
            }
        }

        //console.log(queryStr);
        res.status(200).json({success:true, count: hospitals.length,pagination, data: hospitals});
    }catch(err){
        res.status(400).json({success:false});
    }
};

exports.getHospital= async (req, res, next)=>{
    try{
        const hospital = await Hospital.findById(req.params.id);
        if(!hospital) return res.status(200).json({success: false});

        res.status(200).json({success:true, data:hospital});
    }catch(err){
        res.status(400).json({success:false});
    }
};

exports.createHospital= async (req, res, next)=>{
    const hospital = await Hospital.create(req.body);
    res.status(200).json({success: true, data:hospital});
};


exports.updateHospitals= async (req, res, next)=>{
    try{
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        })
        if(!hospital) return res.status(400).json({success:false});
        res.status(200).json({success:true, data:hospital});
    }catch(err){
        res.status(400).json({success: false});
    }
};

exports.deleteHospitals= async (req, res, next)=>{
    try{
        const hospital = await Hospital.findById(req.params.id);
        if(!hospital) return res.status(404).json({success:false, msg: `Bootcamp not found with id of ${req.params.id}`});
        hospital.remove();
        res.status(200).json({success:true, data: {}})
    }catch(err){
        res.status(400).json({success:false});
    }
};