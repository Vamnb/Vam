import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return ["","shop","products/furlo-pet-hair-removal-mitt","about","contact","track-order","faq","shipping","returns","privacy","terms","blog"].map(p=>({url:`https://furlo.vn/${p}`,lastModified:new Date()})); }
