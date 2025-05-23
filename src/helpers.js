export function formattedPrice(price) {
    let newPrice = parseInt(price);
    return newPrice.toLocaleString("tr-TR", {style:"currency", currency:"TRY"});
}