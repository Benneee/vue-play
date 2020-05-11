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
      <br />
      <button v-on:click="removeFromCart">
        Remove From Cart
      </button>
    </div>
  <br /> <br />
    <product-review @review-submitted="addReview"></product-review>

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
      reviews: [],
      sizes: ['small', 'medium', 'large'],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    /**
     * Anonymous functions can also be written as below but not all browsers supports it
     */
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit(
        'remove-from-cart',
        this.variants[this.selectedVariant].variantId,
      );
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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

// Vue.component('product-details', {
//   props: {
//     details: {
//       type: Number,
//       required: true,
//     },
//   },
//   template: `
//     <div>
//       {{ details }}
//     </div>
//   `,
// });

Vue.component('product-review', {
  template: `
      <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>

    </form>

  `,

  data() {
    return {
      name: null,
      review: null,
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      this.$emit('review-submitted', productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
    },
  },
});

var app = new Vue({
  el: '#app',
  data: {
    cart: [],
    premium: false,
    // details: 30,
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    reduceCart(id) {
      const index = this.cart.indexOf(id);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },
  },
});
