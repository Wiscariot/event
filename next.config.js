/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI: "mongodb+srv://EVENT_USER:2Fbe1eWXaNfW9xZw@cluster0.anye2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  },
  reactStrictMode: true,
}

module.exports = nextConfig
