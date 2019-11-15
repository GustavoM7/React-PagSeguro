const callPagSeguro = (carrinho, comprador, frete) =>{
    let pag, pagseguro;
    pagseguro = require('pagseguro');
    //Configurações do vendedor
    pag = new pagseguro({
        email: 'gustavosmarquesf@gmail.com',
        token: '695040B1D32F4F008D776C6A9032CB3A',
        mode : 'sandbox',
    });

    //Configurando moeda e gerando referência da compra
    pag.currency('BRL');
    let ref = Math.random() * 10000;
    pag.reference(ref);

    carrinho.forEach(produto => {
        pag.addItem({
            id: produto.id,
            description: produto.titulo,
            amount: produto.preco,
            quantity: produto.qtd,
            weight: produto.peso
        });
    });

    //Configurando as informações do comprador
    pag.buyer({
        name: comprador.name,
        email: comprador.email,
        phoneAreaCode: comprador.phoneAreaCode,
        phoneNumber: comprador.phoneNumber
    });
     
    //Configurando a entrega do pedido
    pag.shipping({
        type: 1,
        street: frete.street,
        number: frete.number,
        complement: frete.complement,
        district: frete.district,
        postalCode: frete.postalCode,
        city: frete.city,
        state: frete.state,
        country: frete.country,
    });
     
    //Configuranto URLs de retorno e de notificação
    pag.setRedirectURL("http://localhost:3000");
    pag.setNotificationURL("http://localhost:3000");
    
    //Enviando o xml ao pagseguro
    pag.send(function(err, res) {
        if (err) {
            return err;
        }
        return res;
    });

}

export default callPagSeguro;