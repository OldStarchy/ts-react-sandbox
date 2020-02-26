import * as React from 'react';

interface PaginationProps {
	page: number;
}

const Pagination = (props: PaginationProps) => (
	<div className="pagination">
		<button className="pagination__btn-previous" type="button">
			Previous
		</button>
		<p className="pagination__page">{props.page}</p>
		<button className="pagination__btn-next" type="button">
			Next
		</button>
	</div>
);

export default Pagination;
