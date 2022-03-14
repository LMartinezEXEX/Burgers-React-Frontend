import "../assets/css/CouponToAdministrate.css";

const CouponToAdministrate = (props) => {

    const createdAtData = displayDateTime(props.createdAt);
    const availableUntilData = displayDateTime(props.availableUntil);

    function displayDateTime(dateTime) {
        const year = dateTime.substring(0,4)
        console.log("year", year)

        const month = dateTime.substring(5,7)
        console.log("month", month)

        const day = dateTime.substring(8,10)
        console.log("day", day)

        const hour = dateTime.substring(11, 13)
        console.log("hour", hour)

        const minute = dateTime.substring(14,16)
        console.log("minute", minute)

        return [day + "/" + month + "/"  + year, hour + ":" + minute];
    }

    return (
        <tr className="coupon">
            <td className="code">{ props.code }</td>
            <td className="discount">${ props.discount }</td>
            <td className="createdAt">{ createdAtData[0] } <span>{ createdAtData[1] }</span></td>
            <td className="availableUntil">{ availableUntilData[0] } <span>{ availableUntilData[1] }</span></td>
        </tr>
    )
};

export default CouponToAdministrate;