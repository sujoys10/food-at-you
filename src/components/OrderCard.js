import React, { lazy } from "react";
import { getLocalDate } from "../utils/date";

const OrderBag = lazy(() => import("./OrderBag"));

export default function OrderCard({
  order: { total, vendor, customer, order_date, order_bags },
}) {
  return (
    <div className="orderCard">
      <div className="orderCard__info">
        <div>
          {!!vendor ? (
            <div className="orderCard__user">
              <i className="material-icons">store</i>
              <p>{vendor.name}</p>
            </div>
          ) : (
            <div className="orderCard__user">
              <i className="material-icons">person</i>
              <p>{customer.name}</p>
            </div>
          )}

          <div>
            <span className="orderCard__subtitle">Ordered On</span>
            <p className="orderCard__content">{getLocalDate(order_date)}</p>
          </div>
        </div>
        <div>
          <span className="orderCard__subtitle">Amount</span>
          <p className="orderCard__content total">&#8377;{total}</p>
        </div>
      </div>
      <hr className="hr"></hr>

      <div className="orderCard_items">
        <p className="orderCard__title">Order Bags</p>
        <div>
          {order_bags.length !== 0 &&
            order_bags.map((bag) => <OrderBag key={bag.id} bag={bag} />)}
        </div>
      </div>
    </div>
  );
}
