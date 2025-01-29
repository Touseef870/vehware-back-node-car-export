import jwt from 'jsonwebtoken';


function generateToken(data) {

  const userId = data._id || (data._doc && data._doc._id);

  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return token;
}

export default generateToken;
