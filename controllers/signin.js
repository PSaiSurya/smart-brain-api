const signIn = async (req, res, database, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Incorrect Form Submission");
  }
  try {
    const data = await database
      .select("email", "hash")
      .from("login")
      .where("email", "=", email);
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if (isValid) {
      try {
        const userData = await database
          .select("*")
          .from("users")
          .where("email", "=", email);
        res.json(userData[0]);
      } catch (error) {
        res.status(400).json("Unable to fetch user");
      }
    } else {
      res.status(400).json("Wrong credentials");
    }
  } catch (error) {
    res.status(400).json("Wrong credentials");
  }
};

export default signIn;
