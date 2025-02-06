import jwt from 'jsonwebtoken';


function generateToken(data) {

  const userId = data._id || (data._doc && data._doc._id);
  const userEmail = data.email || (data._doc && data._doc.email);

  const token = jwt.sign({ _id: userId, email: userEmail }, process.env.JWT_SECRET);

  return token;
}

export default generateToken;
