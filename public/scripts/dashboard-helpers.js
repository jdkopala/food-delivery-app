
const loadOrderDetails = (orderId) => {
  return $.get(`/order_items/${orderId}`)
  .then((data) => {
    return data.order_items;
  })
};


const createOrderListItem = async (customerOrder) => {
  let orderDetails = await loadOrderDetails(customerOrder.id)
  let status = `${customerOrder.status}`
  let orderTotal = 0;
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
      orderTotal += Number(d.price_cents)
      order += `
        <div class="cx-order-item">${d.name}</div>
      `
    }

  order += `<div class='cx-order-total'>TOTAL: $${orderTotal / 100}</div>`
  order +=`
    <div class="admin-order-button">
    `
    if (status === 'Confirmed') {
      order += `<button class="complete-order">Complete Order</button>`
    } else if (status === 'Pending') {
      order += `
      <button class="refuse-order">Decline Order</button>
      <button class="confirm-order">Confirm Order</button>
      <button class="complete-order">Complete Order</button>
      `
    }

    order += `
    </div>
    </div>
  </article>
  `
    console.log(order);
  return order
};

const createCustomerOrderListItem = async (customerOrder) => {
  let orderDetails = await loadOrderDetails(customerOrder.id)
  let orderTotal = 0;
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
      orderTotal += d.price_cents
      order += `
        <div class="cx-order-detail-namenprice">
          <div class="cx-order-item">${d.name}</div>
          <div class='cx-order-price'>$${d.price_cents / 100}</div>
        </div>
        `
    };

  order +=`
    <div class='cx-order-total'>TOTAL: $${orderTotal / 100}</div>
    </div>
  </article>
  `

  return order
};

const renderAdminOrderList = async (data) => {
  $('.main-page').append('<header id="order-header-info">Customer Orders</header>')
  for (let d of data) {
    await createOrderListItem(d)
    .then((data)=> {
      $('.main-page').append(data);
    })
  };
};

const renderCustomerOrderList = async (data) => {
  $('.main-page').append('<header id="order-header-info">Your Orders</header>')
  for (let d of data) {
    await createCustomerOrderListItem(d)
    .then((data)=> {
      $('.main-page').append(data);
    })
  };
};

const loadOrders = () => {
  $.get('/orders')
  .then((data) => {
    $('.main-page').empty()
    renderAdminOrderList(data.orders)
  })
};

const loadCustomerOrders = () => {
  $.get('/orders')
  .then((data) => {
    $('.main-page').empty()
    renderCustomerOrderList(data.orders)
  })
};
