const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const path = require('path')

// Import Swagger libraries
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
require('dotenv').config({ path: '.env' })
require('dotenv').config({ path: 'config/config.env' })

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());

// --- CẤU HÌNH SWAGGER ---
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ShopIT API Documentation',
            version: '1.0.0',
            description: 'Tài liệu API quản lý hệ thống bách hóa / siêu thị ShopIT',
        },
        servers: [
            {
                url: 'http://localhost:4000/api/v1',
                description: 'Development Server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Quét toàn bộ file trong thư mục routes để tự động tạo tài liệu
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// ------------------------

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app