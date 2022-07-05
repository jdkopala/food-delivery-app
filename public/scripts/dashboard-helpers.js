const generateOrderList = () => {
  let orderTotal = 0;
  $('.main-page').empty();
  for (let d of currentOrder) {
  }
  let orderList =`
  <article class="checkout-content">

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
