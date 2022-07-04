const generateCart = (currentOrder) => {
  let orderTotal = 0;
  $('.main-page').empty();
  let checkout =`
  <article class="checkout-content">
    <div class="prep-time">
      <i class="fa-solid fa-clock" id="clock"></i>
      <!-- <i class="fa-solid fa-kitchen-set"></i> -->
      <div >Estimated Total Preperation Time: 40 Minutes</div>
    </div>

    <div class="order-item">
      <header id="order-header">Your items</header>

      <div class="order-detail">
        <div class="order-amount">
          <i class="fa-solid fa-circle-minus"></i>
          <div class="amount">2</div>
          <i class="fa-solid fa-circle-plus"></i>
        </div>
        <div class="item-name">Breakfast Sandwich</div>
        <div class="dollar-amount">$19.98</div>
      </div>

      <div class="order-detail">
        <div class="order-amount">
          <i class="fa-solid fa-circle-minus" ></i>
          <div class="amount">1</div>
          <i class="fa-solid fa-circle-plus"></i>

        </div>
        <div class="item-name">Clubhouse</div>
        <div class="dollar-amount">$14.99</div>
      </div>

      <div class="order-detail">
        <div class="order-amount">
          <i class="fa-solid fa-circle-minus"></i>
          <div class="amount">1</div>
          <i class="fa-solid fa-circle-plus"></i>
        </div>
        <div class="item-name">Poutine</div>
        <div class="dollar-amount">$11.99</div>
      </div>
      `
      for (let d of currentOrder) {
        let orderItem = `
        <div class="order-detail" id='order-detail-${currentOrder.id}'>
          <div class="order-amount" id='order-detail-${currentOrder.id}'>
            <i class="fa-solid fa-circle-minus" id='order-detail-${currentOrder.id}'></i>
            <div class="amount" id='order-detail-${currentOrder.id}'>1</div>
            <i class="fa-solid fa-circle-plus" id='order-detail-${currentOrder.id}'></i>
          </div>
          <div class="item-name" id='order-detail-${currentOrder.id}'>${currentOrder.name}</div>
          <div class="dollar-amount" id='order-detail-${currentOrder.id}'>$${currentOrder.price_cents / 100}</div>
        </div>
        `
        orderTotal += currentOrder.price_cents
        checkout += orderItem;
      }

  checkout +=`
    </div>


    <div class="order-total">Order Total $${orderTotal / 100}</div>

    <div id="checkout-button">Checkout</div>
  </article>
  `

  $('.main-page').append(checkout);
};
