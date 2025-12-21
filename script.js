const eventType = document.getElementById('eventType');
const size = document.getElementById('size');
const delivery = document.getElementById('delivery');
const priceEl = document.getElementById('price');


function calculatePrice() {
  let price = 0;


  if (eventType.value === 'birthday') price += 150;
  if (eventType.value === 'wedding') price += 300;
  if (eventType.value === 'corporate') price += 250;


  if (size.value === 'small') price += 100;
  if (size.value === 'medium') price += 200;
  if (size.value === 'large') price += 350;


  if (delivery.checked) price += 50;


  priceEl.textContent = `$${price}`;
}


[eventType, size, delivery].forEach(el =>
  el.addEventListener('change', calculatePrice)
);


calculatePrice();