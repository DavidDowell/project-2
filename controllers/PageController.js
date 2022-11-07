module.exports = {
  getDashboard: (req, res) => {
    res.render(
      'homepage',
      {
        welcomeMessage: `Welcome to the homepage ${req.session.currentUser.firstName}!`,
        isAuthenticated: req.session.isAuthenticated
      }
    );
  }
}