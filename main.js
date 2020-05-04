var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    description: 'Most amazing pair ever designed!',
    image: './assets/vue-socks-green.jpg',
    url: 'https://google.com',
    inStock: false,
    inventory: 8,
    onSale: true,
    details: ['60% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: './assets/vue-socks-green.jpg',
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: './assets/vue-socks-blue.jpg',
      },
    ],
    cart: 0,
    sizes: ['small', 'medium', 'large'],
  },
  methods: {
    addToCart: function () {
      this.cart += 1;
    },
    /**
     * Anonymous functions can also be written as below but not all browsers supports it
     * @param {} variantImage
     */
    updateProduct(variantImage) {
      this.image = variantImage;
    },
    reduceCart() {
      this.cart -= 1;
    },
  },
});
