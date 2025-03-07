document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".product-checkbox");
    const quantities = document.querySelectorAll(".quantity");
    const totalPriceEl = document.getElementById("totalPrice");
    const orderForm = document.getElementById("orderForm");
    const orderSummary = document.getElementById("orderSummary");

    let total = 0;

    // Xử lý chọn sản phẩm
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                quantities[index].disabled = false;
            } else {
                quantities[index].disabled = true;
                quantities[index].value = 1;
            }
            calculateTotal();
        });
    });

    // Xử lý thay đổi số lượng
    quantities.forEach((quantity) => {
        quantity.addEventListener("input", calculateTotal);
    });

    // Tính tổng tiền
    function calculateTotal() {
        total = 0;
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                let price = parseInt(checkbox.getAttribute("data-price"));
                let quantity = parseInt(quantities[index].value);
                total += price * quantity;
            }
        });
        totalPriceEl.textContent = total.toLocaleString();
    }

    // Xử lý đặt hàng
    orderForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let paymentMethod = document.getElementById("paymentMethod").value;

        let orderDetails = "<h3>🛍 Đơn Hàng Của Bạn</h3>";
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                let productName = checkbox.getAttribute("data-name");
                let quantity = quantities[index].value;
                orderDetails += `<p>${productName} - Số lượng: ${quantity}</p>`;
            }
        });

        orderDetails += `<p><strong>Tổng tiền:</strong> ${total.toLocaleString()}đ</p>`;
        orderDetails += `<p><strong>Khách hàng:</strong> ${name}</p>`;
        orderDetails += `<p><strong>SDT:</strong> ${phone}</p>`;
        orderDetails += `<p><strong>Địa chỉ:</strong> ${address}</p>`;
        orderDetails += `<p><strong>Thanh toán:</strong> ${paymentMethod}</p>`;

        orderSummary.innerHTML = orderDetails;
    });
});
