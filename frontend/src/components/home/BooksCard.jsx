import React from "react";

import BookSingleCard from "./BookSingleCard";

const BooksCard = ({books}) => {
    return(
        
    <div className="grid sm:grid-cols-2 lg:gride-cols-3 xl:grid-cols-4">
        {books.map((item)=>(
            <BookSingleCard key={item._it} books={item}/>
        ))}
    </div>
    )
}
export default BooksCard;