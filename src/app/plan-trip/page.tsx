"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import BannerSection from "@/components/BannerSection";

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category: "attraction" | "hotel" | "restaurant" | "activity";
  day?: string;
  notes?: string;
}

interface SavedTrip {
  id: string;
  title: string;
  createdAt: string;
  places: MarkerData[];
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
}
interface PeakTourismSpot {
  id: string;
  name: string;
  city: string;
  country: string;
  region: "Asia" | "Europe" | "Americas" | "Middle East" | "Africa" | "Oceania";
  vibe: "Summer Vacation" | "Honeymoon & Romantic" | "Heritage & Culture" | "Adventure & Nature" | "Beach & Island" | "City & Luxury";
  lat: number;
  lng: number;
  rating: number;
  description: string;
  category: "attraction" | "hotel" | "restaurant" | "activity";
  icon: string;
}

const PEAK_TOURISM_SPOTS: PeakTourismSpot[] = [
  // ASIA (30)
  { id: "taj-mahal", name: "Taj Mahal", city: "Agra", country: "India", region: "Asia", vibe: "Heritage & Culture", lat: 27.1751, lng: 78.0421, rating: 4.9, description: "Iconic ivory-white marble mausoleum on Yamuna river.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "meenakshi-temple", name: "Meenakshi Amman Temple", city: "Madurai", country: "India", region: "Asia", vibe: "Heritage & Culture", lat: 9.9195, lng: 78.1193, rating: 4.9, description: "Historic colorful temple on the southern bank of Vaigai river.", category: "attraction", icon: "material-symbols:temple-hindu-outline" },
  { id: "mount-fuji", name: "Mount Fuji", city: "Shizuoka", country: "Japan", region: "Asia", vibe: "Adventure & Nature", lat: 35.3606, lng: 138.7274, rating: 4.9, description: "Japan's highest sacred mountain with iconic snow-capped peak.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "fushimi-inari", name: "Fushimi Inari Shrine", city: "Kyoto", country: "Japan", region: "Asia", vibe: "Heritage & Culture", lat: 34.9671, lng: 135.7727, rating: 4.8, description: "Famous shrine with thousands of vermilion torii gates.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "great-wall", name: "Great Wall of China", city: "Beijing", country: "China", region: "Asia", vibe: "Heritage & Culture", lat: 40.4319, lng: 116.5704, rating: 4.9, description: "Historic fortification series spanning across northern China.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "forbidden-city", name: "Forbidden City", city: "Beijing", country: "China", region: "Asia", vibe: "Heritage & Culture", lat: 39.9163, lng: 116.3972, rating: 4.8, description: "Imperial palace complex from the Ming dynasty to Qing dynasty.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "marina-bay-sands", name: "Marina Bay Sands", city: "Singapore", country: "Singapore", region: "Asia", vibe: "City & Luxury", lat: 1.2834, lng: 103.8607, rating: 4.8, description: "Iconic luxury resort with infinity pool overlooking Singapore skyline.", category: "attraction", icon: "material-symbols:apartment" },
  { id: "tanah-lot", name: "Tanah Lot Temple", city: "Bali", country: "Indonesia", region: "Asia", vibe: "Honeymoon & Romantic", lat: -8.6212, lng: 115.0868, rating: 4.8, description: "Ancient Hindu shrine perched on an offshore rock formation.", category: "attraction", icon: "material-symbols:water-drop-outline" },
  { id: "phi-phi-islands", name: "Phi Phi Islands", city: "Phuket", country: "Thailand", region: "Asia", vibe: "Beach & Island", lat: 7.7407, lng: 98.7784, rating: 4.9, description: "Tropical paradise islands with turquoise waters and limestone cliffs.", category: "attraction", icon: "material-symbols:pool" },
  { id: "grand-palace", name: "Grand Palace", city: "Bangkok", country: "Thailand", region: "Asia", vibe: "Heritage & Culture", lat: 13.75, lng: 100.4914, rating: 4.7, description: "Dazzling complex of royal buildings in heart of Bangkok.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "angkor-wat", name: "Angkor Wat", city: "Siem Reap", country: "Cambodia", region: "Asia", vibe: "Heritage & Culture", lat: 13.4125, lng: 103.867, rating: 4.9, description: "Largest religious monument in the world and UNESCO site.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "ha-long-bay", name: "Ha Long Bay", city: "Quang Ninh", country: "Vietnam", region: "Asia", vibe: "Summer Vacation", lat: 20.9101, lng: 107.1839, rating: 4.9, description: "Emerald waters and thousands of towering limestone islands.", category: "attraction", icon: "material-symbols:sailing" },
  { id: "petronas-towers", name: "Petronas Twin Towers", city: "Kuala Lumpur", country: "Malaysia", region: "Asia", vibe: "City & Luxury", lat: 3.1579, lng: 101.7116, rating: 4.7, description: "88-storey twin skyscrapers joined by a high-altitude skybridge.", category: "attraction", icon: "material-symbols:apartment" },
  { id: "borobudur", name: "Borobudur Temple", city: "Magelang", country: "Indonesia", region: "Asia", vibe: "Heritage & Culture", lat: -7.6079, lng: 110.2038, rating: 4.8, description: "9th-century Mahayana Buddhist temple in Central Java.", category: "attraction", icon: "material-symbols:temple-hindu-outline" },
  { id: "bagan", name: "Bagan Temples", city: "Bagan", country: "Myanmar", region: "Asia", vibe: "Honeymoon & Romantic", lat: 21.1717, lng: 94.8585, rating: 4.9, description: "Ancient city with thousands of Buddhist pagodas across plains.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "sigiriya", name: "Sigiriya Rock Fortress", city: "Matale", country: "Sri Lanka", region: "Asia", vibe: "Adventure & Nature", lat: 7.957, lng: 80.7603, rating: 4.8, description: "Ancient rock fortress dominated by a massive column of rock.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "golden-temple", name: "Golden Temple", city: "Amritsar", country: "India", region: "Asia", vibe: "Heritage & Culture", lat: 31.62, lng: 74.8765, rating: 4.9, description: "Holiest gurdwara of Sikhism surrounded by a sacred pool.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "hawa-mahal", name: "Hawa Mahal", city: "Jaipur", country: "India", region: "Asia", vibe: "Heritage & Culture", lat: 26.9239, lng: 75.8267, rating: 4.7, description: "Palace of Winds constructed of red and pink sandstone.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "kerala-backwaters", name: "Kerala Backwaters", city: "Alleppey", country: "India", region: "Asia", vibe: "Honeymoon & Romantic", lat: 9.4981, lng: 76.3388, rating: 4.9, description: "Serene network of brackish lagoons, lakes and canals.", category: "attraction", icon: "material-symbols:houseboat" },
  { id: "varanasi-ghats", name: "Varanasi Ghats", city: "Varanasi", country: "India", region: "Asia", vibe: "Heritage & Culture", lat: 25.3076, lng: 83.0101, rating: 4.8, description: "Riverfront steps leading to the Ganges in spiritual heart of India.", category: "attraction", icon: "material-symbols:water-drop-outline" },
  { id: "jeju-island", name: "Jeju Island", city: "Jeju", country: "South Korea", region: "Asia", vibe: "Summer Vacation", lat: 33.4996, lng: 126.5312, rating: 4.7, description: "Volcanic island known for beach resorts and volcanic craters.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "seoul-tower", name: "N Seoul Tower", city: "Seoul", country: "South Korea", region: "Asia", vibe: "City & Luxury", lat: 37.5512, lng: 126.9882, rating: 4.7, description: "Communication and observation tower located on Namsan Mountain.", category: "attraction", icon: "material-symbols:cell-tower" },
  { id: "victoria-peak", name: "Victoria Peak", city: "Hong Kong", country: "Hong Kong", region: "Asia", vibe: "City & Luxury", lat: 22.2759, lng: 114.1455, rating: 4.8, description: "Hill on western Hong Kong Island offering panoramic harbor views.", category: "attraction", icon: "material-symbols:location-city-outline" },
  { id: "chocolate-hills", name: "Chocolate Hills", city: "Bohol", country: "Philippines", region: "Asia", vibe: "Adventure & Nature", lat: 9.9167, lng: 124.1667, rating: 4.8, description: "Geological formation of over 1,000 conical hills in Bohol.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "el-nido", name: "El Nido", city: "Palawan", country: "Philippines", region: "Asia", vibe: "Beach & Island", lat: 11.1956, lng: 119.4175, rating: 4.9, description: "Famous for white-sand beaches, coral reefs and steep karst cliffs.", category: "attraction", icon: "material-symbols:pool" },
  { id: "everest-bc", name: "Everest Base Camp", city: "Solukhumbu", country: "Nepal", region: "Asia", vibe: "Adventure & Nature", lat: 28.0026, lng: 86.8528, rating: 4.9, description: "World-famous high-altitude trekking destination below Mount Everest.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "kinabalu", name: "Mount Kinabalu", city: "Sabah", country: "Malaysia", region: "Asia", vibe: "Adventure & Nature", lat: 6.075, lng: 116.5583, rating: 4.8, description: "Highest peak in Borneo's Crocker Range with rich biodiversity.", category: "attraction", icon: "material-symbols:hiking" },
  { id: "jiuzhaigou", name: "Jiuzhaigou Valley", city: "Sichuan", country: "China", region: "Asia", vibe: "Adventure & Nature", lat: 33.26, lng: 103.92, rating: 4.9, description: "Nature reserve known for multi-tiered waterfalls and colorful lakes.", category: "attraction", icon: "material-symbols:park" },
  { id: "jiufen", name: "Jiufen Old Street", city: "New Taipei", country: "Taiwan", region: "Asia", vibe: "Heritage & Culture", lat: 25.1089, lng: 121.8442, rating: 4.7, description: "Mountain town famous for lantern-lit narrow alleys and tea houses.", category: "attraction", icon: "material-symbols:storefront" },
  { id: "maldives-atoll", name: "Maldives Private Atolls", city: "Male", country: "Maldives", region: "Asia", vibe: "Honeymoon & Romantic", lat: 3.2028, lng: 73.2207, rating: 4.9, description: "Ultra-luxury overwater bungalows over pristine turquoise lagoons.", category: "attraction", icon: "material-symbols:pool" },

  // EUROPE (30)
  { id: "eiffel-tower", name: "Eiffel Tower", city: "Paris", country: "France", region: "Europe", vibe: "Honeymoon & Romantic", lat: 48.8584, lng: 2.2945, rating: 4.8, description: "World-famous wrought-iron lattice tower in Paris.", category: "attraction", icon: "material-symbols:location-city-outline" },
  { id: "louvre", name: "Louvre Museum", city: "Paris", country: "France", region: "Europe", vibe: "Heritage & Culture", lat: 48.8606, lng: 2.3376, rating: 4.8, description: "World's largest art museum housing Mona Lisa and Venus de Milo.", category: "attraction", icon: "material-symbols:museum" },
  { id: "colosseum", name: "Colosseum", city: "Rome", country: "Italy", region: "Europe", vibe: "Heritage & Culture", lat: 41.8902, lng: 12.4922, rating: 4.8, description: "Ancient amphitheatre in the centre of Rome.", category: "attraction", icon: "material-symbols:domain" },
  { id: "venice-canals", name: "Grand Canal Venice", city: "Venice", country: "Italy", region: "Europe", vibe: "Honeymoon & Romantic", lat: 45.4371, lng: 12.3326, rating: 4.9, description: "Romantic waterway lined with Renaissance and Gothic palaces.", category: "attraction", icon: "material-symbols:sailing" },
  { id: "pisa-tower", name: "Leaning Tower of Pisa", city: "Pisa", country: "Italy", region: "Europe", vibe: "Summer Vacation", lat: 43.723, lng: 10.3966, rating: 4.6, description: "Freestanding bell tower famous for its unintended tilt.", category: "attraction", icon: "material-symbols:domain" },
  { id: "sagrada-familia", name: "Sagrada Familia", city: "Barcelona", country: "Spain", region: "Europe", vibe: "Heritage & Culture", lat: 41.4036, lng: 2.1744, rating: 4.9, description: "Unfinished masterpiece basilica designed by Antoni Gaudí.", category: "attraction", icon: "material-symbols:church" },
  { id: "alhambra", name: "Alhambra Palace", city: "Granada", country: "Spain", region: "Europe", vibe: "Heritage & Culture", lat: 37.1773, lng: -3.5898, rating: 4.8, description: "Stunning Moorish palace and fortress complex in Andalusia.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "big-ben", name: "Big Ben & Westminster", city: "London", country: "UK", region: "Europe", vibe: "City & Luxury", lat: 51.5007, lng: -0.1246, rating: 4.7, description: "Iconic clock tower and Elizabeth Tower at Houses of Parliament.", category: "attraction", icon: "material-symbols:schedule" },
  { id: "stonehenge", name: "Stonehenge", city: "Wiltshire", country: "UK", region: "Europe", vibe: "Heritage & Culture", lat: 51.1789, lng: -1.8262, rating: 4.6, description: "Prehistoric megalithic monument of standing stones.", category: "attraction", icon: "material-symbols:explore-outline" },
  { id: "neuschwanstein", name: "Neuschwanstein Castle", city: "Bavaria", country: "Germany", region: "Europe", vibe: "Honeymoon & Romantic", lat: 47.5576, lng: 10.7498, rating: 4.9, description: "Fairy-tale 19th-century palace set on rugged hill in Bavaria.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "brandenburg-gate", name: "Brandenburg Gate", city: "Berlin", country: "Germany", region: "Europe", vibe: "Heritage & Culture", lat: 52.5163, lng: 13.3777, rating: 4.7, description: "18th-century neoclassical monument and symbol of German unity.", category: "attraction", icon: "material-symbols:door-sliding" },
  { id: "santorini", name: "Santorini Caldera", city: "Thira", country: "Greece", region: "Europe", vibe: "Honeymoon & Romantic", lat: 36.3932, lng: 25.4615, rating: 4.9, description: "White-washed cliffside villages and breathtaking Aegean sunsets.", category: "attraction", icon: "material-symbols:water-drop-outline" },
  { id: "acropolis", name: "Acropolis of Athens", city: "Athens", country: "Greece", region: "Europe", vibe: "Heritage & Culture", lat: 37.9715, lng: 23.7257, rating: 4.8, description: "Ancient citadel containing Parthenon overlooking Athens.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "charles-bridge", name: "Charles Bridge", city: "Prague", country: "Czechia", region: "Europe", vibe: "Honeymoon & Romantic", lat: 50.0865, lng: 14.4114, rating: 4.8, description: "Historic Gothic stone bridge lined with baroque statues.", category: "attraction", icon: "material-symbols:bridge" },
  { id: "matterhorn", name: "Matterhorn Alpine Peak", city: "Zermatt", country: "Switzerland", region: "Europe", vibe: "Adventure & Nature", lat: 45.9763, lng: 7.6586, rating: 4.9, description: "Pyramidal mountain peak in the Alps near Zermatt.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "lake-como", name: "Lake Como", city: "Lombardy", country: "Italy", region: "Europe", vibe: "Honeymoon & Romantic", lat: 45.9904, lng: 9.2592, rating: 4.8, description: "Upscale resort lake set against foothills of the Alps.", category: "attraction", icon: "material-symbols:houseboat" },
  { id: "amalfi-coast", name: "Amalfi Coast & Positano", city: "Positano", country: "Italy", region: "Europe", vibe: "Summer Vacation", lat: 40.6281, lng: 14.485, rating: 4.9, description: "Dramatic cliffside coastal towns with pastel houses and beaches.", category: "attraction", icon: "material-symbols:pool" },
  { id: "dubrovnik", name: "Dubrovnik Old Town Walls", city: "Dubrovnik", country: "Croatia", region: "Europe", vibe: "Summer Vacation", lat: 42.6413, lng: 18.1103, rating: 4.8, description: "Massive stone walls encircling Old Town on Adriatic coast.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "plitvice-lakes", name: "Plitvice Lakes Park", city: "Lika", country: "Croatia", region: "Europe", vibe: "Adventure & Nature", lat: 44.8654, lng: 15.6022, rating: 4.9, description: "Cascading terraced lakes joined by waterfalls in green forest.", category: "attraction", icon: "material-symbols:water-drop-outline" },
  { id: "hallstatt", name: "Hallstatt Village", city: "Hallstatt", country: "Austria", region: "Europe", vibe: "Honeymoon & Romantic", lat: 47.5622, lng: 13.6493, rating: 4.9, description: "Picturesque alpine village on Lake Hallstatt's western shore.", category: "attraction", icon: "material-symbols:cottage" },
  { id: "blue-lagoon", name: "Blue Lagoon Geothermal Spa", city: "Grindavik", country: "Iceland", region: "Europe", vibe: "Adventure & Nature", lat: 63.8804, lng: -22.4495, rating: 4.8, description: "Geothermal spa in lava field with milky blue mineral water.", category: "attraction", icon: "material-symbols:hot-tub" },
  { id: "geirangerfjord", name: "Geirangerfjord", city: "Møre og Romsdal", country: "Norway", region: "Europe", vibe: "Adventure & Nature", lat: 62.1015, lng: 7.0941, rating: 4.9, description: "Deep blue UNESCO fjord surrounded by towering snow peaks.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "keukenhof", name: "Keukenhof Tulip Gardens", city: "Lisse", country: "Netherlands", region: "Europe", vibe: "Summer Vacation", lat: 52.2697, lng: 4.5466, rating: 4.8, description: "One of the world's largest flower gardens with millions of tulips.", category: "attraction", icon: "material-symbols:local-florist" },
  { id: "mont-saint-michel", name: "Mont Saint-Michel Abbey", city: "Normandy", country: "France", region: "Europe", vibe: "Heritage & Culture", lat: 48.6361, lng: -1.5115, rating: 4.9, description: "Tidal island commune crowned by a medieval Gothic abbey.", category: "attraction", icon: "material-symbols:church" },
  { id: "cappadocia", name: "Cappadocia Hot Air Balloons", city: "Nevsehir", country: "Turkey", region: "Europe", vibe: "Honeymoon & Romantic", lat: 38.6431, lng: 34.8289, rating: 4.9, description: "Surreal fairy chimney rock formations with sunrise balloon rides.", category: "attraction", icon: "material-symbols:air" },
  { id: "hagia-sophia", name: "Hagia Sophia Mosque", city: "Istanbul", country: "Turkey", region: "Europe", vibe: "Heritage & Culture", lat: 41.0086, lng: 28.9802, rating: 4.9, description: "Byzantine architectural marvel with historic dome and mosaics.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "pamukkale", name: "Pamukkale Thermal Travertines", city: "Denizli", country: "Turkey", region: "Europe", vibe: "Summer Vacation", lat: 37.9204, lng: 29.1212, rating: 4.7, description: "White travertine terraces formed by mineral thermal waters.", category: "attraction", icon: "material-symbols:water-drop-outline" },
  { id: "bran-castle", name: "Bran Dracula Castle", city: "Transylvania", country: "Romania", region: "Europe", vibe: "Heritage & Culture", lat: 45.5149, lng: 25.3672, rating: 4.6, description: "Medieval fortress famously associated with the Dracula legend.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "cliffs-of-moher", name: "Cliffs of Moher", city: "Clare", country: "Ireland", region: "Europe", vibe: "Adventure & Nature", lat: 52.9719, lng: -9.4265, rating: 4.8, description: "Dramatic sea cliffs towering 214 meters above Atlantic Ocean.", category: "attraction", icon: "material-symbols:landscape-outline" },

  // AMERICAS (25)
  { id: "statue-of-liberty", name: "Statue of Liberty", city: "New York", country: "USA", region: "Americas", vibe: "City & Luxury", lat: 40.6892, lng: -74.0445, rating: 4.7, description: "Colossal neoclassical sculpture on Liberty Island.", category: "attraction", icon: "material-symbols:location-city-outline" },
  { id: "times-square", name: "Times Square", city: "New York", country: "USA", region: "Americas", vibe: "City & Luxury", lat: 40.758, lng: -73.9855, rating: 4.7, description: "Bustling commercial intersection illuminated by digital billboards.", category: "attraction", icon: "material-symbols:storefront" },
  { id: "grand-canyon", name: "Grand Canyon National Park", city: "Arizona", country: "USA", region: "Americas", vibe: "Adventure & Nature", lat: 36.1069, lng: -112.1129, rating: 4.9, description: "Immense steep-sided canyon carved by the Colorado River.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "yellowstone", name: "Yellowstone National Park", city: "Wyoming", country: "USA", region: "Americas", vibe: "Adventure & Nature", lat: 44.428, lng: -110.5885, rating: 4.9, description: "Geothermal wonderland featuring Old Faithful geyser and wildlife.", category: "attraction", icon: "material-symbols:park" },
  { id: "golden-gate", name: "Golden Gate Bridge", city: "San Francisco", country: "USA", region: "Americas", vibe: "City & Luxury", lat: 37.8199, lng: -122.4783, rating: 4.8, description: "Iconic suspension bridge spanning the Golden Gate strait.", category: "attraction", icon: "material-symbols:bridge" },
  { id: "disney-world", name: "Walt Disney World Resort", city: "Orlando", country: "USA", region: "Americas", vibe: "Summer Vacation", lat: 28.3852, lng: -81.5639, rating: 4.8, description: "World's most famous entertainment resort and theme parks.", category: "attraction", icon: "material-symbols:attractions" },
  { id: "niagara-falls", name: "Niagara Falls", city: "New York / Ontario", country: "USA / Canada", region: "Americas", vibe: "Summer Vacation", lat: 43.0896, lng: -79.0849, rating: 4.8, description: "Massive waterfalls straddling international border.", category: "attraction", icon: "material-symbols:water-drop-outline" },
  { id: "banff", name: "Banff & Moraine Lake", city: "Alberta", country: "Canada", region: "Americas", vibe: "Adventure & Nature", lat: 51.3217, lng: -116.186, rating: 4.9, description: "Turquoise glacial lake surrounded by Canadian Rocky Mountains.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "cn-tower", name: "CN Tower", city: "Toronto", country: "Canada", region: "Americas", vibe: "City & Luxury", lat: 43.6426, lng: -79.3871, rating: 4.7, description: "553-meter concrete communications and observation tower.", category: "attraction", icon: "material-symbols:cell-tower" },
  { id: "machu-picchu", name: "Machu Picchu", city: "Cusco", country: "Peru", region: "Americas", vibe: "Heritage & Culture", lat: -13.1631, lng: -72.545, rating: 4.9, description: "15th-century Inca citadel in the Andes mountains.", category: "attraction", icon: "material-symbols:explore-outline" },
  { id: "christ-redeemer", name: "Christ the Redeemer", city: "Rio de Janeiro", country: "Brazil", region: "Americas", vibe: "Heritage & Culture", lat: -22.9519, lng: -43.2105, rating: 4.9, description: "Art Deco statue of Jesus Christ atop Corcovado mountain.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "iguazu-falls", name: "Iguazu Falls", city: "Foz do Iguacu", country: "Brazil / Argentina", region: "Americas", vibe: "Adventure & Nature", lat: -25.6953, lng: -54.4367, rating: 4.9, description: "Spectacular chain of 275 waterfalls in rainforest basin.", category: "attraction", icon: "material-symbols:water-drop-outline" },
  { id: "chichen-itza", name: "Chichen Itza Pyramid", city: "Yucatan", country: "Mexico", region: "Americas", vibe: "Heritage & Culture", lat: 20.6843, lng: -88.5678, rating: 4.8, description: "Massive Maya pyramid and archaeological complex.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "cancun", name: "Cancun Beach Riviera", city: "Cancun", country: "Mexico", region: "Americas", vibe: "Beach & Island", lat: 21.1619, lng: -86.8515, rating: 4.8, description: "Turquoise Caribbean beaches and vibrant night culture.", category: "attraction", icon: "material-symbols:pool" },
  { id: "salar-uyuni", name: "Salar de Uyuni Salt Flats", city: "Uyuni", country: "Bolivia", region: "Americas", vibe: "Adventure & Nature", lat: -20.1338, lng: -67.4891, rating: 4.9, description: "World's largest salt flat creating a giant mirror reflection.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "torres-paine", name: "Torres del Paine", city: "Patagonia", country: "Chile", region: "Americas", vibe: "Adventure & Nature", lat: -51.2532, lng: -72.9567, rating: 4.9, description: "Granite towers, glaciers and blue icebergs in Chilean Patagonia.", category: "attraction", icon: "material-symbols:hiking" },
  { id: "galapagos", name: "Galapagos Islands", city: "Puerto Ayora", country: "Ecuador", region: "Americas", vibe: "Adventure & Nature", lat: -0.7428, lng: -90.3168, rating: 4.9, description: "Volcanic archipelago famed for unique endemic wildlife species.", category: "attraction", icon: "material-symbols:pets" },
  { id: "cartagena", name: "Cartagena Walled City", city: "Cartagena", country: "Colombia", region: "Americas", vibe: "Honeymoon & Romantic", lat: 10.4236, lng: -75.5478, rating: 4.8, description: "Colonial town with colorful bougainvillea balconies on Caribbean.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "yosemite", name: "Yosemite Valley", city: "California", country: "USA", region: "Americas", vibe: "Adventure & Nature", lat: 37.7456, lng: -119.5936, rating: 4.9, description: "Sierra Nevada park known for giant sequoias and granite cliffs.", category: "attraction", icon: "material-symbols:park" },
  { id: "copacabana", name: "Copacabana Beach", city: "Rio de Janeiro", country: "Brazil", region: "Americas", vibe: "Summer Vacation", lat: -22.9711, lng: -43.1822, rating: 4.7, description: "Famous 4 km crescent beach with mosaic promenade in Rio.", category: "attraction", icon: "material-symbols:pool" },

  // MIDDLE EAST & AFRICA (15)
  { id: "burj-khalifa", name: "Burj Khalifa", city: "Dubai", country: "UAE", region: "Middle East", vibe: "City & Luxury", lat: 25.1972, lng: 55.2744, rating: 4.8, description: "World's tallest skyscraper standing at 828 meters.", category: "attraction", icon: "material-symbols:apartment" },
  { id: "sheikh-zayed-mosque", name: "Sheikh Zayed Mosque", city: "Abu Dhabi", country: "UAE", region: "Middle East", vibe: "Heritage & Culture", lat: 24.4128, lng: 54.4744, rating: 4.9, description: "Grand white marble mosque with 82 domes and floral courtyards.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "pyramids-giza", name: "Pyramids of Giza", city: "Cairo", country: "Egypt", region: "Africa", vibe: "Heritage & Culture", lat: 29.9792, lng: 31.1342, rating: 4.9, description: "Ancient monument complex & oldest of the Ancient World Wonders.", category: "attraction", icon: "material-symbols:account-balance-outline" },
  { id: "karnak", name: "Karnak Temple Complex", city: "Luxor", country: "Egypt", region: "Africa", vibe: "Heritage & Culture", lat: 25.7188, lng: 32.6573, rating: 4.8, description: "Vast open-air museum of ancient Egyptian pylons and columns.", category: "attraction", icon: "material-symbols:fort-outline" },
  { id: "petra", name: "Petra Treasury", city: "Ma'an", country: "Jordan", region: "Middle East", vibe: "Heritage & Culture", lat: 30.3285, lng: 35.4444, rating: 4.9, description: "Famous rock-cut temple carved into pink sandstone cliff.", category: "attraction", icon: "material-symbols:explore-outline" },
  { id: "table-mountain", name: "Table Mountain", city: "Cape Town", country: "South Africa", region: "Africa", vibe: "Adventure & Nature", lat: -33.9628, lng: 18.4098, rating: 4.8, description: "Flat-topped mountain overlooking the city of Cape Town.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "victoria-falls", name: "Victoria Falls", city: "Livingstone", country: "Zambia / Zimbabwe", region: "Africa", vibe: "Adventure & Nature", lat: -17.9244, lng: 25.8572, rating: 4.9, description: "Largest curtain of falling water in the world on Zambezi River.", category: "attraction", icon: "material-symbols:water-drop-outline" },
  { id: "serengeti", name: "Serengeti Migration", city: "Mara", country: "Tanzania", region: "Africa", vibe: "Adventure & Nature", lat: -2.3333, lng: 34.8333, rating: 4.9, description: "Vast ecosystem famous for annual Great Wildebeest Migration.", category: "attraction", icon: "material-symbols:pets" },
  { id: "kilimanjaro", name: "Mount Kilimanjaro", city: "Kilimanjaro", country: "Tanzania", region: "Africa", vibe: "Adventure & Nature", lat: -3.0674, lng: 37.3556, rating: 4.9, description: "Africa's highest dormant volcano peak at 5,895 meters.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "chefchaouen", name: "Chefchaouen Blue City", city: "Chefchaouen", country: "Morocco", region: "Africa", vibe: "Summer Vacation", lat: 35.1714, lng: -5.2697, rating: 4.8, description: "Mountain city famous for striking blue-washed buildings.", category: "attraction", icon: "material-symbols:palette-outline" },
  { id: "marrakech", name: "Jemaa el-Fnaa Marrakech", city: "Marrakech", country: "Morocco", region: "Africa", vibe: "Heritage & Culture", lat: 31.6258, lng: -7.9891, rating: 4.7, description: "Bustling historic square filled with souks, performers and food.", category: "attraction", icon: "material-symbols:storefront" },
  { id: "al-ula", name: "AlUla Hegra Monument", city: "AlUla", country: "Saudi Arabia", region: "Middle East", vibe: "Heritage & Culture", lat: 26.8025, lng: 37.9547, rating: 4.9, description: "UNESCO Nabataean rock-cut tombs carved into desert sandstone.", category: "attraction", icon: "material-symbols:explore-outline" },
  { id: "dead-sea", name: "Dead Sea Floating Coast", city: "Sweimeh", country: "Jordan", region: "Middle East", vibe: "Summer Vacation", lat: 31.559, lng: 35.6042, rating: 4.8, description: "Hypersaline lake where visitors float effortlessly on water.", category: "attraction", icon: "material-symbols:pool" },

  // OCEANIA (5)
  { id: "sydney-opera", name: "Sydney Opera House", city: "Sydney", country: "Australia", region: "Oceania", vibe: "City & Luxury", lat: -33.8568, lng: 151.2153, rating: 4.8, description: "Multi-venue performing arts centre in Sydney Harbour.", category: "attraction", icon: "material-symbols:theater-comedy-outline" },
  { id: "barrier-reef", name: "Great Barrier Reef", city: "Cairns", country: "Australia", region: "Oceania", vibe: "Beach & Island", lat: -18.2871, lng: 147.6992, rating: 4.9, description: "World's largest coral reef system brimming with marine life.", category: "attraction", icon: "material-symbols:pool" },
  { id: "milford-sound", name: "Milford Sound Fjord", city: "Fiordland", country: "New Zealand", region: "Oceania", vibe: "Adventure & Nature", lat: -44.6414, lng: 167.8974, rating: 4.9, description: "Fiord in southwest of New Zealand's South Island.", category: "attraction", icon: "material-symbols:landscape-outline" },
  { id: "hobbiton", name: "Hobbiton Movie Set", city: "Matamata", country: "New Zealand", region: "Oceania", vibe: "Summer Vacation", lat: -37.8721, lng: 175.6829, rating: 4.8, description: "Enchanting green hobbit hole village set in rolling hills.", category: "attraction", icon: "material-symbols:cottage" },
  { id: "uluru", name: "Uluru Rock monolith", city: "Northern Territory", country: "Australia", region: "Oceania", vibe: "Heritage & Culture", lat: -25.3444, lng: 131.0369, rating: 4.9, description: "Massive sacred sandstone monolith in Red Centre desert.", category: "attraction", icon: "material-symbols:landscape-outline" },
];

const POPULAR_DESTINATIONS = [
  { name: "Paris, France", lat: 48.8566, lng: 2.3522, category: "attraction" },
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, category: "attraction" },
  { name: "New York, USA", lat: 40.7128, lng: -74.006, category: "attraction" },
  { name: "Rome, Italy", lat: 41.9028, lng: 12.4964, category: "attraction" },
  { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, category: "attraction" },
  { name: "Bali, Indonesia", lat: -8.4095, lng: 115.1889, category: "attraction" },
];

export default function PlanTripPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const spotModalRef = useRef<HTMLDivElement>(null);
  const spotModalScrollRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [tripMarkers, setTripMarkers] = useState<MarkerData[]>([]);
  const routeDistancesRef = useRef<{ [key: string]: number }>({});
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"search" | "itinerary" | "tourism">("search");

  // Peak Tourism Feature states
  const [showTourismPins, setShowTourismPins] = useState<boolean>(true);
  const [selectedTourismRegion, setSelectedTourismRegion] = useState<string>("All");
  const [selectedTourismVibe, setSelectedTourismVibe] = useState<string>("All");
  const [tourismSearchQuery, setTourismSearchQuery] = useState<string>("");
  const tourismGroupRef = useRef<any>(null);

  // Spot Details Modal state with Google Programmable Search, Photo Gallery & In-Modal Web Reader
  const [selectedSpotForModal, setSelectedSpotForModal] = useState<PeakTourismSpot | null>(null);
  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(null);
  const [wikiData, setWikiData] = useState<{ extract?: string; thumbnail?: string; pageUrl?: string } | null>(null);
  const [wikiLoading, setWikiLoading] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<"articles" | "images">("articles");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryLoading, setGalleryLoading] = useState<boolean>(false);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);

  const handleOpenSpotModal = (spot: PeakTourismSpot) => {
    setSelectedSpotForModal(spot);
    setActiveIframeUrl(null);
    setModalTab("articles");
    setSelectedImagePreview(null);
  };

  const handleCloseSpotModal = () => {
    setSelectedSpotForModal(null);
    setActiveIframeUrl(null);
    setSelectedImagePreview(null);
    if (typeof document !== "undefined") {
      document.body.classList.remove("cse-modal-open");
      document.body.classList.remove("spot-modal-open");
      document.documentElement.classList.remove("spot-modal-open");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    try {
      if ((window as any).google?.search?.cse?.element) {
        const allElements = (window as any).google.search.cse.element.getAllElements();
        if (allElements) {
          Object.values(allElements).forEach((el: any) => {
            if (el && typeof el.clearAllResults === "function") {
              el.clearAllResults();
            }
          });
        }
      }
    } catch (e) { }
  };

  // Keyboard accessibility (Escape to close modals/previews), Body/HTML scroll lock & Leaflet wheel zoom isolation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImagePreview) {
          setSelectedImagePreview(null);
        } else if (selectedSpotForModal) {
          handleCloseSpotModal();
        } else if (showSuggestions) {
          setShowSuggestions(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (selectedSpotForModal || selectedImagePreview) {
      document.body.classList.add("spot-modal-open");
      document.documentElement.classList.add("spot-modal-open");
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Freeze background Leaflet map interaction while modal is open
      if (mapInstanceRef.current) {
        if (mapInstanceRef.current.scrollWheelZoom) mapInstanceRef.current.scrollWheelZoom.disable();
        if (mapInstanceRef.current.dragging) mapInstanceRef.current.dragging.disable();
      }
    } else {
      document.body.classList.remove("spot-modal-open");
      document.documentElement.classList.remove("spot-modal-open");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      if (mapInstanceRef.current) {
        if (mapInstanceRef.current.scrollWheelZoom) mapInstanceRef.current.scrollWheelZoom.enable();
        if (mapInstanceRef.current.dragging) mapInstanceRef.current.dragging.enable();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("spot-modal-open");
      document.documentElement.classList.remove("spot-modal-open");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (mapInstanceRef.current) {
        if (mapInstanceRef.current.scrollWheelZoom) mapInstanceRef.current.scrollWheelZoom.enable();
        if (mapInstanceRef.current.dragging) mapInstanceRef.current.dragging.enable();
      }
    };
  }, [selectedSpotForModal, selectedImagePreview, showSuggestions]);

  // Isolate modal events from background Leaflet map
  useEffect(() => {
    const modalEl = spotModalRef.current;
    if (!modalEl || !selectedSpotForModal) return;

    const L = (window as any).L;
    if (L?.DomEvent?.disableScrollPropagation) {
      L.DomEvent.disableScrollPropagation(modalEl);
    }
  }, [selectedSpotForModal]);

  // Fetch Wikipedia summary and thumbnail when a spot is opened in modal
  useEffect(() => {
    if (!selectedSpotForModal) {
      setWikiData(null);
      setWikiLoading(false);
      return;
    }
    setWikiLoading(true);
    setWikiData(null);
    let isMounted = true;

    const fetchWikiData = async () => {
      try {
        const queryTerm = `${selectedSpotForModal.name}`;
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(queryTerm)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setWikiData({
              extract: data.extract,
              thumbnail: data.thumbnail?.source,
              pageUrl: data.content_urls?.desktop?.page,
            });
          }
        }
      } catch (err) {
        console.error("Wikipedia API fetch error:", err);
      } finally {
        if (isMounted) setWikiLoading(false);
      }
    };

    fetchWikiData();
    return () => {
      isMounted = false;
    };
  }, [selectedSpotForModal]);

  // Fetch photo gallery from Wikimedia Commons for selected spot
  useEffect(() => {
    if (!selectedSpotForModal) {
      setGalleryImages([]);
      setGalleryLoading(false);
      return;
    }
    setGalleryLoading(true);
    let isMounted = true;

    const fetchPhotos = async () => {
      try {
        const queryTerm = `${selectedSpotForModal.name} ${selectedSpotForModal.city}`;
        const res = await fetch(
          `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(queryTerm)}&gsrnamespace=6&gsrlimit=18&prop=imageinfo&iiprop=url|mime&format=json&origin=*`
        );
        if (res.ok) {
          const data = await res.json();
          const pages = data.query?.pages || {};
          const urls: string[] = [];
          Object.values(pages).forEach((pg: any) => {
            const imgUrl = pg.imageinfo?.[0]?.url;
            const mime = pg.imageinfo?.[0]?.mime;
            if (imgUrl && mime && (mime.includes("jpeg") || mime.includes("jpg") || mime.includes("png") || mime.includes("webp"))) {
              if (!imgUrl.includes("logo") && !imgUrl.includes("icon") && !imgUrl.endsWith(".svg")) {
                urls.push(imgUrl);
              }
            }
          });
          if (isMounted) {
            setGalleryImages(urls);
          }
        }
      } catch (err) {
        console.error("Wikimedia photos fetch error:", err);
      } finally {
        if (isMounted) setGalleryLoading(false);
      }
    };

    fetchPhotos();
    return () => {
      isMounted = false;
    };
  }, [selectedSpotForModal]);

  const COMPETITOR_DOMAINS = [
    "tripadvisor.com",
    "booking.com",
    "viator.com",
    "expedia.com",
    "agoda.com",
    "klook.com",
    "makemytrip.com",
    "yatra.com",
    "goibibo.com",
    "getyourguide.com",
    "trivago.com",
    "airbnb.com",
    "kayak.com",
    "hotels.com",
    "cleartrip.com"
  ];

  const handleResultClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLElement | null;
    while (target && target !== e.currentTarget) {
      if (target.tagName === "A") {
        const anchor = target as HTMLAnchorElement;
        let rawUrl = anchor.getAttribute("data-ctorig") || anchor.href;

        // Unwrap Google CSE tracking redirect URLs to extract actual target web page URL
        if (rawUrl && rawUrl.includes("google.com/url")) {
          try {
            const parsed = new URL(rawUrl);
            const targetParam =
              parsed.searchParams.get("q") ||
              parsed.searchParams.get("url") ||
              parsed.searchParams.get("adurl");
            if (targetParam) {
              rawUrl = targetParam;
            }
          } catch (err) { }
        }

        if (rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))) {
          if (!rawUrl.includes("google.com/search") && !rawUrl.includes("cse.google.com")) {
            e.preventDefault();
            e.stopPropagation();

            // Check if domain is a commercial competitor site
            const isCompetitor = COMPETITOR_DOMAINS.some((domain) => rawUrl.toLowerCase().includes(domain));
            if (isCompetitor && selectedSpotForModal) {
              // Redirect competitor click to official Wikipedia article search for the spot
              const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(
                selectedSpotForModal.name + " " + selectedSpotForModal.city
              )}`;
              setActiveIframeUrl(wikiUrl);
              return;
            }

            setActiveIframeUrl(rawUrl);
            return;
          }
        }
      }
      target = target.parentElement;
    }
  };

  // Dynamically load Google CSE script and execute search query whenever selectedSpotForModal changes
  useEffect(() => {
    const scriptId = "google-cse-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cse.google.com/cse.js?cx=7029b5e14a4da48a2";
      script.async = true;
      document.head.appendChild(script);
    }

    if (selectedSpotForModal) {
      if (typeof document !== "undefined") {
        document.body.classList.add("cse-modal-open");
      }
      const query = `${selectedSpotForModal.name} ${selectedSpotForModal.city}`;

      const runSearch = () => {
        try {
          const gSearch = (window as any).google?.search?.cse?.element;
          if (gSearch) {
            const elem = gSearch.getElement("spot-search-element");
            if (elem && typeof elem.execute === "function") {
              elem.execute(query);
            } else {
              const allElements = gSearch.getAllElements();
              if (allElements) {
                Object.values(allElements).forEach((el: any) => {
                  if (el && typeof el.execute === "function") {
                    el.execute(query);
                  }
                });
              }
            }
          }
        } catch (e) {
          console.error("Google CSE execution error:", e);
        }
      };

      runSearch();
      const t1 = setTimeout(runSearch, 300);
      const t2 = setTimeout(runSearch, 850);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      if (typeof document !== "undefined") {
        document.body.classList.remove("cse-modal-open");
      }
    }
  }, [selectedSpotForModal]);

  // Drag-and-drop & Inline Edit state
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [editingMarkerId, setEditingMarkerId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<"attraction" | "hotel" | "restaurant" | "activity">("attraction");
  const [editNotes, setEditNotes] = useState("");

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Custom pin form state
  const [newMarkerPos, setNewMarkerPos] = useState<{ lat: number; lng: number } | null>(null);
  const [markerTitle, setMarkerTitle] = useState("");
  const [markerCategory, setMarkerCategory] = useState<"attraction" | "hotel" | "restaurant" | "activity">("attraction");
  const [markerNotes, setMarkerNotes] = useState("");

  const [leafLoaded, setLeafLoaded] = useState(false);
  const currentTileLayerRef = useRef<any>(null);
  const [mapStyle, setMapStyle] = useState<"google_streets" | "google_satellite" | "google_hybrid" | "google_terrain">("google_streets");

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load Leaflet dynamically
  useEffect(() => {
    // Add Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Add Leaflet JS
    if (!(window as any).L) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        setLeafLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setLeafLoaded(true);
    }

    // Add Paper.js canvas library for transport animation
    if (!(window as any).paper && !document.getElementById("paper-js")) {
      const paperScript = document.createElement("script");
      paperScript.id = "paper-js";
      paperScript.src = "https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.17/paper-full.min.js";
      document.body.appendChild(paperScript);
    }
  }, []);

  // Tile layer generator helper
  const createTileLayer = (L: any, style: string) => {
    let url = "https://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}";
    if (style === "google_satellite") {
      // Satellite imagery with transparent place names & country/road labels overlay
      url = "https://{s}.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}";
    } else if (style === "google_hybrid") {
      // Hybrid satellite imagery with road/place labels overlay
      url = "https://{s}.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}";
    } else if (style === "google_terrain") {
      url = "https://{s}.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}";
    }

    return L.tileLayer(url, {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "&copy; Google Maps",
    });
  };

  // Initialize Map
  useEffect(() => {
    if (!leafLoaded || !mapContainerRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    if (mapContainerRef.current && (mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

    // Initialize Leaflet Map over Google Maps Tiles
    const map = L.map(mapContainerRef.current, {
      center: [20.0, 0.0],
      zoom: 3,
      minZoom: 3,
      maxZoom: 20,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true,
      maxBounds: [
        [-85, -Infinity],
        [85, Infinity],
      ],
      maxBoundsViscosity: 1.0,
    });

    const tileLayer = createTileLayer(L, mapStyle);
    tileLayer.addTo(map);
    currentTileLayerRef.current = tileLayer;

    // Custom layer group for markers
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Auto-invalidate size to ensure tiles immediately load into view
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    setTimeout(() => {
      map.invalidateSize();
    }, 400);
    setTimeout(() => {
      map.invalidateSize();
    }, 800);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && mapContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
    }

    // Add click event for adding markers directly on map click (with robust village & town detection)
    map.on("click", async (e: any) => {
      const { lat, lng } = e.latlng;
      const formattedLat = Number(lat.toFixed(5));
      const formattedLng = Number(lng.toFixed(5));
      const currentZoom = map.getZoom();

      // Automatically open the panel and switch to search tab to show place pin details form
      setActiveTab("search");
      setIsPanelOpen(true);

      setNewMarkerPos({ lat: formattedLat, lng: formattedLng });
      setMarkerTitle(`Loading location details...`);

      const accurateName = await getAccuratePlaceName(formattedLat, formattedLng, currentZoom);
      setMarkerTitle(accurateName);
    });

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafLoaded]);

  // Robust Reverse Geocoding Algorithm (Prioritizes exact Town, Village, Hamlet, and Municipality)
  const getAccuratePlaceName = async (lat: number, lng: number, zoomLevel = 13): Promise<string> => {
    // Map zoom to appropriate Nominatim reverse geocode zoom depth
    const reqZoom = zoomLevel < 11 ? 10 : zoomLevel < 14 ? 14 : 18;

    // Source 1: OpenStreetMap Nominatim with full address details & extratags
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&zoom=${reqZoom}&addressdetails=1&extratags=1&namedetails=1&accept-language=en&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data && data.address) {
        const addr = data.address;

        // Priority order: Main geographical place (Town, Village, Hamlet, Municipality, City) BEFORE sub-localities
        const primary =
          addr.town ||
          addr.village ||
          addr.hamlet ||
          addr.municipality ||
          addr.city ||
          addr.suburb ||
          addr.neighbourhood ||
          addr.county ||
          data.name;

        if (primary) {
          const secondary = addr.state_district || addr.county || addr.state;
          return secondary && secondary !== primary && !primary.includes(secondary)
            ? `${primary}, ${secondary}`
            : primary;
        }
      }
      if (data && data.display_name) {
        const parts = data.display_name.split(",").map((p: string) => p.trim());
        return parts.slice(0, 2).join(", ");
      }
    } catch (e) {
      console.error("Nominatim reverse geocode error:", e);
    }

    // Source 2: Komoot Photon Reverse Geocoder (High accuracy for rural & small village coordinates)
    try {
      const res = await fetch(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lng}`);
      const data = await res.json();
      if (data && data.features && data.features.length > 0) {
        const props = data.features[0].properties || {};
        const name = props.name || props.district || props.city || props.county || props.street;
        if (name) {
          const state = props.state || props.country;
          return state && state !== name ? `${name}, ${state}` : name;
        }
      }
    } catch (e) {
      console.error("Photon reverse geocode error:", e);
    }

    return `Point (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  };

  // Robust & Instant Multi-Provider Search Algorithm (Photon API primary for instant 50ms response)
  const fetchAccurateSearchResults = async (query: string): Promise<SearchResult[]> => {
    if (!query || query.trim().length < 2) return [];

    const results: SearchResult[] = [];
    const seenKeys = new Set<string>();

    try {
      // Primary: Komoot Photon API (Ultra fast ~50ms response time)
      const photonRes = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=en&limit=10`
      );
      if (photonRes.ok) {
        const photonData = await photonRes.json();
        if (photonData && Array.isArray(photonData.features)) {
          photonData.features.forEach((feat: any) => {
            const props = feat.properties || {};
            const coords = feat.geometry?.coordinates || [];
            if (coords.length === 2) {
              const latStr = coords[1].toString();
              const lonStr = coords[0].toString();
              const mainName = props.name || props.street || props.district || props.city;
              const secondary = props.state || props.country || props.district;
              const formattedDisplay = secondary && mainName && !mainName.includes(secondary) ? `${mainName}, ${secondary}` : mainName || props.city;

              if (formattedDisplay) {
                const key = `${latStr.slice(0, 4)}_${lonStr.slice(0, 4)}_${mainName ? mainName.toLowerCase() : ""}`;
                if (!seenKeys.has(key)) {
                  seenKeys.add(key);
                  results.push({
                    place_id: props.osm_id || Math.random(),
                    display_name: formattedDisplay,
                    lat: latStr,
                    lon: lonStr,
                    type: props.type || props.osm_value || "place",
                  });
                }
              }
            }
          });
        }
      }
    } catch {
      // Ignore network CORS errors silently
    }

    // Fast non-blocking fallback if photon has few results
    if (results.length < 3) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 600); // 600ms strict timeout
        const nomRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);
        if (nomRes.ok) {
          const nomData = await nomRes.json();
          if (Array.isArray(nomData)) {
            nomData.forEach((item: any) => {
              const mainTitle = item.display_name.split(",")[0];
              const key = `${item.lat.slice(0, 4)}_${item.lon.slice(0, 4)}_${mainTitle.toLowerCase()}`;
              if (!seenKeys.has(key)) {
                seenKeys.add(key);
                results.push({
                  place_id: item.place_id,
                  display_name: item.display_name,
                  lat: item.lat,
                  lon: item.lon,
                  type: item.type || "place",
                });
              }
            });
          }
        }
      } catch {
        // Ignore timeout or network errors silently
      }
    }

    return results;
  };

  // Search submit handler
  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const data = await fetchAccurateSearchResults(searchQuery);
    setSearchResults(data);
    setShowSuggestions(data.length > 0);
    setIsSearching(false);
  };

  // Instant real-time debounced search effect (50ms delay)
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const data = await fetchAccurateSearchResults(searchQuery);
      setSearchResults(data);
      if (data.length > 0) {
        setShowSuggestions(true);
      }
      setIsSearching(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const routesGroupRef = useRef<any>(null);

  // Switch Tile Layer when mapStyle state changes
  useEffect(() => {
    if (!mapInstanceRef.current || !(window as any).L) return;
    const L = (window as any).L;

    if (currentTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    }

    const newLayer = createTileLayer(L, mapStyle);
    newLayer.addTo(mapInstanceRef.current);
    currentTileLayerRef.current = newLayer;
  }, [mapStyle]);

  // Helper to format duration seconds into human readable text
  const formatDuration = (seconds: number) => {
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return remMins > 0 ? `${hrs} hr ${remMins} min` : `${hrs} hr`;
  };

  // Calculate Haversine distance in kilometers between two coordinates
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  // Determine transport modes (Flights, IRCTC Train, Driving) & redirect URLs with full search params between consecutive stops
  const getTransportModesBetweenStops = (start: MarkerData, end: MarkerData) => {
    const startTitle = start.title.split(",")[0].trim();
    const endTitle = end.title.split(",")[0].trim();
    const pairKey = `${start.id}_${end.id}`;
    const cachedRoadKm = routeDistancesRef.current[pairKey];
    const distKm = cachedRoadKm ? cachedRoadKm : calculateDistanceKm(start.lat, start.lng, end.lat, end.lng);

    // Pre-filled Search Parameters for External Provider Redirects
    const flightUrl = `https://www.google.com/travel/flights?q=Flights%20from%20${encodeURIComponent(startTitle)}%20to%20${encodeURIComponent(endTitle)}`;
    const trainUrl = `https://www.google.com/search?q=${encodeURIComponent("IRCTC train search from " + startTitle + " to " + endTitle + " tickets")}`;
    const carUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(startTitle)}&destination=${encodeURIComponent(endTitle)}&travelmode=driving`;

    const isFlightRecommended = distKm > 350;
    const isTrainRecommended = distKm >= 25 && distKm <= 1600;
    const isCarRecommended = distKm <= 1000;

    return {
      distKm,
      startTitle,
      endTitle,
      flightUrl,
      trainUrl,
      carUrl,
      isFlightRecommended,
      isTrainRecommended,
      isCarRecommended,
    };
  };

  // Bezier curve points generator for Leaflet & Paper.js flight transport arcs
  const getCurvedArcPoints = (startLat: number, startLng: number, endLat: number, endLng: number, numPoints = 25) => {
    const points: [number, number][] = [];
    const midLat = (startLat + endLat) / 2;
    const midLng = (startLng + endLng) / 2;

    const dLat = endLat - startLat;
    const dLng = endLng - startLng;

    const controlLat = midLat + dLng * 0.22;
    const controlLng = midLng - dLat * 0.22;

    for (let t = 0; t <= 1; t += 1 / numPoints) {
      const lat = (1 - t) * (1 - t) * startLat + 2 * (1 - t) * t * controlLat + t * t * endLat;
      const lng = (1 - t) * (1 - t) * startLng + 2 * (1 - t) * t * controlLng + t * t * endLng;
      points.push([lat, lng]);
    }
    return points;
  };

  // Update map markers & road polylines when tripMarkers changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current || !(window as any).L) return;
    const L = (window as any).L;

    markersGroupRef.current.clearLayers();
    if (routesGroupRef.current) {
      routesGroupRef.current.clearLayers();
    } else {
      routesGroupRef.current = L.layerGroup().addTo(mapInstanceRef.current);
    }

    // 1. Render Pin Markers
    tripMarkers.forEach((m, idx) => {
      const colorMap = {
        attraction: "#FC0780",
        hotel: "#0DC36B",
        restaurant: "#F6AB03",
        activity: "#04ACBF",
      };

      const markerColor = colorMap[m.category] || "#FC0780";
      const stopNum = idx + 1;

      const customIcon = L.divIcon({
        className: "custom-leaflet-pin",
        html: `
          <div style="
            background: ${markerColor};
            width: 34px;
            height: 34px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2.5px solid white;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-size: 13px;
              font-weight: 900;
              font-family: sans-serif;
            ">${stopNum}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34],
      });

      const leafletMarker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(markersGroupRef.current);

      const popupContent = `
        <div style="font-family: sans-serif; padding: 4px; min-width: 160px;">
          <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: ${markerColor};">Stop #${stopNum} • ${m.category}</span>
          <h4 style="margin: 4px 0; font-size: 15px; font-weight: 800; color: #18181b;">${m.title}</h4>
          ${m.notes ? `<p style="margin: 0; font-size: 12px; color: #52525b;">${m.notes}</p>` : ''}
          <div style="margin-top: 8px; font-size: 11px; color: #71717a;">Lat: ${m.lat.toFixed(4)}, Lng: ${m.lng.toFixed(4)}</div>
        </div>
      `;

      leafletMarker.bindPopup(popupContent);
    });

    // 2. Fetch Driving Road Routes (Shortest Path & Alternative Routes like Google Maps)
    if (tripMarkers.length >= 2) {
      const fetchRoutes = async () => {
        for (let i = 0; i < tripMarkers.length - 1; i++) {
          const start = tripMarkers[i];
          const end = tripMarkers[i + 1];

          try {
            // OSRM Driving Engine requesting up to 3 alternative routes
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&alternatives=3`;
            let res = await fetch(osrmUrl);
            let data = await res.json();

            let routesList = data.routes || [];

            // Secondary fallback if single route returned: query with slight coordinate jitter to obtain distinct alternative road options
            if (routesList.length < 2) {
              try {
                const altUrl = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${(end.lng + 0.005).toFixed(5)},${(end.lat + 0.005).toFixed(5)}?overview=full&geometries=geojson`;
                const altRes = await fetch(altUrl);
                const altData = await altRes.json();
                if (altData.code === "Ok" && altData.routes && altData.routes.length > 0) {
                  routesList.push(altData.routes[0]);
                }
              } catch (_) { }
            }

            // Calculate distance & transport options between start and end stops
            const tInfo = getTransportModesBetweenStops(start, end);
            const midLat = (start.lat + end.lat) / 2;
            const midLng = (start.lng + end.lng) / 2;

            // Render curved flight arc line if flight is recommended (or distance > 350km / cross water)
            if (tInfo.isFlightRecommended) {
              const flightArcPoints = getCurvedArcPoints(start.lat, start.lng, end.lat, end.lng);
              L.polyline(flightArcPoints, {
                color: "#38bdf8",
                weight: 4,
                opacity: 0.9,
                dashArray: "8, 6",
              }).addTo(routesGroupRef.current);
            }

            // Render Midpoint Interactive Transport Badge on Map
            const transportBadgeHtml = `
              <div style="
                background: #18181b;
                color: white;
                padding: 4px 10px;
                border-radius: 9999px;
                border: 1.5px solid ${tInfo.isFlightRecommended ? '#38bdf8' : '#FC0780'};
                font-family: sans-serif;
                font-size: 11px;
                font-weight: 800;
                display: flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 6px 16px rgba(0,0,0,0.45);
                white-space: nowrap;
                cursor: pointer;
              ">
                <span style="color: #a1a1aa; font-size: 10px;">Stop #${i + 1}➔#${i + 2}</span>
                <span style="color: #fbbf24; font-weight: 900;">${tInfo.distKm.toLocaleString()} km</span>
                <div style="display: flex; align-items: center; gap: 5px; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 6px;">
                  <a href="${tInfo.flightUrl}" target="_blank" rel="noopener" title="Search Google Flights" style="text-decoration: none; font-size: 12px;">✈️</a>
                  <a href="${tInfo.trainUrl}" target="_blank" rel="noopener" title="IRCTC Train Search" style="text-decoration: none; font-size: 12px;">🚆</a>
                  <a href="${tInfo.carUrl}" target="_blank" rel="noopener" title="Google Maps Driving" style="text-decoration: none; font-size: 12px;">🚗</a>
                </div>
              </div>
            `;

            const tIcon = L.divIcon({
              className: "custom-transport-map-badge",
              html: transportBadgeHtml,
              iconSize: [175, 28],
              iconAnchor: [87, 14],
            });

            const midMarker = L.marker([midLat, midLng], { icon: tIcon }).addTo(routesGroupRef.current);
            midMarker.bindPopup(`
              <div style="font-family: sans-serif; padding: 6px; min-width: 220px;">
                <div style="font-size: 12px; font-weight: 900; color: #18181b; margin-bottom: 4px;">
                  Transport Options: ${tInfo.startTitle} ➔ ${tInfo.endTitle}
                </div>
                <div style="font-size: 11px; color: #71717a; margin-bottom: 8px;">
                  Distance: <b style="color: #18181b;">${tInfo.distKm.toLocaleString()} km</b>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <a href="${tInfo.flightUrl}" target="_blank" rel="noopener" style="background: #0284c7; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-content: space-between;">
                    <span>✈️ Search Google Flights</span>
                    <span>➔</span>
                  </a>
                  <a href="${tInfo.trainUrl}" target="_blank" rel="noopener" style="background: #d97706; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-content: space-between;">
                    <span>🚆 IRCTC Train Search</span>
                    <span>➔</span>
                  </a>
                  <a href="${tInfo.carUrl}" target="_blank" rel="noopener" style="background: #18181b; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-content: space-between;">
                    <span>🚗 Driving Route (Google Maps)</span>
                    <span>➔</span>
                  </a>
                </div>
              </div>
            `);

            if (data.code === "Ok" && routesList.length > 0) {
              // Sort routes by distance (shortest path first)
              const sortedRoutes = [...routesList].sort((a: any, b: any) => a.distance - b.distance);
              const bestRoute = sortedRoutes[0];
              const roadKmNum = Math.round(bestRoute.distance / 1000);
              const pairKey = `${start.id}_${end.id}`;
              routeDistancesRef.current[pairKey] = roadKmNum;

              // Re-evaluate transport modes with exact OSRM road distance
              const tInfo = getTransportModesBetweenStops(start, end);

              // Render curved flight arc line if flight is recommended
              if (tInfo.isFlightRecommended) {
                const flightArcPoints = getCurvedArcPoints(start.lat, start.lng, end.lat, end.lng);
                L.polyline(flightArcPoints, {
                  color: "#38bdf8",
                  weight: 4,
                  opacity: 0.9,
                  dashArray: "8, 6",
                }).addTo(routesGroupRef.current);
              }

              // Render Midpoint Interactive Transport Badge on Map with exact OSRM road distance
              const transportBadgeHtml = `
                <div style="
                  background: #18181b;
                  color: white;
                  padding: 4px 10px;
                  border-radius: 9999px;
                  border: 1.5px solid ${tInfo.isFlightRecommended ? '#38bdf8' : '#FC0780'};
                  font-family: sans-serif;
                  font-size: 11px;
                  font-weight: 800;
                  display: flex;
                  align-items: center;
                  gap: 6px;
                  box-shadow: 0 6px 16px rgba(0,0,0,0.45);
                  white-space: nowrap;
                  cursor: pointer;
                ">
                  <span style="color: #a1a1aa; font-size: 10px;">Stop #${i + 1}➔#${i + 2}</span>
                  <span style="color: #fbbf24; font-weight: 900;">${roadKmNum.toLocaleString()} km</span>
                  <div style="display: flex; align-items: center; gap: 5px; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 6px;">
                    <a href="${tInfo.flightUrl}" target="_blank" rel="noopener" title="Search Google Flights" style="text-decoration: none; font-size: 12px;">✈️</a>
                    <a href="${tInfo.trainUrl}" target="_blank" rel="noopener" title="IRCTC Train Search" style="text-decoration: none; font-size: 12px;">🚆</a>
                    <a href="${tInfo.carUrl}" target="_blank" rel="noopener" title="Google Maps Driving" style="text-decoration: none; font-size: 12px;">🚗</a>
                  </div>
                </div>
              `;

              const tIcon = L.divIcon({
                className: "custom-transport-map-badge",
                html: transportBadgeHtml,
                iconSize: [175, 28],
                iconAnchor: [87, 14],
              });

              const midMarker = L.marker([midLat, midLng], { icon: tIcon }).addTo(routesGroupRef.current);
              midMarker.bindPopup(`
                <div style="font-family: sans-serif; padding: 6px; min-width: 220px;">
                  <div style="font-size: 12px; font-weight: 900; color: #18181b; margin-bottom: 4px;">
                    Transport Options: ${tInfo.startTitle} ➔ ${tInfo.endTitle}
                  </div>
                  <div style="font-size: 11px; color: #71717a; margin-bottom: 8px;">
                    Road Distance: <b style="color: #18181b;">${roadKmNum.toLocaleString()} km</b>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    <a href="${tInfo.flightUrl}" target="_blank" rel="noopener" style="background: #0284c7; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-content: space-between;">
                      <span>✈️ Search Google Flights</span>
                      <span>➔</span>
                    </a>
                    <a href="${tInfo.trainUrl}" target="_blank" rel="noopener" style="background: #d97706; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-between;">
                      <span>🚆 IRCTC Train Search</span>
                      <span>➔</span>
                    </a>
                    <a href="${tInfo.carUrl}" target="_blank" rel="noopener" style="background: #18181b; color: white; padding: 6px 10px; border-radius: 8px; font-size: 11px; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-between;">
                      <span>🚗 Driving Route (Google Maps)</span>
                      <span>➔</span>
                    </a>
                  </div>
                </div>
              `);

              // Render alternative routes first (behind main route) like Google Maps
              const altColors = ["#64748b", "#38bdf8", "#a855f7"];
              for (let rIdx = sortedRoutes.length - 1; rIdx >= 1; rIdx--) {
                const altRoute = sortedRoutes[rIdx];
                const altLatLngs = altRoute.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
                const altKm = (altRoute.distance / 1000).toFixed(1);
                const altDur = formatDuration(altRoute.duration);
                const strokeColor = altColors[(rIdx - 1) % altColors.length];

                const altPolyline = L.polyline(altLatLngs, {
                  color: strokeColor,
                  weight: 5,
                  opacity: 0.7,
                  dashArray: "8, 6",
                  lineCap: "round",
                  lineJoin: "round",
                }).addTo(routesGroupRef.current);

                const altTooltip = `
                  <div style="font-family: sans-serif; font-size: 11px; font-weight: 700; background: #0f172a; color: #cbd5e1; padding: 5px 10px; border-radius: 8px; border: 1px solid ${strokeColor}; box-shadow: 0 4px 12px rgba(0,0,0,0.5); flex; items-center; gap: 6px;">
                    <span style="color: ${strokeColor}; font-weight: 800;">Alt Route #${rIdx}</span>
                    <span>🚗 ${altKm} km</span>
                    <span style="color: #fbbf24;">⏱️ ${altDur}</span>
                  </div>
                `;

                altPolyline.bindTooltip(altTooltip, { sticky: true, opacity: 0.95 });

                altPolyline.on("mouseover", function (this: any) {
                  this.setStyle({ weight: 8, opacity: 0.95 });
                });
                altPolyline.on("mouseout", function (this: any) {
                  this.setStyle({ weight: 5, opacity: 0.7 });
                });
              }

              // Render Shortest Primary Route (Google Maps style solid vibrant route)
              const bestLatLngs = bestRoute.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
              const distanceKm = (bestRoute.distance / 1000).toFixed(1);
              const durationStr = formatDuration(bestRoute.duration);

              const primaryPolyline = L.polyline(bestLatLngs, {
                color: "#FC0780",
                weight: 7,
                opacity: 0.95,
                lineCap: "round",
                lineJoin: "round",
              }).addTo(routesGroupRef.current);

              const primaryTooltip = `
                <div style="font-family: sans-serif; font-size: 12px; font-weight: 800; background: #18181b; color: white; padding: 6px 12px; border-radius: 10px; border: 1.5px solid #FC0780; box-shadow: 0 6px 16px rgba(252,7,128,0.4); display: flex; align-items: center; gap: 8px;">
                  <span style="color: #FC0780; text-transform: uppercase; font-size: 10px; background: rgba(252,7,128,0.2); padding: 2px 6px; border-radius: 4px;">Fastest Road</span>
                  <span style="color: #e4e4e7;">🚗 ${distanceKm} km</span>
                  <span style="color: #0DC36B;">⏱️ ${durationStr}</span>
                </div>
              `;

              primaryPolyline.bindTooltip(primaryTooltip, {
                sticky: true,
                className: "custom-road-tooltip",
                opacity: 0.98,
              });

              primaryPolyline.on("mouseover", function (this: any) {
                this.setStyle({ weight: 10, opacity: 1.0, color: "#FF2A96" });
              });
              primaryPolyline.on("mouseout", function (this: any) {
                this.setStyle({ weight: 7, opacity: 0.95, color: "#FC0780" });
              });
            } else {
              // Fallback straight line
              const straightLine = L.polyline(
                [
                  [start.lat, start.lng],
                  [end.lat, end.lng],
                ],
                { color: "#FC0780", weight: 4, opacity: 0.7, dashArray: "6, 6" }
              ).addTo(routesGroupRef.current);

              straightLine.bindTooltip(`Stop #${i + 1} ➔ Stop #${i + 2}`, { sticky: true });
            }
          } catch (err) {
            console.error("OSRM Route fetching error:", err);
            // Fallback straight line
            const straightLine = L.polyline(
              [
                [start.lat, start.lng],
                [end.lat, end.lng],
              ],
              { color: "#FC0780", weight: 4, opacity: 0.7, dashArray: "6, 6" }
            ).addTo(routesGroupRef.current);

            straightLine.bindTooltip(`Stop #${i + 1} ➔ Stop #${i + 2}`, { sticky: true });
          }
        }

        // Auto-fit map viewport bounds so all stops and routes fit perfectly on screen like Google Maps
        if (tripMarkers.length >= 2 && mapInstanceRef.current && L) {
          const bounds = L.latLngBounds(tripMarkers.map((m) => [m.lat, m.lng]));
          mapInstanceRef.current.fitBounds(bounds, {
            padding: [75, 75],
            maxZoom: 15,
            animate: true,
            duration: 1.2,
          });
        }
      };

      fetchRoutes();
    }
  }, [tripMarkers]);

  // Fly to location on OpenStreetMap
  const flyToLocation = (lat: number, lng: number, zoom = 12, name?: string) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 1.5 });
    }
  };

  const handleAddTourismSpotToTrip = (spot: PeakTourismSpot) => {
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      lat: spot.lat,
      lng: spot.lng,
      title: `${spot.name}, ${spot.city}`,
      category: spot.category || "attraction",
      notes: spot.description,
      day: `Stop #${tripMarkers.length + 1}`,
    };
    setTripMarkers((prev) => [...prev, newMarker]);
    flyToLocation(spot.lat, spot.lng, 12);
    setActiveTab("search");
    setIsPanelOpen(true);
  };

  // Render Peak Tourism Pins & Cluster Counts on Leaflet map dynamically based on zoom level & filters
  useEffect(() => {
    if (!mapInstanceRef.current || !(window as any).L) return;
    const L = (window as any).L;
    const map = mapInstanceRef.current;

    if (!tourismGroupRef.current) {
      tourismGroupRef.current = L.layerGroup().addTo(map);
    }

    const updateTourismPins = () => {
      if (!tourismGroupRef.current) return;
      tourismGroupRef.current.clearLayers();

      if (!showTourismPins && activeTab !== "tourism") return;

      // 1. Filter spots by Region, Vibe, and Search Query
      const filteredSpots = PEAK_TOURISM_SPOTS.filter((spot) => {
        const matchesRegion = selectedTourismRegion === "All" || spot.region === selectedTourismRegion;
        const matchesVibe = selectedTourismVibe === "All" || spot.vibe === selectedTourismVibe;
        const matchesQuery =
          !tourismSearchQuery.trim() ||
          spot.name.toLowerCase().includes(tourismSearchQuery.toLowerCase()) ||
          spot.country.toLowerCase().includes(tourismSearchQuery.toLowerCase()) ||
          spot.city.toLowerCase().includes(tourismSearchQuery.toLowerCase());
        return matchesRegion && matchesVibe && matchesQuery;
      });

      const currentZoom = map.getZoom();

      // 2. Zoom-Based Dynamic Aggregation (Count clusters vs Individual deep pins)
      if (currentZoom < 5) {
        // High level: Aggregate spots by Region
        const regionClusters: { [region: string]: { latSum: number; lngSum: number; count: number; region: string } } = {};

        filteredSpots.forEach((spot) => {
          if (!regionClusters[spot.region]) {
            regionClusters[spot.region] = { latSum: 0, lngSum: 0, count: 0, region: spot.region };
          }
          regionClusters[spot.region].latSum += spot.lat;
          regionClusters[spot.region].lngSum += spot.lng;
          regionClusters[spot.region].count += 1;
        });

        Object.values(regionClusters).forEach((cluster) => {
          if (cluster.count === 0) return;
          const avgLat = cluster.latSum / cluster.count;
          const avgLng = cluster.lngSum / cluster.count;

          const clusterIcon = L.divIcon({
            className: "custom-leaflet-region-cluster",
            html: `
              <div style="
                background: #ffffff;
                width: 42px;
                height: 42px;
                border-radius: 50%;
                color: #FC0780;
                font-weight: 900;
                font-size: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2.5px solid #FC0780;
                box-shadow: 0 4px 14px rgba(252, 7, 128, 0.35);
                cursor: pointer;
                font-family: sans-serif;
              ">
                ${cluster.count}
              </div>
            `,
            iconSize: [42, 42],
            iconAnchor: [21, 21],
          });

          const clusterMarker = L.marker([avgLat, avgLng], { icon: clusterIcon }).addTo(tourismGroupRef.current);
          clusterMarker.on("click", () => {
            map.flyTo([avgLat, avgLng], 6, { duration: 1.2 });
          });
        });

      } else if (currentZoom >= 5 && currentZoom < 8) {
        // Mid level: Spatial Grid Clustering (Proximity distance ~4 degrees)
        const gridSize = 5.0;
        const gridClusters: { [key: string]: { latSum: number; lngSum: number; spots: PeakTourismSpot[] } } = {};

        filteredSpots.forEach((spot) => {
          const cellX = Math.floor((spot.lat + 90) / gridSize);
          const cellY = Math.floor((spot.lng + 180) / gridSize);
          const key = `${cellX}_${cellY}`;

          if (!gridClusters[key]) {
            gridClusters[key] = { latSum: 0, lngSum: 0, spots: [] };
          }
          gridClusters[key].latSum += spot.lat;
          gridClusters[key].lngSum += spot.lng;
          gridClusters[key].spots.push(spot);
        });

        Object.values(gridClusters).forEach((group) => {
          if (group.spots.length === 1) {
            // Single spot in cell -> render spot pin
            renderSingleSpotPin(L, map, group.spots[0]);
          } else {
            // Multiple spots -> render count circle badge
            const avgLat = group.latSum / group.spots.length;
            const avgLng = group.lngSum / group.spots.length;

            const countIcon = L.divIcon({
              className: "custom-leaflet-count-badge",
              html: `
                <div style="
                  background: #ffffff;
                  width: 38px;
                  height: 38px;
                  border-radius: 50%;
                  color: #FC0780;
                  font-weight: 900;
                  font-size: 14px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 2px solid #FC0780;
                  box-shadow: 0 4px 12px rgba(252, 7, 128, 0.3);
                  font-family: sans-serif;
                  cursor: pointer;
                ">
                  ${group.spots.length}
                </div>
              `,
              iconSize: [38, 38],
              iconAnchor: [19, 19],
            });

            const countMarker = L.marker([avgLat, avgLng], { icon: countIcon }).addTo(tourismGroupRef.current);
            countMarker.on("click", () => {
              map.flyTo([avgLat, avgLng], currentZoom + 3, { duration: 1.0 });
            });
          }
        });

      } else {
        // Deep level (Zoom >= 8): Show all individual spot pins deeply
        filteredSpots.forEach((spot) => {
          renderSingleSpotPin(L, map, spot);
        });
      }
    };

    // Helper to render individual spot pin
    const renderSingleSpotPin = (L: any, map: any, spot: PeakTourismSpot) => {
      const spotIcon = L.divIcon({
        className: "custom-leaflet-tourism-pin",
        html: `
          <div style="
            background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.45);
            border: 2px solid white;
            color: white;
            font-size: 14px;
            cursor: pointer;
          ">
            🏛️
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
      });

      const m = L.marker([spot.lat, spot.lng], { icon: spotIcon }).addTo(tourismGroupRef.current);

      const popupHtml = `
        <div style="font-family: sans-serif; padding: 4px; min-width: 185px;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #D97706; margin-bottom: 2px;">
            ⭐ ${spot.rating} • ${spot.city}, ${spot.country}
          </div>
          <h4 style="margin: 2px 0 4px 0; font-size: 14px; font-weight: 800; color: #18181b;">${spot.name}</h4>
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #52525b; line-height: 1.3;">${spot.description}</p>
          <div style="display: flex; gap: 6px; margin-top: 6px;">
            <button id="view-tourism-${spot.id}" style="
              flex: 1;
              background: #f4f4f5;
              color: #18181b;
              border: 1px solid #e4e4e7;
              padding: 6px 8px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: 700;
              cursor: pointer;
            ">🔍 View</button>
            <button id="add-tourism-${spot.id}" style="
              flex: 1;
              background: #FC0780;
              color: white;
              border: none;
              padding: 6px 8px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: 800;
              cursor: pointer;
            ">+ Add</button>
          </div>
        </div>
      `;

      m.bindPopup(popupHtml);
      m.on("popupopen", () => {
        const addBtn = document.getElementById(`add-tourism-${spot.id}`);
        if (addBtn) {
          addBtn.onclick = () => {
            handleAddTourismSpotToTrip(spot);
            m.closePopup();
          };
        }
        const viewBtn = document.getElementById(`view-tourism-${spot.id}`);
        if (viewBtn) {
          viewBtn.onclick = () => {
            handleOpenSpotModal(spot);
            m.closePopup();
          };
        }
      });
    };

    updateTourismPins();

    map.on("zoomend", updateTourismPins);
    map.on("moveend", updateTourismPins);

    return () => {
      map.off("zoomend", updateTourismPins);
      map.off("moveend", updateTourismPins);
    };
  }, [leafLoaded, showTourismPins, activeTab, selectedTourismRegion, selectedTourismVibe, tourismSearchQuery]);

  const handleSelectSearchResult = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    flyToLocation(lat, lng, 13);
    setNewMarkerPos({ lat, lng });
    setMarkerTitle(result.display_name.split(",")[0] || result.display_name);
    setSearchResults([]);
    setShowSuggestions(false);
  };

  // Add marker to state
  const handleSaveMarker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMarkerPos || !markerTitle.trim()) return;

    const autoStopNumber = tripMarkers.length + 1;
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      lat: newMarkerPos.lat,
      lng: newMarkerPos.lng,
      title: markerTitle,
      category: markerCategory,
      notes: markerNotes,
      day: `Stop #${autoStopNumber}`,
    };

    setTripMarkers((prev) => [...prev, newMarker]);
    flyToLocation(newMarkerPos.lat, newMarkerPos.lng, 12);
    setNewMarkerPos(null);
    setMarkerTitle("");
    setMarkerNotes("");
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const removeMarker = (id: string) => {
    setTripMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  const moveMarkerUp = (index: number) => {
    if (index === 0) return;
    setTripMarkers((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const moveMarkerDown = (index: number) => {
    setTripMarkers((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  // Drag and drop sorting handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) return;
    setTripMarkers((prev) => {
      const next = [...prev];
      const item = next.splice(draggedIdx, 1)[0];
      next.splice(dropIndex, 0, item);
      return next;
    });
    setDraggedIdx(null);
  };

  // Inline edit handlers
  const startEditingMarker = (marker: MarkerData) => {
    setEditingMarkerId(marker.id);
    setEditTitle(marker.title);
    setEditCategory(marker.category);
    setEditNotes(marker.notes || "");
  };

  const handleSaveMarkerEdit = (id: string) => {
    if (!editTitle.trim()) return;
    setTripMarkers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, title: editTitle, category: editCategory, notes: editNotes } : m
      )
    );
    setEditingMarkerId(null);
  };

  // Save current active trip markers into a single combined Saved Trip card in Itinerary
  const handleSaveItinerary = () => {
    if (tripMarkers.length === 0) return;
    const firstTitle = tripMarkers[0]?.title || "Destination";
    const lastTitle = tripMarkers[tripMarkers.length - 1]?.title;
    const tripSummary = tripMarkers.length > 1 ? `${firstTitle} ➔ ${lastTitle}` : firstTitle;

    if (editingTripId) {
      // Update loaded existing trip in place without creating a duplicate
      setSavedTrips((prev) =>
        prev.map((t) =>
          t.id === editingTripId
            ? { ...t, title: tripSummary, places: [...tripMarkers] }
            : t
        )
      );
      setEditingTripId(null);
    } else {
      // Create new trip card
      const newTrip: SavedTrip = {
        id: Date.now().toString(),
        title: tripSummary,
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        places: [...tripMarkers],
      };
      setSavedTrips((prev) => [newTrip, ...prev]);
    }

    setTripMarkers([]);
    setNewMarkerPos(null);
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
    setActiveTab("itinerary");
  };

  const handleDeleteSavedTrip = (tripId: string) => {
    if (editingTripId === tripId) setEditingTripId(null);
    setSavedTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  const handleLoadSavedTrip = (trip: SavedTrip) => {
    setEditingTripId(trip.id);
    setTripMarkers([...trip.places]);
    setActiveTab("search");
    if (trip.places.length > 0 && mapInstanceRef.current) {
      flyToLocation(trip.places[0].lat, trip.places[0].lng, 12);
    }
  };

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const zoomIn = () => mapInstanceRef.current?.zoomIn();
  const zoomOut = () => mapInstanceRef.current?.zoomOut();
  const resetView = () => mapInstanceRef.current?.flyTo([20, 0], 3);

  return (
    <div className="w-full min-h-[calc(100vh-5.5vh)] bg-slate-50 text-zinc-900 flex flex-col font-sans">
      {/* Main Content Split: Map (Left) & Control Panel (Right) */}
      <div className="relative w-full h-[calc(100vh-5.5vh)] min-h-[600px] flex flex-col lg:flex-row">
        {/* Map Viewport Area */}
        <main className="relative flex-1 w-full h-full min-h-[600px] bg-slate-100" data-lenis-prevent>
          {/* Leaflet Map Canvas */}
          <div
            ref={mapContainerRef}
            data-lenis-prevent
            className="absolute inset-0 w-full h-full z-10"
            style={{ width: "100%", height: "100%", minHeight: "100%" }}
          />

          {/* Floating Zoom & Map Navigation Controls (Left side) */}
          <div className="absolute top-6 left-4 z-20 flex flex-col gap-2" role="toolbar" aria-label="Map zoom and navigation controls">
            <button
              onClick={zoomIn}
              title="Zoom In"
              aria-label="Zoom in on map"
              className="bg-white/95 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 p-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
            >
              <Icon icon="material-symbols:add" className="w-5 h-5" />
            </button>
            <button
              onClick={zoomOut}
              title="Zoom Out"
              aria-label="Zoom out on map"
              className="bg-white/95 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 p-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
            >
              <Icon icon="material-symbols:remove" className="w-5 h-5" />
            </button>
            <button
              onClick={resetView}
              title="Reset World View"
              aria-label="Reset world view"
              className="bg-white/95 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 p-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
            >
              <Icon icon="material-symbols:public" className="w-5 h-5" />
            </button>
          </div>

          {/* Floating Map Style Selector */}
          <div
            className="absolute top-6 left-16 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200 shadow-xl"
            role="tablist"
            aria-label="Map style selector"
          >
            {[
              { id: "google_streets", label: "Map", icon: "material-symbols:map" },
              { id: "google_satellite", label: "Satellite", icon: "material-symbols:satellite-alt-outline" },
              { id: "google_hybrid", label: "Hybrid", icon: "material-symbols:layers-outline" },
              { id: "google_terrain", label: "Terrain", icon: "material-symbols:terrain" },
            ].map((style) => (
              <button
                key={style.id}
                role="tab"
                aria-selected={mapStyle === style.id}
                aria-label={`${style.label} map view`}
                onClick={() => setMapStyle(style.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780] ${mapStyle === style.id
                    ? "bg-[#FC0780] text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
              >
                <Icon icon={style.icon} className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{style.label}</span>
              </button>
            ))}
          </div>

          {/* Floating Top-Right Action Toolbar & Collapsible Panel Container */}
          <div className="absolute top-6 right-4 z-30 flex flex-col items-end gap-[2px] max-w-[calc(100vw-32px)]">
            {/* Top 3 Action Buttons Bar with Down/Up Arrow Toggle */}
            <div
              className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200 shadow-xl"
              role="tablist"
              aria-label="Trip planning toolbar"
            >
              {/* Button 1: Search */}
              <button
                role="tab"
                aria-selected={isPanelOpen && activeTab === "search"}
                aria-controls="planner-panel"
                aria-expanded={isPanelOpen && activeTab === "search"}
                aria-label="Search destinations and places"
                onClick={() => {
                  if (isPanelOpen && activeTab === "search") {
                    setIsPanelOpen(false);
                  } else {
                    setActiveTab("search");
                    setIsPanelOpen(true);
                  }
                }}
                title="Search & Places"
                className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780] ${isPanelOpen && activeTab === "search"
                    ? "bg-[#FC0780] text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
              >
                <Icon icon="material-symbols:search" className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Search</span>
              </button>

              {/* Button 2: Itinerary */}
              <button
                role="tab"
                aria-selected={isPanelOpen && activeTab === "itinerary"}
                aria-controls="planner-panel"
                aria-expanded={isPanelOpen && activeTab === "itinerary"}
                aria-label={`Saved itinerary (${savedTrips.length} trips)`}
                onClick={() => {
                  if (isPanelOpen && activeTab === "itinerary") {
                    setIsPanelOpen(false);
                  } else {
                    setActiveTab("itinerary");
                    setIsPanelOpen(true);
                  }
                }}
                title="Saved Itinerary"
                className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold whitespace-nowrap relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780] ${isPanelOpen && activeTab === "itinerary"
                    ? "bg-[#FC0780] text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
              >
                <Icon icon="material-symbols:bookmark-outline" className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Itinerary</span>
                {savedTrips.length > 0 && (
                  <span
                    className={`text-[10px] font-black rounded-full px-1.5 py-0.2 ${isPanelOpen && activeTab === "itinerary"
                        ? "bg-white text-[#FC0780]"
                        : "bg-[#FC0780] text-white"
                      }`}
                  >
                    {savedTrips.length}
                  </span>
                )}
              </button>

              {/* Button 3: Peak Tourism */}
              <button
                role="tab"
                aria-selected={isPanelOpen && activeTab === "tourism"}
                aria-controls="planner-panel"
                aria-expanded={isPanelOpen && activeTab === "tourism"}
                aria-label={`Peak tourism spots (${PEAK_TOURISM_SPOTS.length} spots)`}
                onClick={() => {
                  if (isPanelOpen && activeTab === "tourism") {
                    setIsPanelOpen(false);
                  } else {
                    setActiveTab("tourism");
                    setIsPanelOpen(true);
                  }
                }}
                title="Peak Tourism Spots"
                className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold whitespace-nowrap relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780] ${isPanelOpen && activeTab === "tourism"
                    ? "bg-[#FC0780] text-white shadow-md"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
              >
                <Icon icon="material-symbols:account-balance-outline" className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Peak Tourism</span>
                <span
                  className={`text-[10px] font-black rounded-full px-1.5 py-0.2 ${isPanelOpen && activeTab === "tourism"
                      ? "bg-white text-[#FC0780]"
                      : "bg-amber-500 text-white"
                    }`}
                >
                  {PEAK_TOURISM_SPOTS.length}
                </span>
              </button>

              {/* Arrow Toggle Button (Down Arrow when closed, Up Arrow when open) */}
              <div className="h-4 w-[1px] bg-zinc-200 mx-0.5" />
              <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                title={isPanelOpen ? "Close Panel" : "Open Panel"}
                aria-label={isPanelOpen ? "Close planner panel" : "Open planner panel"}
                aria-expanded={isPanelOpen}
                className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
              >
                <Icon
                  icon={isPanelOpen ? "material-symbols:keyboard-arrow-up" : "material-symbols:keyboard-arrow-down"}
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* Panel Content Container (Opens Directly Below with 2px gap) */}
            {isPanelOpen && (
              <div
                id="planner-panel"
                role="region"
                data-lenis-prevent
                aria-label={`${activeTab === "search" ? "Search" : activeTab === "itinerary" ? "Itinerary" : "Peak Tourism"} planning panel`}
                className="w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-2xl shadow-xl p-4 transition-all max-h-[calc(100vh-130px)] flex flex-col relative overflow-visible overscroll-contain animate-in fade-in slide-in-from-top-2 duration-200"
                style={{ touchAction: "pan-y", overscrollBehavior: "contain" }}
              >
                {activeTab === "search" && (
                  <div className="space-y-3 flex flex-col flex-1 min-h-0 relative overflow-visible">
                    {/* Card Header with Title and Close Button */}
                    <div className="flex items-center justify-between pb-1 border-b border-zinc-100">
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 whitespace-nowrap">
                        Search Destinations
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsPanelOpen(false)}
                        title="Close Card"
                        aria-label="Close search panel"
                        className="text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 p-1 rounded-lg transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
                      >
                        <Icon icon="material-symbols:close" className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Search Input Box for Adding Next Location with Floating Dropdown OUT OF THE BOX */}
                    <div ref={searchContainerRef} className="relative z-50 shrink-0">
                      <div className="flex items-center gap-2 group">
                        <div className="flex items-center gap-1 shrink-0 text-zinc-400">
                          <Icon icon="material-symbols:location-on" className="w-5 h-5 text-[#FC0780]" />
                        </div>

                        <form onSubmit={handleSearch} role="search" className="flex-1 relative">
                          <input
                            type="text"
                            role="combobox"
                            aria-expanded={showSuggestions && searchResults.length > 0}
                            aria-autocomplete="list"
                            aria-controls="search-results-list"
                            aria-label="Search destination or click on map"
                            placeholder="Choose destination, or click on the map"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onClick={() => setShowSuggestions(true)}
                            className="w-full bg-white border border-teal-600 focus:border-[#FC0780] rounded-xl px-3 py-2 pl-3 pr-8 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors shadow-sm"
                          />
                          <div className="absolute right-2.5 top-2 flex items-center justify-center">
                            {isSearching ? (
                              <Icon icon="line-md:loading-twotone-loop" className="w-4 h-4 text-[#FC0780] animate-spin" />
                            ) : searchQuery ? (
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery("");
                                  setSearchResults([]);
                                  setShowSuggestions(false);
                                }}
                                title="Clear search"
                                aria-label="Clear search input"
                                className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                              >
                                <Icon icon="material-symbols:close" className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                type="submit"
                                title="Search"
                                aria-label="Perform search"
                                className="text-teal-600 hover:text-[#FC0780] transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                              >
                                <Icon icon="material-symbols:search" className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Floating Autocomplete Dropdown Panel - Direct List with Thin Scrollbar */}
                      {showSuggestions && searchResults.length > 0 && (
                        <div
                          id="search-results-list"
                          role="listbox"
                          aria-label="Destination suggestions"
                          className="absolute left-0 right-0 top-full mt-2 z-[999] bg-white/98 backdrop-blur-xl border border-zinc-200/90 rounded-2xl p-2 shadow-2xl overflow-hidden animate-in fade-in duration-150"
                        >
                          <div className="space-y-1 max-h-80 overflow-y-auto pr-1 overscroll-contain modal-scroll-area">
                            {searchResults.map((res) => (
                              <button
                                key={res.place_id}
                                role="option"
                                aria-selected="false"
                                onClick={() => handleSelectSearchResult(res)}
                                className="w-full text-left p-2.5 hover:bg-pink-50/70 focus:bg-pink-50 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer group focus:outline-none border border-transparent hover:border-pink-100"
                              >
                                <Icon icon="material-symbols:location-on" className="w-4 h-4 text-[#FC0780] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-zinc-800 text-xs leading-snug group-hover:text-[#FC0780] line-clamp-2 transition-colors" title={res.display_name}>
                                    {res.display_name}
                                  </p>
                                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
                                    {res.type}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Multi-Location Destinations List with Connecting Dots */}
                    <div data-lenis-prevent className="overflow-y-auto max-h-[calc(100vh-250px)] pr-1 space-y-2 overscroll-contain modal-scroll-area">
                      <div className="space-y-1 relative" role="list" aria-label="Trip itinerary stops">
                        {tripMarkers.map((marker, index) => (
                          <React.Fragment key={marker.id}>
                            <div
                              role="listitem"
                              draggable
                              onDragStart={(e) => handleDragStart(e, index)}
                              onDragOver={(e) => handleDragOver(e, index)}
                              onDrop={(e) => handleDrop(e, index)}
                              className={`bg-white border p-2.5 rounded-xl flex flex-col gap-2 shadow-sm transition-all cursor-grab active:cursor-grabbing group ${draggedIdx === index ? "opacity-40 border-dashed border-[#FC0780]" : "border-zinc-200 hover:border-zinc-300"
                                }`}
                            >
                              {editingMarkerId === marker.id ? (
                                /* Inline Edit Form for Card Details */
                                <div className="space-y-2 p-1" onClick={(e) => e.stopPropagation()}>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold text-zinc-700">Edit Location Details</span>
                                    <button
                                      type="button"
                                      onClick={() => setEditingMarkerId(null)}
                                      className="text-zinc-400 hover:text-zinc-600 text-xs cursor-pointer"
                                    >
                                      ✕ Cancel
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Title / Place name"
                                    className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-2.5 py-1 text-xs text-zinc-900 focus:outline-none focus:border-[#FC0780]"
                                  />
                                  <div className="grid grid-cols-2 gap-2">
                                    <select
                                      value={editCategory}
                                      onChange={(e) => setEditCategory(e.target.value as any)}
                                      className="bg-zinc-50 border border-zinc-300 rounded-lg px-2 py-1 text-xs text-zinc-900 focus:outline-none focus:border-[#FC0780]"
                                    >
                                      <option value="attraction">Attraction</option>
                                      <option value="hotel">Hotel</option>
                                      <option value="restaurant">Restaurant</option>
                                      <option value="activity">Activity</option>
                                    </select>
                                    <button
                                      type="button"
                                      onClick={() => handleSaveMarkerEdit(marker.id)}
                                      className="bg-[#FC0780] hover:bg-[#e00570] text-white font-bold text-xs rounded-lg py-1 transition-colors cursor-pointer"
                                    >
                                      Save Edit
                                    </button>
                                  </div>
                                  <textarea
                                    rows={2}
                                    value={editNotes}
                                    onChange={(e) => setEditNotes(e.target.value)}
                                    placeholder="Notes..."
                                    className="w-full bg-zinc-50 border border-zinc-300 rounded-lg px-2.5 py-1 text-xs text-zinc-900 focus:outline-none focus:border-[#FC0780]"
                                  />
                                </div>
                              ) : (
                                /* Normal View Card */
                                <div className="flex items-center justify-between gap-2">
                                  {/* Drag Handle & Reorder Buttons & Stop Number */}
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <Icon icon="material-symbols:drag-indicator" className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500" />
                                    <div className="flex flex-col gap-0.5">
                                      <button
                                        type="button"
                                        disabled={index === 0}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          moveMarkerUp(index);
                                        }}
                                        title="Move up"
                                        aria-label={`Move ${marker.title} up`}
                                        className="text-zinc-400 hover:text-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed text-[9px] leading-none p-0.5 cursor-pointer focus:outline-none focus:text-[#FC0780]"
                                      >
                                        ▲
                                      </button>
                                      <button
                                        type="button"
                                        disabled={index === tripMarkers.length - 1}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          moveMarkerDown(index);
                                        }}
                                        title="Move down"
                                        aria-label={`Move ${marker.title} down`}
                                        className="text-zinc-400 hover:text-zinc-800 disabled:opacity-20 disabled:cursor-not-allowed text-[9px] leading-none p-0.5 cursor-pointer focus:outline-none focus:text-[#FC0780]"
                                      >
                                        ▼
                                      </button>
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-[#FC0780] text-white flex items-center justify-center text-[10px] font-black shadow-sm shrink-0">
                                      {index + 1}
                                    </div>
                                  </div>

                                  {/* Place Name and Category Tag */}
                                  <div
                                    className="flex-1 overflow-hidden cursor-pointer"
                                    onClick={() => flyToLocation(marker.lat, marker.lng, 14)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        flyToLocation(marker.lat, marker.lng, 14);
                                      }
                                    }}
                                    aria-label={`Focus ${marker.title} on map`}
                                  >
                                    <p className="text-xs font-bold text-zinc-900 truncate hover:text-[#FC0780] transition-colors">
                                      {marker.title}
                                    </p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                      <span
                                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md text-white whitespace-nowrap ${marker.category === "attraction"
                                            ? "bg-[#FC0780]"
                                            : marker.category === "hotel"
                                              ? "bg-[#0DC36B]"
                                              : marker.category === "restaurant"
                                                ? "bg-[#F6AB03]"
                                                : "bg-[#04ACBF]"
                                          }`}
                                      >
                                        {marker.category}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Action Buttons: Edit & Remove */}
                                  <div className="flex items-center gap-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        startEditingMarker(marker);
                                      }}
                                      title="Edit details"
                                      aria-label={`Edit ${marker.title} details`}
                                      className="text-zinc-400 hover:text-[#FC0780] p-1 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                                    >
                                      <Icon icon="material-symbols:edit-outline" className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeMarker(marker.id);
                                      }}
                                      title="Remove destination"
                                      aria-label={`Remove ${marker.title} from trip`}
                                      className="text-zinc-400 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-500"
                                    >
                                      <Icon icon="material-symbols:close" className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Step-by-Step Transport Modes between consecutive stops */}
                            {index < tripMarkers.length - 1 && (() => {
                              const nextMarker = tripMarkers[index + 1];
                              const t = getTransportModesBetweenStops(marker, nextMarker);
                              return (
                                <div className="my-2 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white p-2.5 rounded-xl border border-zinc-700/60 shadow-xs flex flex-col gap-2">
                                  <div className="flex items-center justify-between text-[11px]">
                                    <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                                      <Icon icon="material-symbols:alt-route" className="w-4 h-4 text-[#FC0780]" />
                                      <span>Stop #{index + 1} ➔ Stop #{index + 2}</span>
                                    </div>
                                    <span className="bg-zinc-800 text-amber-400 px-2 py-0.5 rounded-full font-black font-mono text-[10px] border border-amber-500/20">
                                      {t.distKm.toLocaleString()} km
                                    </span>
                                  </div>

                                  {/* Transport Vehicle Options & Redirect Search Links */}
                                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5" role="group" aria-label={`Transport options between stop ${index + 1} and stop ${index + 2}`}>
                                    {/* Flight Option */}
                                    <a
                                      href={t.flightUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border focus:outline-none focus:ring-1 focus:ring-white ${t.isFlightRecommended
                                          ? "bg-[#FC0780] hover:bg-[#e00570] text-white border-transparent shadow-xs"
                                          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700"
                                        }`}
                                      title={`Search Flights on Google Flights from ${t.startTitle} to ${t.endTitle}`}
                                      aria-label={`Search flights from ${t.startTitle} to ${t.endTitle}`}
                                    >
                                      <span className="text-xs">✈️</span>
                                      <span>Flights</span>
                                      {t.isFlightRecommended && (
                                        <span className="text-[9px] bg-white/20 px-1 rounded font-black">Best</span>
                                      )}
                                    </a>

                                    {/* IRCTC Train Option */}
                                    <a
                                      href={t.trainUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border focus:outline-none focus:ring-1 focus:ring-white ${t.isTrainRecommended && !t.isFlightRecommended
                                          ? "bg-amber-500 hover:bg-amber-600 text-zinc-950 border-transparent shadow-xs font-extrabold"
                                          : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700"
                                        }`}
                                      title={`Search IRCTC Trains between ${t.startTitle} & ${t.endTitle}`}
                                      aria-label={`Search IRCTC trains between ${t.startTitle} and ${t.endTitle}`}
                                    >
                                      <span className="text-xs">🚆</span>
                                      <span>IRCTC Train</span>
                                    </a>

                                    {/* Driving Car Option */}
                                    <a
                                      href={t.carUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
                                      title="Driving Route on Google Maps"
                                      aria-label={`View driving route from ${t.startTitle} to ${t.endTitle} on Google Maps`}
                                    >
                                      <span className="text-xs">🚗</span>
                                      <span>Drive</span>
                                    </a>
                                  </div>
                                </div>
                              );
                            })()}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Direct Map Marker Add / Detail Form (if dropped pin on map or clicked search item) */}
                      {newMarkerPos ? (
                        <div className="mt-3 bg-gradient-to-br from-white to-zinc-50 border border-[#FC0780]/30 p-4 rounded-2xl space-y-3 shadow-md">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-sm text-zinc-900 flex items-center gap-1.5 whitespace-nowrap">
                              <Icon icon="material-symbols:add-location-alt" className="text-[#FC0780] w-4 h-4 shrink-0" />
                              Add Location Details
                            </h3>
                            <button
                              type="button"
                              onClick={() => setNewMarkerPos(null)}
                              className="text-zinc-400 hover:text-zinc-600 text-xs whitespace-nowrap cursor-pointer focus:outline-none"
                            >
                              ✕ Cancel
                            </button>
                          </div>

                          <p className="text-[11px] text-zinc-500 whitespace-nowrap">
                            Coords: {newMarkerPos.lat.toFixed(4)}, {newMarkerPos.lng.toFixed(4)}
                          </p>

                          <form onSubmit={handleSaveMarker} className="space-y-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-zinc-600 mb-1 whitespace-nowrap">Title / Place Name</label>
                              <input
                                type="text"
                                required
                                value={markerTitle}
                                onChange={(e) => setMarkerTitle(e.target.value)}
                                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-[#FC0780] whitespace-nowrap"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] font-semibold text-zinc-600 mb-1 whitespace-nowrap">Category</label>
                                <select
                                  value={markerCategory}
                                  onChange={(e) => setMarkerCategory(e.target.value as any)}
                                  className="w-full bg-white border border-zinc-300 rounded-lg px-2 py-1.5 text-xs text-zinc-900 cursor-pointer focus:outline-none focus:border-[#FC0780]"
                                >
                                  <option value="attraction">Attraction</option>
                                  <option value="hotel">Hotel</option>
                                  <option value="restaurant">Restaurant</option>
                                  <option value="activity">Activity</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-zinc-600 mb-1 whitespace-nowrap">Auto Stop Number</label>
                                <div className="w-full bg-zinc-100 border border-zinc-200 rounded-lg px-3 py-1.5 text-xs font-bold text-[#FC0780] whitespace-nowrap flex items-center justify-between">
                                  <span>Stop #{tripMarkers.length + 1}</span>
                                  <Icon icon="material-symbols:numbers" className="w-4 h-4 text-zinc-400" />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-zinc-600 mb-1 whitespace-nowrap">Notes</label>
                              <textarea
                                rows={2}
                                value={markerNotes}
                                onChange={(e) => setMarkerNotes(e.target.value)}
                                placeholder="Special instructions or tips..."
                                className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-[#FC0780]"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-gradient-to-r from-[#FC0780] to-[#FB352E] font-bold text-xs py-2 rounded-xl text-white shadow-md hover:opacity-95 transition-opacity whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
                            >
                              <Icon icon="material-symbols:add" className="w-4 h-4" />
                              Add Marker to Trip
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="mt-2 bg-zinc-50 border border-zinc-200 p-2.5 rounded-xl text-xs text-zinc-600 flex items-center gap-2 shadow-sm">
                          <Icon icon="material-symbols:touch-app" className="text-[#04ACBF] w-4 h-4 shrink-0" />
                          <span className="whitespace-nowrap text-[11px]">Click map anytime to drop a custom pin!</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Save & View Itinerary Action Button */}
                    {tripMarkers.length > 0 && (
                      <div className="pt-2 border-t border-zinc-100 shrink-0">
                        <button
                          type="button"
                          onClick={handleSaveItinerary}
                          className="w-full bg-[#0DC36B] hover:bg-[#0bb260] font-bold text-xs py-2.5 rounded-xl text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0DC36B]"
                        >
                          <Icon icon="material-symbols:bookmark-check" className="w-4 h-4 text-white" />
                          Save Itinerary
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "itinerary" && (
                  <div className="space-y-4 flex flex-col flex-1 min-h-0">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 whitespace-nowrap flex items-center gap-1.5">
                        <Icon icon="material-symbols:bookmark-outline" className="w-4 h-4 text-[#FC0780]" />
                        Saved Trips ({savedTrips.length})
                      </h3>
                      {savedTrips.length > 0 && (
                        <button
                          onClick={() => setSavedTrips([])}
                          className="text-[11px] text-red-500 hover:text-red-600 font-semibold whitespace-nowrap cursor-pointer hover:underline focus:outline-none focus:ring-1 focus:ring-red-500 rounded px-1"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {savedTrips.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-pink-50 text-[#FC0780] flex items-center justify-center">
                          <Icon icon="material-symbols:map-outline" className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-zinc-700">No saved trips yet</p>
                        <p className="text-[11px] text-zinc-400 max-w-[220px]">
                          Add destinations in Search tab & click "Save Itinerary" to bundle them into a trip card!
                        </p>
                      </div>
                    ) : (
                      <div data-lenis-prevent className="overflow-y-auto max-h-[calc(100vh-230px)] pr-1 space-y-3.5 overscroll-contain modal-scroll-area">
                        {savedTrips.map((trip, tripIndex) => (
                          <div
                            key={trip.id}
                            className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden"
                          >
                            {/* Card Header: Gray background header strip with plain text trip #, date, & red delete button */}
                            <div className="-mx-4 -mt-4 bg-zinc-100/90 border-b border-zinc-200/80 px-4 py-2.5 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-zinc-900 tracking-tight">
                                  Trip #{savedTrips.length - tripIndex}
                                </span>
                                <span className="text-zinc-300 text-xs">•</span>
                                <span className="text-[11px] text-zinc-500 font-medium flex items-center gap-1">
                                  <Icon icon="material-symbols:calendar-today-outline" className="w-3 h-3 text-zinc-400" />
                                  {trip.createdAt}
                                </span>
                              </div>
                              <button
                                onClick={() => handleDeleteSavedTrip(trip.id)}
                                title="Delete Saved Trip"
                                aria-label={`Delete trip ${trip.title}`}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-red-500"
                              >
                                <Icon icon="material-symbols:delete-outline" className="w-4 h-4 text-red-500" />
                              </button>
                            </div>

                            {/* Trip Title */}
                            <h4 className="font-semibold text-sm text-zinc-900 leading-snug line-clamp-2 pt-0.5">{trip.title}</h4>

                            {/* Single Combined Destinations List inside Card */}
                            <div className="space-y-1.5 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/70">
                              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <Icon icon="material-symbols:alt-route" className="w-3.5 h-3.5 text-zinc-700" />
                                  Route Destinations ({trip.places.length})
                                </span>
                              </p>
                              {trip.places.map((place, pIdx) => (
                                <div
                                  key={place.id}
                                  onClick={() => flyToLocation(place.lat, place.lng, 14)}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      flyToLocation(place.lat, place.lng, 14);
                                    }
                                  }}
                                  aria-label={`Focus ${place.title} on map`}
                                  className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-zinc-200 hover:border-zinc-400 shadow-2xs transition-all cursor-pointer group/place focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                                >
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <span className="w-4.5 h-4.5 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                                      {pIdx + 1}
                                    </span>
                                    <span className="text-xs font-semibold text-zinc-900 truncate">
                                      {place.title}
                                    </span>
                                  </div>
                                  <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200/80 shrink-0">
                                    {place.category}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {/* Action Footer: Load on Map + Animated "Get Quote" Button */}
                            <div className="flex items-center gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => handleLoadSavedTrip(trip)}
                                aria-label={`Load trip ${trip.title} on map`}
                                className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-zinc-200/60 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                              >
                                <Icon icon="material-symbols:map-outline" className="w-4 h-4 text-zinc-600" />
                                Load on Map
                              </button>

                              {/* Animated Vibrant "Get Quote" Button */}
                              <button
                                type="button"
                                onClick={() => alert(`Requesting instant quote for "${trip.title}" with ${trip.places.length} stops!`)}
                                aria-label={`Get quote for trip ${trip.title}`}
                                className="relative group overflow-hidden px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FC0780] via-[#FB352E] to-[#FC0780] bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 shadow-md hover:shadow-lg text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
                              >
                                <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                <span className="animate-text-shimmer uppercase text-[10px] drop-shadow-sm whitespace-nowrap font-black tracking-wide">Get Quote</span>
                                <Icon icon="material-symbols:arrow-forward-rounded" className="w-3.5 h-3.5 animate-arrow-slide shrink-0" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "tourism" && (
                  <div className="space-y-3 flex flex-col flex-1 min-h-0">
                    {/* Header & Map Pins Toggle Switch */}
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                      <div className="flex items-center gap-1.5">
                        <Icon icon="material-symbols:account-balance-outline" className="w-4 h-4 text-[#FC0780]" />
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 whitespace-nowrap">
                          Peak Tourism Spots
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowTourismPins(!showTourismPins)}
                        aria-label={showTourismPins ? "Hide peak tourism pins on map" : "Show peak tourism pins on map"}
                        aria-pressed={showTourismPins}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#FC0780] ${showTourismPins
                            ? "bg-[#FC0780]/10 text-[#FC0780] border-[#FC0780]/30 font-bold"
                            : "bg-zinc-100 text-zinc-500 border-zinc-200"
                          }`}
                      >
                        <Icon icon={showTourismPins ? "material-symbols:visibility" : "material-symbols:visibility-off"} className="w-3.5 h-3.5" />
                        <span>{showTourismPins ? "Pins On Map" : "Pins Hidden"}</span>
                      </button>
                    </div>

                    {/* Search Filter Box inside Tourism */}
                    <div className="relative">
                      <input
                        type="text"
                        aria-label="Filter tourism spots by name, country or city"
                        placeholder="Filter tourism spots by name, country or city..."
                        value={tourismSearchQuery}
                        onChange={(e) => setTourismSearchQuery(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-[#FC0780] rounded-xl px-3 py-1.5 pl-8 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors"
                      />
                      <Icon icon="material-symbols:search" className="w-4 h-4 text-zinc-400 absolute left-2.5 top-2" />
                    </div>

                    {/* Region Filter Chips */}
                    <div className="flex items-center gap-1 overflow-x-auto py-1 shrink-0 no-scrollbar" role="tablist" aria-label="Filter by region">
                      {["All", "Asia", "Europe", "Americas", "Middle East", "Africa", "Oceania"].map((region) => (
                        <button
                          key={region}
                          role="tab"
                          aria-selected={selectedTourismRegion === region}
                          aria-label={`Filter by ${region}`}
                          onClick={() => setSelectedTourismRegion(region)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 focus:outline-none focus:ring-1 focus:ring-[#FC0780] ${selectedTourismRegion === region
                              ? "bg-zinc-900 text-white shadow-xs"
                              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                            }`}
                        >
                          {region}
                        </button>
                      ))}
                    </div>

                    {/* Vibe / Category Filter Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1 shrink-0 no-scrollbar" role="tablist" aria-label="Filter by vibe category">
                      {[
                        { label: "All Vibes", value: "All" },
                        { label: "🌴 Summer Vacation", value: "Summer Vacation" },
                        { label: "💍 Honeymoon", value: "Honeymoon & Romantic" },
                        { label: "🏛️ Heritage", value: "Heritage & Culture" },
                        { label: "🏔️ Adventure", value: "Adventure & Nature" },
                        { label: "🏖️ Beach & Island", value: "Beach & Island" },
                        { label: "🏙️ City & Luxury", value: "City & Luxury" },
                      ].map((vibeItem) => (
                        <button
                          key={vibeItem.value}
                          role="tab"
                          aria-selected={selectedTourismVibe === vibeItem.value}
                          aria-label={`Filter by ${vibeItem.label}`}
                          onClick={() => setSelectedTourismVibe(vibeItem.value)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border focus:outline-none focus:ring-1 focus:ring-[#FC0780] ${selectedTourismVibe === vibeItem.value
                              ? "bg-[#FC0780]/10 text-[#FC0780] border-[#FC0780]/40 font-black shadow-2xs"
                              : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                            }`}
                        >
                          {vibeItem.label}
                        </button>
                      ))}
                    </div>

                    {/* Spots Count & List */}
                    <div data-lenis-prevent className="overflow-y-auto max-h-[calc(100vh-290px)] pr-1 space-y-2.5 overscroll-contain modal-scroll-area" role="list" aria-label="Peak tourism spot list">
                      {PEAK_TOURISM_SPOTS.filter((spot) => {
                        const matchesRegion = selectedTourismRegion === "All" || spot.region === selectedTourismRegion;
                        const matchesVibe = selectedTourismVibe === "All" || spot.vibe === selectedTourismVibe;
                        const matchesQuery =
                          !tourismSearchQuery.trim() ||
                          spot.name.toLowerCase().includes(tourismSearchQuery.toLowerCase()) ||
                          spot.country.toLowerCase().includes(tourismSearchQuery.toLowerCase()) ||
                          spot.city.toLowerCase().includes(tourismSearchQuery.toLowerCase());
                        return matchesRegion && matchesVibe && matchesQuery;
                      }).map((spot) => (
                        <div
                          key={spot.id}
                          role="listitem"
                          className="bg-white border border-zinc-200 hover:border-[#FC0780]/40 rounded-xl p-3 shadow-2xs hover:shadow-sm transition-all space-y-2 group/spot"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2 overflow-hidden">
                              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                                <Icon icon={spot.icon} className="w-4.5 h-4.5" />
                              </div>
                              <div className="overflow-hidden">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[9px] font-black uppercase text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
                                    ⭐ {spot.rating}
                                  </span>
                                  <span className="text-[9px] font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.2 rounded border border-zinc-200/60 truncate">
                                    {spot.vibe}
                                  </span>
                                  <span className="text-[10px] font-semibold text-zinc-400 truncate">{spot.city}, {spot.country}</span>
                                </div>
                                <h4 className="font-bold text-xs text-zinc-900 truncate mt-0.5 group-hover/spot:text-[#FC0780] transition-colors">
                                  {spot.name}
                                </h4>
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-zinc-500 line-clamp-2 leading-tight">{spot.description}</p>

                          <div className="flex items-center gap-1.5 pt-1 border-t border-zinc-100">
                            <button
                              type="button"
                              onClick={() => handleOpenSpotModal(spot)}
                              aria-label={`View details and explore ${spot.name}`}
                              className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-[11px] py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 border border-zinc-200/60 focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                            >
                              <Icon icon="material-symbols:visibility-outline" className="w-3.5 h-3.5 text-zinc-600" />
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => flyToLocation(spot.lat, spot.lng, 14)}
                              aria-label={`View ${spot.name} on map`}
                              className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-[11px] py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 border border-zinc-200/60 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                            >
                              <Icon icon="material-symbols:near-me" className="w-3.5 h-3.5 text-zinc-600" />
                              Map
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddTourismSpotToTrip(spot)}
                              aria-label={`Add ${spot.name} to itinerary`}
                              className="flex-1 bg-[#FC0780] hover:bg-[#e00570] text-white font-bold text-[11px] py-1.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center justify-center gap-1 focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                            >
                              <Icon icon="material-symbols:add" className="w-3.5 h-3.5" />
                              Add
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Spot Detail & Search Side Panel (Docked to the left of the main right-side search panel) */}
      <div
        ref={spotModalRef}
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="spot-modal-title"
        className="fixed top-[116px] right-4 lg:right-[450px] w-[90vw] lg:w-[45vw] lg:min-w-[40vw] max-w-[calc(100vw-32px)] h-[calc(100vh-140px)] max-h-[calc(100vh-140px)] bg-white/98 backdrop-blur-2xl rounded-2xl shadow-xl border border-zinc-200/90 z-[990] flex flex-col overflow-hidden transition-all duration-300 overscroll-contain animate-in fade-in slide-in-from-right-4 duration-200 modal-scroll-area"
        style={{
          display: selectedSpotForModal ? "flex" : "none",
          touchAction: "pan-y",
          overscrollBehavior: "contain",
        }}
      >
        {/* Header Strip with Clean Large Text & Close Button */}
        <div className="bg-white text-zinc-900 px-5 py-3 flex items-center justify-between shrink-0 border-b border-zinc-100">
          {activeIframeUrl ? (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <button
                type="button"
                onClick={() => setActiveIframeUrl(null)}
                aria-label="Back to destination search details"
                className="bg-[#FC0780] hover:bg-[#e00570] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
              >
                <Icon icon="material-symbols:arrow-back-rounded" className="w-4 h-4" />
                <span>Back to Search</span>
              </button>
              <div className="flex items-center gap-1.5 overflow-hidden bg-zinc-50 border border-zinc-200/80 px-2.5 py-1 rounded-full">
                <Icon icon="material-symbols:language" className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="text-[11px] text-zinc-600 font-mono truncate max-w-[200px] sm:max-w-[320px]">
                  {activeIframeUrl}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 overflow-hidden py-0.5">
              <h3 id="spot-modal-title" className="text-base sm:text-lg font-extrabold text-zinc-900 truncate tracking-tight flex items-center gap-2">
                <Icon icon="material-symbols:location-on" className="w-5 h-5 text-[#FC0780] shrink-0" />
                <span>{selectedSpotForModal ? `${selectedSpotForModal.name}, ${selectedSpotForModal.city}` : ""}</span>
              </h3>
            </div>
          )}

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {activeIframeUrl && (
              <a
                href={activeIframeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 p-1.5 rounded-full transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                title="Open in new window"
                aria-label="Open website in new window"
              >
                <Icon icon="material-symbols:open-in-new" className="w-4 h-4" />
              </a>
            )}
            <button
              type="button"
              onClick={handleCloseSpotModal}
              className="text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 p-1.5 rounded-full transition-colors cursor-pointer shrink-0 focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
              title="Close Panel"
              aria-label="Close destination details panel"
            >
              <Icon icon="material-symbols:close" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div
          ref={spotModalScrollRef}
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto bg-zinc-50 flex flex-col relative overscroll-contain modal-scroll-area"
          style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
        >
          {/* Web Page Iframe Reader View */}
          <div className={`w-full h-full flex flex-col min-h-0 ${activeIframeUrl ? "flex" : "hidden"}`}>
            {activeIframeUrl && (
              <>
                <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-1.5 text-[11px] flex items-center justify-between shrink-0 font-medium">
                  <span className="truncate pr-2">
                    Viewing destination site inside modal. If page is blank due to site security headers:
                  </span>
                  <a
                    href={activeIframeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors shrink-0 focus:outline-none"
                  >
                    <span>Open in New Tab</span>
                    <Icon icon="material-symbols:open-in-new" className="w-3 h-3" />
                  </a>
                </div>
                <iframe
                  src={activeIframeUrl}
                  className="w-full h-full border-none flex-1 min-h-[400px]"
                  title="Web Page Content"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </>
            )}
          </div>

          {/* Main Spot Details View (Shown when activeIframeUrl is null) */}
          <div className={`flex-1 flex flex-col p-4 sm:p-5 gap-4 ${activeIframeUrl ? "hidden" : "flex"}`}>
            {selectedSpotForModal && (
              <>
                {/* Spot Overview Card */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/80 shadow-xs flex flex-col gap-3.5">
                  {/* Hero Image if available from Wikipedia API */}
                  {wikiData?.thumbnail && (
                    <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/60 shadow-inner">
                      <img
                        src={wikiData.thumbnail}
                        alt={selectedSpotForModal.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Icon icon="material-symbols:star-rounded" className="w-4 h-4 text-amber-400" />
                        <span>{selectedSpotForModal.rating}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FC0780]/10 text-[#FC0780] font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-[#FC0780]/20">
                          {selectedSpotForModal.vibe}
                        </span>
                        <span className="bg-zinc-100 text-zinc-700 font-semibold text-[11px] px-2.5 py-0.5 rounded-full border border-zinc-200">
                          {selectedSpotForModal.city}, {selectedSpotForModal.country}
                        </span>
                      </div>
                      {!wikiData?.thumbnail && (
                        <div className="flex items-center gap-1 text-amber-500 font-extrabold text-sm bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Icon icon="material-symbols:star-rounded" className="w-4 h-4" />
                          <span>{selectedSpotForModal.rating}</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                      {selectedSpotForModal.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {selectedSpotForModal.description}
                    </p>
                  </div>

                  {/* Live Wikipedia Extract Summary */}
                  {wikiLoading ? (
                    <div className="animate-pulse flex flex-col gap-2 pt-2 border-t border-zinc-100">
                      <div className="h-3.5 bg-zinc-200 rounded-md w-3/4"></div>
                      <div className="h-3 bg-zinc-200 rounded-md w-full"></div>
                      <div className="h-3 bg-zinc-200 rounded-md w-5/6"></div>
                    </div>
                  ) : wikiData?.extract ? (
                    <div className="pt-3 border-t border-zinc-100 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        <Icon icon="cib:wikipedia" className="w-3.5 h-3.5 text-zinc-700" />
                        <span>Wikipedia Destination Overview</span>
                      </div>
                      <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-zinc-200/70">
                        {wikiData.extract}
                      </p>
                    </div>
                  ) : null}

                  {/* Quick Actions Row */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleAddTourismSpotToTrip(selectedSpotForModal);
                      }}
                      aria-label={`Add ${selectedSpotForModal.name} to itinerary`}
                      className="bg-[#FC0780] hover:bg-[#e00570] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
                    >
                      <Icon icon="material-symbols:add-location-alt-outline" className="w-4 h-4" />
                      <span>Add to Itinerary</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (mapInstanceRef.current) {
                          mapInstanceRef.current.flyTo([selectedSpotForModal.lat, selectedSpotForModal.lng], 14, {
                            animate: true,
                            duration: 1.2,
                          });
                        }
                      }}
                      aria-label={`Focus ${selectedSpotForModal.name} on map`}
                      className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                    >
                      <Icon icon="material-symbols:map-outline" className="w-4 h-4" />
                      <span>Focus Map</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const wikiUrl = wikiData?.pageUrl || `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(selectedSpotForModal.name + " " + selectedSpotForModal.city)}`;
                        setActiveIframeUrl(wikiUrl);
                      }}
                      aria-label={`Read full guide for ${selectedSpotForModal.name}`}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border border-blue-200/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <Icon icon="material-symbols:menu-book-outline" className="w-4 h-4" />
                      <span>Read Full Guide</span>
                    </button>
                  </div>
                </div>

                {/* Modal Sub-Tab Navigation Bar */}
                <div
                  className="flex items-center gap-2 border-b border-zinc-200/80 pb-2 pt-1 bg-white p-2 rounded-2xl border border-zinc-200/60 shadow-2xs"
                  role="tablist"
                  aria-label="Destination information sections"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={modalTab === "articles"}
                    aria-label="Web articles and destination info"
                    onClick={() => setModalTab("articles")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780] ${modalTab === "articles"
                        ? "bg-[#FC0780] text-white shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                      }`}
                  >
                    <Icon icon="material-symbols:travel-explore" className="w-4 h-4" />
                    <span>Web Articles & Info</span>
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={modalTab === "images"}
                    aria-label={`Destination photos and gallery (${galleryImages.length} photos)`}
                    onClick={() => setModalTab("images")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780] ${modalTab === "images"
                        ? "bg-[#FC0780] text-white shadow-xs"
                        : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                      }`}
                  >
                    <Icon icon="material-symbols:photo-library-outline" className="w-4 h-4" />
                    <span>Photos & Gallery</span>
                    {galleryImages.length > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${modalTab === "images" ? "bg-white text-[#FC0780]" : "bg-zinc-200 text-zinc-700"
                          }`}
                      >
                        {galleryImages.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* TAB 1: Web Search & Travel Info */}
                {modalTab === "articles" && (
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/80 shadow-xs flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Icon icon="material-symbols:travel-explore" className="w-5 h-5 text-[#FC0780]" />
                        <h3 className="text-sm font-bold text-zinc-900">Web Articles & Travel Guides</h3>
                      </div>
                      <span className="text-[11px] text-zinc-400 font-medium">Google & Web Engine</span>
                    </div>

                    {/* Travel Topics Quick Guide Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(selectedSpotForModal.name + " history architecture")}`;
                          setActiveIframeUrl(wikiUrl);
                        }}
                        className="bg-zinc-50 hover:bg-zinc-100 p-2.5 rounded-xl border border-zinc-200/70 text-left transition-all flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                          <Icon icon="material-symbols:account-balance" className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-zinc-800 truncate group-hover:text-[#FC0780]">History & Architecture</div>
                          <div className="text-[10px] text-zinc-400">Wikipedia Guide</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(selectedSpotForModal.name + " " + selectedSpotForModal.city + " entry tickets timings opening hours")}`;
                          window.open(searchUrl, "_blank");
                        }}
                        className="bg-zinc-50 hover:bg-zinc-100 p-2.5 rounded-xl border border-zinc-200/70 text-left transition-all flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                          <Icon icon="material-symbols:confirmation-number-outline" className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-zinc-800 truncate group-hover:text-[#FC0780]">Tickets & Timings</div>
                          <div className="text-[10px] text-zinc-400">Visitor Info</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(selectedSpotForModal.name + " " + selectedSpotForModal.city + " photography spots tips")}`;
                          window.open(searchUrl, "_blank");
                        }}
                        className="bg-zinc-50 hover:bg-zinc-100 p-2.5 rounded-xl border border-zinc-200/70 text-left transition-all flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                          <Icon icon="material-symbols:photo-camera-outline" className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-zinc-800 truncate group-hover:text-[#FC0780]">Photo Spots & Tips</div>
                          <div className="text-[10px] text-zinc-400">Best Angles</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(selectedSpotForModal.name + " " + selectedSpotForModal.city + " how to reach transport")}`;
                          window.open(searchUrl, "_blank");
                        }}
                        className="bg-zinc-50 hover:bg-zinc-100 p-2.5 rounded-xl border border-zinc-200/70 text-left transition-all flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-[#FC0780]"
                      >
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                          <Icon icon="material-symbols:directions-car-outline" className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-zinc-800 truncate group-hover:text-[#FC0780]">Transport & Map</div>
                          <div className="text-[10px] text-zinc-400">Routes & Directions</div>
                        </div>
                      </button>
                    </div>

                    {/* Google Programmable Search Container */}
                    <div
                      className="gcse-searchresults-only w-full min-h-[140px]"
                      data-gname="spot-search-element"
                      onClick={handleResultClick}
                    ></div>

                    {/* Fallback Direct Search Links */}
                    <div className="pt-2 border-t border-zinc-100 flex items-center gap-2 flex-wrap text-xs text-zinc-500">
                      <span className="font-semibold text-zinc-600">Explore Further:</span>
                      <a
                        href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(selectedSpotForModal.name + " " + selectedSpotForModal.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FC0780] hover:underline font-medium flex items-center gap-1 focus:outline-none"
                      >
                        <span>Wikipedia Article</span>
                        <Icon icon="material-symbols:open-in-new" className="w-3 h-3" />
                      </a>
                      <span>•</span>
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(selectedSpotForModal.name + " " + selectedSpotForModal.city + " travel guide")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FC0780] hover:underline font-medium flex items-center gap-1 focus:outline-none"
                      >
                        <span>Google Search</span>
                        <Icon icon="material-symbols:open-in-new" className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* TAB 2: Destination Photos & Gallery */}
                {modalTab === "images" && (
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-200/80 shadow-xs flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Icon icon="material-symbols:photo-library-outline" className="w-5 h-5 text-[#FC0780]" />
                        <h3 className="text-sm font-bold text-zinc-900">Destination Photos ({galleryImages.length})</h3>
                      </div>
                      <span className="text-[11px] text-zinc-400 font-medium">Wikimedia Commons</span>
                    </div>

                    {galleryLoading ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-4">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <div key={n} className="h-32 bg-zinc-200/70 rounded-xl animate-pulse"></div>
                        ))}
                      </div>
                    ) : galleryImages.length > 0 ? (
                      <div
                        data-lenis-prevent
                        className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1 overscroll-contain modal-scroll-area"
                        style={{ overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
                      >
                        {galleryImages.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedImagePreview(imgUrl)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedImagePreview(imgUrl);
                              }
                            }}
                            aria-label={`Preview photo ${idx + 1} of ${selectedSpotForModal.name}`}
                            className="relative h-28 sm:h-36 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/60 shadow-2xs group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FC0780]"
                          >
                            <img
                              src={imgUrl}
                              alt={`${selectedSpotForModal.name} photo ${idx + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-108"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Icon icon="material-symbols:zoom-in" className="w-6 h-6 drop-shadow-md" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-xs text-zinc-500 flex flex-col items-center gap-2">
                        <Icon icon="material-symbols:image-not-supported-outline" className="w-8 h-8 text-zinc-400" />
                        <span>No additional photos found for this spot.</span>
                        <a
                          href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(selectedSpotForModal.name + " " + selectedSpotForModal.city)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#FC0780] text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 mt-1 focus:outline-none"
                        >
                          <span>Search Google Images</span>
                          <Icon icon="material-symbols:open-in-new" className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Fullscreen Image Preview Lightbox Modal */}
                {selectedImagePreview && (
                  <div
                    role="dialog"
                    aria-modal="true"
                    data-lenis-prevent
                    aria-label="Destination photo preview"
                    className="fixed inset-0 z-[1050] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImagePreview(null)}
                  >
                    <div
                      data-lenis-prevent
                      className="relative max-w-4xl max-h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl flex flex-col"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-3 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
                        <span className="text-xs font-bold truncate pr-4 text-zinc-300">{selectedSpotForModal.name}</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={selectedImagePreview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-zinc-400 hover:text-white bg-zinc-800 p-1.5 rounded-lg transition-colors flex items-center gap-1 focus:outline-none focus:ring-1 focus:ring-white"
                            title="Open Original Image"
                            aria-label="Open original image in new tab"
                          >
                            <span>HD Original</span>
                            <Icon icon="material-symbols:open-in-new" className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedImagePreview(null)}
                            aria-label="Close photo preview"
                            className="text-zinc-400 hover:text-white bg-zinc-800 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
                          >
                            <Icon icon="material-symbols:close" className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-2 flex items-center justify-center min-h-[300px] max-h-[80vh] overflow-hidden bg-black">
                        <img
                          src={selectedImagePreview}
                          alt="Destination Preview"
                          className="max-w-full max-h-[75vh] object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Home Bottom Promotional Banner Section with Floating Paper Doodles */}
      <BannerSection />
    </div>
  );
}
