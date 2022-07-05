
const generateCart = (currentOrder) => {
  let orderTotal = 0;
  let prepTime = 0;
  $('.main-page').empty();
  for (let d of currentOrder) {
    prepTime += d.prep_time_minutes;
  }
  let checkout =`
  <article class="checkout-content">

    <div class="error-msg">
      <div class ="error-display">
        <i class="fa-solid fa-triangle-exclamation fa-fade" id="warning-icon"></i>
        <p class ="warning-msg"></p>
      </div>
    </div>

    <div class="place-order">
        <p class ="place-order-msg"></p>
    </div>

    <div class="prep-time-checkout">
      <i class="fa-solid fa-clock" id="clock"></i>
      <div >Estimated Total Preparation Time: ${prepTime} mins</div>
    </div>

    <div class="order-item">
      <header id="order-header">Your items</header>

      `
      for (let d of currentOrder) {
        let orderItem = `
        <div class="order-detail" id='order-detail'>
          <div class="order-amount" id='order-detail'>
            <i class="fa-solid fa-circle-minus" id='order-detail'></i>
            <div class="amount" id='order-detail'>1</div>
            <i class="fa-solid fa-circle-plus" id='order-detail'></i>
          </div>
          <div class="item-name" id='order-detail'>${d.name}</div>
          <div class="dollar-amount" id='order-detail'>$${d.price_cents / 100}</div>
        </div>
        `
        orderTotal += d.price_cents;
        checkout += orderItem;
      }

  checkout +=`
    </div>


    <div class="order-total">Order Total $${orderTotal / 100}</div>

    <a href='#' id="checkout-button">Place your order</a>
  </article>
  `

  $('.main-page').append(checkout);
};

const generateSMS = (currentOrder) => {
  let prepTime = 0;
  let orderTotal = 0;
  let messageToCustomer =''
  for (let d of currentOrder) {
    prepTime += d.prep_time_minutes;
    orderTotal += d.price_cents;
  }
  messageToCustomer += `Thank you for placing your order at Happy Eats! Your total is $${orderTotal/100} and your order will be ready for pickup in approximately ${prepTime} minutes. Please pay for your order when you come to pick it up, thank you!`
  return messageToCustomer;


};
