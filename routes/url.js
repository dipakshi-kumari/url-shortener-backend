const express = require('express');
const {
    createShortUrl,
    redirectToOriginalUrl,
    getUrls,
    updateUrl,
    deleteUrl,
} = require('../controllers/urlController');
const authenticate = require('../middleware/auth');

const router = express.Router();


/**
 * @swagger
 * /api/urls/:
 *   post:
 *     summary: Create a short URL
 *     description: Allows authenticated users to create a shortened URL with optional expiration and custom alias.
 *     tags:
 *       - URLs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: https://www.google.com
 *               customAlias:
 *                 type: string
 *                 example: TestAlias
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-31T23:59:59.999Z
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *       400:
 *         description: Validation error
 */

router.post('/', authenticate, createShortUrl);


/**
 * @swagger
 * /api/urls/:
 *   get:
 *     summary: Retrieve user URLs
 *     description: Fetch all shortened URLs created by the authenticated user.
 *     tags:
 *       - URLs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page.
 *     responses:
 *       200:
 *         description: List of URLs retrieved successfully
 *       401:
 *         description: Unauthorized
 */

router.get('/', authenticate, getUrls);

/**
 * @swagger
 * /api/urls/{alias}:
 *   put:
 *     summary: Update a shortened URL
 *     description: Allows authenticated users to update the original URL, custom alias, or expiration date of their shortened URL.
 *     tags:
 *       - URLs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *           example: 64a3f2b2e4b0ab00123abcd
 *         description: Unique ID of the URL to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: https://www.updated-url.com
 *               customAlias:
 *                 type: string
 *                 example: NewAlias
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-31T23:59:59.999Z
 *     responses:
 *       200:
 *         description: URL updated successfully
 *       404:
 *         description: URL not found
 *       400:
 *         description: Validation error
 */
router.put('/:alias', authenticate, updateUrl);

/**
 * @swagger
 * /api/urls/{alias}:
 *   delete:
 *     summary: Delete a shortened URL
 *     description: Allows authenticated users to delete their shortened URL.
 *     tags:
 *       - URLs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *           example: 64a3f2b2e4b0ab00123abcd
 *         description: Unique ID of the URL to delete.
 *     responses:
 *       200:
 *         description: URL deleted successfully
 *       404:
 *         description: URL not found
 */
router.delete('/:alias', authenticate, deleteUrl);

/**  * @swagger
 * /api/urls/{alias}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirects to the original URL associated with the given alias.
 *     tags:
 *       - Redirect
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         schema:
 *           type: string
 *           example: TestAlias
 *         description: Alias of the shortened URL.
 *     responses:
 *       302:
 *         description: Redirected successfully
 *       404:
 *         description: URL not found or expired
 */
router.get('/:alias', redirectToOriginalUrl);

module.exports = router;





