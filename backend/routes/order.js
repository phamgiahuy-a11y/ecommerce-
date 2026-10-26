const express = require('express')
const router = express.Router();

const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    getMonthlyIncome

} = require('../controllers/orderController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders/income').get(getMonthlyIncome);
router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders);
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)



module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Quản lý đơn hàng mua sắm
 */

/**
 * @swagger
 * /order/new:
 *   post:
 *     summary: Tạo đơn hàng mới
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: Tạo đơn hàng thành công
 */

/**
 * @swagger
 * /orders/me:
 *   get:
 *     summary: Lấy danh sách đơn hàng của người dùng hiện tại
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Lấy chi tiết đơn hàng theo ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công
 */

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Lấy toàn bộ đơn hàng (Dành cho Admin)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Thành công
 */