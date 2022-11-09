const router = require("express").Router();
const { PageController } = require("../../controllers");
const homeRoutes = require("./home-routes");
const dashboardRoutes = require("./dashboard-routes");

const isAuthenticated = require("../../middleware/isAuthenticated");

// Static pages
router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => res.render("login"));
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

// Pages with data
router.get("/", isAuthenticated, PageController.getDashboard);

module.exports = router;
