
export function HandleTotalSum(props, type) {
  // Product
  let ProductSaleAmount = 0.0
  // Credit party
  let TotalCreditPetrol = 0.0
  let TotalCreditDiesel = 0.0
  let TotalCreditPetrolAmount = 0.0
  let TotalCreditDieselAmount = 0.0
  let TotalCreditPartyAmount = 0.0
  // Nozzle
  let TotalNozzlePetrol = 0.0
  let TotalNozzlePetrolAmount = 0.0
  let TotalNozzleDiesel = 0.0
  let TotalNozzleDieselAmount = 0.0
  let TotalNozzleAmount = 0.0
  
  props?.map((item, index) => {
    // Total product sale
    if (type === 'product') {
      ProductSaleAmount += parseFloat(item.amount || 0)
    }
    // Credit Party
    if (type === 'creditparty') {
      if (item.product === 'MS') {
        TotalCreditPetrol += parseInt(item.qty || 0, 10)
        TotalCreditPetrolAmount += parseInt(item.amount || 0, 10)
      } else {
        TotalCreditDiesel += parseInt(item.qty || 0, 10)
        TotalCreditDieselAmount += parseInt(item.amount || 0, 10)
      }
      TotalCreditPartyAmount += parseFloat(item.amount || 0)
    }
    // Nozzle
    if (type === 'nozzle') {
      if (item.tankType === 'MS') {
        TotalNozzlePetrol += parseInt(item.totalSale || 0)
        TotalNozzlePetrolAmount += parseInt(item.amount || 0)
      } else {
        TotalNozzleDiesel += parseInt(item.totalSale || 0)
        TotalNozzleDieselAmount += parseInt(item.amount || 0)
      }
      TotalNozzleAmount += parseFloat(item.amount || 0)
    }
  });
  const nozzle = { TotalNozzlePetrol, TotalNozzlePetrolAmount, TotalNozzleDiesel, TotalNozzleDieselAmount, TotalNozzleAmount }
  const product = { ProductSaleAmount }
  const creditParty = { TotalCreditPetrol, TotalCreditPetrolAmount, TotalCreditDiesel, TotalCreditDieselAmount, TotalCreditPartyAmount }
  return { product, creditParty, nozzle };
}
