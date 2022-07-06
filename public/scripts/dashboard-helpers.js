const loadOrders = () => {
  $.get('/orders')
  .then((data) => {
    $('.main-page').empty();
    console.log(data.orders);
    renderOrderList(data.orders)
  })
};

const loadOrderDetails = () => {
  $.get('/order_items/:id')
  .then((data) => {
    $('.main-page').empty();
    console.log(data)
  })
};

const createOrderListItem = (customerOrder) => {
  let orderTotal = 0;
  let order =`
  <article class="order-list">

    <div class="order-item">
      <header id="order-header">Customer Orders</header>
        <div class="order-detail" id='order-detail'>
          <div class="order-amount" id='order-detail'>
            <div class="amount" id='order-id'>${customerOrder.id}</div>
          </div>
          <div class="item-name" id='order-customer'>${customerOrder.name}</div>
        </div>
    </div>
  </article>
  `

  return order
};

const renderOrderList = (data) => {
  for (let d of data) {
    let order = createOrderListItem(d);
    $('.main-page').prepend(order);
  };
};
