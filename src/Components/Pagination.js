const Pagination = ({ postsPerPage, totalPosts, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((page) => {
          return (
            <li
              onClick={() => {
                setCurrentPage(page);
              }}
              key={page}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
