(function($) {
    "use strict";

	/* ..............................................
	   Loader 
	   ................................................. */
	$(window).on('load', function() {
		$('.preloader').fadeOut();
		$('#preloader').delay(550).fadeOut('slow');
		$('body').delay(450).css({
			'overflow': 'visible'
		});
	});
    //    contact-select
    var contactGuestSelect = $('.contact-guest-select');
    if (contactGuestSelect) {
        var valuesList = [{
            value: '',
            label: 'Chose subject'
        }, {
            value: 1,label: "Online shopping"
        }, {
            value: 2, label: "Contact details"
        }, {
            value: 3,label: "Delivery"
        }, {
            value: 4,label: "Product offers"
        }, {
            value: 5,label: "Other"
        },];
        valuesList.forEach(function (item, index) {
            var optionItem = document.createElement('option');
            if (!index) {
                optionItem.setAttribute('selected', 'selected');
            }
            optionItem.value = item.value;
            optionItem.textContent = item.label;
            contactGuestSelect.append(optionItem);
        })

    }

	    //	Contact form
		var $contactForm = $('#contactForm');
    
		if ($contactForm) {
			$('#message').keyup(function(){
				if($('#message').val() == ''){
					$('#message-count').stop().fadeOut();
				}
				else {
					if($('#message').val().length>100){
						$('#message').val($('#message').val().substring(0,100));
					}
					$('#message-count').stop().fadeIn().text(String(100 - $('#message').val().length));
				}
			});
			function showError(element, attribute) {
				element.addClass('is-invalid');
				element.next().text(element.attr(attribute));
			}
	
			function removeError(element) {
				element.removeClass('is-invalid');
				element.next().text('');
			}
	
			function regexValidator(item, regex) {
				if (!regex.test($(item).val())) {
					showError($(item), 'data-error-regex');
				} else {
					removeError($(item));
				}
			}
	
			var $name = $contactForm.find('#name');
			var $email = $contactForm.find('#email');
			var $guest = $contactForm.find('#guest');
			var $message = $contactForm.find('#message');
			var formFields = [$name, $email, $guest, $message];
	
			formFields.forEach(function (item) {
				console.log(item)
				$(item).on('blur change', function () {
					if ($(item).attr('required') && $(item).val() === '') {
						showError($(item), 'data-error');
						return;
					} else {
						removeError($(item));
					}
	
					if ($(item).attr('data-error-regex')) {
						if ($(item).attr('name') === 'email') {
							var EMAIL_REGEX = /^\w([\.-]?\w+\d*)*@\w+\.\w{2,4}$/;
							regexValidator(item, EMAIL_REGEX);
						}
	
						if ($(item).attr('name') === 'name') {
							var NAME_REGEX = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,15}(\s[A-ZŠĐŽČĆ][a-zšđžčć]{2,15})*$/;
							regexValidator(item, NAME_REGEX);
						}
	
						if ($(item).attr('name') === 'message') {
							var MESSAGE_REGEX = /^[\w\s\.\?!-\d]{20,100}$/m;
							regexValidator(item, MESSAGE_REGEX);
						}
					}
				})
			});
	
			$contactForm.on('submit', function (event) {
				event.preventDefault();
				var valid = true;
				$contactForm.find('.with-errors').each(function (index, item) {
					if ($(item).text() !== '') {
						valid = false;
					}
				})
	
				var $msgSubmit = $('#msgSubmit');
				if (valid) {
					$msgSubmit.text('Your form has been submitted. We\'ll contact you soon.');
	
					formFields.forEach(function (item) {
						removeError($(item));
						$(item).val('');
					});
				} else {
					$msgSubmit.text('Please check your form once again and submit.');
				}
				$msgSubmit.removeClass('hidden');
			})
		}
	/* ..............................................
	   Fixed Menu
	   ................................................. */

	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 50) {
			$('.main-header').addClass('fixed-menu');
		} else {
			$('.main-header').removeClass('fixed-menu');
		}
	});

	/* ..............................................
	   slider
	   ................................................. */

	$(document).ready(function(){
		if($("#slides-shop").length){
			_get("data/slider.json", loadSlider, function(xhr){console.log(xhr);});

		}
		function loadSlider(data){
			let html = "";
			for(let item of data){
				html += `<li class="text-center">
                <img src="${item.image.url}" alt="${item.image.alt}">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="m-b-20"><strong>${item.name_up} <br> ${item.name_down}</strong></h1>
                            <p><a class="btn hvr-hover" href="shop.html">${item.label}</a></p>
                        </div>
                    </div>
                </div>
            </li>`;
			}
			$(".slides-container").html(html);


			$('#slides-shop').superslides({
				inherit_width_from: '.cover-slides',
				inherit_height_from: '.cover-slides',
				play: 5000,
				animation: 'fade',
			});
		
			$(".cover-slides ul li").append("<div class='overlay-background'></div>");
		}
	});

    /*Blog */
	$(document).ready(function(){
		if($(".latest-blog").length){
			_get("data/blog.json", loadBlog, function(xhr){console.log(xhr);});

		}
		function loadBlog(data){
			let html = "";
			for(let item of data){
				html += `<div class="col-md-6 col-lg-4 col-xl-4">
				<div class="blog-box">
				 <div class="blog-img">
				<img class="img-fluid" src="${item.image.url}" alt="${item.image.alt}" />
			</div>
			<div class="blog-content">
				<div class="title-blog">
					<h3>Cabbage</h3>
					<p class="text-justify">"${item.description}"</p>
				</div>
				<ul class="option-blog">
					<li><a href="gallery.html" data-toggle="tooltip" data-placement="left" title="View gallery"><i class="fas fa-eye"></i></a></li>
					<li><a href="shop.html" data-toggle="tooltip" data-placement="right" title="Shop"><i class="fas fa-sync-alt"></i></a></li>
				</ul>
			</div>
			</div>
                </div>`;
			}
			$("#blogs").html(html);
		}
	});


	/* */
	



	/* ..............................................
	  Gallery
	   ................................................. */

	$(document).ready(function() {
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').click(function() {
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});

		if($("#gallery-images").length){
			_get("data/gallery.json", loadGalleryImages, function(xhr){console.log(xhr);});
		}
		function loadGalleryImages(data){
			let html = "";
			for(let item of data)
			{
				html += `<div class="col-lg-3 col-md-6 special-grid fruits">
				<div class="products-single fix">
					<div class="box-img-hover">
						<img src="${item.image.url}" class="img-fluid" alt="${item.image.alt}">
					</div>                        
				</div>
			</div>`;
			}
			$("#gallery-images").html(html);
		}


	});


	/* ..............................................
	   BaguetteBox
	   ................................................. */

	baguetteBox.run('.tz-gallery', {
		animation: 'fadeIn',
		noScrollbars: true
	});

	/* ..............................................
	   Offer Box
	   ................................................. */

	$('.offer-box').inewsticker({
		speed: 3000,
		effect: 'fade',
		dir: 'ltr',
		font_size: 13,
		color: '#ffffff',
		font_family: 'Montserrat, sans-serif',
		delay_after: 1000
	});

	/* ..............................................
	   Tooltip
	   ................................................. */

	$(document).ready(function() {
		$('[data-toggle="tooltip"]').tooltip();
	});


	/* ..............................................
	   Featured Products
	   ................................................. */

	$('.featured-products-box').owlCarousel({
		loop: true,
		margin: 15,
		dots: false,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
		responsive: {
			0: {
				items: 1,
				nav: true
			},
			600: {
				items: 3,
				nav: true
			},
			1000: {
				items: 4,
				nav: true,
				loop: true
			}
		}
	});

	/* ..............................................
	   Scroll
	   ................................................. */

	$(document).ready(function() {
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').click(function() {
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});
	});


	/* ..............................................
	   NiceScrollf
	   ................................................. */

	var $brandBox = $(".brand-box");
	if($brandBox.length) {
		_initBrandBox($brandBox);
	}

	function _initBrandBox(brandBox) {
		brandBox.niceScroll({
			cursorcolor: "#9b9b9c",
		});
	}

	var $productList = $('.product-list');
	if($productList.length) {
		_getFeaturedProducts($productList);
	}

	var $mainNavigation = $('.main-navigation');
	if($mainNavigation.length) {
		_getNavigation($mainNavigation);
	}

	var $allProducts = $('.all-products');
	var initialProductsListFetch = [];
	var productsList = [];
	if($allProducts.length) {
		_getAllProducts($allProducts);
	}

	var filterProductOptions = {
		sort: '*',
		type: '*',
		search: ''
	}

	var _localStorage = {
		_getItems: function(key) {
			return localStorage.getItem(key);
		},
		_setItems: function(key, value) {
			localStorage.setItem(key, value);
		},
		_removeItem: function(key) {
			localStorage.removeItem(key);
		}
	}


	var $cartTotal = $('.cart--total');
	if($cartTotal.length) {
		_checkTotalCartItems($cartTotal);
	}

	function _checkTotalCartItems(cartTotal) {
		var totalItems = _localStorage._getItems(`cart-total`) || 0;
		cartTotal.html(totalItems);
	}

	function _calculateCartTotal(data) {
		var cartTotalValue = $('.cart--total-value');
		if (cartTotalValue.length && productsList) {
			var total = 0;
			data.forEach(function (item) {
				var quantity = _localStorage._getItems(`cart-${item.id}`);
				if (quantity) {
					total += (quantity * item.price.new);
				}
			});
			cartTotalValue.html("$ " + total.toLocaleString());
		}
	}
	
	function _addToCart(productList) {
		productList.find('[data-add-to-cart]').on('click', function (event) {
			event.preventDefault();
			var id = $(this).attr('data-add-to-cart');
			var productIDLocale = _localStorage._getItems(`cart-${id}`);
			if (productIDLocale) {
				_localStorage._setItems(`cart-${id}`, ++productIDLocale);
			} else {
				_localStorage._setItems(`cart-${id}`, 1);
			}

			var totalItems = _localStorage._getItems(`cart-total`);
			if (totalItems) {
				_localStorage._setItems(`cart-total`, ++totalItems);
			} else {
				_localStorage._setItems(`cart-total`, 1);
			}
			_checkTotalCartItems($cartTotal);
		})
	}

	var $sortByControl = $('.sort-by--control');
	if($sortByControl.length) {
		_sortProducts($sortByControl);
	};

	var $searchProductControl = $('.search-product--control');
	if ($searchProductControl.length) {
		_searchProducts($searchProductControl);
	}

	function _searchProducts(searchProductControl) {
		searchProductControl.on('keyup', function () {
			filterProductOptions.search = $(this).val();
			_filterProducts();
		})
	}

	function _sortProducts(sortByControl) {
		sortByControl.on('change', function () {
			filterProductOptions.sort = $(this).val();
			_filterProducts();
		});
	}

	function _filterProducts() {
		if ($allProducts.length) {
			productsList = [...initialProductsListFetch];
			_filterProductListByName(filterProductOptions.search);
			_filterProductListByType(filterProductOptions.type);
			_filterProductByPrice(filterProductOptions.sort);

			$allProducts.fadeOut(200, function () {
				$allProducts.html('');
				_appendAllProducts($allProducts, productsList);
				$allProducts.fadeIn();
			});
		}
	}

	function _filterProductByPrice(value) {
		switch(value) {
			case 'price.asc':
				productsList = productsList.sort(function (a, b) {
					return a.price.new - b.price.new;
				})
				break;
			case 'price.desc':
				productsList = productsList.sort(function (a, b) {
					return b.price.new - a.price.new;
				})
				break;
		}
	}

	var $cartWrapper = $('.cart--wrapper');
	if($cartWrapper.length) {
		_getAllCartProducts($cartWrapper);
	}

	function _getAllCartProducts(cartWrapper) {
		_get('data/products.json', function (data) {
			data.forEach(function (item) {
				var quantity = _localStorage._getItems(`cart-${item.id}`);
				if (quantity) {
					cartWrapper.append(_appendCartProduct(item, quantity));
				}
			})
			_calculateCartTotal(data);
			_removeItemFromCart(cartWrapper, data);
			_onQuantityChange(cartWrapper, data);
		})
	}

	function _onQuantityChange(cartWrapper, data) {
		cartWrapper.find('input').on('change', function () {
			var value = parseInt($(this).val());
			var price = $(this).attr('data-price');
			var id = $(this).attr('data-id');
			var totalPr = $(this).parent().next().find('p');
			totalPr.html("$ "+(value * price).toLocaleString());
			var lastQuantity = parseInt(_localStorage._getItems(`cart-${id}`));
			var cartTotal = parseInt(_localStorage._getItems(`cart-total`));
			_localStorage._setItems('cart-total', (cartTotal - lastQuantity));
			_localStorage._setItems(`cart-${id}`, value);
			cartTotal = parseInt(_localStorage._getItems(`cart-total`));
			_localStorage._setItems('cart-total', (cartTotal + value));
			_checkTotalCartItems($cartTotal);
			_calculateCartTotal(data);
		})
	}

	function _removeItemFromCart(cartWrapper, data) {
		cartWrapper.find('.remove-pr a').on('click', function (event) {
			event.preventDefault();
			var id = $(this).attr('data-id');
			var removeItemQuantity = _localStorage._getItems(`cart-${id}`);
			var cartTotal = _localStorage._getItems(`cart-total`);
			_localStorage._setItems(`cart-total`, (cartTotal-removeItemQuantity));
			_localStorage._removeItem(`cart-${id}`);
			$(this).parents('.cart--item').remove();
			_checkTotalCartItems($cartTotal);
			_calculateCartTotal(data);
		})
	}

	function _appendCartProduct(item, quantity) {
		return `
		<tr class="cart--item">
			<td class="thumbnail-img">
				<img class="img-fluid" src="${item.image.url}" alt="${item.image.alt}" />
			</td>
			<td class="name-pr">
				<p>${item.name}</p>
			</td>
			<td class="price-pr">
				<p>$ ${item.price.new.toLocaleString()}</p>
			</td>
			<td class="quantity-box"><input type="number" size="4" data-id="${item.id}" data-price="${item.price.new}" value="${quantity}" min="0" step="1" class="c-input-text qty text"></td>
			<td class="total-pr">
				<p>$ ${(item.price.new * quantity).toLocaleString()}</p>
			</td>
			<td class="remove-pr">
				<a href="#" data-id="${item.id}">
        			<i class="fas fa-times"></i>
        		</a>
			</td>
			</tr>
		`
	}

	function _getAllProducts(allProducts) {
		_get('data/products.json', function (data) {
			productsList = data;
			initialProductsListFetch = data;
			_appendAllProducts(allProducts, data);
			_populateTotalProductsNumber(data);
			_populateTotalVegetables(_filterByType(data, 'vegetables'));
			_populateTotalFruits(_filterByType(data,'fruit'));
			var filterItemsSidebar = $('.filter-items--sidebar');
			if (filterItemsSidebar.length) {
				_initSidebarProductFilters(filterItemsSidebar);
			}
		});
	}

	function _filterProductListByType(value) {
		switch(value) {
			case 'vegetables':
				productsList = _filterByType(initialProductsListFetch, 'vegetables');
				break;
			case 'fruit':
				productsList = _filterByType(initialProductsListFetch, 'fruit');
				break;
		}
	}

	function _filterProductListByName(value) {
		productsList = productsList.filter(function (item) {
			return item.name.toLowerCase().indexOf(value.toLowerCase().trim()) !== -1;
		});
	}

	function _filterByType(data, type) {
		return data.filter(function (item) { return item.type === type})
	}

	function _initSidebarProductFilters(filterItemsSidebar) {
		filterItemsSidebar.find('button').on('click', function () {
			filterProductOptions.type = $(this).attr('data-filter');
			_filterProducts();
		})
	}

	function _populateTotalProductsNumber(data) {
		var $totalProducts = $('.total--products');
		if ($totalProducts.length) {
			$totalProducts.html(`( ${data.length} )`)
		}
	}

	function _populateTotalVegetables(data) {
		var $totalVegetables = $('.vegetables--total');
		if ($totalVegetables.length) {
			$totalVegetables.html(`( ${data.length} )`)
		}
	}

	function _populateTotalFruits(data) {
		var $totalFruits = $('.fruits--total');
		if ($totalFruits.length) {
			$totalFruits.html(`( ${data.length} )`)
		}
	}

	function _appendAllProducts(wrapper, data) {
		data.forEach(function (item) {
			wrapper.append(_appendProduct(item, 'col-sm-6 col-md-6 col-lg-4 col-xl-4'));
		});
		_addToCart(wrapper);
	}

	/* function _getFeaturedProducts(productList) {
		_get('data/products.json', function (data) {
			data.forEach(function (item) {
				productList.append(_appendProduct(item, 'col-lg-3 col-md-6'));
			});
			_addToCart(productList)
			var portfolio = $('.special-menu');
			var list = $('.special-list');
			_initIsoTop(portfolio, list);
		}) 
	} */
	function _getFeaturedProducts(productList) {
		_get('data/products.json', function (data) {
			data.forEach(function (item) {
				productList.append(_appendProduct(item, 'col-lg-3 col-md-6'));
			});
			_addToCart(productList);
			setTimeout(function () {
				var portfolio = $('.special-menu');
				var list = $('.special-list');
				_initIsoTop(portfolio, list);
			}, 1000);
		})
	}
	function _getNavigation(mainNavigation) {
		_get('data/navigation.json', function (data) {
			data.forEach(function (item) {
				if (item.dropdown && item.dropdown.length) {
					mainNavigation.append(_appendDropdownNavItem(item));
				} else {
					mainNavigation.append(_appendNavItems(item));
				}
			})
		})
	}

	function _appendDropdownNavItem(navItem) {
		return `
			<li class="dropdown">
				<a href="#" class="nav-link dropdown-toggle arrow" data-toggle="dropdown">${navItem.label}</a>
				<ul class="dropdown-menu">
					${navItem.dropdown.map(function (item) {
						return _renderDropdownItem(item);	
					})}
				</ul>
			</li>
		`;
	}

	function _renderDropdownItem(item) {
		return `<li><a href="${item.url}">${item.label}</a></li>`
	}

	function _appendNavItems(navItem) {
		return `
			<li class="nav-item ${_isNavItemActive(navItem.url)}"><a class="nav-link" href="${navItem.url}">${navItem.label}</a></li>
		`;
	}

	function _isNavItemActive(url) {
		return url === window.location.pathname ? 'active' : '';
	}

	function _appendProduct(item, gridClass) {
		return `<div class="${gridClass} special-grid ${item.type}">
                    <div class="products-single fix">
                        <div class="box-img-hover">
							<div class="type-lb">
								${_isProductOnSale(item)}
								${_isProductNew(item)}
							</div>
                            <img src="${item.image.url}" class="img-fluid" alt="${item.image.alt}">
                            <div class="mask-icon">
                                <ul>
                                    <li><a href="gallery.html" data-toggle="tooltip" data-placement="right" title="View gallery"><i class="fas fa-eye"></i></a></li>
                                    <li><a href="shop.html" data-toggle="tooltip" data-placement="right" title="Shop"><i class="fas fa-sync-alt"></i></a></li>
                                </ul>
                                <a class="cart cart--total" href="#" data-add-to-cart="${item.id}">Add to Cart</a>
                            </div>
                        </div>
                        <div class="why-text">
                            <h4>${item.name}</h4>
                            <h5> $ ${item.price.new}</h5><h5 class="ml-3"><del>$ ${item.price.old}</del></h5>
                        </div>
                    </div>
                </div>
				`
	}

	function _isProductOnSale(product) {
		if(product.sale) {
			return '<p class="sale">Sale</p>';
		}
		return '';
	}

	function _isProductNew(product) {
		if(product.new) {
			return '<p class="new">New</p>';
		}
		return '';
	}

	function _initIsoTop(wrapper, list) {
		wrapper.on('click', 'button', function() {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = list.isotope({
			itemSelector: '.special-grid'
		});
		// debugger
	}

	function _get(url, callback, error) {
		$.ajax({
			method: "GET",
			url: url,
			dataType:"json",
			success: callback,
			error: error
		})
	}


}(jQuery));
