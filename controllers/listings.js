const Listing = require("../models/listing");
const User = require("../models/user");
const fetch = require("node-fetch");

module.exports.toggleWishlist = async(req,res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    const alreadySaved = user.wishlist.some(listingId => listingId.equals(id));

    if(alreadySaved){
        user.wishlist.pull(id);
        req.flash("success", "Removed from wishlist");
    } else {
        user.wishlist.push(id);
        req.flash("success", "Added to wishlist");
    }

    await user.save();

    res.redirect(req.get("Referer") || `/listings/${id}`);
};

module.exports.showWishlist = async(req,res) => {
    const user = await User.findById(req.user._id).populate("wishlist");
    const wishlistListings = user.wishlist.filter(listing => listing !== null);
    res.render("listings/wishlist.ejs", { wishlistListings });
};

module.exports.index = async(req,res) => {
        let { category, search } = req.query;
        let filter = {};

        if(category){
            filter.category = category.toLowerCase();
        }

        if(search && search.trim() !== ""){
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } },
            ];
        }

        const allListings = await Listing.find(filter);
        res.render("listings/index.ejs",{
            allListings,
            currCategory: category || "",
            currSearch: search || ""
        });
    };


module.exports.renderNewForm = async(req,res) => {   
    res.render("listings/new.ejs");
};

module.exports.myListings = async(req,res) => {
    const myListings = await Listing.find({ owner: req.user._id });
    res.render("listings/my-listings.ejs", { myListings });
};


module.exports.showListing = async(req,res)=>{
        let { id } = req.params;
        const listing = await Listing.findById(id)
        .populate({
            path:"reviews",
            populate:{
                path:"author",
            },
        })
        .populate("owner");
        if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
}
        console.log(listing);
        res.render("listings/show.ejs",{ listing });
    };

 module.exports.createListing = async (req, res, next) => {

  let url, filename;

  if (req.file) {
    url = req.file.path;
    filename = req.file.filename;
  }

  const location = req.body.listing.location;

const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`,
  {
    headers: {
      "User-Agent": "wanderlust-app (student project)"
    }
  }
);

  const data = await response.json();
  console.log("Nominatim response:", data);

  const newListing = new Listing(req.body.listing);

  // Only add geometry if location found
  if (data.length > 0) {
  newListing.geometry = {
    type: "Point",
    coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)],
  };
} else {
  newListing.geometry = {
    type: "Point",
    coordinates: [77.5946, 12.9716] // default fallback (Bangalore)
  };
}
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = { url, filename };
  }

  await newListing.save();

  req.flash("success", "New Listing Created");

  res.redirect(`/listings/${newListing._id}`);
};   

module.exports.renderEditForm = async (req,res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","listing you requested does not exist");
        return res.redirect("/listings");
    }

   let originalImageUrl = "";

if (listing.image && listing.image.url) {
  originalImageUrl = listing.image.url.replace("/upload","/upload/h_100,w_250");
}

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};



module.exports.updateListing = async (req, res) => {
let { id } = req.params;

let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });


if(typeof req.file !== "undefined"){ 
let url = req.file.path;
let filename = req.file.filename;
listing.image = { url, filename};
await listing.save();
}
req.flash("success","Listing updated"); 
res.redirect(`/listings/${id}`);

};
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","Listing Deleted!");
  res.redirect("/listings");
};