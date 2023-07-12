"use client"
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CreatePortfolioForm = () => {
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const newPortfolio = {
      name,
      dateCreated: new Date().toISOString(),
      role,
    };

    try {
      const response = await axios.post(
        'http://localhost:3333/portfolios',
        newPortfolio,
        config
      );

      // Handle the response as per your requirements
      console.log(response.data);

      // Redirect to /portfolio page with token as query parameter
      router.push(`/portfolio`);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <label className="block mb-4">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
        />
      </label>
      <br />
      <label className="block mb-4">
        Date Created: {new Date().toISOString()}
      </label>
      <br />
      <label className="block mb-4">
        Role:
        <select value={role} onChange={handleRoleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none">
          <option value="software engineer">Software Engineer</option>
          <option value="business analytics">Business Analytics</option>
          <option value="devops">DevOps</option>
          <option value="full stack engineer">Full Stack Engineer</option>
        </select>
      </label>
      <br />
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Portfolio
      </button>
    </form>
  );
};

export default CreatePortfolioForm;
