const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js"); 
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");

const validateReview = (req,res,next) =>{
    let { error } = reviewSchema.validate(req.body); //from listing i have wrote review
   // console.log(result);
    if(error){
       let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

const reviewController = require("../controllers/reviews.js");

//Post Review
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));

//Delete Review
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports = router;