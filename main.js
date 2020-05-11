Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div class="product">
    <div class="product-image">
      <!-- v-bind directive creates a bond between the data and the attribute we need to manipulate
      short-form is ':'-->
      <img :src="image" :alt="description" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{outOfStock: !inStock}">
        Out of Stock
      </p>
      <p>Shipping: {{ shipping }}</p>
      <p>User is premium: {{ premium }}</p>
      <p>{{ sale }}</p>

      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>

      <div
        v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant?.variantColor }"
        @mouseover="updateProduct(index)"
        style="cursor: grab;"
      ></div>

      <button
        v-on:click="addToCart"
        :disabled="!inStock"
        :class="{disabledButton: !inStock}"
      >
        Add to Cart
      </button>
      <!-- <br />
      <button :disabled="cart === 0" v-on:click="reduceCart">
        Remove From Cart
      </button> -->
      <div class="cart">
        <p>Cart({{ cart }})</p>
      </div>
    </div>

  </div>
`,
  data() {
    return {
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
    };
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
    shipping() {
      if (this.premium === true) {
        return 'Free';
      } else {
        return 2.99;
      }
    },
  },
});

Vue.component('product-details', {
  props: {
    details: {
      type: Number,
      required: true,
    },
  },
  template: `
    <div>
      {{ details }}
    </div>
  `,
});

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    details: 30,
  },
});
