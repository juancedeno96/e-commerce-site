const bcrypt = require("bcryptjs");
module.exports = {
  register: async (req, res) => {
    const { first_name, last_name, email, password, profile_pic } = req.body;
    const db = req.app.get("db");
    const [foundUser] = await db.users.find_user_by_email(email);

    if (foundUser) {
      return res.status(403).send("email already in use");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const [registeredUser] = await db.users.create_user([
      first_name,
      last_name,
      email,
      hash,
      profile_pic,
    ]);

    req.session.user = registeredUser;
    return res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    const [foundUser] = await db.users.find_user_by_email(email);

    if (!foundUser) {
      return res.status(401).send("Email not found");
    }
    const authenticated = bcrypt.compareSync(password, foundUser.password);

    if (!authenticated) {
      return res.status(403).send("incorrect password");
    }
    delete foundUser.password;
    req.session.user = foundUser;
    res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(202);
  },
  getUser: (req, res) => {
    if (!req.session.user) {
      return res.sendStatus(401);
    }
    return res.status(200).send(req.session.user);
  },
};
