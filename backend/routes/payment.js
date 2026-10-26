const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendStripApi
} = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Xử lý thanh toán trực tuyến
 */

/**
 * @swagger
 * /payment/process:
 *   post:
 *     summary: Tiến hành xử lý thanh toán qua cổng Stripe
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Thanh toán thành công
 */

/**
 * @swagger
 * /stripeapi:
 *   get:
 *     summary: Lấy khóa cấu hình Stripe API Key công khai
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Thành công
 */