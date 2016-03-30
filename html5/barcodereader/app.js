var barcodeReader;
requirejs(['BarcodeReader'],
function(BarcodeReader) {
  debugger;
  barcodeReader = BarcodeReader;
  $('#container').barcodeReader({}, barcodeReader);
});
