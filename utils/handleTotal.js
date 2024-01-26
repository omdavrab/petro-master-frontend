 // Total
 let TotalPetrol = 0.0
 let TotalDiesel = 0.0
 let TotalPetrolAmount = 0.0
 let TotalDieselAmount = 0.0
 let TotalAmount = 0.0
 
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
    console.log("🚀 ~ props?.map ~ item:", item)
    // Total product sale
    if (type === 'product') {
      ProductSaleAmount += parseInt(item.amount, 10)
    }
    // Credit Party
    if (type === 'creditparty') {
      if (item.product === 'MS') {
        TotalCreditPetrol += parseInt(item.qty, 10)
        TotalCreditPetrolAmount += parseInt(item.amount, 10)
      } else {
        TotalCreditDiesel += parseInt(item.qty, 10)
        TotalCreditDieselAmount += parseInt(item.amount, 10)
      }
      TotalCreditPartyAmount += parseInt(item.amount, 10)
    }
    // Nozzle
    if (type === 'nozzle') {
      if (item.tankType === 'MS') {
        TotalNozzlePetrol += parseInt(item.totalSale)
        TotalNozzlePetrolAmount += parseInt(item.amount)
      } else {
        TotalNozzleDiesel += parseInt(item.totalSale)
        TotalNozzleDieselAmount += parseInt(item.amount)
      }
      TotalNozzleAmount += parseInt(item.amount)
    }
    // Total
    TotalPetrol = TotalNozzlePetrol + TotalCreditPetrol
    TotalDiesel = TotalNozzleDiesel + TotalCreditDiesel 
    TotalPetrolAmount =  TotalNozzlePetrolAmount + TotalCreditPetrolAmount
    TotalDieselAmount = TotalNozzleDieselAmount + TotalCreditDieselAmount
    TotalAmount = TotalNozzleAmount + TotalCreditPartyAmount
  });
  const Total = { TotalPetrol, TotalDiesel, TotalPetrolAmount, TotalDieselAmount, TotalAmount }
  const nozzle = { TotalNozzlePetrol, TotalNozzlePetrolAmount, TotalNozzleDiesel, TotalNozzleDieselAmount, TotalNozzleAmount }
  const product = { ProductSaleAmount }
  const creditParty = { TotalCreditPetrol, TotalCreditPetrolAmount, TotalCreditDiesel, TotalCreditDieselAmount, TotalCreditPartyAmount }
  return { product, creditParty, nozzle, Total };
}
