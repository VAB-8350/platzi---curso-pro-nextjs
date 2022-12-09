import React, { useEffect, useState } from 'react';
import FormProduct from '@components/FormProduct';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';

export default function Edit() {
	const router = useRouter();
	const [product, setProduct] = useState([]);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		const { id } = router.query;

		id && getProduct(id);
	}, [router?.isReady]);

	// Methods
	async function getProduct(id) {
		try {
			const response = await axios.get(endPoints.products.getProduct(id));
			console.log(response.data);

			if (response.status === 200) {
				setProduct(response.data);
			}
		} catch (error) {
			console.error(error);
			setNotFound(true);
		}
	}

	return notFound ? (
		<div className="flex justify-center">
			<p className="text-red-500">Product Not Found</p>
		</div>
	) : (
		<FormProduct product={product} />
	);
}
