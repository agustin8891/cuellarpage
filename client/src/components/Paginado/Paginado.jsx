import React from 'react';

export default function Paginado({productsPerPage, allProducts, paginado}) {
	const pageNumbers = []
	for (let i=0; i<Math.ceil(allProducts/productsPerPage); i++) {
		pageNumbers.push(i+1)
	}
	return (
		<div class="divPages">
			<nav class="navPages">
				<ul class="pagination">
					{ pageNumbers &&			
					pageNumbers.map(number => (
							<li className="page-item pageClassItem">
									<a className="page-link" onClick={() => paginado(number)}>{number}</a>
							</li>
					))}
				</ul>
			</nav>
		</div>
	)	
}