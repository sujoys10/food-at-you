import React, { lazy, memo } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = lazy(() => import('./ItemCard'));

const Section = memo(function({ title, items }){
    return(
        <div className="section">
            <div className="section__header">
                <p className="section__title">{title}</p>
            </div>
            { items &&
                <div className="section__cardbox">
                    {items.map(item => 
                        <Link 
                            className="section__cardLink"
                            to={`/item/${item.id}`}
                            key={item.id}
                        >
                        <ItemCard item={item} />   
                        </Link>
                    )}
                </div>
            }
        </div>
    )
})

export default Section;