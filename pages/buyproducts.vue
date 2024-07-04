<template>
  <div>
    <div class="flex w-full justify-between px-5 py-5 border-b-2 bg-white">
      <div
        @click="addNewProduct()"
        class="h-[50px] w-[50px] justify-center flex items-center rounded-full bg-cyan-600"
      >
        <div class="text-[30px] text-center text-white cursor-pointer">+</div>
      </div>
      <NuxtLink to="/">
        <div
          class="text-white px-4 py-2 rounded-md flex items-center bg-blue-600"
        >
          <div class="font-semibold text-[18px]">Products</div>
        </div>
      </NuxtLink>
    </div>
    <div class="w-full flex justify-center p-5">
      <table class="border-separate border-spacing-3 border">
        <thead class="bg-slate-200">
          <tr>
            <th class="border border-slate-500 px-5 py-2 rounded-[4px]">
              Product Name
            </th>
            <th class="border border-slate-500 px-5 py-2 rounded-[4px]">
              price
            </th>
            <th class="border border-slate-500 px-5 py-2 rounded-[4px]">
              Product Quantity
            </th>
            <th class="border border-slate-500 px-5 py-2 rounded-[4px]">
              Total
            </th>
          </tr>
        </thead>
        <tbody class="bg-slate-200">
          <tr v-for="(product, index) of asignproducts" :key="index">
            <td class="px-5 py-2">{{ product.selectproduct }}</td>
            <td class="px-5 py-2">{{ product.selectprice }}</td>
            <td class="px-5 py-2">{{ product.quantity }}</td>
            <td class="px-5 py-2">{{ product.total }}</td>
          </tr>
          <tr v-for="(newcolum,index) of addNewproducts" :key="index" class="bg-white" v-if="addrow == true">
            <td class="px-5">
              <select
                class="py-4 px-2 border outline-none rounded-sm"
                v-model="newcolum.productName"
                
              >
                <option
                  v-for="(product, key) of products"
                  :key="key"
                  :value="product.productName"
                  class="py-4"
                @click="getProductPrice(product,index)"
                />
                 
                
              </select>
            </td>
            <td class="px-5 border">
              {{ newcolum.selectprice }}
            </td>
            <td class="px-5">
              <input class="px-5 py-4 border" v-model="newcolum.quantity" />
            </td>
            <td class="px-5 border py-2">
              {{ newcolum.total }}
            </td>
          </tr>
          <tr v-if="totalV==true">
            <td colspan="4" class="text-right border-t-2 pr-10 text-[18px]">
              Total :{{ totalValue }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex w-full justify-evenly">
      <div
        @click="addtotal()"
        class="mt-5 cursor-pointer py-2 px-4 bg-blue-600 text-white rounded-md"
      >
        Add Products
      </div>
    </div>
    <div class="flex justify-center mt-10 ml-96">
      <div class="text-[22px] mt-7 text-white">
        <div
          @click="GenrateTotal()"
          class="px-4 py-2 cursor-pointer rounded-md bg-red-500"
        >
          Genrate Total
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      totalValue: 0,
      totalV:false,
      selectproductName: "",
      addproducts: {
        selectproduct: "",
        selectprice: "",
        quantity: "",
        total: "",
      },
      addNewproducts:[],
      asignproducts: [],
      addrow: false,
    };
  },
  mounted() {
    this.allproducts();
  },
  methods: {
    async allproducts() {
      const getproducts = await this.$http.$get(
        "http://localhost:5001/product/get"
      );
      console.log(getproducts);
      this.products = getproducts.Alldata;
    },
    findprice() {
      for (let product of this.products) {
        if (product.productName == this.selectproductName.productName) {
          this.addproducts.selectprice = product.price;
          this.addproducts.selectproduct = product.productName;
        }
      }
    },
    getProductPrice(product,index){
      this.addNewproducts[index].selectprice= product.price
    },
    addtotal() {
      this.addproducts.total =
        this.addproducts.quantity * this.addproducts.selectprice;
      this.asignproducts.push({ ...this.addproducts });
      this.addrow = false;
      console.log(this.asignproducts);
      console.log(this.addproducts);
    },
    addNewProduct() {
      this.addrow = true;
      this.addproducts = {
        selectproduct: "",
        selectprice: "",
        quantity: "",
        total: "",
      };
      this.selectproductName = "";
      this.addNewproducts.push( {
        selectproduct: "",
        selectprice: "",
        quantity: 1,
        total: "",
      })
    },
    GenrateTotal() {
      for (let product of this.asignproducts) {
        this.totalValue += Number(product.total);
      }
      this.totalV=true
    },
  },
};
</script>
