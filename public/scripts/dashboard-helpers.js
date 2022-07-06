const loadOrders = () => {
  $.get('/orders')
  .then((data) => {
    $('.main-page').empty();
    renderOrderList(data.orders)
  })
};

const loadOrderDetails = (orderId) => {
  return $.get(`/order_items/${orderId}`)
  .then((data) => {
    return data.order_items;
  })
};

const createOrderListItem = async (customerOrder) => {
  let orderDetails = await loadOrderDetails(customerOrder.id)
  let status = `${customerOrder.status}`
  let order =`
  <article class="order-list">
    <div class="order-item">
      <div class="order-detail" id='order-detail-info'>
          <div class="order-id-detail" id='order-detail'>
            <div class="amount" id='order-id'>${customerOrder.id}</div>
          </div>

          <div class="item-name" id='order-customer'>${customerOrder.name}</div>
          <div class="" id="order-status">${customerOrder.status}</div>
          <a href='#' class="order-detail-button">Order Details</a>
      </div>
    </div>
    <div class="cx-order-detail">
    `

    for (let d of orderDetails) {
      order += `
        <div class="cx-order-item">${d.name}</div>
      `
    }

  order +=`
    <div class="admin-order-button">
    `
    if (status === 'Confirmed') {
      order += `<button class="complete-order">Complete Order</button>`
    } else if (status === 'Pending')
      order += `
        <button class="refuse-order">Decline Order</button>
        <button class="confirm-order">Confirm Order</button>
        <button class="complete-order">Complete Order</button>
        `
    order += `
    </div>
    </div>
  </article>
  `

  return order
};

const renderOrderList = (data) => {
  $('.main-page').append('<header id="order-header-info">Customer Orders</header>')
  for (let d of data) {
    createOrderListItem(d)
    .then((data)=> {
      $('.main-page').append(data);
    })
  };
};
