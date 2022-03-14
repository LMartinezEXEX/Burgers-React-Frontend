import "../assets/css/CouponTable.css";
import CouponToAdministrate from "./CouponToAdministrate";

const CouponTable = (props) => {

    return (
        <table className="coupon-table">
            <thead>
                <tr>
                    <th>COUPON</th>
                    <th>DISCOUNT</th>
                    <th>FROM</th>
                    <th>TO</th>
                </tr>
            </thead>
            <tbody>
                {props.coupons.map((coupon, _) => {
                    return (
                        <CouponToAdministrate 
                            code={coupon.code}
                            discount={coupon.discount}
                            createdAt={coupon.createdAt}
                            availableUntil={coupon.availableUntil}
                        />
                    )
                })}
            </tbody>
        </table>
    )
};

export default CouponTable;