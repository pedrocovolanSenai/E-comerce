function adicionarAoCarrinho(item) {
        // Verifica se o carrinho existe no localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
       
        // Encontra ou adiciona o item no carrinho
        const existingItemIndex = cart.findIndex(i => i.nome === item.nome);
        if (existingItemIndex >= 0) {
            // Item já existe, aumenta a quantidade
            cart[existingItemIndex].quantidade += 1;
        } else {
            // Item novo, adiciona ao carrinho
            cart.push({...item, quantidade: 1});
        }
       
        // Atualiza o carrinho no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
       
        // Atualiza o carrinho na tela
        updateCart();
    }
    
    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = ''; // Limpa o carrinho
       
        cart.forEach(item => {
            const row = document.createElement('tr');
           
            const productCell = document.createElement('td');
            productCell.textContent = item.nome;
            row.appendChild(productCell);
           
            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantidade;
            row.appendChild(quantityCell);
           
            const priceCell = document.createElement('td');
            priceCell.textContent = `R$${(item.preco * item.quantidade).toFixed(2)}`;
            row.appendChild(priceCell);
           
            const subtotalCell = document.createElement('td');
            subtotalCell.textContent = `R$${item.preco.toFixed(2)}`;
            row.appendChild(subtotalCell);
           
            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = '<button onclick="removeFromCart(\'' + item.nome + '\')">Remover</button>';
            row.appendChild(actionsCell);
           
            cartContainer.appendChild(row);
        });
       
        document.getElementById('cart-total').textContent = `R$${cart.reduce((acc, item) => acc + (item.preco * item.quantidade), 0).toFixed(2)}`;
    }
    
    function removeFromCart(name) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.nome!== name);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        updateCart();
    });

  

