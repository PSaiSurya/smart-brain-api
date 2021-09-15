const profile = async (req, res, database) => {
  const { id } = req.params;
  try {
    const user = await database.select("*").from("users").where({ id: id });
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(400).json("User Not Found");
    }
  } catch (error) {
    res.status(400).json("Something went wrong");
  }
};

export default profile;
