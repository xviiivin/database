<template>
  <AppLayout>
    <div class="flex flex-col h-full">
      <Nav />
      <div class="flex flex-col items-center flex-grow bg-white relative">
        <img class="absolute top-0 left-0 w-full flex object-cover z-0 h-full" src="../../assets/room.png" />
        <div class="w-full px-10 pt-5 py-20 flex flex-col items-start z-10">
          <p class="text-[#6F6565] mt-10 text-2xl mr-5">
            Welcome, <span class="font-medium">{{ userInfo?.name }}</span>
          </p>

          <div class="flex justify-center w-full space-x-10 mt-12">
            <router-link class="cursor-pointer underline-none" to="/pending">
              <div class="flex bg-[#202C4B] w-[100px] h-[100px] rounded-full shadow-lg">
                <img class="w-15 h-15 mx-7 self-center" src="../../assets/wallet.png" />
              </div>
              <p class="mt-2 font-light px-4">Payment</p>
            </router-link>
            <router-link class="cursor-pointer underline-none" to="/user/hospital">
              <div class="flex bg-[#202C4B] w-[100px] h-[100px] rounded-full">
                <img class="w-15 h-15 self-center mx-6" src="../../assets/medical-record.png" />
              </div>
              <p class="mt-2 font-light px-2">Treatment</p>
            </router-link>
          </div>
        </div>

        <div class="flex-grow flex flex-col items-start w-full p-5 rounded-t-xl bg-white z-10">
          <div class="xl:w-2/3 xl:mx-auto xl:justify-center">
            <p>Hospitals participating in this app</p>
          </div>
          <div class="grid grid-cols-2 gap-y-5 mt-5 w-full">
            <router-link v-for="(data, index) in datas" :key="index" :to="`/alldoctor/${data.id}`"
              class="rounded-2xl w-[150px] h-[150px] bg-white group drop-shadow-xl overflow-hidden mx-auto">
              <div class="text-justify justify-center h-full w-full">
                <img class="h-full w-full group-hover:scale-110 ease-in duration-300" :src="data.image" />
              </div>
              <div
                class="rounded-b-xl bg-[#202C4B] opacity-[90%] h-10 absolute flex items-center justify-center w-full bottom-0 group-hover:scale-110 ease-out duration-300">
                <p class="text-sm text-white">{{ data.name }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../../components/AppLayout.vue";
import Nav from "../../components/users/MainNav.vue";
import axios from "axios";
import {
  ref as storageRef,
  getDownloadURL,
  listAll,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { useFirebaseStorage } from "vuefire";
const storage = useFirebaseStorage();

export default {
  data() {
    return {
      datas: [],
      userInfo: {},
    };
  },
  components: {
    AppLayout,
    Nav,
  },
  mounted() {
    this.checked();
    this.getHospital();
    this.getUserInfo();
  },
  methods: {
    checked() {
      const data = JSON.parse(localStorage.getItem("user"));
      console.log(data);
      if (!data) {
        this.$router.push("/login");
      }
    },
    async getHospital() {
      const res = await axios.get("http://localhost:8080/api/hospital");
      this.datas = res.data;

      try {
        this.datas.map(async (hospital) => {
          const starsRef = storageRef(storage, "hospital/" + hospital.name);
          const search = await listAll(starsRef);
          const download = (await getDownloadURL(search.items[0])).toString();
          hospital.image = download;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getUserInfo() {
      const userId = JSON.parse(localStorage.getItem("user")).idCard;
      const res = await axios.get(`http://localhost:8080/api/user/${userId}`);
      console.log(res.data);
      this.userInfo = res.data;
    }
  },
};
</script>
