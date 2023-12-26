export function HandleTotal(props) {
  let QuntitySum = 0.0;
  let PriceSum = 0.0;

  props?.map((item, index) => {
    // QTY sum
    QuntitySum = parseInt(item.QTY) + parseInt(QuntitySum);

    // Price sum
    PriceSum = parseInt(PriceSum) + parseInt(item.price) * parseInt(item.QTY);
  });

  return { PriceSum, QuntitySum };
}
