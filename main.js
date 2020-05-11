var app = new Vue({
  el: '#app',
  data: {
    brand: 'Vue Mastery',
    product: 'Socks',
    description: 'Most amazing pair ever designed!',
    // image: './assets/vue-socks-green.jpg',
    selectedVariant: 0,
    url: 'https://google.com',
    // inStock: false,
    inventory: 8,
    onSale: true,
    details: ['60% cotton', '20% polyester', 'Gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColor: 'green',
        variantImage: './assets/vue-socks-green.jpg',
        variantQuantity: 10,
      },
      {
        variantId: 2235,
        variantColor: 'blue',
        variantImage: './assets/vue-socks-blue.jpg',
        variantQuantity: 0,
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
     *
     */
    updateProduct(index) {
      this.selectedVariant = index;
    },
    reduceCart() {
      this.cart -= 1;
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      return this.onSale
        ? `${this.brand} ${this.product} is on sale`
        : `${this.brand} ${this.product} is not on sale`;
    },
  },
});
