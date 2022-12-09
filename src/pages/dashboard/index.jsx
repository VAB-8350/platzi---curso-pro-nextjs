import axios from 'axios';
import { XCircleIcon } from '@heroicons/react/20/solid';
import endPoints from '@services/api';
import { useState, useEffect } from 'react';
import { Chart } from '@common/Chart.js';
import Link from 'next/link';
import useAlert from '@hooks/useAlert';
import { deleteProduct } from '@services/api/products';
import Alert from '@common/Alert';

const PRODUCT_LIMIT = 5;

export default function Dashboard() {
	const [PRODUCT_OFFSET, setPRODUCT_OFFSET] = useState(0);
	const [products, setProducts] = useState([]);
	const { alert, setAlert, toggleAlert } = useAlert();

	useEffect(() => {
		async function getProducts() {
			const response = await axios.get(
				endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET)
			);
			setProducts(response.data);
		}

		getProducts();
	}, [alert, PRODUCT_OFFSET]);

	const categoryNames = products?.map((product) => product.category);
	const categoryCount = categoryNames?.map((category) => category.name);

	const countOccurrences = (arr) =>
		arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

	const data = {
		datasets: [
			{
				label: 'categories',
				data: countOccurrences(categoryCount),
				borderWidth: 2,
				backgroundColor: [
					'#ffbb11',
					'#c0c0c0',
					'#50af95',
					'#f3ba2f',
					'#2a71d0',
				],
			},
		],
	};

	const handleDelete = (id) => {
		deleteProduct(id)
			.then(() => {
				setAlert({
					active: true,
					message: 'Delete product successfully',
					type: 'success',
					autoClose: true,
				});
			})
			.catch((error) => {
				setAlert({
					active: true,
					message: error.message,
					type: 'error',
					autoClose: true,
				});
			});
	};

	return (
		<>
			<Chart className="mb-8 mt-2" chartData={data} />
			<Alert alert={alert} handleClose={toggleAlert} />
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Category
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											price
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											id
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{products.map((product, index) => (
										<tr key={index}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<img
															className="h-10 w-10 rounded-full"
															src={product.images[0]}
															alt=""
														/>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{product.title}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													{product.category.name}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{product.price}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{product.id}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<Link
													href={`/dashboard/edit/${product.id}`}
													className="text-indigo-600 hover:text-indigo-900"
												>
													Edit
												</Link>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<XCircleIcon
													aria-hidden="true"
													onClick={() => handleDelete(product.id)}
													className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer"
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="flex justify-around mt-8">
					{PRODUCT_OFFSET >= PRODUCT_LIMIT && (
						<button
							className="bg-red-300 rounded p-3 text-gray-800"
							onClick={() => {
								setPRODUCT_OFFSET(PRODUCT_OFFSET - PRODUCT_LIMIT);
							}}
						>
							{'< previus page'}
						</button>
					)}
					<button
						className="bg-green-300 rounded p-3 text-gray-800"
						onClick={() => setPRODUCT_OFFSET(PRODUCT_OFFSET + PRODUCT_LIMIT)}
					>
						{'next page >'}
					</button>
				</div>
			</div>
		</>
	);
}
