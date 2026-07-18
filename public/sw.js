self.addEventListener("install", (event) => {
  console.log("AlphaBot PWA installed");
});

self.addEventListener("activate", (event) => {
  console.log("AlphaBot PWA activated");
});

self.addEventListener("fetch", (event) => {
});
