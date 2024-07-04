<template>
  <div class="w-full h-full bg-slate-200">
    <NuxtLink to="/buyproducts">
      <div class="w-full flex pr-5 pt-5 text-[20px] justify-end">
        <button
          class="px-4 py-2 bg-gray-400 rounded-md text-white hover:bg-gray-500"
        >
          Buy Products
        </button>
      </div>
    </NuxtLink>
    <!-- <NuxtLink
        to="/buyproducts"
        class="px-4 py-2 bg-gray-400 rounded-md text-white hover:bg-gray-500"
      >
        Buy Products
      </NuxtLink> -->
    <div class="flex justify-center">
      <div class="flex flex-col mt-10 gap-5 px-10 shadow-lg bg-slate-200">
        <div
          class="w-full flex justify-center text-blue-800 text-[30px] pt-5 font-bold font-serif"
        >
          <div>SUPER MARKET</div>
        </div>
        <div
          v-if="add == true"
          class="w-full h-screen left-0 top-0 fixed backdrop-blur-sm z-10 bg-opacity-60 bg-black"
        >
          <div class="flex w-full h-screen justify-center items-center">
            <div
              class="flex w-[600px] py-10 flex-col font-bold font-serif gap-5 rounded-md bg-white"
            >
              <div class="flex justify-evenly">
                <span>ProductName :</span>
                <input
                  v-model="product.productName"
                  placeholder="Product Name"
                  class="py-2 px-4 border rounded-md outline-none"
                />
              </div>
              <div class="w-full flex justify-evenly">
                <span>Product Qty :</span>
                <input
                  v-model="product.productQty"
                  placeholder="Product Qunatity"
                  class="py-2 px-4 border rounded-md outline-none"
                />
              </div>
              <div class="w-full flex justify-evenly">
                <span>Product price :</span>
                <input
                  placeholder="Product Price"
                  v-model="product.price"
                  class="py-2 px-4 border rounded-md outline-none"
                />
              </div>
              <div class="flex w-full px-10 gap-5 text-white">
                <button
                  @click="cancel()"
                  class="px-4 py-2 bg-blue-500 rounded-[6px] w-1/2"
                >
                  Cancel
                </button>
                <button
                  @click="creatproduct()"
                  class="py-2 bg-blue-500 rounded-[6px] w-1/2"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="edit == true"
          class="w-full h-screen left-0 top-0 fixed backdrop-blur-sm z-10 bg-opacity-60 bg-black"
        >
          <div class="flex w-full h-screen justify-center items-center">
            <div
              class="flex w-[600px] py-10 flex-col font-bold font-serif gap-5 rounded-md bg-white"
            >
              <div class="flex justify-evenly">
                <span>ProductName :</span>
                <input
                  v-model="product.productName"
                  placeholder="Product Name"
                  class="py-2 px-4 border rounded-md outline-none"
                />
              </div>
              <div class="w-full flex justify-evenly">
                <span>Product Qty :</span>
                <input
                  v-model="product.productQty"
                  placeholder="Product Qunatity"
                  class="py-2 px-4 border rounded-md outline-none"
                />
              </div>
              <div class="w-full flex justify-evenly">
                <span>Product price :</span>
                <input
                  placeholder="Product Price"
                  v-model="product.price"
                  class="py-2 px-4 border rounded-md outline-none"
                />
              </div>
              <div class="flex w-full px-10 gap-5 justify-center text-white">
                <button
                  class="w-1/2 py-2 border bg-blue-500 rounded-[6px]"
                  @click="cancel()"
                >
                  Cancel
                </button>
                <button
                  @click="updateproduct()"
                  class="w-1/2 py-2 bg-blue-500 rounded-[6px]"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full pr-10 justify-end items-center pt-5">
          <button
            @click="addproducts()"
            class="border py-2 px-4 bg-blue-600 rounded-[6px] text-white"
          >
            Add
          </button>
        </div>
        <div class="pb-10">
          <table
            class="border-separate border-spacing-2 rounded-[4px] border border-slate-500"
          >
            <caption class="text-[24px] font-semibold text-slate-600">
              Products Details
            </caption>
            <thead>
              <tr>
                <th class="border border-slate-500 px-5 py-2 rounded-[4px]">
                  ProductId
                </th>
                <th class="border border-slate-500 px-5 py-2 rounded-[4px]">
                  Product Name
                </th>
                <th class="border border-slate-500 px-5 py-2 rounded-[4px]">
                  Product Quantity
                </th>
                <th class="border border-slate-500 px-5 py-2 rounded-[4px]">
                  price
                </th>
              </tr>
            </thead>
            <tbody class="text-slate-500">
              <tr
                class="hover:bg-white"
                @click="update = index"
                v-if="edit == false"
                v-for="(getproduct, index) of getproducts"
                :key="index"
              >
                <td class="border border-slate-500 px-5 py-2 rounded-[4px]">
                  <!-- {{ getproduct.productId }} -->
                  {{ index + 1 }}
                </td>
                <td class="border border-slate-500 px-5 py-2 rounded-[4px]">
                  {{ getproduct.productName }}
                </td>
                <td class="border border-slate-500 px-5 py-2 rounded-[4px]">
                  {{ getproduct.productQty }}
                </td>
                <td class="border border-slate-500 px-5 py-2 rounded-[4px]">
                  {{ getproduct.price }}
                </td>
                <div v-if="index == update" class="flex">
                  <span
                    @click="Edit(index)"
                    class="py-2 px-4 mr-2 border bg-blue-600 text-white cursor-pointer rounded-[6px]"
                    >edit</span
                  >
                  <span
                    @click="deleteproduct(index)"
                    class="py-2 px-4 mr-2 border bg-red-600 text-white cursor-pointer rounded-[6px]"
                    >Delete</span
                  >
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      add: false,
      edit: false,
      update: -1,
      product: {
        productName: "",
        productQty: "",
        price: "",
      },
      getproducts: [],
    };
  },
  mounted() {
    this.allproducts();
  },
  methods: {
    async allproducts() {
      const alldatas = await this.$http.$get(
        "http://localhost:5001/product/get"
      );
      console.log(alldatas);
      this.getproducts = alldatas.Alldata;
    },
    async creatproduct() {
      const product = await this.$http.$post(
        "http://localhost:5001/product/creat",
        {
          body: {
            products: this.product,
          },
        }
      );
      console.log(product.message);
      this.allproducts();
      this.add = false;
    },
    cancel() {
      this.add = false;
      this.edit = false;
      this.update = -1;
    },
    addproducts() {
      this.product = {
        productName: "",
        productQty: "",
        price: "",
      };
      this.add = true;
    },
    async deleteproduct(product) {
      const deleted = await this.$http.$delete(
        "http://localhost:5001/product/delete",
        {
          body: {
            product: this.getproducts[product].productId,
          },
        }
      );
      this.allproducts();
      console.log(deleted.message);
      this.update = -1;
    },
    Edit(index) {
      this.edit = true;
      this.product = this.getproducts[index];
    },
    async updateproduct() {
      const updated = await this.$http.$put(
        "http://localhost:5001/product/update",
        {
          body: {
            product: this.product,
          },
        }
      );
      if (updated.success) {
        this.edit = false;
      }
      console.log(updated);
      this.allproducts();
    },
  },
};
</script>
