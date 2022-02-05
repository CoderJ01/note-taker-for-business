// this file exists merely to enforce good coding practice (i.e. for organization of code)
// this file would be very beneficial for multiple api files
const router = require('express').Router();
const noteRoutes = require('../apiRoutes/notesRoutes');

router.use(noteRoutes);

module.exports = router;