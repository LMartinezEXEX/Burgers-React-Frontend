import CouponTable from "./CouponTable";
import NewCouponForm from "./NewCouponForm";

import "../assets/css/CouponAdministrator.css";
import { useEffect, useState } from "react";
import coupon_service from "../services/coupon_service";

const CouponAdministrator = (props) => {

    const [coupons, setCoupons] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        coupon_service.getAll().then((response) => {
            setCoupons(response.data);
            console.log(response.data)
        });
    },[]);

    useEffect(() => {
        coupon_service.getAll().then((response) => {
            setCoupons(response.data);
        });
    }, [reload])

    function handleSubmitForm() {
        setReload(!reload);
    }

    return (
        <section className="coupon">
            <NewCouponForm  afterSubmit={handleSubmitForm}/>

            <CouponTable  coupons={coupons}/>
        </section>
    )
};

export default CouponAdministrator;