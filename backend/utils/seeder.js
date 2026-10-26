const Product = require('../models/product');
const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('../config/database');
const products = require('../data/products');

// Thiết lập đường dẫn dotenv chính xác
dotenv.config({ path: path.join(__dirname, '../config/config.env') });

connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');

        const dummyUserId = "60c72b2f9b1d8b2d88f12345"; // ID giả lập cho user
        
        // Tự động gán user ID và đồng bộ category sang một danh mục hợp lệ sẵn có trên web
        const productsFormatted = products.map(product => {
            return {
                ...product,
                user: dummyUserId,
                category: product.category || "Bánh kẹo - Đồ ăn vặt"
            }
        });

        await Product.insertMany(productsFormatted);
        console.log('All Products are added.');

        process.exit();

    } catch (error) {
        console.log("Lỗi Seeder:", error.message);
        process.exit();
    }
}

seedProducts();