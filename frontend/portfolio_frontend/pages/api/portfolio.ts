import { NextApiHandler } from 'next';



 export default function handler(req, res) {

  const { method } = req;

 

  switch (method) {

    case 'GET':

    if (req.query.id) {
      getPortfolioById(req, res);
    } else {
      getPortfolios(req, res);
    }
    break;
      

      break;

    case 'POST':

      createPortfolio(req, res);

      break;

    case 'DELETE':

      deletePortfolio(req, res);

      break;

    default:

      res.status(405).json({ message: 'Method Not Allowed' });

      break;

  }

}



interface Portfolio {
  id: number;
  name: string;
  createdDate: string;
  role: string;
}

let portfolios: Portfolio[] = [
  { id: 1, name: 'Portfolio 1', createdDate: '2023-01-01', role: 'Developer' },
  { id: 2, name: 'Portfolio 2', createdDate: '2023-02-01', role: 'Designer' },
  { id: 3, name: 'Portfolio 3', createdDate: '2023-03-01', role: 'Project Manager' },
];

export const getPortfolios: NextApiHandler = (req, res) => {
  res.status(200).json(portfolios);
};

export const createPortfolio: NextApiHandler = (req, res) => {
  const { name, role } = req.body;
  const id = portfolios.length + 1;
  const createdDate = new Date().toISOString();

  const newPortfolio: Portfolio = { id, name, createdDate, role };
  portfolios.push(newPortfolio);

  res.status(201).json(newPortfolio);
};

export const deletePortfolio: NextApiHandler = (req, res) => {
  const { id } = req.query;

  portfolios = portfolios.filter((portfolio) => portfolio.id !== Number(id));

  res.status(200).json({ message: 'Portfolio deleted successfully' });
};


const getPortfolioById: NextApiHandler = (req, res) => {
  const { id } = req.query;
  const portfolio = portfolios.find((portfolio) => portfolio.id === Number(id));
  if (portfolio) {
    res.status(200).json(portfolio);
  } else {
    res.status(404).json({ message: 'Portfolio not found' });
  }
};

 