<template>
  <NuxtLayout name="custom">
    <div class="">
      <Listings :listings="listings"></Listings>  
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


const createNewEvent = (slug) => {
  events.value.push({
    slug,
    event: client.onEvents(slug, [EventType.ITEM_LISTED], (item) => {
    try {
      console.dir(item, { depth: null });
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


createNewEvent("mutant-ape-yacht-club");
createNewEvent("boredapeyachtclub");
createNewEvent("otherdeed");
createNewEvent("doodles-official");

</script>
