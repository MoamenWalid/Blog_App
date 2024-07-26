import { useState } from "react";
import Pagination from "react-js-pagination";
import './pagination_posts.scss';

const Paginations = ({ totalItemsCount, setOnPageChange }) => {
  const [pagination, setPagination] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPagination(pageNumber);
    setOnPageChange(pageNumber);
  }

  return (
    <>
      <Pagination
        activePage={ pagination }
        itemsCountPerPage={ 1 }
        totalItemsCount={ totalItemsCount }
        pageRangeDisplayed={ 5 }
        onChange={ handlePageChange }
      />
    </>
  );
}

export default Paginations;
