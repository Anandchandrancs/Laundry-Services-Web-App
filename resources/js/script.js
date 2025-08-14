const servicesData = [
    { name: "Dry Cleaning", price: 200, icon: "👗" },
    { name: "Wash & Fold", price: 100, icon: "🧺" },
    { name: "Ironing", price: 30, icon: "🧴" },
    { name: "Stain Removal", price: 500, icon: "🧼" },
    { name: "Leather & Suede Cleaning", price: 999, icon: "🧤" },
    { name: "Wedding Dress Cleaning", price: 2800, icon: "💍" }
];

let cart = [];

function renderServices() {
    const servicesContainer = document.getElementById("services");
    servicesContainer.innerHTML = "";
    servicesData.forEach((service, index) => {
        const inCart = cart.find(item => item.name === service.name);
        servicesContainer.innerHTML += `
            <div class="service">
                <span class="service-name">${service.icon} ${service.name}</span>
                <span class="service-price">₹${service.price.toFixed(2)}</span>
                <button class="btn ${inCart ? 'remove-btn' : 'add-btn'}" onclick="toggleCart(${index})">
                    ${inCart ? '<span>Remove Item</span> <span>⊝</span>' 
                        : '<span>Add Item</span> <span>⊕</span>'}
                </button>
            </div>
        `;
    });
}

function renderCart() {
    const cartContainer = document.getElementById("cart");
    const totalAmountElement = document.getElementById("totalAmount");
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "";
    } else {
        cartContainer.innerHTML = `
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <th style="text-align:left; padding:8px; font-size: 0.8rem;">S.No</th>
                        <th style="text-align:left; padding:8px; font-size: 0.8rem;">Service Name</th>
                        <th style="text-align:right; padding:8px; font-size: 0.8rem;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map((item, idx) => {
                        total += item.price;
                        return `
                            <tr>
                                <td style="padding:8px; font-size: 0.7rem; color: #aeadad;">${idx + 1}</td>
                                <td style="padding:8px; font-size: 0.7rem; color: #aeadad;">${item.name}</td>
                                <td style="padding:8px; font-size: 0.7rem; color: #aeadad; text-align:right;">₹${item.price.toFixed(2)}</td>
                            </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        `;
    }
    totalAmountElement.textContent = total.toFixed(2);
    renderServices(); // refresh services to update button labels
}

function toggleCart(index) {
    const service = servicesData[index];
    const inCartIndex = cart.findIndex(item => item.name === service.name);

    if (inCartIndex > -1) {
        cart.splice(inCartIndex, 1);
    } else {
        cart.push(service);
    }
    renderCart();
}

function bookNow() {
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const total = document.getElementById("totalAmount").textContent;

    if (!name || !email || !phone) {
        alert("Please fill all details before booking.");
        return;
    }
    document.getElementById("confirmationMessage").textContent =
        `Thank you for booking, ${name}! Your total amount is ₹${total}. We will get back to you soon!`;

    // Clear the cart and form
    cart = [];
    renderCart();
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    
}

renderServices();