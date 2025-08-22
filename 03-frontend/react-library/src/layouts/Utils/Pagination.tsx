export const Pagination: React.FC<{currentPage: number,
    totalPages: number,
    paginate: any}> = (props) => {

        const pageNumbers = [];

        if (props.currentPage === 1 ){
        pageNumbers.push(props.currentPage);               // [1]
        if (props.totalPages >= props.currentPage){
            pageNumbers.push(props.currentPage + 1);         // [1,2]（如果存在）
        }
        if (props.totalPages >= props.currentPage + 2){
            pageNumbers.push(props.currentPage + 2);         // [1,2,3]（如果存在）
        }
        } else if (props.currentPage >= 1){
        if (props.currentPage >= 3 ){
            pageNumbers.push(props.currentPage - 2);         // [..., 当前-2]
            pageNumbers.push(props.currentPage - 1);         // [..., 当前-1]
        } else {
            pageNumbers.push(props.currentPage - 1);         // 当前=2 时只加 1
        }

        pageNumbers.push(props.currentPage);               // 加上当前页

        if (props.totalPages >= props.currentPage + 1){
            pageNumbers.push(props.currentPage + 1);         // 当前+1
        }
        if (props.totalPages >= props.currentPage + 2){
            pageNumbers.push(props.currentPage + 2);         // 当前+2
        }
}
        

        return(
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item" onClick={() => props.paginate(1)}>
                        <button className="page-link">
                            First Page
                        </button>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} onClick={() => props.paginate(number)}
                            className={'page-item' + (props.currentPage === number ? 'active' : '')}>
                                <button className="page-link">
                                    {number}
                                </button>
                        </li>
                    ))}
                    <li className='page-item' onClick={() => props.paginate(props.totalPages)}>
                        <button className="page-link">
                            Last Page
                        </button>
                    </li>
                </ul>
            </nav>
        );
    }


//逻辑目标：最多显示 5 个按钮，围绕当前页展开，并且不超过总页数的边界。
// 当前页=1：显示 [1,2,3]（如果有）
// 当前页=2：显示 [1,2,3,4]（如果有）
// 当前页≥3：显示 [当前-2, 当前-1, 当前, 当前+1, 当前+2]（按存在与否裁剪）