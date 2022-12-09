import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
	const [data, setData] = useState([]);

	const fetchData = async () => {
		const response = await axios.get(endpoint);
		setData(response.data);
	};

	useEffect(() => {
		try {
			fetchData();
		} catch (error) {
			console.error(error);
		}
	}, [endpoint]);

	return data;
};

export default useFetch;
