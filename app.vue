<template>
  <NuxtLayout name="custom">
    <div class="w-full" v-for="(listing, index) in listings" :key="index">
      <a
        :href="listing.payload.item.permalink"
        target="new"
        class="flex h-16 hover:bg-gray-700 hover:light:bg-gray-700 hover:rounded-lg p-4 px-0 lg:px-4 text-sm font-medium light:text-gray-700 text-gray-100 items-center text-left border-b cursor-pointer light:border-gray-300 border-gray-600"
        ><div class="w-9/12 md:w-6/12 lg:w-4/12 flex items-center">
          <img
            :src="listing.payload.item.metadata.image_url"
            class="h-12 w-12 rounded-xl mr-4"
          />
          <div class="truncate">{{ listing.payload.item.metadata.name }}</div>
          <span data-v-tippy="" class="mx-2"
            ><div
              class="h-4 w-4 flex-shrink-0 flex items-center justify-center bg-blue rounded-full"
            >
              <img class="w-2 h-2" src="/assets/verifiedtick.svg" alt="" /></div
          ></span>
        </div>
        <div class="hidden md:flex w-2/12 flex items-center justify-end">
          {{
            getETHValue(
              listing.payload.base_price,
              listing.payload.payment_token.decimals
            )
          }}
          <img src="/assets/eth.svg" class="h-4 eth ml-1" />
        </div>
        <!-- <div
          class="hidden md:inline w-2/12 text-right text-green ml-2 truncate"
        >
          {{ listing.payload.maker.address }}
        </div> -->
        <div class="w-2/12 flex items-center justify-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Buy Now
          </button>
        </div>
        <!-- <div class="hidden lg:inline w-1/12 text-right">7.1K</div>
        <div class="hidden lg:inline w-1/12 text-right">19.9K</div> -->
      </a>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { OpenSeaStreamClient, EventType, Network } from "@opensea/stream-js";
import { WebSocket } from "ws";

const config = useRuntimeConfig();
const listings = ref([]);
const sales = ref([]);
const events = ref([]);
const client = new OpenSeaStreamClient({
  network: Network.MAINNET,
  apiUrl: "wss://stream.openseabeta.com/socket",
  token: config.public.OPENSEA_API_KEY,
  onError: console.error,
  connectOptions: {
    transport: WebSocket,
  },
});

const getETHValue = (gwei, decimals) => {
  return gwei / Math.pow(10, decimals);
};

const createNewEvent = (slug) => {
  events.value.push({
    slug,
    event: client.onEvents(slug, [EventType.ITEM_LISTED, EventType.ITEM_SOLD], (item) => {
    try {
      if (item.event_type == "item_listed") {
        listings.value.unshift(item);
      } else if (item.event_type == "item_sold") {
        sales.value.unshift(item);
      }
    } catch (error) {
      console.log("Got Error");
      console.dir(error, { depth: null });
    }
  })});
};

const removeEvent = (slug) => {
  let found = events.value.find(event => {
    return event.slug == slug
  })
  found.event();
}

createNewEvent("azuki");
createNewEvent("kiwami-genesis");
createNewEvent("ragnarok-meta");

</script>
