import * as React from 'react';
import './Pagination.scss';

interface PaginationProps {
	page: number;
	pageCount: number;
	onSwitchPage: (newPage: number) => void;
}

const Pagination = ({ page, pageCount, onSwitchPage }: PaginationProps) => (
	<div className="pagination">
		<button
			className="pagination__btn-previous"
			type="button"
			disabled={page <= 1}
			onClick={
				page > 1
					? () => {
							onSwitchPage(page - 1);
					  }
					: null
			}
		>
			Previous
		</button>
		<p className="pagination__page">
			{page} / {pageCount}
		</p>
		<button
			className="pagination__btn-next"
			type="button"
			disabled={page >= pageCount}
			onClick={
				page < pageCount
					? () => {
							onSwitchPage(page + 1);
					  }
					: null
			}
		>
			Next
		</button>
	</div>
);

export default Pagination;
