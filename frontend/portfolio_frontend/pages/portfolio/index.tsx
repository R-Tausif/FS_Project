import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Portfolio {
  id: number;
  user_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const router = useRouter();

  const redirect = () => {
    router.push("/forms");
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchPortfolios = async () => {
      try {
        const response = await axios.get('http://localhost:3333/portfolios', config);
        setPortfolios(response.data.portfolio);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPortfolios();
  }, []);

  const handleRowClick = (id: number) => {
    setSelectedRow(id);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (selectedRow) {
      try {
        await axios.delete(`http://localhost:3333/portfolios/${selectedRow}`, config);
        // Remove the deleted portfolio from the list
        setPortfolios((prevPortfolios) =>
          prevPortfolios.filter(
            (portfolio) => portfolio.id !== selectedRow
          )
        );
        setSelectedRow(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={redirect}
      >
        Create Portfolio
      </button>
      <table className="mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Portfolio ID</th>
            <th className="px-4 py-2">Portfolio Name</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Modified Last</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map((portfolio) => (
            <tr
              key={portfolio.id}
              onClick={() => handleRowClick(portfolio.id)}
              className={
                selectedRow === portfolio.id
                  ? 'bg-lightblue cursor-pointer'
                  : 'cursor-pointer'
              }
            >
              <td className="px-4 py-2">{portfolio.id}</td>
              <td className="px-4 py-2">{portfolio.name}</td>
              <td className="px-4 py-2">{portfolio.created_at}</td>
              <td className="px-4 py-2">{portfolio.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRow && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleDelete}
        >
          Delete Selected Portfolio
        </button>
      )}
    </div>
  );
};

export default PortfolioList;
