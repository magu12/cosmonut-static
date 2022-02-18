$(document).ready(function($) {
    $.cookie.raw = true;
    $.cookie.json = true;
    if ($.cookie("basket")) {
        $('.shopping-cart').attr('attr-prod-count', Object.keys(JSON.parse($.cookie("basket"))).length);
        console.log(JSON.parse($.cookie('basket')));
    }

    window.addEventListener('mousemove', function(e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        $('.main-paralax img').eq(0).css('transform', 'translate(-' + x * 20 + 'px, -' + y * 50 + 'px)');
        $('.main-paralax img').eq(1).css('transform', 'translate(-' + x * 5 + 'px, -' + y * 20 + 'px)');
        $('.main-paralax img').eq(2).css('transform', 'translate(-' + x * 10 + 'px, -' + y * 60 + 'px)');
        $('.main-paralax img').eq(3).css('transform', 'translate(-' + x * 25 + 'px, -' + y * 50 + 'px)');
        $('.main-paralax img').eq(4).css('transform', 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)');
        $('.main-paralax img').eq(5).css('transform', 'translate(-' + x * 10 + 'px, -' + y * 10 + 'px)');
        $('.main-paralax img').eq(6).css('transform', 'translate(-' + x * 10 + 'px, -' + y * 50 + 'px)');
        $('.main-paralax img').eq(7).css('transform', 'translate(-' + x * 60 + 'px, -' + y * 30 + 'px)');
    });

    var swiper = new Swiper('.sale__items', {
        slidesPerView: 4,
        loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            100: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            400: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            770: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });


    $('.burger').on('click', function() {
        $('nav.mobile').addClass('active');
    });

    $('nav .nav-close').on('click', function() {
        $('nav.mobile').removeClass('active');
    });


    $('.product-card__col .product-card__inc').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('product-card__minus')) {
            $(this).closest('.product-card__col').find('input').val((parseFloat($(this).closest('.product-card__col').find('input').val()) - parseFloat($(this).closest('.product-card__col').find('input').attr('step'))).toFixed(1))
        } else {
            $(this).closest('.product-card__col').find('input').val((parseFloat($(this).closest('.product-card__col').find('input').val()) + parseFloat($(this).closest('.product-card__col').find('input').attr('step'))).toFixed(1))
        }
        $(this).closest('.product-card__col').find('input').change();
    });

    $('.product-card__col input').on('click', function(e) {
        e.preventDefault();
    });

    $('.product-card__col input').change(function() {
        let pattern = new RegExp(/^[0-9]*[.,]?[0-9]+$/)
        if (pattern.test($(this).val()) == false) {
            $(this).val($(this).attr('step'));
        }
        if (parseFloat($(this).val()) <= parseFloat($(this).attr('step'))) {
            $(this).val($(this).attr('step'));
        }
        $(this).closest('.product-card__calc').find('.product-card__total span').html((parseFloat($(this).val()) * parseFloat($(this).closest('.card__top__info, .product-card, .cart__item').find('.product-card__price span, .card__price span, .cart__price span').html())).toFixed(2));
        cartItemsCount = 0;
        cartItemsKg = 0;
        cartTotalPrice = 0;
        let basketItems = [];
        $('.cart__item').each(function(index) {
            if ($(this).find('.cart__price').text().includes('кг')) {
                cartItemsKg = (parseFloat(cartItemsKg) + parseFloat($(this).find('input').val())).toFixed(2);
            } else {
                cartItemsInt = (parseFloat(cartItemsKg) + parseFloat($(this).find('input').val())).toFixed(0);
            }
            cartItemsCount = cartItemsCount + 1;
            cartTotalPrice = (parseFloat(cartTotalPrice) + parseFloat($(this).find('.product-card__total span').html().trim())).toFixed(2);
            let basketItem = { id: $(this).find('.cart__delete').attr('prod_id'), count: $(this).find('input').val() };
            basketItems.push(basketItem);
            $.cookie('basket', basketItems, { path: '/', expires: 7 });
        });



        $('.cart__you-order-info').html(cartItemsCount + ' товар(а) / ' + cartItemsKg + ' кг / ' + cartItemsInt + ' шт');
        $('.cart__total span').html(cartTotalPrice);
    });

    $('.product-card__col input').each(function() {
        $(this).closest('.product-card__calc').find('.product-card__total span').html((parseFloat($(this).val()) * parseFloat($(this).closest('.card__top__info, .product-card, .cart__item').find('.product-card__price span, .card__price span, .cart__price span').html())).toFixed(2))
    });

    $('.catalog__menu-open').on('click', function() {
        $(this).toggleClass('active');
        $('.catalog__menu').toggleClass('active');
    });

    $('.to-basket').on('click', function(e) {
        e.preventDefault();
        if ($.cookie('basket')) {
            console.log($(this).siblings('.product-card__calc').find('input').val());
            let k = 0;
            let basketItems = $.makeArray(JSON.parse($.cookie('basket')));
            let basketItem = { id: $(this).attr('prod_id'), count: $(this).siblings('.product-card__calc').find('input').val() };
            for (let i = 0; i < basketItems.length; i++) {
                if (basketItems[i].id == $(this).attr('prod_id')) {
                    basketItems[i].count = (parseFloat(basketItems[i].count) + parseFloat($(this).siblings('.product-card__calc').find('input').val())).toFixed(1);
                    k++;
                }
            }
            if (k == 0) {
                basketItems.push(basketItem);
                $('.shopping-cart').attr('attr-prod-count', parseInt($('.shopping-cart').attr('attr-prod-count')) + 1);
            }
            $.cookie('basket', basketItems, { path: '/', expires: 7 });
            console.log(JSON.parse($.cookie('basket')));
        } else {
            console.log($(this).siblings('.product-card__calc').find('input').val());
            let basketItem = { id: $(this).attr('prod_id'), count: $(this).siblings('.product-card__calc').find('input').val() };
            let basketItems = [];
            basketItems.push(basketItem);
            $.cookie('basket', basketItems, { path: '/', expires: 7 });
            $('.shopping-cart').attr('attr-prod-count', 1);
            console.log(JSON.parse($.cookie('basket')));
        }
    });




    var cartItemsCount = 0;
    var cartItemsKg = 0;
    var cartItemsInt = 0;
    var cartTotalPrice = 0;

    $('.cart__delete').on('click', function(e) {
        let basketItems = $.makeArray(JSON.parse($.cookie('basket')));
        let newBasketItems = [];
        for (let i = 0; i < basketItems.length; i++) {
            if (basketItems[i].id != $(this).attr('prod_id')) {
                newBasketItems.push(basketItems[i]);
            }
        }
        $('.shopping-cart').attr('attr-prod-count', parseInt($('.shopping-cart').attr('attr-prod-count')) - 1);
        $.cookie('basket', newBasketItems, { path: '/', expires: 7 });
        $(this).closest('.cart__item').remove();
        cartItemsCount = 0;
        cartItemsKg = 0;
        cartItemsInt = 0;
        cartTotalPrice = 0;
        $('.cart__item').each(function(index) {
            if ($(this).find('.cart__price').text().includes('кг')) {
                cartItemsKg = (parseFloat(cartItemsKg) + parseFloat($(this).find('input').val())).toFixed(2);
            } else {
                cartItemsInt = (parseFloat(cartItemsKg) + parseFloat($(this).find('input').val())).toFixed(0);
            }
            cartItemsCount = cartItemsCount + 1;
            cartTotalPrice = (parseFloat(cartTotalPrice) + parseFloat($(this).find('.product-card__total span').html().trim())).toFixed(2);
        });

        $('.cart__you-order-info').html(cartItemsCount + ' товар(а) / ' + cartItemsKg + ' кг / ' + cartItemsInt + ' шт');
        $('.cart__total span').html(cartTotalPrice);
        if ($('.cart__item').length == 0) {
            $('.cart__items, .cart__bottom').remove();
            $('.cart h1.title').html('корзина пуста');
        }
    });

    $('.off').on('click', function(e) {
        e.preventDefault();
    });

    $('.modal-open').on('click', function(e) {
        $('.modal').addClass('active');
        $('.modal .order').addClass('active');
    });

    $('.modal form .close').on('click', function(e) {
        $('.modal').removeClass('active');
        $('.modal .order').removeClass('active');
        $('.modal .succses').removeClass('active');
    });



    $('.cart__item').each(function(index) {
        if ($(this).find('.cart__price').text().includes('кг')) {
            cartItemsKg = (parseFloat(cartItemsKg) + parseFloat($(this).find('input').val())).toFixed(2);
        } else {
            cartItemsInt = (parseFloat(cartItemsKg) + parseFloat($(this).find('input').val())).toFixed(0);
        }
        cartItemsCount = cartItemsCount + 1;
        cartTotalPrice = (parseFloat(cartTotalPrice) + parseFloat($(this).find('.product-card__total span').html().trim())).toFixed(2);
    });

    $('.cart__you-order-info').html(cartItemsCount + ' товар(а) / ' + cartItemsKg + ' кг / ' + cartItemsInt + ' шт');
    $('.cart__total span').html(cartTotalPrice)

    $('.modal .order .btn').on('click', function(e) {
        e.preventDefault();
        let col = 0;
        let text = "Товары:";
        $('.cart__item').each(function(index) {
            text = text + '\n' + (parseInt(index) + parseInt(1)) + ') Название: ' + $(this).find('.cart__name').html().trim() + '; Цена: ' + $(this).find('.cart__price').text().trim() + '; Количество: ' + $(this).find('.product-card__col input').val() + '; ' + $(this).find('.product-card__total').text().trim() + ' BYN;';
        });
        text = text + '\n\n\n' + cartItemsCount + ' товар(а) / ' + cartItemsKg + ' кг / ' + cartItemsInt + ' шт\nЦена итого: ' + cartTotalPrice + ' BYN.';
        console.log(encodeURIComponent(text));
        $(this).closest('form').find('input').each(function() {
            if ($(this).val() == '') {
                col++;
                let place = $(this).attr('placeholder');
                $(this).attr('placeholder', place + ' (Это обязательное поле)');
                $(this).attr('style', 'background: #FFF0F0; border: 1px solid #FF0000;');
                let thisInput = $(this);
                setTimeout(function() {
                    thisInput.attr('placeholder', place);
                    thisInput.removeAttr('style');
                }, 2500)
            }
        })
        if (col == 0) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: "POST",
                data: {
                    action: 'neworder',
                    name: $(this).closest('form').find('input[name="name"]').val(),
                    phone: $(this).closest('form').find('input[name="tel"]').val(),
                    adress: $(this).closest('form').find('input[name="address"]').val(),
                    order_method: $(this).closest('form').find('select').val(),
                    text: encodeURIComponent(text),
                },
                dataType: "json",
                success: function(data) {
                    $('.cart__delete').click();
                    console.log(data);
                    $('.modal .succses').addClass('active');
                    $('.modal .order').removeClass('active');
                }
            })
        }
    });

    $('input.search').on('input', function() {
        $('.search__text').removeClass('active');
        $('.search__items').removeClass('active');
        $('.search__items').html();
        $('.wait').addClass('active');
        $(this).siblings('.search__content').addClass('active');
        $(this).parent().siblings('.search__content').addClass('active');
        if ($(this).val() != '' && $(this).val().length >= 2) {
            $.ajax({
                url: '/wp-admin/admin-ajax.php',
                type: "POST",
                data: {
                    action: 'ajax_search',
                    term: $(this).val(),
                },
                dataType: "json",
                complete: function(data) {
                    $('input.search').siblings('.search__content').find('.wait').removeClass('active');
                    $('input.search').parent().siblings('.search__content').find('.wait').removeClass('active');
                    if (data.responseText.includes('По данному запросу ничего не найдено')) {
                        $('.search__text').html('По данному запросу ничего не найдено').addClass('active');
                    } else {
                        $('input.search').siblings('.search__content').find('.search__items').addClass('active');
                        $('input.search').parent().siblings('.search__content').find('.search__items').addClass('active');
                        $('input.search').siblings('.search__content').find('.search__items').html(data.responseText);
                        $('input.search').parent().siblings('.search__content').find('.search__items').html(data.responseText);
                    }
                }
            })
        } else if ($(this).val() == '') {
            $('.search__text').html('Поисковая строка пуста').addClass('active');
            $('.search__items').removeClass('active');
            $('.wait').removeClass('active');
        }
    });

    $('.search__content .close').on('click', function() {
        $('.search__content').removeClass('active');
        $('.search__text').removeClass('active');
        $('.search__items').removeClass('active');
        $('.wait').removeClass('active');
    });
})