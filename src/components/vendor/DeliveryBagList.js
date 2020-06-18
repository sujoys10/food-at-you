import React, { memo, Fragment, lazy, Suspense } from 'react';
import Spinner from '../Spinner';
const DeliveryBag = lazy(() => import('./DeliveryBag')) ;


const DeliveryBagList = memo(function ({bags}){
    return(
        <Suspense fallback={<Spinner />}>
            <Fragment>
                { bags.length === 0 ?
                        <div className="msg">No Orders Yet</div>
                        :(
                            <div className="deliverybagList">
                                { bags.map(bag => 
                                    <DeliveryBag key={bag.id} bag={bag}/>    
                                )}
                            </div>
                        )
                }
            </Fragment>
        </Suspense>
    )
})

export default DeliveryBagList;