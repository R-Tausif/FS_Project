import { NextApiHandler } from 'next';
 
const loginHandler: NextApiHandler = (req, res) => {

  const { email, password } = req.body;

  // Perform your login validation here (e.g., check credentials against a database)

  if (email === 'user@example.com' && password === 'password') {

    res.status(200).json({ message: 'Login successful' });

  } else {

    res.status(401).json({ message: 'Invalid credentials' });

  }

};

export default loginHandler;


 