module.exports = function getProductHtml (product, curr){
    let output = product.replace('{{%Brand%}}', curr.brand)
    output = output.replace('{{%Name%}}', curr.name)
    output = output.replace('{{%Name%}}', curr.name)
    output = output.replace('{{%Price%}}', curr.price)
    output = output.replace('{{%Description%}}', curr.description)
    output = output.replace('{{%Specifications%}}', Object.entries(curr.specs))
    output = output.replace('{{%Availability%}}', curr.availability)
    output = output.replace('{{%Colors%}}', curr.colorsAvailable);
    output = output.replace('{{%id%}}', curr.id);
    // output = output.replace('{{%Colors%}}', curr.colorsAvailable);
    return output;
}
