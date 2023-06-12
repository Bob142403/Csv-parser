<script setup>
import Papa from "papaparse";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const data = ref([]);
const toast = useToast();

function uploadFile(event) {
  const file = event.target.files[0];
  Papa.parse(file, {
    skipEmptyLines: true,
    complete(res) {
      if (res.errors[0]) toast.error(res.errors[0].message);
      data.value = res.data;
      console.log(data.value);
    },
  });
}

function downloadFile() {
  const a = document.createElement("a");

  const str = Papa.unparse(data.value);

  const blob = new Blob([str], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = "download.csv";

  a.click();
}
</script>

<template>
  <div class="px-2 pt-3 flex flex-col h-screen">
    <div class="flex justify-between">
      <input
        class="text-sm text-gray-900 w-11/12 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        @change="uploadFile"
      />
      <button
        type="button"
        :disabled="!data.length"
        @click="downloadFile"
        class="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          ></path>
        </svg>
      </button>
    </div>
    <div class="relative overflow-x-auto my-4 overflow-y-auto h-screen">
      <table
        class="w-full text-sm text-center text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th></th>
            <th
              scope="col"
              class="border-2 px-4 py-3"
              v-for="header in data[0]"
              :key="header"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="bg-white border-2 dark:bg-gray-800 dark:border-gray-700"
          >
            <template v-if="index != 0">
              <td class="border-r-2 px-1">{{ index }}</td>
              <td
                v-for="(elem, i) in row"
                :key="i"
                class="px-4 py-3 border-r-2"
              >
                <input class="pl-1 w-auto" v-model="data[index][i]" />
                <!-- {{ elem }} -->
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
