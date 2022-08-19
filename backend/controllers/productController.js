const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/features");



//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
        const product = await Product.create(req.body);

        res.status(201).json({
                success: true,
                product
        })
}
)


//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

        const resultPerPage = 5;
        const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)

        const product = await apiFeature.query;


        res.status(200).json({
                success: true,
                product
        });
}
)

//Update Product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
        let product = Product.findById(req.params.id);

        if (!product) {
                // return res.status(500).json({
                //         success:false,
                //         message:'Product not Found'
                //         })

                return next(new ErrorHandler("Product not Found", 404));

        }


        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
        });

        res.status(200).json({
                success: true,
                product
        })

})


//Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

        const product = await Product.findById(req.params.id)

        if (!product) {
                return next(new ErrorHandler("Product not Found", 404));
        }

        await product.remove();

        res.status(200).json({
                success: true,
                message: "Product Deleted Succesfully"
        })
})


// Single Product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

        const product = await Product.findById(req.params.id)

        if (!product) {
                return next(new ErrorHandler("Product not Found", 404));
        }

        res.status(200).json({
                success: true,
                product
        })
}
)