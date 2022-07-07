// Sends a GET request to load the details of an order by it's ID
const loadOrderDetails = (orderId) => {
  return $.get(`/order_items/${orderId}`)
  .then((data) => {
    return data.order_items;
  })
};

// Generate HTML to store and display the admin side dashboard
// Each listing is given buttons for the management of the order, and the items included
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

// This generates HTML for the customer side order dashboard
// Each order is giving it's own listing and slide out order details
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

// This function takes the list of orders from the database,
// and populates them using the admin side function to create HTML
const renderAdminOrderList = async (data) => {
  $('.main-page').append('<header id="order-header-info">Customer Orders</header>')
  for (let d of data) {
    await createOrderListItem(d)
    .then((data)=> {
      $('.main-page').append(data);
    })
  };
};

// This function takes the list of orders from the database,
// and populates them using the CUSTOMER dashboard HTML
const renderCustomerOrderList = async (data) => {
  $('.main-page').append('<header id="order-header-info">Your Orders</header>')
  for (let d of data) {
    await createCustomerOrderListItem(d)
    .then((data)=> {
      $('.main-page').append(data);
    })
  };
};

// This is the beginning of the admin dashboard function chain.
// It empties the main page, and repopulates it using the functions above for the admin dashboard
const loadOrders = () => {
  $.get('/orders')
  .then((data) => {
    $('.main-page').empty()
    renderAdminOrderList(data.orders)
  })
};

// This is the beginning of the customer dashboard function chain.
// It empties the main page, and repopulates it using the functions above for the customer dashboard
const loadCustomerOrders = () => {
  $.get('/orders')
  .then((data) => {
    $('.main-page').empty()
    renderCustomerOrderList(data.orders)
  })
};
