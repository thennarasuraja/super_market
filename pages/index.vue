<template>
  <div class="flex w-full h-full justify-center">
    <div class="flex flex-col mt-10 gap-5 px-10 bg-slate-200">
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
            class="flex w-[600px] h-[350px] pt-20 flex-col font-bold font-serif gap-5 rounded-md bg-red-200"
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
                placeholder="Product Qunatity"
                v-model="product.price"
                class="py-2 px-4 border rounded-md outline-none"
              />
            </div>
            <div class="flex w-full justify-center">
              <button
                @click="creatproduct()"
                class="px-4 py-2 bg-blue-500 text-white rounded-[6px] ml-56"
              >
                Submit
              </button>
              <button
                class="px-4 py-2 bg-white text-black rounded-[6px] ml-14"
                @click="cancel()"
              >
                Cancel
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
                {{ index }}
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
            <tr v-if="edit == true">
              <td class="border border-slate-500 px-5 py-2 rounded-[4px]">
                <input class="border px-3" v-model="product.productId" />
              </td>
              <td class="border border-slate-500 px-5 py-2 rounded-[4px]">
                <input class="border px-3" v-model="product.productName" />
              </td>
              <td class="border border-slate-500 px-5 py-2 rounded-[4px]">
                <input class="border px-3" v-model="product.productQty" />
              </td>
              <td class="border border-slate-500 px-5 py-2 rounded-[4px]">
                <input class="border px-3" v-model="product.price" />
              </td>
              <span
                @click="updateproduct()"
                class="py-2 px-4 mr-2 border bg-blue-600 text-white cursor-pointer rounded-[6px]"
                >submit</span
              >
              <span
                @click="cancel()"
                class="py-2 px-4 mr-2 border bg-red-600 text-white cursor-pointer rounded-[6px]"
                >Cancel</span
              >
            </tr>
          </tbody>
        </table>
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
      update: "",
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
            product: product,
          },
        }
      );
      this.allproducts();
      console.log(deleted.message);
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
