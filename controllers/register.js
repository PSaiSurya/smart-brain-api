const register = async (req, res, database, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("Incorrect Form Submission");
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    await database.transaction(async (trx) => {
      const LoginEmail = await database
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .transacting(trx)
        .returning("email");
      const user = await database("users")
        .returning("*")
        .insert({
          email: LoginEmail[0],
          name: name,
          joined: new Date(),
        })
        .transacting(trx);
      res.json(user[0]);
    });
  } catch (err) {
    res.status(400).json("ERROR: Unable to Register");
  }
};

export default register;
