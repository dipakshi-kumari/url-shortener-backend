const Url = require('../models/url');
const {nanoid} = require('nanoid');

// Create Short URL
exports.createShortUrl = async (req, res) => {
    try {
        const { originalUrl, customAlias, expirationDate } = req.body;

        // Check if custom alias already exists
        if (customAlias) {
            const existingUrl = await Url.findOne({ alias: customAlias });
            if (existingUrl) {
                return res.status(400).json({ error: 'Custom alias already in use' });
            }
        }

        // Generate alias if not provided
        const alias = customAlias || nanoid(10);

        // Create a new URL entry
        const url = new Url({
            alias,
            originalUrl,
            userId: req.user.id,
            expirationDate: expirationDate ? new Date(expirationDate) : null, // Set expiration date
        });

        await url.save();

        res.status(201).json({ message: 'Short URL created successfully', data: url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Redirect to Original URL
exports.redirectToOriginalUrl = async (req, res) => {
    try {
        const { alias } = req.params;
        const url = await Url.findOne({ alias });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Check if the URL has expired
        if (url.expirationDate && url.expirationDate < new Date()) {
            return res.status(410).json({ error: 'This URL has expired' });
        }

        // Increment visit count
        url.visitCount++;
        await url.save();

        // Redirect to the original URL
        const originalUrl = url.originalUrl.startsWith('http://') || url.originalUrl.startsWith('https://')
            ? url.originalUrl
            : `http://${url.originalUrl}`;

        res.redirect(302, originalUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve URLs
exports.getUrls = async (req, res) => {
    try {
        const userId = req.user.id;
        const { limit = 10, offset = 0, creationDate, expirationStatus } = req.query;

        // Build the query object
        const query = { userId };

        if (creationDate) {
            const [start, end] = creationDate.split(',');
            query.createdAt = {
                ...(start ? { $gte: new Date(start) } : {}),
                ...(end ? { $lte: new Date(end) } : {}),
            };
        }

        if (expirationStatus) {
            const now = new Date();
            query.expirationDate = expirationStatus === 'expired' ? { $lte: now } : { $gt: now };
        }

        const urls = await Url.find(query)
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }) // Sort by most recent
            .select('-userId'); // Exclude userId from response

        const total = await Url.countDocuments(query);

        res.json({
            data: urls,
            meta: {
                total,
                limit: parseInt(limit),
                offset: parseInt(offset),
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update URL
exports.updateUrl = async (req, res) => {
    try {
        const { alias } = req.params;
        const { originalUrl, customAlias, expirationDate } = req.body;

        // Find URL belonging to the authenticated user
        const url = await Url.findOne({ alias, userId: req.user.id });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        if (originalUrl) url.originalUrl = originalUrl;
        if (customAlias) url.alias = customAlias;
        if (expirationDate) url.expirationDate = new Date(expirationDate);

        await url.save();

        res.json({ message: 'URL updated successfully', data: url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete URL
exports.deleteUrl = async (req, res) => {
    try {
        const { alias } = req.params;

        // Find and delete the URL belonging to the authenticated user
        const url = await Url.findOneAndDelete({ alias, userId: req.user.id });
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.json({ message: 'URL deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
